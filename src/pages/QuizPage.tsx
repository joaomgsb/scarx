import React, { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, Loader2, CheckCircle, Brain, Shield, Star, ArrowRight, ChevronLeft, ChevronRight, Crown, Zap, Users } from 'lucide-react';
import Lottie from "lottie-react";
import etapa1Animation from '../animations/etapa1.json';
import etapa2Animation from '../animations/etapa2.json';
import etapa3Animation from '../animations/etapa3.json';
import etapa4Animation from '../animations/etapa4.json';
import WhatsAppButton from '../components/WhatsAppButton';
import { analisarPerfilCompleto } from '../utils/openai';
import { sendQuizEmail } from '../config/emailjs';

// Interfaces
interface QuizFormData {
  objetivoPrincipal: string;
  objetivoSecundario: string[];
  sexoBiologico: string;
  dataNascimento: string;
  peso: string;
  altura: string;
  percentualGordura: string;
  metaPeso: string;
  whatsapp: string;
  email: string;
  pesoMaximo: string;
  tentouEmagrecer: string[];
  medicacoes: string[];
  usarMedicamentos: string;
  disturbioAlimentar: string;
  cirurgiaBariatrica: string;
  condicoesMedicas: string[];
  frequenciaMedico: string;
  nivelAtividade: string;
  frequenciaAlcool: string;
  compartilhar: string;
  [key: string]: string | string[];
}

interface AnaliseIA {
  analisePersonalizada: string;
  planoRecomendado: string;
  motivacao: string;
  desafios: string[];
  objetivos: string[];
}

// Quiz Questions Data
const quizQuestions = [
  {
    id: 1,
    type: 'radio',
    question: 'O que te trouxe até a ScarX hoje?',
    name: 'objetivoPrincipal',
    options: [
      'Sempre lutei contra balança',
      'Ganhei peso recentemente',
      'Quero perder gordura',
      'Quero ganhar massa muscular',
      'Outros',
    ],
    required: true,
  },
  {
    id: 2,
    type: 'checkbox',
    question: 'Cada pessoa é única e tem um objetivo diferente para querer se cuidar, qual é o seu?',
    name: 'objetivoSecundario',
    options: [
      'Entrar em forma',
      'Me sentir mais feliz com meu corpo',
      'Ser mais saudável',
      'Caber nas minhas roupas',
      'Ter mais energia',
      'Tenho um evento importante',
    ],
    required: true,
  },
  {
    id: 3,
    type: 'radio',
    question: 'Qual o seu sexo biológico?',
    name: 'sexoBiologico',
    options: [
      { value: 'Feminino', icon: '/emojis/female.svg' },
      { value: 'Masculino', icon: '/emojis/male.svg' },
      { value: 'Prefiro não declarar', icon: null }
    ],
    required: true,
  },
  {
    id: 4,
    type: 'date',
    question: 'Qual é a sua data de nascimento?',
    name: 'dataNascimento',
    placeholder: 'DD/MM/AAAA',
    required: true,
  },
  {
    id: 5,
    type: 'number-pair',
    question: 'Qual seu peso e altura?',
    name: ['peso', 'altura'],
    placeholders: ['Peso (kg)', 'Altura (cm)'],
    required: true,
  },
  {
    id: 6,
    type: 'radio',
    question: 'Você mediu o seu percentual de gordura nos últimos 3 meses?',
    name: 'percentualGordura',
    options: ['Sim', 'Não'],
    required: true,
  },
  {
    id: 7,
    type: 'number',
    question: 'Qual é a sua meta de peso, em kg?',
    name: 'metaPeso',
    placeholder: 'Ex: 65',
    required: true,
  },
  {
    id: 8,
    type: 'text-pair',
    question: 'Qual o seu contato? (Para envio do resultado)',
    name: ['whatsapp', 'email'],
    placeholders: ['WhatsApp (com DDD)', 'E-mail'],
    required: true,
  },
  {
    id: 9,
    type: 'number',
    question: 'Qual o peso máximo que você atingiu na sua vida?',
    name: 'pesoMaximo',
    placeholder: 'Ex: 80',
    required: true,
  },
  {
    id: 10,
    type: 'checkbox',
    question: 'Você tentou fazer alguma coisa para emagrecer nos últimos 3 meses?',
    name: 'tentouEmagrecer',
    options: [
      'Rotina de exercícios físicos',
      'Mudança na alimentação',
      'Suplementos ou remédios para emagrecer',
      'Programas de perda de peso',
      'Dietas restritivas/dietas da moda',
      'Nunca tentei nada antes',
      'Outros',
    ],
    required: true,
  },
  {
    id: 11,
    type: 'checkbox',
    question: 'Você fez uso de alguma dessas medicações nos últimos 3 meses?',
    name: 'medicacoes',
    options: [
      'Não',
      'Ozempic/Wegovy (semaglutida)',
      'Mounjaro',
      'Saxenda/Olire (liraglutida)',
      'Orlistat',
      'Sibutramina',
    ],
    required: true,
  },
  {
    id: 12,
    type: 'radio',
    question: 'Você gostaria de usar medicamentos para emagrecer, caso seja clinicamente indicado?',
    name: 'usarMedicamentos',
    options: ['Sim', 'Não', 'Ainda não pensei sobre isso'],
    required: true,
  },
  {
    id: 13,
    type: 'radio',
    question: 'Você possui algum distúrbio alimentar diagnosticado por médico?',
    name: 'disturbioAlimentar',
    options: ['Sim', 'Não'],
    required: true,
  },
  {
    id: 14,
    type: 'radio',
    question: 'Você já realizou cirurgia bariátrica?',
    name: 'cirurgiaBariatrica',
    options: ['Sim', 'Não'],
    required: true,
  },
  {
    id: 15,
    type: 'checkbox',
    question: 'Você tem atualmente ou já foi diagnosticado com alguma das condições médicas listadas abaixo?',
    name: 'condicoesMedicas',
    options: [
      'Não possuo condições de saúde',
      'Doenças do coração',
      'Pressão alta',
      'Diabetes',
      'Colesterol alto',
      'Outros',
    ],
    required: true,
  },
  {
    id: 16,
    type: 'radio',
    question: 'Com que frequência você costuma visitar um médico ou realizar exames de saúde?',
    name: 'frequenciaMedico',
    options: ['Mensalmente', 'Semestralmente', 'Anualmente', 'Outra'],
    required: true,
  },
  {
    id: 17,
    type: 'radio',
    question: 'Como você descreveria seu nível de atividade física atual?',
    name: 'nivelAtividade',
    options: [
      'Sedentário',
      'Moderado – 2 vezes por semana',
      'Ativo – 3 a 4 vezes por semana',
      'Muito ativo – 5 ou mais vezes por semana',
    ],
    required: true,
  },
  {
    id: 18,
    type: 'radio',
    question: 'Com que frequência você costuma ingerir bebidas alcoólicas?',
    name: 'frequenciaAlcool',
    options: ['Não tenho o hábito de ingerir álcool', 'Raramente', 'Às vezes', 'Frequentemente'],
    required: true,
  },
  {
    id: 19,
    type: 'textarea',
    question: 'Tem mais alguma coisa que você gostaria de compartilhar conosco?',
    name: 'compartilhar',
    placeholder: 'Opcional - Conte-nos mais sobre seus objetivos ou desafios',
    required: false,
  },
];

// Loading screens data with curiosities
const loadingScreensData = [
  { 
    step: 3, 
    message: 'Analisando seu perfil...',
    curiosity: '💡 Curiosidade: A ScarX já transformou mais de 1200 vidas com metodologia 100% personalizada!'
  },
  { 
    step: 8, 
    message: 'Processando suas respostas...',
    curiosity: '🧬 Curiosidade: Cada pessoa tem um biotipo único. Por isso, criamos protocolos exclusivos para cada cliente!'
  },
  { 
    step: 14, 
    message: 'Quase lá! Gerando sua análise...',
    curiosity: '⚡ Curiosidade: Nossa metodologia combina ciência de 7 países diferentes para resultados únicos!'
  },
];



interface QuizPageProps {
  experienceOnly?: boolean;
}

