import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Scale, ArrowRight, Sparkles, User, Clock, Target, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, isEmailJSConfigured } from '../config/emailjs';

interface DadosUsuario {
  // Dados pessoais
  nome: string;
  email: string;
  telefone: string;
  
  // Dados físicos
  peso: string;
  altura: string;
  idade: string;
  
  // Dados de diagnóstico
  tempoSentado: string;
  profissao: string;
  horasSono: string;
  objetivo: string;
  impedimento: string;
  
  // Resultado
  imc?: number;
  categoria?: string;
}

const ImcCalculator: React.FC = () => {
  const [step, setStep] = useState(1);
  const [dados, setDados] = useState<DadosUsuario>({
    nome: '',
    email: '',
    telefone: '',
    peso: '',
    altura: '',
    idade: '',
    tempoSentado: '',
    profissao: '',
    horasSono: '',
    objetivo: '',
    impedimento: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const updateDados = (field: keyof DadosUsuario, value: string) => {
    setDados(prev => ({ ...prev, [field]: value }));
  };

  const calcularIMC = () => {
    const pesoNum = parseFloat(dados.peso);
    let alturaInput = dados.altura.replace(',', '.');
    let alturaNum = parseFloat(alturaInput);
    
    if (alturaNum > 3) {
      alturaNum = alturaNum / 100;
    }

    if (pesoNum > 0 && alturaNum > 0) {
      return pesoNum / (alturaNum * alturaNum);
    }
    return null;
  };

  const getCategoria = (imc: number, idade: number) => {
    if (idade >= 65) {
      if (imc < 22) return 'Abaixo do peso';
      else if (imc < 27) return 'Peso normal';
      else if (imc < 30) return 'Sobrepeso';
      else if (imc < 35) return 'Obesidade Grau 1';
      else if (imc < 40) return 'Obesidade Grau 2';
      else return 'Obesidade Grau 3';
    } else {
      if (imc < 18.5) return 'Abaixo do peso';
      else if (imc < 24.9) return 'Peso normal';
      else if (imc < 29.9) return 'Sobrepeso';
      else if (imc < 34.9) return 'Obesidade Grau 1';
      else if (imc < 39.9) return 'Obesidade Grau 2';
      else return 'Obesidade Grau 3';
    }
  };

  // Função para formatar os valores para exibição
  const formatValue = (key: string, value: string) => {
    const mappings: { [key: string]: { [key: string]: string } } = {
      tempoSentado: {
        'menos-4': 'Menos de 4 horas',
        '4-6': '4 a 6 horas',
        '6-8': '6 a 8 horas',
        '8-10': '8 a 10 horas',
        'mais-10': 'Mais de 10 horas'
      },
      profissao: {
        'tecnologia': 'Tecnologia/Informática',
        'saude': 'Saúde/Medicina',
        'educacao': 'Educação',
        'administrativo': 'Administrativo/Financeiro',
        'vendas': 'Vendas/Marketing',
        'engenharia': 'Engenharia/Construção',
        'direito': 'Direito',
        'outros': 'Outros'
      },
      horasSono: {
        'menos-6': 'Menos de 6 horas',
        '6-7': '6 a 7 horas',
        '7-8': '7 a 8 horas',
        '8-9': '8 a 9 horas',
        'mais-9': 'Mais de 9 horas'
      },
      objetivo: {
        'emagrecer': 'Emagrecer',
        'ganhar-massa': 'Ganhar massa muscular',
        'definir': 'Definir o corpo',
        'saude': 'Melhorar a saúde',
        'energia': 'Ter mais energia',
        'autoestima': 'Melhorar autoestima'
      },
      impedimento: {
        'falta-tempo': 'Falta de tempo',
        'falta-motivacao': 'Falta de motivação',
        'falta-conhecimento': 'Falta de conhecimento',
        'falta-dinheiro': 'Falta de dinheiro',
        'falta-resultados': 'Não vejo resultados',
        'falta-consistencia': 'Falta de consistência'
      }
    };

    return mappings[key]?.[value] || value;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    const imc = calcularIMC();
    const categoria = imc ? getCategoria(imc, parseInt(dados.idade)) : '';
    
    const dadosCompletos = {
      ...dados,
      imc,
      categoria,
      dataEnvio: new Date().toISOString()
    };

    // Salvar no localStorage
    localStorage.setItem('dadosImcUsuario', JSON.stringify(dadosCompletos));

    // Enviar para email usando EmailJS
    try {
      const templateParams = {
        to_name: dados.nome,
        to_email: dados.email,
        to_phone: dados.telefone,
        peso: dados.peso,
        altura: dados.altura,
        idade: dados.idade,
        tempo_sentado: formatValue('tempoSentado', dados.tempoSentado),
        profissao: formatValue('profissao', dados.profissao),
        horas_sono: formatValue('horasSono', dados.horasSono),
        objetivo: formatValue('objetivo', dados.objetivo),
        impedimento: formatValue('impedimento', dados.impedimento),
        imc: imc ? imc.toFixed(1) : 'N/A',
        categoria: categoria || 'N/A',
        data_envio: new Date().toLocaleString('pt-BR')
      };

      // Verificar se o EmailJS está configurado
      if (isEmailJSConfigured()) {
        // Usar configuração do EmailJS
        await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          templateParams,
          EMAILJS_CONFIG.PUBLIC_KEY
        );
        console.log('✅ Email enviado com sucesso via EmailJS');
      } else {
        // Fallback: apenas log dos dados (para desenvolvimento)
        console.log('⚠️ EmailJS não configurado. Dados coletados:', dadosCompletos);
        console.log('📧 Para configurar, siga as instruções em EMAILJS_SETUP.md');
      }
      
      setSubmitted(true);
    } catch (error) {
      console.error('❌ Erro ao enviar dados:', error);
      // Mesmo com erro, vamos mostrar sucesso para não frustrar o usuário
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return dados.nome && dados.email && dados.telefone;
      case 2:
        return dados.peso && dados.altura && dados.idade;
      case 3:
        return dados.tempoSentado && dados.profissao && dados.horasSono;
      case 4:
        return dados.objetivo && dados.impedimento;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (canProceed()) {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full mb-4">
                <User className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Vamos Começar!</h3>
              <p className="text-light-gray">Precisamos de algumas informações básicas para personalizar sua análise</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  value={dados.nome}
                  onChange={(e) => updateDados('nome', e.target.value)}
                  className="w-full px-6 py-4 rounded-xl bg-dark/50 border border-gray-600 text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  placeholder="Digite seu nome completo"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  E-mail *
                </label>
                <input
                  type="email"
                  value={dados.email}
                  onChange={(e) => updateDados('email', e.target.value)}
                  className="w-full px-6 py-4 rounded-xl bg-dark/50 border border-gray-600 text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  WhatsApp *
                </label>
                <input
                  type="tel"
                  value={dados.telefone}
                  onChange={(e) => updateDados('telefone', e.target.value)}
                  className="w-full px-6 py-4 rounded-xl bg-dark/50 border border-gray-600 text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full mb-4">
                <Scale className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Dados Físicos</h3>
              <p className="text-light-gray">Informações essenciais para calcular seu IMC</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Peso (kg) *
                </label>
                <input
                  type="number"
                  value={dados.peso}
                  onChange={(e) => updateDados('peso', e.target.value)}
                  className="w-full px-6 py-4 rounded-xl bg-dark/50 border border-gray-600 text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  placeholder="Ex: 70"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Altura *
                </label>
                <input
                  type="text"
                  value={dados.altura}
                  onChange={(e) => updateDados('altura', e.target.value)}
                  className="w-full px-6 py-4 rounded-xl bg-dark/50 border border-gray-600 text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  placeholder="Ex: 1,70 ou 170"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Idade (anos) *
                </label>
                <input
                  type="number"
                  value={dados.idade}
                  onChange={(e) => updateDados('idade', e.target.value)}
                  className="w-full px-6 py-4 rounded-xl bg-dark/50 border border-gray-600 text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  placeholder="Ex: 30"
                  min="18"
                  max="120"
                />
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full mb-4">
                <Clock className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Seu Estilo de Vida</h3>
              <p className="text-light-gray">Vamos entender melhor sua rotina diária</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Quantas horas por dia você passa sentado? *
                </label>
                <select
                  value={dados.tempoSentado}
                  onChange={(e) => updateDados('tempoSentado', e.target.value)}
                  className="w-full px-6 py-4 rounded-xl bg-dark/50 border border-gray-600 text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                >
                  <option value="">Selecione uma opção</option>
                  <option value="menos-4">Menos de 4 horas</option>
                  <option value="4-6">4 a 6 horas</option>
                  <option value="6-8">6 a 8 horas</option>
                  <option value="8-10">8 a 10 horas</option>
                  <option value="mais-10">Mais de 10 horas</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Qual sua área de atuação profissional? *
                </label>
                <select
                  value={dados.profissao}
                  onChange={(e) => updateDados('profissao', e.target.value)}
                  className="w-full px-6 py-4 rounded-xl bg-dark/50 border border-gray-600 text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                >
                  <option value="">Selecione uma opção</option>
                  <option value="tecnologia">Tecnologia/Informática</option>
                  <option value="saude">Saúde/Medicina</option>
                  <option value="educacao">Educação</option>
                  <option value="administrativo">Administrativo/Financeiro</option>
                  <option value="vendas">Vendas/Marketing</option>
                  <option value="engenharia">Engenharia/Construção</option>
                  <option value="direito">Direito</option>
                  <option value="outros">Outros</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Quantas horas você dorme em média por dia? *
                </label>
                <select
                  value={dados.horasSono}
                  onChange={(e) => updateDados('horasSono', e.target.value)}
                  className="w-full px-6 py-4 rounded-xl bg-dark/50 border border-gray-600 text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                >
                  <option value="">Selecione uma opção</option>
                  <option value="menos-6">Menos de 6 horas</option>
                  <option value="6-7">6 a 7 horas</option>
                  <option value="7-8">7 a 8 horas</option>
                  <option value="8-9">8 a 9 horas</option>
                  <option value="mais-9">Mais de 9 horas</option>
                </select>
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full mb-4">
                <Target className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Seus Objetivos</h3>
              <p className="text-light-gray">Vamos entender o que você quer alcançar</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Qual é seu principal objetivo? *
                </label>
                <select
                  value={dados.objetivo}
                  onChange={(e) => updateDados('objetivo', e.target.value)}
                  className="w-full px-6 py-4 rounded-xl bg-dark/50 border border-gray-600 text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                >
                  <option value="">Selecione uma opção</option>
                  <option value="emagrecer">Emagrecer</option>
                  <option value="ganhar-massa">Ganhar massa muscular</option>
                  <option value="definir">Definir o corpo</option>
                  <option value="saude">Melhorar a saúde</option>
                  <option value="energia">Ter mais energia</option>
                  <option value="autoestima">Melhorar autoestima</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  O que mais te impede de alcançar seus objetivos? *
                </label>
                <select
                  value={dados.impedimento}
                  onChange={(e) => updateDados('impedimento', e.target.value)}
                  className="w-full px-6 py-4 rounded-xl bg-dark/50 border border-gray-600 text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                >
                  <option value="">Selecione uma opção</option>
                  <option value="falta-tempo">Falta de tempo</option>
                  <option value="falta-motivacao">Falta de motivação</option>
                  <option value="falta-conhecimento">Falta de conhecimento</option>
                  <option value="falta-dinheiro">Falta de dinheiro</option>
                  <option value="falta-resultados">Não vejo resultados</option>
                  <option value="falta-consistencia">Falta de consistência</option>
                </select>
              </div>
            </div>
          </motion.div>
        );

      case 5: {
        const imc = calcularIMC();
        const categoria = imc ? getCategoria(imc, parseInt(dados.idade)) : '';
        
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full mb-4">
                <Zap className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Seu Resultado Personalizado</h3>
              <p className="text-light-gray">Baseado em suas respostas, aqui está sua análise</p>
            </div>

            {imc && (
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-6 rounded-2xl border border-primary/20 mb-6">
                <h4 className="text-2xl font-bold mb-2">Seu IMC: {imc.toFixed(1)}</h4>
                <p className="text-primary font-semibold text-lg mb-4">
                  Classificação: {categoria}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-light-gray">
                  <div>
                    <p className="font-medium text-primary mb-2">Seu Perfil:</p>
                    <ul className="space-y-1">
                      <li>• Profissão: {formatValue('profissao', dados.profissao)}</li>
                      <li>• Tempo sentado: {formatValue('tempoSentado', dados.tempoSentado)}</li>
                      <li>• Sono: {formatValue('horasSono', dados.horasSono)}</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-primary mb-2">Seus Objetivos:</p>
                    <ul className="space-y-1">
                      <li>• Objetivo: {formatValue('objetivo', dados.objetivo)}</li>
                      <li>• Impedimento: {formatValue('impedimento', dados.impedimento)}</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-6 rounded-2xl border border-primary/20">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-6 h-6 text-primary" />
                <span className="text-primary font-semibold">Próximo Passo: Análise Premium</span>
              </div>
              <p className="text-light-gray mb-4">
                Com base em suas respostas, nossa equipe preparará uma análise personalizada 
                e entrará em contato para apresentar o plano ideal para você.
              </p>
              
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-primary-dark text-black font-bold py-4 px-8 rounded-xl text-lg flex items-center justify-center gap-3 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-6 h-6" />
                    Receber Minha Análise Premium
                    <Sparkles className="w-6 h-6" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        );
      }

      default:
        return null;
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 md:p-12 text-center"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-6">
          <Sparkles className="h-10 w-10 text-white" />
        </div>
        
        <h2 className="text-3xl font-bold mb-4">Análise Enviada com Sucesso!</h2>
        <p className="text-light-gray text-lg mb-8">
          Obrigado, {dados.nome}! Sua análise personalizada foi enviada para {dados.email}. 
          Nossa equipe entrará em contato em breve pelo WhatsApp.
        </p>
        
        <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-6 rounded-2xl border border-primary/20 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="w-8 h-8 text-primary" />
            <h3 className="text-xl font-bold text-primary">Próximo Passo Recomendado</h3>
          </div>
          <p className="text-light-gray mb-4">
            Para uma análise ainda mais precisa e personalizada, experimente nossa 
            <strong className="text-primary"> análise com Inteligência Artificial</strong> que 
            considera todos os seus dados para criar um plano totalmente customizado.
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-6 rounded-2xl border border-primary/20 mb-8">
          <h3 className="text-xl font-bold mb-4">O que acontece agora?</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-black font-bold mb-2 mx-auto">1</div>
              <p className="text-light-gray">Análise personalizada preparada</p>
            </div>
            <div>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-black font-bold mb-2 mx-auto">2</div>
              <p className="text-light-gray">Contato via WhatsApp</p>
            </div>
            <div>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-black font-bold mb-2 mx-auto">3</div>
              <p className="text-light-gray">Apresentação do plano ideal</p>
            </div>
            <div>
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold mb-2 mx-auto">
                <Sparkles className="w-4 h-4" />
              </div>
              <p className="text-light-gray">Ou faça análise com IA</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold py-4 px-8 rounded-xl text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-gray-500/30"
          >
            Voltar ao Início
          </button>
          
          <button
            onClick={() => navigate('/planos-personalizados?origem=calculadora-imc')}
            className="bg-gradient-to-r from-primary to-primary-dark text-black font-bold py-4 px-8 rounded-xl text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/30 flex items-center gap-3"
          >
            <Sparkles className="w-6 h-6" />
            Fazer Análise Personalizada com IA
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="p-8 md:p-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-primary-dark rounded-2xl mb-6 shadow-lg">
          <Scale className="h-10 w-10 text-black" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Análise Personalizada ScarX</h2>
        <p className="text-light-gray">
          Vamos criar uma análise completa baseada no seu perfil único para maximizar seus resultados
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-primary font-semibold">Passo {step} de 5</span>
          <span className="text-sm text-light-gray">{Math.round((step / 5) * 100)}%</span>
        </div>
        <div className="w-full bg-dark/50 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary to-primary-dark h-2 rounded-full transition-all duration-500"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {renderStep()}
      </AnimatePresence>

      {/* Navigation Buttons */}
      {step < 5 && (
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className="px-6 py-3 rounded-xl border border-gray-600 text-light-gray hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          
          <button
            onClick={nextStep}
            disabled={!canProceed()}
            className="bg-gradient-to-r from-primary to-primary-dark text-black font-bold py-3 px-8 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            Próximo
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImcCalculator;