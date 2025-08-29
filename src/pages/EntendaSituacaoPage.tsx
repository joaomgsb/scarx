import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  ArrowLeft, 
  Calculator, 
  Target, 
  Droplets, 
  Activity,
  TrendingUp,
  Loader2,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Crown,
  Zap,
  Brain,
  Star,
  Shield
} from 'lucide-react';
import WhatsAppButton from '../components/WhatsAppButton';
import { analisarPerfilCompleto } from '../utils/openai';

interface FormData {
  peso: string;
  altura: string;
  idade: string;
  frequenciaTreino: string;
  tipoTreino: string;
  nivelExperiencia: string;
  objetivo: string;
}

interface ResultadosCalculados {
  imc: number;
  categoriaIMC: string;
  tmb: number;
  proteina: number;
  agua: number;
  analiseIA?: {
    analisePersonalizada: string;
    planoRecomendado: string;
    motivacao: string;
    desafios: string[];
    objetivos: string[];
  };
}

const EntendaSituacaoPage: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Scroll para o topo quando a página carrega
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    peso: '',
    altura: '',
    idade: '',
    frequenciaTreino: '',
    tipoTreino: '',
    nivelExperiencia: '',
    objetivo: ''
  });

  const [resultados, setResultados] = useState<ResultadosCalculados | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [etapa, setEtapa] = useState<'formulario' | 'resultados'>('formulario');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calcularIMC = (peso: number, altura: number) => {
    const imc = peso / (altura * altura);
    let categoria = '';
    
    if (imc < 18.5) categoria = 'Abaixo do peso';
    else if (imc < 24.9) categoria = 'Peso normal';
    else if (imc < 29.9) categoria = 'Sobrepeso';
    else if (imc < 34.9) categoria = 'Obesidade Grau 1';
    else if (imc < 39.9) categoria = 'Obesidade Grau 2';
    else categoria = 'Obesidade Grau 3';
    
    return { imc, categoria };
  };

  const calcularTMB = (peso: number, altura: number, idade: number = 30, sexo: string = 'masculino') => {
    // Fórmula Mifflin-St Jeor
    if (sexo === 'masculino') {
      return (10 * peso) + (6.25 * altura * 100) - (5 * idade) + 5;
    } else {
      return (10 * peso) + (6.25 * altura * 100) - (5 * idade) - 161;
    }
  };

  const calcularProteina = (peso: number, objetivo: string, nivelExperiencia: string) => {
    let multiplicador = 1.2; // Base
    
    // Ajuste por objetivo
    if (objetivo === 'hipertrofia') multiplicador = 2.2;
    else if (objetivo === 'emagrecer') multiplicador = 1.8;
    else if (objetivo === 'saude') multiplicador = 1.4;
    
    // Ajuste por nível
    if (nivelExperiencia === 'avancado') multiplicador += 0.2;
    else if (nivelExperiencia === 'intermediario') multiplicador += 0.1;
    
    return peso * multiplicador;
  };

  const calcularAgua = (peso: number, frequenciaTreino: string) => {
    let baseAgua = peso * 35; // 35ml por kg
    
    // Ajuste por frequência de treino
    const freq = parseInt(frequenciaTreino);
    if (freq >= 5) baseAgua += 500;
    else if (freq >= 3) baseAgua += 300;
    else if (freq >= 1) baseAgua += 200;
    
    return baseAgua;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);

    try {
      const peso = parseFloat(formData.peso);
      let altura = parseFloat(formData.altura.replace(',', '.'));
      const idade = parseInt(formData.idade);
      
      // Converter altura se estiver em centímetros
      if (altura > 3) altura = altura / 100;

      // Cálculos básicos
      const { imc, categoria } = calcularIMC(peso, altura);
      const tmb = calcularTMB(peso, altura, idade);
      const proteina = calcularProteina(peso, formData.objetivo, formData.nivelExperiencia);
      const agua = calcularAgua(peso, formData.frequenciaTreino);

      // Preparar dados para IA
      const dadosParaIA = {
        peso,
        altura,
        idade,
        imc,
        categoria,
        frequenciaTreino: formData.frequenciaTreino,
        tipoTreino: formData.tipoTreino,
        nivelExperiencia: formData.nivelExperiencia,
        objetivo: formData.objetivo
      };

      // Gerar análise com IA
      const analiseIA = await analisarPerfilCompleto(dadosParaIA);

      const resultadosCalculados: ResultadosCalculados = {
        imc,
        categoriaIMC: categoria,
        tmb,
        proteina,
        agua,
        analiseIA
      };

      setResultados(resultadosCalculados);
      setEtapa('resultados');

      // Salvar no localStorage para usar na página de planos
      localStorage.setItem('dadosCompletos', JSON.stringify({
        ...dadosParaIA,
        resultados: resultadosCalculados
      }));

    } catch (error) {
      console.error('Erro ao processar dados:', error);
      alert('Erro ao processar seus dados. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const isFormValid = Object.values(formData).every(value => value !== '');

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-dark-lighter to-dark text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      
      <WhatsAppButton />
      
      {/* Header */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <Link 
          to="/" 
          className="inline-flex items-center text-light-gray hover:text-primary transition-all duration-300 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Voltar para página inicial
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-16 relative z-10" ref={ref}>
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-center max-w-5xl mx-auto mb-16"
          >
            <motion.div variants={itemVariants} className="relative">
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-full px-6 py-2 mb-6">
                <Crown className="w-5 h-5 text-primary" />
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                  Análise Gratuita e Personalizada
                </span>
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent leading-tight">
                A Ciência por Trás da
                <br />
                <span className="text-primary">Sua Melhor Versão</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-light-gray max-w-4xl mx-auto leading-relaxed">
                Desvende os segredos do seu corpo com nossa análise prévia exclusiva. 
                <span className="text-primary font-semibold">Seu primeiro passo para a transformação.</span>
              </p>
            </motion.div>
          </motion.div>

          {/* Features Premium */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16 items-stretch"
          >
            <motion.div variants={itemVariants} className="text-center">
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-6 border border-primary/20 h-full flex flex-col justify-center">
                <Calculator className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Precisão Científica</h3>
                <p className="text-light-gray">Fórmulas validadas para dados confiáveis</p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="text-center">
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-6 border border-primary/20 h-full flex flex-col justify-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Visão Abrangente</h3>
                <p className="text-light-gray">IMC, TMB, Proteína e Hidratação integrados</p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="text-center">
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-6 border border-primary/20 h-full flex flex-col justify-center">
                <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Análise Prévia</h3>
                <p className="text-light-gray">Panorama inicial do seu perfil físico</p>
              </div>
            </motion.div>
          </motion.div>

          {etapa === 'formulario' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="max-w-3xl mx-auto"
            >
              <motion.div variants={itemVariants} className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-3xl blur-xl" />
                
                <div className="relative bg-gradient-to-br from-dark-lighter/90 to-dark/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-primary/20 shadow-2xl">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-primary-dark rounded-2xl mb-6 shadow-lg">
                      <Calculator className="h-10 w-10 text-black" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Calculadoras + Análise Prévia</h2>
                    <p className="text-light-gray">Mapeie seus indicadores básicos e receba insights do seu perfil atual</p>
                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 mt-4">
                      <p className="text-white text-sm font-semibold !text-white">
                        💡 <strong>Seu Potencial Ilimitado Começa Aqui:</strong> Esta análise é a porta de entrada para o autoconhecimento. Para desvendar seu potencial máximo, explore nossos programas premium.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-primary mb-3">
                          Peso (kg) *
                        </label>
                        <input
                          type="number"
                          name="peso"
                          value={formData.peso}
                          onChange={handleInputChange}
                          className="w-full px-6 py-4 rounded-xl bg-dark/50 border border-gray-600 text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-lg"
                          placeholder="Ex: 70"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-primary mb-3">
                          Altura (ex: 1,70 ou 170) *
                        </label>
                        <input
                          type="text"
                          name="altura"
                          value={formData.altura}
                          onChange={handleInputChange}
                          className="w-full px-6 py-4 rounded-xl bg-dark/50 border border-gray-600 text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-lg"
                          placeholder="Ex: 1,70 ou 170"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-primary mb-3">
                        Idade (anos) *
                      </label>
                      <input
                        type="number"
                        name="idade"
                        value={formData.idade}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 rounded-xl bg-dark/50 border border-gray-600 text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-lg"
                        placeholder="Ex: 30"
                        min="16"
                        max="80"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-primary mb-3">
                        Frequência semanal de treinos *
                      </label>
                      <select
                        name="frequenciaTreino"
                        value={formData.frequenciaTreino}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 rounded-xl bg-dark/50 border border-gray-600 text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-lg"
                        required
                      >
                        <option value="">Selecione sua frequência...</option>
                        <option value="0">Não treino</option>
                        <option value="1">1x por semana</option>
                        <option value="2">2x por semana</option>
                        <option value="3">3x por semana</option>
                        <option value="4">4x por semana</option>
                        <option value="5">5x por semana</option>
                        <option value="6">6x por semana</option>
                        <option value="7">Todos os dias</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-primary mb-3">
                        Tipo de treino atual *
                      </label>
                      <select
                        name="tipoTreino"
                        value={formData.tipoTreino}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 rounded-xl bg-dark/50 border border-gray-600 text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-lg"
                        required
                      >
                        <option value="">Selecione seu tipo de treino...</option>
                        <option value="musculacao">Musculação</option>
                        <option value="cardio">Cardio/Aeróbico</option>
                        <option value="funcional">Treino Funcional</option>
                        <option value="crossfit">CrossFit</option>
                        <option value="corrida">Corrida</option>
                        <option value="natacao">Natação</option>
                        <option value="yoga">Yoga/Pilates</option>
                        <option value="misto">Treino Misto</option>
                        <option value="nenhum">Não treino atualmente</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-primary mb-3">
                          Nível de experiência *
                        </label>
                        <select
                          name="nivelExperiencia"
                          value={formData.nivelExperiencia}
                          onChange={handleInputChange}
                          className="w-full px-6 py-4 rounded-xl bg-dark/50 border border-gray-600 text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-lg"
                          required
                        >
                          <option value="">Selecione...</option>
                          <option value="iniciante">Iniciante (0-1 ano)</option>
                          <option value="intermediario">Intermediário (1-3 anos)</option>
                          <option value="avancado">Avançado (3+ anos)</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-primary mb-3">
                          Principal objetivo *
                        </label>
                        <select
                          name="objetivo"
                          value={formData.objetivo}
                          onChange={handleInputChange}
                          className="w-full px-6 py-4 rounded-xl bg-dark/50 border border-gray-600 text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-lg"
                          required
                        >
                          <option value="">Selecione...</option>
                          <option value="emagrecer">Emagrecer</option>
                          <option value="hipertrofia">Ganhar massa muscular</option>
                          <option value="saude">Melhorar saúde geral</option>
                          <option value="performance">Melhorar performance</option>
                          <option value="recomposicao">Recomposição corporal</option>
                          <option value="manutencao">Manutenção do peso</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-6">
                      <button
                        type="submit"
                        disabled={!isFormValid || carregando}
                        className="w-full bg-gradient-to-r from-primary to-primary-dark text-black font-bold py-6 px-8 rounded-xl text-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/30"
                      >
                        {carregando ? (
                          <>
                            <Loader2 className="w-6 h-6 animate-spin" />
                            Calculando indicadores e gerando análise prévia...
                          </>
                        ) : (
                          <>
                            <Brain className="w-6 h-6" />
                            Descobrir Meus Indicadores e Potencial
                            <Sparkles className="w-6 h-6" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}

          {etapa === 'resultados' && resultados && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-6xl mx-auto"
            >
              {/* Success Header */}
              <motion.div variants={itemVariants} className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary to-primary-dark rounded-full mb-6 shadow-2xl">
                  <CheckCircle className="h-12 w-12 text-black" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
                  Seus Indicadores + Análise Prévia
                </h2>
                <p className="text-xl text-light-gray max-w-3xl mx-auto">
                  Confira seus indicadores básicos e uma análise prévia do seu perfil
                </p>
              </motion.div>

              {/* Análise da IA */}
              {resultados.analiseIA && (
                <motion.div variants={itemVariants} className="relative mb-12">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-3xl blur-xl" />
                  
                  <div className="relative bg-gradient-to-br from-dark-lighter/90 to-dark/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-primary/20">
                    <div className="flex items-center justify-center mb-6">
                      <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-full px-6 py-3">
                        <Brain className="h-6 w-6 text-primary" />
                        <span className="text-primary font-bold">Análise Prévia</span>
                        <Star className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    
                    <h3 className="text-3xl font-bold mb-6 text-center">Insights Básicos do Seu Perfil</h3>
                    
                    <div className="bg-dark/50 rounded-2xl p-6 mb-6 border border-primary/10">
                      <p className="text-lg text-light-gray leading-relaxed">
                        {resultados.analiseIA.analisePersonalizada}
                      </p>
                    </div>
                    
                    <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Shield className="h-5 w-5 text-primary" />
                        <span className="text-primary font-semibold text-sm">Importante:</span>
                      </div>
                      <p className="text-light-gray text-sm">
                        Esta é uma análise superficial baseada apenas nos dados básicos fornecidos. 
                        Para uma análise completa, personalizada e um plano detalhado de transformação, 
                        conheça nossos planos com acompanhamento profissional.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-6 rounded-2xl border border-primary/20">
                        <div className="flex items-center gap-2 mb-3">
                          <Zap className="h-5 w-5 text-primary" />
                          <span className="text-primary font-semibold text-sm">Insight Específico</span>
                        </div>
                        <p className="text-light-gray">
                          {resultados.analiseIA.motivacao}
                        </p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-6 rounded-2xl border border-primary/20">
                        <div className="flex items-center gap-2 mb-3">
                          <Target className="h-5 w-5 text-primary" />
                          <span className="text-primary font-semibold text-sm">Plano Recomendado</span>
                        </div>
                        <p className="text-2xl font-bold text-primary">
                          {resultados.analiseIA.planoRecomendado}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Resultados dos Cálculos */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <motion.div variants={itemVariants} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur group-hover:blur-md transition-all duration-300" />
                  <div className="relative bg-gradient-to-br from-dark-lighter/90 to-dark/90 backdrop-blur-xl rounded-2xl p-6 text-center border border-primary/20 hover:border-primary/40 transition-all duration-300">
                    <Calculator className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">IMC</h3>
                    <p className="text-4xl font-bold text-primary mb-2">{resultados.imc.toFixed(1)}</p>
                    <p className="text-light-gray text-sm">{resultados.categoriaIMC}</p>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur group-hover:blur-md transition-all duration-300" />
                  <div className="relative bg-gradient-to-br from-dark-lighter/90 to-dark/90 backdrop-blur-xl rounded-2xl p-6 text-center border border-primary/20 hover:border-primary/40 transition-all duration-300">
                    <Activity className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">TMB</h3>
                    <p className="text-4xl font-bold text-primary mb-2">{Math.round(resultados.tmb)}</p>
                    <p className="text-light-gray text-sm">calorias/dia</p>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur group-hover:blur-md transition-all duration-300" />
                  <div className="relative bg-gradient-to-br from-dark-lighter/90 to-dark/90 backdrop-blur-xl rounded-2xl p-6 text-center border border-primary/20 hover:border-primary/40 transition-all duration-300">
                    <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Proteína</h3>
                    <p className="text-4xl font-bold text-primary mb-2">{Math.round(resultados.proteina)}g</p>
                    <p className="text-light-gray text-sm">por dia</p>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur group-hover:blur-md transition-all duration-300" />
                  <div className="relative bg-gradient-to-br from-dark-lighter/90 to-dark/90 backdrop-blur-xl rounded-2xl p-6 text-center border border-primary/20 hover:border-primary/40 transition-all duration-300">
                    <Droplets className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Água</h3>
                    <p className="text-4xl font-bold text-primary mb-2">{Math.round(resultados.agua/1000*10)/10}L</p>
                    <p className="text-light-gray text-sm">por dia</p>
                  </div>
                </motion.div>
              </div>

              {/* CTA Final */}
              <motion.div variants={itemVariants} className="text-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-3xl blur-xl" />
                  
                  <div className="relative bg-gradient-to-br from-dark-lighter/90 to-dark/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-primary/20">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-full px-6 py-2 mb-6">
                      <Crown className="w-5 h-5 text-primary" />
                      <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                        Próximo Passo
                      </span>
                    </div>
                    
                    <h3 className="text-3xl font-bold mb-4">Transforme Esses Dados em Resultados Reais</h3>
                    <p className="text-xl text-light-gray mb-8 max-w-3xl mx-auto">
                      Agora que você conhece seus indicadores básicos, descubra como a ScarFit pode criar 
                      um plano 100% personalizado com análise completa e acompanhamento profissional.
                    </p>
                    
                    <button
                      onClick={() => navigate('/planos-personalizados?origem=entenda-situacao')}
                      className="bg-gradient-to-r from-primary to-primary-dark text-black font-bold py-6 px-12 rounded-xl text-xl flex items-center justify-center gap-3 mx-auto hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/30"
                    >
                      <ArrowRight className="w-6 h-6" />
                      Ver Planos com Análise Completa
                      <Sparkles className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default EntendaSituacaoPage;