const QuizPage: React.FC<QuizPageProps> = ({ experienceOnly = false }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<QuizFormData>(() => {
    const initialData: Partial<QuizFormData> = {};
    quizQuestions.forEach(q => {
      if (q.type === 'checkbox') {
        initialData[q.name as string] = [];
      } else if (Array.isArray(q.name)) {
        q.name.forEach(n => initialData[n] = '');
      } else {
        initialData[q.name as string] = '';
      }
    });
    return initialData as QuizFormData;
  });
  
  const [discountAmount, setDiscountAmount] = useState<number | null>(null);
  const [showDiscountUnlock, setShowDiscountUnlock] = useState(false);


  // Scroll para o topo quando a página carrega
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [loadingCuriosity, setLoadingCuriosity] = useState('');
  const [showFinalResult, setShowFinalResult] = useState(false);
  const [quizResult, setQuizResult] = useState<AnaliseIA | null>(null);
  const [direction, setDirection] = useState(0);
  const [isSubmittingOpenAI, setIsSubmittingOpenAI] = useState(false);

  const totalSteps = quizQuestions.length;
  const currentQuestion = quizQuestions[currentStep];

  // Helper Functions
  const calculateIMC = useCallback((peso: number, alturaCm: number) => {
    const alturaM = alturaCm / 100;
    const imc = peso / (alturaM * alturaM);
    let categoria = '';

    if (imc < 18.5) categoria = 'Abaixo do peso';
    else if (imc < 24.9) categoria = 'Peso normal';
    else if (imc < 29.9) categoria = 'Sobrepeso';
    else if (imc < 34.9) categoria = 'Obesidade Grau 1';
    else if (imc < 39.9) categoria = 'Obesidade Grau 2';
    else categoria = 'Obesidade Grau 3';

    return { imc, categoria };
  }, []);

  const getAge = useCallback((dateString: string): number => {
    if (!dateString) return 30; // Default age
    
    let birthDate: Date;
    
    // Check if it's YYYY-MM-DD format (HTML date input)
    if (dateString.includes('-') && dateString.split('-').length === 3) {
      const [year, month, day] = dateString.split('-').map(Number);
      if (!day || !month || !year) return 30;
      birthDate = new Date(year, month - 1, day);
    }
    // Check if it's DD/MM/YYYY format
    else if (dateString.includes('/') && dateString.split('/').length === 3) {
      const [day, month, year] = dateString.split('/').map(Number);
      if (!day || !month || !year) return 30;
      birthDate = new Date(year, month - 1, day);
    }
    else {
      return 30; // Invalid format
    }
    
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }, []);

  // Input handlers
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleRadioChange = useCallback((name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Trigger selection animation
    const element = document.getElementById(`radio-${name}-${value.replace(/\s+/g, '-')}`);
    if (element) {
      element.parentElement?.classList.add('animate-pulse');
      setTimeout(() => {
        element.parentElement?.classList.remove('animate-pulse');
      }, 600);
    }
  }, []);

  const handleCheckboxChange = useCallback((name: string, value: string) => {
    setFormData(prev => {
      const currentValues = (prev[name] || []) as string[];
      const isRemoving = currentValues.includes(value);
      
      // Trigger selection animation
      const element = document.getElementById(`checkbox-${name}-${value.replace(/\s+/g, '-')}`);
      if (element) {
        if (isRemoving) {
          element.parentElement?.classList.add('animate-bounce');
        } else {
          element.parentElement?.classList.add('animate-pulse');
        }
        setTimeout(() => {
          element.parentElement?.classList.remove('animate-bounce', 'animate-pulse');
        }, 600);
      }
      
      if (isRemoving) {
        return { ...prev, [name]: currentValues.filter(item => item !== value) };
      } else {
        return { ...prev, [name]: [...currentValues, value] };
      }
    });
  }, []);

  const handleNumberPairChange = useCallback((name1: string, name2: string, value1: string, value2: string) => {
    setFormData(prev => ({ ...prev, [name1]: value1, [name2]: value2 }));
  }, []);

  const handleTextPairChange = useCallback((name1: string, name2: string, value1: string, value2: string) => {
    setFormData(prev => ({ ...prev, [name1]: value1, [name2]: value2 }));
  }, []);

  // Validation
  const isCurrentQuestionAnswered = useCallback(() => {
    if (!currentQuestion) return false;

    if (Array.isArray(currentQuestion.name)) {
      return currentQuestion.name.every(name => {
        const value = formData[name];
        return value !== undefined && value !== null && value !== '';
      });
    } else if (currentQuestion.type === 'checkbox') {
      return (formData[currentQuestion.name] as string[]).length > 0;
    } else if (currentQuestion.required) {
      const value = formData[currentQuestion.name];
      return value !== undefined && value !== null && value !== '';
    }
    return true;
  }, [currentQuestion, formData]);



  // Navigation
  const handleNext = useCallback(async () => {
    if (!isCurrentQuestionAnswered()) {
      alert('Por favor, responda a pergunta para continuar.');
      return;
    }

    setDirection(1);

    // Check for discount unlock screen (after question 5: peso/altura)
    if (currentStep === 4 && !discountAmount) {
      const peso = parseFloat(formData.peso);
      const altura = parseFloat(formData.altura);
      if (peso > 0 && altura > 0) {
        const discount = Math.floor(Math.random() * 51) + 50; // Random discount between 50 and 100
        setDiscountAmount(discount);
        localStorage.setItem('discountAmount', discount.toString());
        setShowDiscountUnlock(true);
        return;
      }
    }

    // Check for loading screens
    const loadingScreen = loadingScreensData.find(ls => ls.step === currentStep + 1);
    if (loadingScreen) {
      setIsLoading(true);
      setLoadingMessage(loadingScreen.message);
      setLoadingCuriosity(loadingScreen.curiosity);
      setTimeout(() => {
        setIsLoading(false);
        setLoadingMessage('');
        setLoadingCuriosity('');
        setCurrentStep(prev => prev + 1);
      }, 6000);
      return;
    }

    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      await submitQuizToOpenAI();
    }
  }, [currentStep, totalSteps, isCurrentQuestionAnswered, formData, discountAmount]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      navigate('/');
    }
  }, [currentStep, navigate]);

  // Submit to OpenAI
  const submitQuizToOpenAI = useCallback(async () => {
    if (isSubmittingOpenAI) return;

    setIsSubmittingOpenAI(true);
    setIsLoading(true);
    setLoadingMessage('Finalizando sua análise personalizada...');
    setLoadingCuriosity('🤖 Nossa IA está analisando todas as suas respostas para criar o plano perfeito!');

    try {
      const peso = parseFloat(formData.peso);
      const alturaCm = parseFloat(formData.altura);
      const idade = getAge(formData.dataNascimento);
      const { imc, categoria } = calculateIMC(peso, alturaCm);

      // Map quiz data to OpenAI format
      const openaiData = {
        peso,
        altura: alturaCm / 100,
        idade,
        imc,
        categoria,
        frequenciaTreino: formData.nivelAtividade,
        tipoTreino: formData.tentouEmagrecer.includes('Rotina de exercícios físicos') ? 'exercicios' : 'nenhum',
        nivelExperiencia: formData.nivelAtividade.includes('Sedentário') ? 'iniciante' : 
                         formData.nivelAtividade.includes('Moderado') ? 'iniciante' : 
                         formData.nivelAtividade.includes('Ativo') ? 'intermediario' : 'avancado',
        objetivo: formData.objetivoPrincipal,
      };

      const result = await analisarPerfilCompleto(openaiData);
      setQuizResult(result);
      localStorage.setItem('quizResult', JSON.stringify(result));
      
      // Enviar email com os dados do quiz
      try {
        await sendQuizEmail(formData, result, discountAmount);
        console.log('Email enviado com sucesso!');
      } catch (error) {
        console.error('Erro ao enviar email:', error);
        // Não bloquear o fluxo se o email falhar
      }
      
      setShowFinalResult(true);
    } catch (error) {
      console.error('Erro ao chamar OpenAI:', error);
      // Fallback result
      const fallbackResult = {
        analisePersonalizada: 'Com base nas suas respostas, identificamos que você tem um perfil único que se beneficiaria muito da metodologia ScarX personalizada.',
        planoRecomendado: 'LEGACY',
        motivacao: 'Sua jornada de transformação está apenas começando. A ScarX tem tudo que você precisa para alcançar seus objetivos!',
        desafios: ['Manter a consistência', 'Adaptar à nova rotina', 'Superar plateaus'],
        objetivos: ['Transformação corporal', 'Melhora da saúde', 'Aumento da autoestima'],
      };
      setQuizResult(fallbackResult);
      localStorage.setItem('quizResult', JSON.stringify(fallbackResult));
      
      // Enviar email com os dados do quiz (fallback)
      try {
        await sendQuizEmail(formData, fallbackResult, discountAmount);
        console.log('Email enviado com sucesso (fallback)!');
      } catch (error) {
        console.error('Erro ao enviar email (fallback):', error);
        // Não bloquear o fluxo se o email falhar
      }
      
      setShowFinalResult(true);
    } finally {
      setIsLoading(false);
      setIsSubmittingOpenAI(false);
    }
  }, [formData, getAge, calculateIMC, isSubmittingOpenAI]);

  // Render question content
  const renderQuestionContent = useCallback(() => {
    if (!currentQuestion) return null;

    const commonInputClasses = "w-full px-6 py-4 rounded-xl bg-dark-lighter border border-neutral-700 text-light focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 placeholder-light-muted";
    const optionContainerClasses = "w-full bg-dark-lighter border border-neutral-700 rounded-xl cursor-pointer hover:bg-primary/10 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300 group overflow-hidden transform hover:scale-[1.02]";
    const optionContentClasses = "w-full p-5 flex items-center justify-between gap-4 relative";

    switch (currentQuestion.type) {
      case 'radio':
        return (
          <div className="space-y-4">
            {currentQuestion.options?.map(option => {
              // Handle both string and object formats for options
              const optionValue = typeof option === 'string' ? option : option.value;
              const optionIcon = typeof option === 'object' ? option.icon : null;
              
              return (
                <div key={optionValue} className={`${optionContainerClasses} ${
                  formData[currentQuestion.name as string] === optionValue 
                    ? 'bg-primary/20 border-primary shadow-xl shadow-primary/30 scale-[1.02]' 
                    : ''
                }`}>
                  {/* Efeito de brilho animado */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 opacity-0 group-hover:opacity-100" />
                  
                  <input
                    type="radio"
                    name={currentQuestion.name as string}
                    value={optionValue}
                    checked={formData[currentQuestion.name as string] === optionValue}
                    onChange={() => handleRadioChange(currentQuestion.name as string, optionValue)}
                    className="hidden"
                    id={`radio-${currentQuestion.name}-${optionValue.replace(/\s+/g, '-')}`}
                  />
                  <label 
                    htmlFor={`radio-${currentQuestion.name}-${optionValue.replace(/\s+/g, '-')}`}
                    className={optionContentClasses}
                  >
                    <div className="flex items-center gap-3 relative z-10">
                      {optionIcon && (
                        <img 
                          src={optionIcon} 
                          alt={optionValue}
                          className="w-6 h-6 flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                        />
                      )}
                      <span className={`text-lg font-medium leading-relaxed transition-all duration-300 ${
                        formData[currentQuestion.name as string] === optionValue 
                          ? 'text-primary font-bold' 
                          : 'text-light group-hover:text-primary'
                      }`}>
                        {optionValue}
                      </span>
                    </div>
                    <span className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 relative z-10 ${
                      formData[currentQuestion.name as string] === optionValue 
                        ? 'border-primary bg-primary shadow-lg shadow-primary/50 scale-110' 
                        : 'border-neutral-600 group-hover:border-primary/50 group-hover:scale-105'
                    }`}>
                      {formData[currentQuestion.name as string] === optionValue && (
                        <motion.span 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 15 }}
                          className="w-3 h-3 rounded-full bg-dark" 
                        />
                      )}
                    </span>
                  </label>
                </div>
              );
            })}
          </div>
        );

      case 'checkbox':
        return (
          <div className="space-y-4">
            {currentQuestion.options?.map(option => {
              const optionValue = typeof option === 'string' ? option : (option && typeof option === 'object' && 'value' in option ? (option as any).value : String(option));
              return (
                <div key={optionValue} className={`${optionContainerClasses} ${
                  ((formData[currentQuestion.name as string] as string[]) || []).includes(optionValue)
                    ? 'bg-primary/20 border-primary shadow-xl shadow-primary/30 scale-[1.02]'
                    : ''
                }`}>
                  {/* Efeito de brilho animado */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 opacity-0 group-hover:opacity-100" />
                  
                  <input
                    type="checkbox"
                    name={currentQuestion.name as string}
                    value={optionValue}
                    checked={(formData[currentQuestion.name as string] as string[]).includes(optionValue)}
                    onChange={() => handleCheckboxChange(currentQuestion.name as string, optionValue)}
                    className="hidden"
                    id={`checkbox-${currentQuestion.name}-${optionValue.replace(/\s+/g, '-')}`}
                  />
                  <label 
                    htmlFor={`checkbox-${currentQuestion.name}-${optionValue.replace(/\s+/g, '-')}`}
                    className={optionContentClasses}
                  >
                    <span className={`text-lg font-medium leading-relaxed transition-all duration-300 relative z-10 ${
                      ((formData[currentQuestion.name as string] as string[]) || []).includes(optionValue)
                        ? 'text-primary font-bold' 
                        : 'text-light group-hover:text-primary'
                    }`}>
                    {optionValue}
                    </span>
                    <span className={`w-7 h-7 rounded border-2 flex items-center justify-center transition-all duration-300 relative z-10 ${
                      ((formData[currentQuestion.name as string] as string[]) || []).includes(optionValue)
                        ? 'border-primary bg-primary shadow-lg shadow-primary/50 scale-110'
                        : 'border-neutral-600 group-hover:border-primary/50 group-hover:scale-105'
                    }`}>
                      {((formData[currentQuestion.name as string] as string[]) || []).includes(optionValue) && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        >
                          <CheckCircle className="w-4 h-4 text-dark" />
                        </motion.div>
                      )}
                  </span>
                </label>
                </div>
              );
            })}
          </div>
        );

      case 'date':
        return (
          <div>
            <input
              type="date"
              name={currentQuestion.name as string}
              value={formData[currentQuestion.name as string]}
              onChange={handleInputChange}
              className={commonInputClasses}
            />
          </div>
        );

      case 'number':
        const isWeightQuestion = currentQuestion.name === 'metaPeso';
        const isMaxWeightQuestion = currentQuestion.name === 'pesoMaximo';
        const rawValue = formData[currentQuestion.name as string];
        const currentValue = parseFloat(Array.isArray(rawValue) ? '0' : (rawValue || '0')) || 0;
        
        if (isWeightQuestion || isMaxWeightQuestion) {
          const minWeight = 30;
          const maxWeight = 200;
          
          return (
            <div className="space-y-6">
              {/* Slider Visual */}
              <div className="relative">
                <div className="w-full h-2 bg-neutral-700 rounded-full relative overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-primary-dark rounded-full"
                    style={{ width: `${((currentValue - minWeight) / (maxWeight - minWeight)) * 100}%` }}
                  />
                  <input
                    type="range"
                    min={minWeight}
                    max={maxWeight}
                    step="1"
                    value={currentValue}
                    onChange={(e) => setFormData(prev => ({ ...prev, [currentQuestion.name as string]: e.target.value }))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                
                
                
                {/* Weight markers */}
                <div className="flex justify-between mt-2 text-xs text-light-muted">
                  <span>30kg</span>
                  <span>65kg</span>
                  <span>100kg</span>
                  <span>150kg</span>
                  <span>200kg</span>
                </div>
              </div>
              
              {/* Visual Weight Display */}
              <div className="text-center">
                <motion.div
                  key={currentValue}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="inline-block bg-primary/20 border border-primary/30 rounded-2xl px-8 py-4 mb-4"
                >
                  <span className="text-4xl font-bold text-primary">
                    {currentValue || '--'}
                  </span>
                  <span className="text-lg text-light-muted ml-2">kg</span>
                </motion.div>
              </div>
              
               {/* Manual Input */}
               <div className="flex items-center justify-center gap-4">
                 <input
                   type="number"
                   name={currentQuestion.name as string}
                   value={formData[currentQuestion.name as string]}
                   onChange={handleInputChange}
                   className="w-24 px-3 py-2 rounded-lg bg-dark-lighter border border-neutral-700 text-light text-center focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                   placeholder="kg"
                   min={minWeight}
                   max={maxWeight}
                 />
               </div>
            </div>
          );
        }
        
        return (
          <div>
            <input
              type="number"
              name={currentQuestion.name as string}
              value={formData[currentQuestion.name as string]}
              onChange={handleInputChange}
              className={commonInputClasses}
              placeholder={currentQuestion.placeholder}
            />
          </div>
        );

      case 'number-pair':
        const isPesoAltura = currentQuestion.name[0] === 'peso' && currentQuestion.name[1] === 'altura';
        
        if (isPesoAltura) {
          const pesoValue = parseFloat(formData.peso) || 0;
          const alturaValue = parseFloat(formData.altura) || 0;
          
          return (
            <div className="space-y-8">
              {/* Peso Slider */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-light">Peso (kg)</h4>
                <div className="relative">
                  <div className="w-full h-3 bg-neutral-700 rounded-full relative overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                      style={{ width: `${((pesoValue - 30) / (200 - 30)) * 100}%` }}
                    />
                  </div>
                  
                  <motion.div
                    className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-7 h-7 bg-blue-500 rounded-full border-4 border-dark shadow-lg cursor-pointer"
                    style={{ left: `${((pesoValue - 30) / (200 - 30)) * 100}%` }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                  
                  <input
                    type="range"
                    min="30"
                    max="200"
                    step="0.5"
                    value={pesoValue}
                    onChange={(e) => handleNumberPairChange('peso', 'altura', e.target.value, formData.altura as string)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                
                <div className="text-center">
                  <motion.div
                    key={pesoValue}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-block bg-blue-500/20 border border-blue-500/30 rounded-xl px-6 py-3"
                  >
                    <span className="text-3xl font-bold text-blue-400">
                      {pesoValue || '--'}
                    </span>
                    <span className="text-sm text-light-muted ml-2">kg</span>
                  </motion.div>
                </div>
              </div>
              
              {/* Altura Slider */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-light">Altura (cm)</h4>
                <div className="relative">
                  <div className="w-full h-3 bg-neutral-700 rounded-full relative overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                      style={{ width: `${((alturaValue - 140) / (220 - 140)) * 100}%` }}
                    />
                  </div>
                  
                  <motion.div
                    className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-7 h-7 bg-green-500 rounded-full border-4 border-dark shadow-lg cursor-pointer"
                    style={{ left: `${((alturaValue - 140) / (220 - 140)) * 100}%` }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                  
                  <input
                    type="range"
                    min="140"
                    max="220"
                    step="1"
                    value={alturaValue}
                    onChange={(e) => handleNumberPairChange('peso', 'altura', formData.peso as string, e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                
                <div className="text-center">
                  <motion.div
                    key={alturaValue}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-block bg-green-500/20 border border-green-500/30 rounded-xl px-6 py-3"
                  >
                    <span className="text-3xl font-bold text-green-400">
                      {alturaValue || '--'}
                    </span>
                    <span className="text-sm text-light-muted ml-2">cm</span>
                  </motion.div>
                </div>
              </div>
              
              {/* Manual Inputs */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-700">
                <div className="text-center">
                  <label className="block text-sm text-light-muted mb-2">Peso manual</label>
                  <input
                    type="number"
                    name="peso"
                    value={formData.peso}
                    onChange={(e) => handleNumberPairChange('peso', 'altura', e.target.value, formData.altura as string)}
                    className="w-full px-3 py-2 rounded-lg bg-dark-lighter border border-neutral-700 text-light text-center focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                    placeholder="kg"
                    min="30"
                    max="200"
                  />
                </div>
                <div className="text-center">
                  <label className="block text-sm text-light-muted mb-2">Altura manual</label>
                  <input
                    type="number"
                    name="altura"
                    value={formData.altura}
                    onChange={(e) => handleNumberPairChange('peso', 'altura', formData.peso as string, e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-dark-lighter border border-neutral-700 text-light text-center focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                    placeholder="cm"
                    min="140"
                    max="220"
                  />
                </div>
              </div>
            </div>
          );
        }
        
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              name={currentQuestion.name[0]}
              value={formData[currentQuestion.name[0]]}
              onChange={(e) => handleNumberPairChange(currentQuestion.name[0], currentQuestion.name[1], e.target.value, formData[currentQuestion.name[1]] as string)}
              className={commonInputClasses}
              placeholder={currentQuestion.placeholders?.[0]}
            />
            <input
              type="number"
              name={currentQuestion.name[1]}
              value={formData[currentQuestion.name[1]]}
              onChange={(e) => handleNumberPairChange(currentQuestion.name[0], currentQuestion.name[1], formData[currentQuestion.name[0]] as string, e.target.value)}
              className={commonInputClasses}
              placeholder={currentQuestion.placeholders?.[1]}
            />
          </div>
        );

      case 'text-pair':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name={currentQuestion.name[0]}
              value={formData[currentQuestion.name[0]]}
              onChange={(e) => handleTextPairChange(currentQuestion.name[0], currentQuestion.name[1], e.target.value, formData[currentQuestion.name[1]] as string)}
              className={commonInputClasses}
              placeholder={currentQuestion.placeholders?.[0]}
            />
            <input
              type="email"
              name={currentQuestion.name[1]}
              value={formData[currentQuestion.name[1]]}
              onChange={(e) => handleTextPairChange(currentQuestion.name[0], currentQuestion.name[1], formData[currentQuestion.name[0]] as string, e.target.value)}
              className={commonInputClasses}
              placeholder={currentQuestion.placeholders?.[1]}
            />
          </div>
        );

      case 'textarea':
        return (
          <div>
            <textarea
              name={currentQuestion.name as string}
              value={formData[currentQuestion.name as string]}
              onChange={handleInputChange}
              className={`${commonInputClasses} h-32 resize-none`}
              placeholder={currentQuestion.placeholder}
            />
          </div>
        );

      default:
        return null;
    }
  }, [currentQuestion, formData, handleInputChange, handleRadioChange, handleCheckboxChange, handleNumberPairChange, handleTextPairChange]);

  // UI Components
  const LoadingScreen: React.FC<{ message: string; curiosity: string }> = ({ curiosity }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            return 100;
          }
          return prev + (100 / 60); // 6 segundos = 60 intervalos de 100ms
        });
      }, 100);

      return () => clearInterval(timer);
    }, []);

    return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
        className="fixed inset-0 bg-dark flex flex-col items-center justify-center z-50 text-light p-4"
      >
        <div className="max-w-md w-full mx-auto text-center">
          {/* Logo/Título */}
          <div className="mb-8">
            <img 
              src="/images/scarx.png" 
              alt="ScarX" 
              className="h-12 mx-auto mb-4"
            />
          </div>

          {/* Ilustração Central */}
          <div className="relative mb-8">
            <div className="w-full max-w-sm h-64 mx-auto bg-gradient-to-br from-dark-accent to-dark-lighter rounded-2xl flex items-center justify-center relative overflow-hidden border border-neutral-700 shadow-2xl">
              
              {/* Gráfico simulado no centro */}
              <div className="w-11/12 max-w-xs h-32 bg-dark-lighter rounded-xl shadow-lg p-3 relative border border-neutral-600">
                <div className="text-xs text-light-muted mb-2 font-medium">Análise Corporal - ScarX</div>
                
                {/* Linhas do gráfico */}
                <div className="relative h-20">
                  {/* Linha de peso */}
      <motion.div
                    className="absolute w-full h-0.5 bg-primary"
                    style={{ top: '20px' }}
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2, delay: 0.5 }}
                  />
                  
                  {/* Linha de gordura */}
                  <motion.div 
                    className="absolute w-full h-0.5 bg-primary-light"
                    style={{ top: '40px' }}
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2, delay: 1 }}
                  />
                  
                  {/* Linha de músculo */}
                  <motion.div 
                    className="absolute w-full h-0.5 bg-primary-dark"
                    style={{ top: '60px' }}
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2, delay: 1.5 }}
                  />
                  
                  {/* Pontos nos gráficos */}
                  <motion.div 
                    className="absolute w-2 h-2 bg-primary rounded-full"
                    style={{ top: '18px', right: '10px' }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 2.5 }}
                  />
                </div>
                
                {/* Labels */}
                <div className="flex justify-between text-xs text-light-muted mt-2">
                  <span>Jan</span>
                  <span>Fev</span>
                  <span>Mar</span>
                </div>
              </div>
            </div>
          </div>

          {/* Curiosidade */}
          <div className="mb-8">
            <p className="text-light-muted text-lg leading-relaxed max-w-sm mx-auto">
              {curiosity}
            </p>
          </div>

          {/* Desconto (se existir) */}
          {discountAmount && (
            <div className="mb-4 text-left">
              <span className="text-primary font-bold text-sm">Seu peso desbloqueou: R$ {discountAmount} OFF</span>
            </div>
          )}

          {/* Barra de Progresso */}
          <div className="mb-4">
            <div className="w-full bg-neutral-800 rounded-full h-2">
              <motion.div 
                className="bg-gradient-to-r from-primary to-primary-dark h-2 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>

          {/* Texto de continuação */}
          <p className="text-light-muted text-sm">
            Continuando automaticamente em {Math.ceil((100 - progress) / (100/6))} segundos...
          </p>
      </div>
    </motion.div>
  );
  };



  const DiscountUnlockScreen: React.FC<{ discount: number; onClose: () => void }> = ({ discount, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-dark/95 backdrop-blur-md flex flex-col items-center justify-center z-50 text-light p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-3xl p-8 md:p-12 text-center max-w-lg shadow-2xl"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-20 h-20 text-primary mx-auto mb-6" />
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">🎉 Parabéns!</h2>
        <p className="text-xl text-light-muted mb-6">
          Seu peso desbloqueou um desconto exclusivo de
        </p>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 10 }}
          className="text-6xl md:text-7xl font-extrabold text-primary mb-8"
        >
          R$ {discount},00 OFF!
        </motion.div>
        <button
          onClick={onClose}
          className="bg-gradient-to-r from-primary to-primary-dark text-dark font-bold py-4 px-8 rounded-xl text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/30 flex items-center gap-3 mx-auto"
        >
          <Star className="w-6 h-6" />
          Garantir Meu Desconto
          <Sparkles className="w-6 h-6" />
        </button>
      </motion.div>
    </motion.div>
  );

  const FinalResultScreen: React.FC<{ result: AnaliseIA }> = ({ result }) => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [currentPlanIndex, setCurrentPlanIndex] = useState(0);
    
    // Função para extrair valor numérico do preço
    const extractPrice = (priceString: string): number => {
      const match = priceString.match(/R\$\s*([\d.,]+)/);
      if (match) {
        return parseFloat(match[1].replace('.', '').replace(',', '.'));
      }
      return 0;
    };
    
    // Função para aplicar desconto no preço
    const applyDiscount = (originalPrice: number, discount: number): number => {
      return Math.max(0, originalPrice - discount);
    };
    
    // Função para formatar preço com desconto (preço final permanece igual ao normal)
    // Exibe o preço "inflado" riscado (preço normal + desconto) e o preço com desconto igual ao normal
    const formatDiscountedPrice = (priceString: string, discount: number): { original: string; discounted: string; savings: string } => {
      const normalValue = extractPrice(priceString);
      const inflatedValue = Math.max(0, normalValue + discount);
      return {
        original: `R$ ${inflatedValue.toLocaleString('pt-BR')}`,
        discounted: `R$ ${normalValue.toLocaleString('pt-BR')}`,
        savings: `R$ ${discount.toLocaleString('pt-BR')}`
      };
    };
    
    // Função para atualizar descrição do preço com desconto (mantendo preço final normal)
    const formatDiscountedDescription = (description: string, normalPrice: string, inflatedPrice: string): string => {
      // Substitui a primeira ocorrência do preço por um preço inflado para exibir riscado, mas mantemos texto original abaixo
      return description.replace(normalPrice.replace('R$ ', 'R$'), inflatedPrice.replace('R$ ', 'R$'));
    };
    
    // Planos disponíveis
    const plans = [
      {
        id: 'ESSENTIAL',
        name: 'ESSENTIAL',
        subtitle: 'Isca de entrada - 3 meses',
        duration: '3 meses',
        icon: <Zap className="w-8 h-8" />,
        color: 'from-neutral-900 to-neutral-800',
        price: {
          full: 'R$ 469',
          description: 'à vista R$469 (R$175 matrícula + R$294 plano 3 meses)',
          installments: 'até 3x sem juros • 12x com juros no gateway'
        },
        target: 'Para quem quer testar o método com baixa fricção',
        features: [
          'ScarX App (My PT Hub) com treino, nutri e habit tracker',
          'Entrega do plano: até 7 dias úteis após questionários',
          'Atendimento via App (SLA até 24h úteis)',
          'ScarX Sync mensal: check-in guiado para ajustes'
        ],
        addons: [
          'WhatsApp+ (grupo privado) por R$ 249 único (SLA até 12h úteis)',
          'Adicionar dependente com 25% OFF (matrícula isenta)'
        ],
        highlight: 'Ideal para testar a metodologia ScarX',
        ctaText: 'Começar no Essential'
      },
      {
        id: 'LEGACY',
        name: 'LEGACY',
        subtitle: 'Melhor custo-benefício - 10 meses',
        duration: '10 meses',
        icon: <Crown className="w-8 h-8" />,
        color: 'from-neutral-500 to-neutral-600',
        price: {
          full: 'R$ 1.350',
          description: 'à vista R$ 1.350 • ou 12x ~R$112/mês (gateway)',
          installments: 'Matrícula isenta'
        },
        target: 'Para quem quer acompanhamento contínuo sem ruído',
        features: [
          'ScarX App completo + ScarX Sync mensal',
          'WhatsApp grupo privado: respostas priorizadas 15-360 min úteis',
          'Gerente de Relacionamento: ponto focal, motiva, resolve',
          'Ajustes de plano sob demanda, retorno até 12h úteis',
          'Plano de contingência de rotina (viagem, hotel, agenda imprevisível)'
        ],
        addons: [
          'Pacote de calls com João Scar (1 inicial + 3 bimestrais)',
          'ScarBox (caixa física) como upgrade',
          'Dependente com 30% OFF + matrícula isenta'
        ],
        highlight: 'Melhor custo-benefício para transformações duradouras',
        ctaText: 'Escolher Legacy'
      },
      {
        id: 'PRIVATE',
        name: 'PRIVATE',
        subtitle: 'Experiência completa - 12 meses',
        duration: '12 meses',
        icon: <Users className="w-8 h-8" />,
        color: 'from-blue-500 to-blue-600',
        price: {
          full: 'R$ 3.290',
          description: 'à vista R$ 3.290 • ou 12x ~R$274/mês (gateway)',
          installments: 'Matrícula isenta'
        },
        target: 'Para quem quer acesso direto e decisões rápidas',
        features: [
          '1×1 com João Scar: 1 sessão inicial + 4 bimestrais (5 no total)',
          'WhatsApp ultra priorizado: respostas em 5-240 min úteis',
          'Ajustes no mesmo dia (janela rápida)',
          'ScarBox inclusa: carta + camisa DriveFit + Guia + balança bioimpedância',
          'Parcerias clínicas (SP-Moema, RJ, Curitiba) para check-up/endócrino/estéticos',
          'Plano de contingência de rotina premium'
        ],
        addons: [
          'Calls extras (packs) com João Scar',
          'Dependente com 50% OFF, matrícula isenta e 3 meses cortesia'
        ],
        highlight: 'Experiência premium com acesso direto ao fundador',
        ctaText: 'Quero o Private'
      }
    ];

    // Encontrar o índice do plano recomendado
    const recommendedPlanIndex = plans.findIndex(plan => plan.id === result.planoRecomendado);
    
    // Definir o plano inicial como o recomendado, se encontrado
    useEffect(() => {
      if (recommendedPlanIndex !== -1) {
        setCurrentPlanIndex(recommendedPlanIndex);
      }
    }, [recommendedPlanIndex]);

    const nextPlan = () => {
      setCurrentPlanIndex((prev) => (prev + 1) % plans.length);
    };

    const prevPlan = () => {
      setCurrentPlanIndex((prev) => (prev - 1 + plans.length) % plans.length);
    };

    const currentPlan = plans[currentPlanIndex];
    const isRecommended = currentPlan.id === result.planoRecomendado;
    
    const faqItems = [
      {
        question: "Quanto tempo dura o programa da ScarX?",
        answer: "Nosso programa é personalizado de acordo com seus objetivos. Geralmente varia de 3 a 12 meses, com acompanhamento contínuo até você alcançar seus resultados."
      },
      {
        question: "O meu peso é o desconto que vou receber?",
        answer: "Sim! Nosso sistema personalizado calcula um desconto baseado no seu perfil e objetivos únicos identificados no quiz."
      },
      {
        question: "Como funciona o teste de 21 dias?",
        answer: "Você tem 21 dias para experimentar nossa metodologia. Se não ficar satisfeito, devolvemos 100% do seu investimento."
      },
      {
        question: "Como faço a bioimpedância já que é tudo online?",
        answer: "Enviamos uma balança de bioimpedância profissional para sua casa, com tutorial completo de como usar corretamente."
      },
      {
        question: "Como funcionam os pedidos de exames?",
        answer: "Nossos médicos solicitam exames quando necessário, que podem ser feitos em laboratórios credenciados na sua cidade."
      },
      {
        question: "O plano inclui remédios para emagrecer?",
        answer: "Quando clinicamente indicado, nossos médicos podem prescrever medicamentos personalizados para seu caso específico."
      },
      {
        question: "Os médicos da ScarX prescrevem remédios para emagrecer?",
        answer: "Sim, temos médicos especialistas que avaliam cada caso individualmente e prescrevem quando necessário e seguro."
      },
      {
        question: "A quantas consultas tenho direito?",
        answer: "Consultas ilimitadas durante todo o programa, incluindo médico, nutricionista e educador físico."
      },
      {
        question: "Quais profissionais vão me acompanhar?",
        answer: "Uma equipe completa: médico especialista, nutricionista, educador físico e coach de emagrecimento."
      },
      {
        question: "Posso cancelar a qualquer momento?",
        answer: "Sim, você pode cancelar a qualquer momento. Temos uma política de cancelamento transparente e sem burocracia."
      },
      {
        question: "Por que a ScarX será diferente das minhas tentativas anteriores?",
        answer: "Nossa metodologia é 100% personalizada, baseada em ciência e com acompanhamento profissional contínuo adaptado ao seu perfil único."
      },
      {
        question: "A ScarX emite Nota Fiscal?",
        answer: "Sim, emitimos nota fiscal para todos os nossos serviços, garantindo total transparência e legalidade."
      },
      {
        question: "Como funciona o acompanhamento por WhatsApp?",
        answer: "Você terá acesso direto à equipe via WhatsApp para tirar dúvidas, receber orientações e acompanhar seu progresso diariamente."
      },
      {
        question: "Moro fora do Brasil. Posso fazer ScarX também?",
        answer: "Atualmente atendemos apenas no Brasil, mas estamos expandindo. Entre em contato para saber sobre disponibilidade na sua região."
      }
    ];

    const professionals = [
      {
        name: "João Scar",
        role: "Fundador & Coach",
        specialization: "Transformação Corporal",
        credentials: "Especialista em Emagrecimento",
        image: "/images/joaoscar.png",
        description: "Fundador da ScarX e especialista em transformação corporal. Já ajudou mais de 1200 pessoas a alcançarem seus objetivos de forma sustentável."
      },
      {
        name: "Gabriela",
        role: "Nutricionista",
        specialization: "Nutrição Comportamental",
        credentials: "CRN-3 45678",
        image: "/images/Gabriela.jpeg",
        description: "Especialista em nutrição comportamental e reeducação alimentar. Focada em criar hábitos sustentáveis para toda vida sem dietas restritivas."
      },
      {
        name: "Dr. Luiz",
        role: "Responsável Técnico",
        specialization: "Medicina",
        credentials: "CRM-SP 98765",
        image: "/images/Luiz.jpeg",
        description: "Responsável Técnico da ScarX, garantindo que todos os protocolos médicos sejam seguidos com excelência e segurança em cada transformação."
      }
    ];

    const beforeAfterCases = [
      {
        name: "Gabriel",
        weightLoss: "+17kg",
        image: "/images/gabrielantes.jpeg",
        imageAfter: "/images/gabrieldepois.jpeg",
        testimonial: "A ScarX mudou minha vida completamente. Ganhei 15kg de massa magra de forma saudável e hoje me sinto muito mais confiante e disposto. O acompanhamento foi fundamental!"
      },
      {
        name: "Peter",
        weightLoss: "-12kg", 
        image: "/images/peterantes.png",
        imageAfter: "/images/peterdepois.png",
        testimonial: "Nunca imaginei que conseguiria emagrecer de forma tão natural. O João Scar e a equipe fizeram toda a diferença na minha transformação."
      },
      {
        name: "Álvaro",
        weightLoss: "-26kg",
        image: "/images/alvaroantes.jpeg", 
        imageAfter: "/images/alvarodepois.jpeg",
        testimonial: "Com a metodologia da ScarX consegui não só emagrecer, mas também criar hábitos saudáveis que mantenho até hoje. Resultado incrível!"
      },
      {
        name: "Felipe",
        weightLoss: "+20kg",
        image: "/images/antes/felipeantes.jpeg",
        imageAfter: "/images/antes/felipedepois.jpeg", 
        testimonial: "A equipe da ScarX me deu todo suporte necessário. Ganhei 20kg de massa magra e muito mais saúde e autoestima. Recomendo para todos!"
      }
    ];

    return (
      <div className="min-h-screen bg-dark text-light">
        <div className="max-w-4xl mx-auto p-4 space-y-8">
          
          {/* Resultado Principal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl p-8 text-center border border-primary/30"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-light">
              Sua Análise Personalizada Está Pronta!
            </h2>
            <p className="text-lg text-light-muted mb-6">{result.analisePersonalizada}</p>
          </motion.div>

          {/* Seção dos Planos - Carrossel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-dark-accent rounded-2xl p-8 border border-neutral-800 shadow-lg"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-light mb-4">
                Escolha Seu Plano de Transformação
              </h3>
              <p className="text-light-muted">
                Com base na sua análise, recomendamos o plano ideal para seus objetivos
              </p>
            </div>

            {/* Carrossel dos Planos */}
            <div className="relative max-w-2xl mx-auto">
              {/* Botões de Navegação */}
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={prevPlan}
                  className="p-3 rounded-full bg-dark-lighter border border-neutral-700 hover:border-primary/50 transition-all duration-300 group"
                >
                  <ChevronLeft className="w-6 h-6 text-light-muted group-hover:text-primary" />
                </button>

                <div className="flex gap-2">
                  {plans.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPlanIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentPlanIndex 
                          ? 'bg-primary' 
                          : 'bg-neutral-700 hover:bg-neutral-600'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextPlan}
                  className="p-3 rounded-full bg-dark-lighter border border-neutral-700 hover:border-primary/50 transition-all duration-300 group"
                >
                  <ChevronRight className="w-6 h-6 text-light-muted group-hover:text-primary" />
                </button>
              </div>

              {/* Card do Plano Atual */}
              <motion.div
                key={currentPlanIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                {/* Badge de Recomendado */}
                {isRecommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-primary to-primary-dark text-dark px-6 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      PLANO RECOMENDADO
                      <Star className="w-4 h-4" />
                    </div>
                  </div>
                )}

                <div className={`relative overflow-hidden rounded-2xl border-2 ${
                  isRecommended 
                    ? 'border-primary shadow-2xl shadow-primary/20' 
                    : 'border-neutral-700'
                } bg-gradient-to-br from-dark-lighter to-dark-accent`}>
                  
                  {/* Header do Plano */}
                  <div className={`bg-gradient-to-r ${currentPlan.color} p-6 text-center`}>
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-white/20 rounded-full">
                        {currentPlan.icon}
                      </div>
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2">
                      {currentPlan.name}
                    </h4>
                    <p className="text-white/90 text-sm">
                      {currentPlan.subtitle}
                    </p>
                  </div>

                  {/* Conteúdo do Plano */}
                  <div className="p-6">
                    {/* Preço */}
                    <div className="text-center mb-6">
                      <div className="mb-4">
                        {discountAmount ? (
                          <>
                            {/* Preço "inflado" riscado (normal + desconto) */}
                            <div className="text-lg text-light-muted line-through mb-1">
                              {formatDiscountedPrice(currentPlan.price.full, discountAmount).original}
                            </div>
                            {/* Preço final (normal) */}
                            <div className="text-3xl font-bold text-primary mb-2">
                              {formatDiscountedPrice(currentPlan.price.full, discountAmount).discounted}
                            </div>
                            {/* Badge de economia */}
                            <div className="inline-block bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-bold mb-2">
                              Você economiza {formatDiscountedPrice(currentPlan.price.full, discountAmount).savings}
                            </div>
                          </>
                        ) : (
                          <div className="text-3xl font-bold text-primary mb-2">
                            {currentPlan.price.full}
                          </div>
                        )}
                        <div className="text-sm text-light-muted mb-1">
                          {discountAmount 
                            ? formatDiscountedDescription(
                                currentPlan.price.description, 
                                currentPlan.price.full, 
                                formatDiscountedPrice(currentPlan.price.full, discountAmount).original
                              )
                            : currentPlan.price.description
                          }
                        </div>
                        <div className="text-xs text-light-muted">
                          {currentPlan.price.installments}
                        </div>
                      </div>
                      <div className="text-sm text-light-muted mb-4">
                        <strong>Para quem:</strong> {currentPlan.target}
                      </div>
                      <p className="text-light-muted font-medium">
                        {currentPlan.highlight}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-3 mb-6">
                      <h5 className="text-sm font-bold text-primary uppercase tracking-wider">Entrega & SLAs:</h5>
                      {currentPlan.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-light-muted text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Add-ons */}
                    {currentPlan.addons && currentPlan.addons.length > 0 && (
                      <div className="space-y-3 mb-8">
                        <h5 className="text-sm font-bold text-amber-500 uppercase tracking-wider">Add-ons:</h5>
                        {currentPlan.addons.map((addon, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-light-muted text-sm">{addon}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* CTA Button */}
                    <div className="text-center">
                      <a
                        href={`https://wa.me/5541984961012?text=Olá! Completei o quiz da ScarX e gostaria de saber mais sobre o plano ${currentPlan.name}. ${discountAmount ? `Consegui um desconto de R$ ${discountAmount},00! ` : ''}Pode me ajudar?`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full inline-flex items-center justify-center gap-3 py-5 px-8 rounded-2xl font-bold transition-all duration-500 transform relative overflow-hidden group ${
                          currentPlan.id === 'ESSENTIAL'
                            ? 'bg-gradient-to-r from-neutral-800 via-neutral-900 to-black text-white hover:from-neutral-700 hover:via-neutral-800 hover:to-neutral-900 hover:scale-[1.02] shadow-2xl shadow-neutral-900/50 hover:shadow-neutral-700/60 border-2 border-neutral-600/50'
                            : currentPlan.id === 'LEGACY'
                              ? 'bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 text-white hover:from-slate-600 hover:via-slate-700 hover:to-slate-800 hover:scale-[1.02] shadow-2xl shadow-slate-900/60 hover:shadow-slate-700/70 border-2 border-slate-500/50'
                              : 'bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 text-white hover:from-blue-400 hover:via-blue-500 hover:to-purple-500 hover:scale-[1.02] shadow-2xl shadow-blue-500/30 hover:shadow-blue-400/40 border-2 border-blue-300/50'
                        }`}
                      >
                        {/* Efeito de brilho animado */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        
                        {/* Efeito de pulso para plano recomendado */}
                        {isRecommended && (
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-emerald-600/20 rounded-2xl animate-pulse"></div>
                        )}
                        
                        <div className="relative flex items-center gap-3 z-10">
                          <span className="text-lg font-extrabold tracking-wide">{currentPlan.ctaText}</span>
                          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Seção de Profissionais */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-dark-accent rounded-2xl p-8 border border-neutral-800 shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-6 text-center text-light">
              Com base no seu objetivo, selecionamos a melhor equipe para você!
            </h3>
            
            <div className="space-y-6">
              {professionals.map((prof, index) => (
                                <div key={index} className="border border-neutral-700 rounded-xl p-6 bg-dark-lighter">
                  <div className="flex items-start gap-4">
                    <img 
                      src={prof.image} 
                      alt={prof.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                          {prof.role}
                        </span>
        </div>
                      <h4 className="text-xl font-bold text-light mb-1">{prof.name}</h4>
                      <p className="text-light-muted text-sm mb-3">{prof.credentials}</p>
                      <p className="text-light-muted leading-relaxed">{prof.description}</p>
                    </div>
                  </div>
                </div>
              ))}
        </div>
        </motion.div>

          {/* Seção Antes e Depois */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-dark-accent rounded-2xl p-8 border border-neutral-800 shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-6 text-center text-light">
              Transformações Reais de Nossos Clientes
            </h3>
            
            <div className="space-y-8">
              {beforeAfterCases.map((client, index) => (
                                <div key={index} className="border border-neutral-700 rounded-xl p-6 bg-dark-lighter">
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="flex gap-4">
                          <div className="text-center">
                            <img 
                              src={client.image} 
                              alt={`${client.name} antes`}
                              className="w-32 h-32 rounded-xl object-cover"
                            />
                            <p className="text-sm text-light-muted mt-2">antes</p>
      </div>
                          <div className="text-center">
                            <img 
                              src={client.imageAfter} 
                              alt={`${client.name} depois`}
                              className="w-32 h-32 rounded-xl object-cover"
                            />
                            <p className="text-sm text-light-muted mt-2">depois</p>
                          </div>
                        </div>
                        <div className="absolute -top-2 -right-2 bg-primary text-dark px-3 py-1 rounded-full text-sm font-bold">
                          {client.weightLoss}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h4 className="text-xl font-bold text-light mb-3">{client.name}</h4>
                      <p className="text-light-muted leading-relaxed italic">"{client.testimonial}"</p>
                      <div className="mt-4">
                        <span className="bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium">
                          Peso: {client.weightLoss}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-dark-accent rounded-2xl p-8 border border-neutral-800 shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-6 text-center text-light">
              Perguntas frequentes
            </h3>
            
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="border-b border-neutral-700 pb-4">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full text-left flex justify-between items-center py-2 text-light hover:text-primary transition-colors"
                  >
                    <span className="font-medium text-lg">{item.question}</span>
                    <motion.div
                      animate={{ rotate: openFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="w-5 h-5 transform rotate-90" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-3 text-light-muted leading-relaxed"
                      >
                        {item.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
        </div>
              ))}
        </div>
          </motion.div>

          {/* CTA Final */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center pb-8"
          >
                    <Link
              to="/experiencia"
              className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 hover:from-blue-400 hover:via-blue-500 hover:to-purple-500 text-white font-extrabold py-5 px-14 rounded-2xl text-lg hover:scale-[1.02] transition-all duration-500 shadow-2xl shadow-blue-500/30 hover:shadow-blue-400/50 inline-flex items-center gap-4 border-2 border-blue-300/50 relative overflow-hidden group transform"
            >
              {/* Efeito de brilho animado */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative flex items-center gap-4 z-10">
                <span className="tracking-wide">Ver experiência</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>
            <p className="text-sm text-light-muted mt-4 flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" />
              Cancele sem complicações
            </p>
    </motion.div>
      </div>
      </div>
  );
  };

  // Componente da Experiência ScarX
  const ExperienceSection: React.FC<{ result?: AnaliseIA; discount?: number | null }> = ({ result, discount }) => {
    const steps = [
      {
        id: 1,
        animationData: etapa1Animation,
        image: '/metodologia/ARTE 1.png',
        frames: ['/metodologia/frame1-arte1.png', '/metodologia/frame2-arte1.png'],
        content: {
          title: "Análise Profunda",
          subtitle: "Avaliação completa do seu perfil físico, rotina e objetivos. Dados precisos para criar um plano único e eficaz.",
          features: [
            "Bioimpedância profissional",
            "Análise de rotina personalizada", 
            "Definição de metas claras"
          ]
        }
      },
      {
        id: 2,
        animationData: etapa2Animation,
        image: '/metodologia/ARTE 2.png',
        frames: ['/metodologia/frame1-arte2.png', '/metodologia/frame2-arte2.png'],
        content: {
          title: "Protocolo Personalizado",
          subtitle: "Treinos e nutrição 100% adaptados ao seu biotipo e estilo de vida. Estratégico, eficaz e sustentável.",
          features: [
            "Treinos sob medida",
            "Plano nutricional flexível",
            "Suplementação estratégica"
          ]
        }
      },
      {
        id: 3,
        animationData: etapa3Animation,
        image: '/metodologia/ARTE 3.png',
        frames: [],
        content: {
          title: "Acompanhamento Diário",
          subtitle: "Suporte contínuo da equipe multidisciplinar via WhatsApp. Ajustes em tempo real para garantir sua evolução.",
          features: [
            "Suporte 24/7",
            "Ajustes em tempo real",
            "Motivação constante"
          ]
        }
      },
      {
        id: 4,
        animationData: etapa4Animation,
        image: '/metodologia/ARTE 4.png',
        frames: ['/metodologia/frame1-arte4.png'],
        content: {
          title: "Evolução Constante",
          subtitle: "Monitoramento de resultados e otimização contínua. Transformações duradouras que se mantêm para sempre.",
          features: [
            "Métricas precisas",
            "Ajustes estratégicos",
            "Resultados sustentáveis"
          ]
        }
      }
    ];

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delayChildren: 0.2,
          staggerChildren: 0.3,
        },
      },
    };

    const itemVariants = {
      hidden: { y: 50, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" },
      },
    };

    // Variantes para bolhas de chat (estilo BetterMeTeam)
    const chatBubbleVariants = {
      hidden: { opacity: 0, y: 10, scale: 0.98 },
      show: { opacity: 1, y: 0, scale: 1 },
    };

    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-6xl mx-auto px-4 py-12"
      >
        {/* Main Title */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-light max-w-4xl mx-auto leading-tight">
            Agora que já nos conhecemos, veja como sua vida irá mudar nas próximas 48 horas
          </h2>
          <p className="text-lg text-light-muted max-w-2xl mx-auto">
            Conheça o processo completo da metodologia ScarX que vai transformar sua vida
          </p>
        </motion.div>

                

        {/* Steps */}
        <div className="space-y-20">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              variants={itemVariants}
              className="group"
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="mb-6">
                    <div className="inline-block text-sm font-medium text-dark bg-primary px-4 py-2 rounded-lg">
                      Etapa {step.id}
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-light mb-4">
                    {step.content.title}
                  </h3>

                  <p className="text-lg text-light-muted mb-6 leading-relaxed">
                    {step.content.subtitle}
                  </p>

                  {/* Features */}
                  <div className="mb-8">
                    <ul className="space-y-3">
                      {step.content.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-light-muted">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

                {/* Animation */}
                <div className={`flex items-center justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="w-full max-w-3xl">
                    <div className="rounded-2xl">
                      <div className="relative rounded-xl overflow-hidden">
                        {step.image ? (
                          <img
                            src={step.image}
                            alt={`Etapa ${step.id}`}
                            className="w-full h-auto"
                          />
                        ) : (
                          <Lottie
                            animationData={step.animationData}
                            className="w-full h-auto aspect-square"
                          />
                        )}

                        {/* Chat bubbles na Etapa 3 (estilo "Encontre sua equipe perfeita") */}
                        {step.id === 3 && (
                          <>
                            {/* Balão azul (superior direita) */}
                            <motion.div
                              variants={chatBubbleVariants}
                              initial="hidden"
                              whileInView="show"
                              viewport={{ once: true, amount: 0.6 }}
                              transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.15 }}
                              animate={{ y: [0, -3, 0], transition: { repeat: Infinity, repeatType: 'mirror', duration: 5, ease: 'easeInOut', delay: 1 } }}
                              className="absolute right-6 md:right-10 top-[45%] md:top-[72%] max-w-sm rounded-2xl px-4 py-3 text-sm bg-[#3498DB] text-white shadow-xl"
                            >
                              Preciso de ajuda com a rotina desta semana.
                              <span className="absolute -right-3 bottom-4 w-3 h-3 bg-[#3498DB] rounded-full"></span>
                            </motion.div>
                            {/* Balão branco (inferior esquerda) */}
                            <motion.div
                              variants={chatBubbleVariants}
                              initial="hidden"
                              whileInView="show"
                              viewport={{ once: true, amount: 0.6 }}
                              transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.35 }}
                              animate={{ y: [0, -2, 0], transition: { repeat: Infinity, repeatType: 'mirror', duration: 6, ease: 'easeInOut', delay: 1.2 } }}
                              className="absolute left-6 md:left-10 bottom-[15%] md:bottom-[8%] max-w-md rounded-2xl px-4 py-3 text-sm bg-white text-dark shadow-xl"
                            >
                              Vamos ajustar treinos e refeições para caber no seu tempo. 👌
                              <span className="absolute -left-3 bottom-4 w-3 h-3 bg-white rounded-full border border-neutral-200"></span>
                            </motion.div>
                          </>
                        )}

                        {/* Frames overlays com animação (in-view) */}
                        {/* Etapa 4: overlay centralizado com flex */}
                        {step.id === 4 && step.frames && step.frames[0] && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.6 }}
                            transition={{ duration: 0.7, ease: 'easeOut' }}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            <img
                              src={step.frames[0]}
                              alt="frame central"
                              className="w-3/4 max-w-[520px] drop-shadow-[0_10px_25px_rgba(0,0,0,0.35)] pointer-events-none select-none"
                            />
                          </motion.div>
                        )}

                        {/* Demais etapas: frames nos cantos com animação ao entrar na viewport */}
                        {step.id !== 4 && step.frames && step.frames[0] && (
                          step.id === 1 ? (
                            <motion.img
                              src={step.frames[0]}
                              alt="frame 1"
                              initial={{ opacity: 0, y: -20, scale: 0.9, rotate: -4 }}
                              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
                              className="absolute top-4 left-4 w-1/2 max-w-[360px] drop-shadow-[0_10px_25px_rgba(0,0,0,0.35)] pointer-events-none select-none"
                            />
                          ) : (
                            <motion.img
                              src={step.frames[0]}
                              alt="frame 1"
                              initial={{ opacity: 0, y: -20, scale: 0.9, rotate: -4 }}
                              whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                              viewport={{ once: true, amount: 0.6 }}
                              transition={{ duration: 0.6, ease: 'easeOut' }}
                              className="absolute top-4 left-4 w-1/2 max-w-[360px] drop-shadow-[0_10px_25px_rgba(0,0,0,0.35)] pointer-events-none select-none"
                            />
                          )
                        )}
                        {step.id !== 4 && step.frames && step.frames[1] && (
                          step.id === 1 ? (
                            <motion.img
                              src={step.frames[1]} 
                              alt="frame 2"
                              initial={{ opacity: 0, y: 20, scale: 0.9, rotate: 4 }}
                              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.22 }}
                              className="absolute bottom-4 right-4 w-1/2 max-w-[360px] drop-shadow-[0_10px_25px_rgba(0,0,0,0.35)] pointer-events-none select-none"
                            />
                          ) : (
                            <motion.img
                              src={step.frames[1]} 
                              alt="frame 2"
                              initial={{ opacity: 0, y: 20, scale: 0.9, rotate: 4 }}
                              whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                              viewport={{ once: true, amount: 0.6 }}
                              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.12 }}
                              className="absolute bottom-4 right-4 w-1/2 max-w-[360px] drop-shadow-[0_10px_25px_rgba(0,0,0,0.35)] pointer-events-none select-none"
                            />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Separator */}
              {index < steps.length - 1 && (
                <div className="mt-20 mb-8">
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent"></div>
        </div>
      )}
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div variants={itemVariants} className="text-center pt-12">
          <div className="bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-light mb-4">
              Pronto para começar sua transformação?
            </h3>
            <p className="text-light-muted mb-6">
              Junte-se a milhares de pessoas que já transformaram suas vidas com a metodologia ScarX
            </p>
            <a
              href={`https://wa.me/5541984961012?text=Olá! Vi a experiência ScarX e quero começar minha transformação. ${result ? `Meu plano recomendado é o ${result.planoRecomendado}. ` : ''}${discount ? `Consegui um desconto de R$ ${discount},00 no quiz e ` : ''}Pode me ajudar?`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 hover:from-emerald-300 hover:via-emerald-400 hover:to-emerald-500 text-white font-extrabold py-5 px-16 rounded-2xl text-xl hover:scale-[1.02] transition-all duration-500 shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-400/50 inline-flex items-center gap-4 border-2 border-emerald-300/50 relative overflow-hidden group transform"
            >
              {/* Efeito de brilho animado */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              {/* Efeito de pulso */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-emerald-600/20 rounded-2xl animate-pulse"></div>
              
              <div className="relative flex items-center gap-4 z-10">
                <span className="tracking-wide">Começar Agora</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </a>
      </div>
        </motion.div>
    </motion.div>
  );
  };

    // Se for apenas experiência, renderizar só a experiência
  if (experienceOnly) {
    // Tentar recuperar dados do localStorage
    const savedResult = localStorage.getItem('quizResult');
    const savedDiscount = localStorage.getItem('discountAmount');
    const result = savedResult ? JSON.parse(savedResult) : null;
    const discount = savedDiscount ? parseInt(savedDiscount) : null;
    


  return (
      <div className="min-h-screen bg-dark text-light">
        <WhatsAppButton />
        
        {/* Header */}
        <div className="relative z-50 py-6">
          <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
            <Link
              to="/quiz"
              className="inline-flex items-center text-light-muted hover:text-light transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar ao Quiz
            </Link>
            <div className="flex items-center">
              <img 
                src="/images/scarx.png" 
                alt="ScarX Logo" 
                className="h-20 md:h-24 object-contain"
              />
            </div>
            <div className="w-28"></div> {/* Spacer */}
          </div>
        </div>

        <ExperienceSection result={result} discount={discount} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark text-light relative overflow-hidden">
      <WhatsAppButton />

      {/* Loading Screen Overlay */}
      <AnimatePresence>
        {isLoading && <LoadingScreen message={loadingMessage} curiosity={loadingCuriosity} />}
      </AnimatePresence>



      {/* Discount Unlock Screen Overlay */}
      <AnimatePresence>
        {showDiscountUnlock && discountAmount && (
          <DiscountUnlockScreen
            discount={discountAmount}
            onClose={() => {
              setShowDiscountUnlock(false);
              setCurrentStep(prev => prev + 1);
            }}
          />
        )}
      </AnimatePresence>

      {/* Header with Logo and Discount */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center text-light-muted hover:text-primary transition-all duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar ao Início
          </Link>



          {/* Logo ScarX */}
          <div className="flex justify-center flex-grow">
            <img
              src="/images/scarx.png"
              alt="ScarX"
              className="h-20 md:h-24 object-contain"
            />
          </div>

          <div className="w-24"></div>
        </div>
      </div>



      {/* Progress Bar */}
      <div className="container mx-auto px-4 mb-8">
        <div className="max-w-2xl mx-auto">
          
              
                                              {/* Discount Display */}
                {discountAmount && (
                  <div className="mb-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-gradient-to-r from-primary to-primary-dark text-dark px-4 py-2 rounded-lg text-sm font-bold shadow-lg inline-flex items-center gap-1"
                    >
                      <Star className="w-4 h-4" />
                      R$ {discountAmount},00 OFF
                    </motion.div>
                  </div>
                )}
           
            <div className="w-full bg-neutral-800 rounded-full h-5 shadow-inner relative overflow-hidden">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary-dark/10 rounded-full" />
            
            {/* Progress bar com efeito de brilho */}
            <motion.div
              className="relative bg-gradient-to-r from-primary via-primary-light to-primary-dark h-5 rounded-full shadow-lg overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {/* Efeito de brilho deslizante */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform animate-pulse" />
            </motion.div>
            
            {/* Marcos visuais de progresso */}
            {[25, 50, 75].map((percent, index) => {
              const isReached = ((currentStep + 1) / totalSteps) * 100 >= percent;
              return (
                <motion.div 
                  key={percent}
                  className={`absolute z-10 top-1/2 transform -translate-y-1/2 -translate-x-1/2 -mt-[2px] w-3 h-3 rounded-full border-2 transition-all duration-500 ${
                    isReached 
                      ? 'bg-white border-primary shadow-lg shadow-primary/30' 
                      : 'bg-neutral-600 border-neutral-500'
                  }`}
                  style={{ left: `${percent}%` }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
                />
              );
            })}
            
          </div>


        </div>
      </div>

      {/* Quiz Content */}
      <section className="py-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait" initial={false}>
              {showFinalResult && quizResult ? (
                <FinalResultScreen key="finalResult" result={quizResult} />
              ) : (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: direction * 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -50 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="bg-gradient-to-br from-dark-accent to-dark-lighter rounded-2xl p-6 md:p-8 shadow-2xl border border-neutral-700/50 backdrop-blur-sm relative overflow-hidden"
                >
                  {/* Background decorative elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-xl" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/20 rounded-lg">
                          <Brain className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                      <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                            Quiz ScarX
                      </span>
                          <p className="text-light-muted text-xs">
                            Análise Personalizada
                          </p>
                        </div>
                    </div>

                    </div>
                  </div>

                  {/* Question Content */}
                  <div className="relative z-10 mb-8">
                  <div className="mb-8">

                      <h2 className="text-2xl md:text-3xl font-bold text-light leading-tight mb-6">
                      {currentQuestion?.question}
                    </h2>
                    </div>
                    
                    <div className="space-y-1">
                    {renderQuestionContent()}
                    </div>
                    

                  </div>



                  {/* Navigation Buttons */}
                  <div className="relative z-10 flex justify-between items-center mt-6 pt-6 border-t border-neutral-700/50">
                    <button
                      onClick={handlePrev}
                      disabled={currentStep === 0}
                      className="group flex items-center gap-2 px-6 py-3 rounded-xl border border-neutral-600 text-light-muted hover:text-primary hover:border-primary/50 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed bg-dark-lighter/50"
                    >
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                      Anterior
                    </button>

                    <button
                      onClick={handleNext}
                      disabled={!isCurrentQuestionAnswered() || isSubmittingOpenAI}
                      className="bg-gradient-to-r from-primary to-primary-dark text-dark font-bold py-3 px-8 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 relative overflow-hidden"
                    >
                      {/* Efeito de brilho no botão */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      
                      {currentStep === totalSteps - 1 ? (
                        isSubmittingOpenAI ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Finalizando...
                          </>
                        ) : (
                          <>
                            <Brain className="w-5 h-5" />
                            Finalizar Quiz
                            <Sparkles className="w-5 h-5" />
                          </>
                        )
                      ) : (
                        <>
                          Próximo
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>


    </div>
  );
};

export default QuizPage;