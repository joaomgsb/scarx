import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  ArrowLeft, 
  Calculator, 
  Activity, 
  Target, 
  Droplets,
  Scale,
  Zap,
  TrendingUp,
  Info,
  Crown,
  Sparkles
} from 'lucide-react';
import WhatsAppButton from '../components/WhatsAppButton';
import ImcCalculator from '../components/ImcCalculator';

const CalculadorasIndividuaisPage: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Scroll para o topo quando a página carrega
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [calculadoraAtiva, setCalculadoraAtiva] = useState<'imc' | 'tmb' | 'proteina' | 'agua' | 'premium'>('imc');

  // Estados para IMC
  const [imcData, setImcData] = useState({ peso: '', altura: '', idade: '' });
  const [imcResultado, setImcResultado] = useState<{ imc: number; categoria: string } | null>(null);

  // Estados para TMB
  const [tmbData, setTmbData] = useState({ peso: '', altura: '', idade: '', sexo: 'masculino' });
  const [tmbResultado, setTmbResultado] = useState<number | null>(null);

  // Estados para Proteína
  const [proteinaData, setProteinaData] = useState({ peso: '', objetivo: '', atividade: '' });
  const [proteinaResultado, setProteinaResultado] = useState<number | null>(null);

  // Estados para Água
  const [aguaData, setAguaData] = useState({ peso: '', atividade: '', clima: 'normal' });
  const [aguaResultado, setAguaResultado] = useState<number | null>(null);

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

  // Função para calcular IMC
  const calcularIMC = () => {
    const peso = parseFloat(imcData.peso);
    let altura = parseFloat(imcData.altura.replace(',', '.'));
    
    if (altura > 3) altura = altura / 100;

    if (peso > 0 && altura > 0) {
      const imc = peso / (altura * altura);
      let categoria = '';
      
      if (imc < 18.5) categoria = 'Abaixo do peso';
      else if (imc < 24.9) categoria = 'Peso normal';
      else if (imc < 29.9) categoria = 'Sobrepeso';
      else if (imc < 34.9) categoria = 'Obesidade Grau 1';
      else if (imc < 39.9) categoria = 'Obesidade Grau 2';
      else categoria = 'Obesidade Grau 3';
      
      setImcResultado({ imc, categoria });
    }
  };

  // Função para calcular TMB
  const calcularTMB = () => {
    const peso = parseFloat(tmbData.peso);
    let altura = parseFloat(tmbData.altura.replace(',', '.'));
    const idade = parseInt(tmbData.idade);
    
    if (altura > 3) altura = altura / 100;

    if (peso > 0 && altura > 0 && idade > 0) {
      let tmb;
      // Fórmula Mifflin-St Jeor (mais precisa)
      if (tmbData.sexo === 'masculino') {
        tmb = (10 * peso) + (6.25 * altura * 100) - (5 * idade) + 5;
      } else {
        tmb = (10 * peso) + (6.25 * altura * 100) - (5 * idade) - 161;
      }
      setTmbResultado(tmb);
    }
  };

  // Função para calcular Proteína
  const calcularProteina = () => {
    const peso = parseFloat(proteinaData.peso);
    
    if (peso > 0) {
      let multiplicador = 0.8; // Base sedentário (RDA mínima)
      
      // Ajuste por objetivo
      if (proteinaData.objetivo === 'hipertrofia') multiplicador = 2.0; // Para ganho muscular
      else if (proteinaData.objetivo === 'emagrecer') multiplicador = 1.6; // Para preservar massa magra
      else if (proteinaData.objetivo === 'manutencao') multiplicador = 1.2; // Para manutenção
      
      // Ajuste por atividade
      if (proteinaData.atividade === 'alta') multiplicador += 0.4;
      else if (proteinaData.atividade === 'moderada') multiplicador += 0.2;
      else if (proteinaData.atividade === 'baixa') multiplicador += 0.0;
      
      const proteina = peso * multiplicador;
      setProteinaResultado(proteina);
    }
  };

  // Função para calcular Água
  const calcularAgua = () => {
    const peso = parseFloat(aguaData.peso);
    
    if (peso > 0) {
      let baseAgua = peso * 35; // 35ml por kg
      
      // Ajuste por atividade
      if (aguaData.atividade === 'alta') baseAgua += 500; // +500ml para treino intenso
      else if (aguaData.atividade === 'moderada') baseAgua += 300; // +300ml para treino moderado
      else if (aguaData.atividade === 'baixa') baseAgua += 100; // +100ml para atividade leve
      
      // Ajuste por clima
      if (aguaData.clima === 'quente') baseAgua += 500; // +500ml para clima quente
      else if (aguaData.clima === 'frio') baseAgua -= 200; // -200ml para clima frio
      
      setAguaResultado(baseAgua);
    }
  };

  const calculadoras = [
    {
      id: 'imc' as const,
      nome: 'IMC',
      titulo: 'Índice de Massa Corporal',
      descricao: 'Descubra se seu peso está na faixa ideal',
      icon: <Scale className="h-8 w-8" />,
      cor: 'from-blue-500 to-blue-600'
    },
    {
      id: 'tmb' as const,
      nome: 'TMB',
      titulo: 'Taxa Metabólica Basal',
      descricao: 'Quantas calorias seu corpo gasta em repouso',
      icon: <Activity className="h-8 w-8" />,
      cor: 'from-green-500 to-green-600'
    },
    {
      id: 'proteina' as const,
      nome: 'Proteína',
      titulo: 'Proteína Diária Ideal',
      descricao: 'Quantidade ideal de proteína para seus objetivos',
      icon: <Target className="h-8 w-8" />,
      cor: 'from-purple-500 to-purple-600'
    },
    {
      id: 'agua' as const,
      nome: 'Hidratação',
      titulo: 'Hidratação Ideal Diária',
      descricao: 'Quantidade de água que você deve beber por dia',
      icon: <Droplets className="h-8 w-8" />,
      cor: 'from-cyan-500 to-cyan-600'
    },
    {
      id: 'premium' as const,
      nome: 'Premium',
      titulo: 'Calculadora Premium',
      descricao: 'IMC inteligente com recomendações personalizadas',
      icon: <Crown className="h-8 w-8" />,
              cor: 'from-primary to-primary-dark',
      premium: true
    }
  ];

  const calculadoraAtual = calculadoras.find(calc => calc.id === calculadoraAtiva);

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
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <motion.div variants={itemVariants} className="relative">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-full px-6 py-2 mb-6">
                <Calculator className="w-5 h-5 text-primary" />
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                  Calculadoras Individuais
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent leading-tight">
                Calcule Seus
                <br />
                <span className="text-primary">Indicadores</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-light-gray max-w-3xl mx-auto leading-relaxed">
                Ferramentas precisas e científicas para você conhecer melhor seu corpo e otimizar seus resultados
              </p>
            </motion.div>
          </motion.div>

          {/* Seletor de Calculadoras */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="max-w-5xl mx-auto mb-12"
          >
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {calculadoras.map((calc) => (
                <motion.button
                  key={calc.id}
                  variants={itemVariants}
                  onClick={() => setCalculadoraAtiva(calc.id)}
                  className={`relative p-4 lg:p-6 rounded-2xl border-2 transition-all duration-300 ${
                    calculadoraAtiva === calc.id
                      ? calc.premium 
                        ? 'border-primary bg-gradient-to-br from-primary/30 to-primary/10 scale-105 shadow-lg shadow-primary/30'
                        : 'border-primary bg-gradient-to-br from-primary/20 to-primary/5 scale-105'
                      : 'border-gray-600 bg-dark-lighter/50 hover:border-primary/50 hover:scale-102'
                  }`}
                >
                  {calc.premium && (
                    <div className="absolute -top-2 -right-2 bg-primary text-black rounded-full p-1">
                      <Sparkles className="w-3 h-3" />
                    </div>
                  )}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${calc.cor} mb-4 text-white`}>
                    {calc.icon}
                  </div>
                  <h3 className={`text-lg font-bold mb-2 ${calc.premium ? 'text-primary' : ''}`}>
                    {calc.nome}
                  </h3>
                  <p className="text-light-gray text-sm leading-tight">{calc.descricao}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Calculadora Ativa */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="max-w-3xl mx-auto"
          >
            {calculadoraAtiva !== 'premium' ? (
              <motion.div variants={itemVariants} className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-3xl blur-xl" />
                
                <div className="relative bg-gradient-to-br from-dark-lighter/90 to-dark/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-primary/20 shadow-2xl">
                  <div className="text-center mb-8">
                    <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${calculadoraAtual?.cor} rounded-2xl mb-6 shadow-lg text-white`}>
                      {calculadoraAtual?.icon}
                    </div>
                    <h2 className="text-3xl font-bold mb-4">{calculadoraAtual?.titulo}</h2>
                    <p className="text-light-gray">{calculadoraAtual?.descricao}</p>
                  </div>

                  {/* Calculadora IMC */}
                  {calculadoraAtiva === 'imc' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-primary mb-2">
                            Peso (kg)
                          </label>
                          <input
                            type="number"
                            value={imcData.peso}
                            onChange={(e) => setImcData({...imcData, peso: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl bg-dark/50 border border-gray-600 text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                            placeholder="Ex: 70"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-primary mb-2">
                            Altura (m ou cm)
                          </label>
                          <input
                            type="text"
                            value={imcData.altura}
                            onChange={(e) => setImcData({...imcData, altura: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl bg-dark/50 border border-gray-600 text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                            placeholder="1,70 ou 170"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-primary mb-2">
                            Idade (anos)
                          </label>
                          <input
                            type="number"
                            value={imcData.idade}
                            onChange={(e) => setImcData({...imcData, idade: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl bg-dark/50 border border-gray-600 text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                            placeholder="Ex: 30"
                          />
                        </div>
                      </div>
                      
                      <button
                        onClick={calcularIMC}
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-4 px-8 rounded-xl text-lg hover:scale-105 transition-all duration-300 shadow-lg"
                      >
                        Calcular IMC
                      </button>

                      {imcResultado && (
                        <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 p-6 rounded-2xl border border-blue-500/20 text-center">
                          <h3 className="text-2xl font-bold mb-2">Seu IMC: {imcResultado.imc.toFixed(1)}</h3>
                          <p className="text-blue-400 font-semibold text-lg mb-4">
                            Classificação: {imcResultado.categoria}
                          </p>
                          <div className="bg-dark/50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Info className="w-5 h-5 text-primary" />
                              <span className="text-primary font-semibold text-sm">Dica Personalizada:</span>
                            </div>
                            <p className="text-light-gray text-sm">
                              {imcResultado.categoria === 'Peso normal' 
                                ? 'Parabéns! Seu peso está ideal. Foque em manter e definir músculos.'
                                : imcResultado.categoria === 'Abaixo do peso'
                                ? 'Considere um plano para ganho de massa muscular saudável.'
                                : 'Um protocolo personalizado pode ajudar na sua transformação corporal.'
                              }
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Calculadora TMB */}
                  {calculadoraAtiva === 'tmb' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-primary mb-2">
                            Peso (kg)
                          </label>
                          <input
                            type="number"
                            value={tmbData.peso}
                            onChange={(e) => setTmbData({...tmbData, peso: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl bg-dark/50 border border-gray-600 text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                            placeholder="Ex: 70"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-primary mb-2">
                            Altura (m ou cm)
                          </label>
                          <input
                            type="text"
                            value={tmbData.altura}
                            onChange={(e) => setTmbData({...tmbData, altura: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl bg-dark/50 border border-gray-600 text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                            placeholder="1,70 ou 170"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-primary mb-2">
                            Idade (anos)
                          </label>
                          <input
                            type="number"
                            value={tmbData.idade}
                            onChange={(e) => setTmbData({...tmbData, idade: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl bg-dark/50 border border-gray-600 text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                            placeholder="Ex: 30"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-primary mb-2">
                            Sexo
                          </label>
                          <select
                            value={tmbData.sexo}
                            onChange={(e) => setTmbData({...tmbData, sexo: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl bg-dark/50 border border-gray-600 text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                          >
                            <option value="masculino">Masculino</option>
                            <option value="feminino">Feminino</option>
                          </select>
                        </div>
                      </div>
                      
                      <button
                        onClick={calcularTMB}
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 px-8 rounded-xl text-lg hover:scale-105 transition-all duration-300 shadow-lg"
                      >
                        Calcular TMB
                      </button>

                      {tmbResultado && (
                        <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 p-6 rounded-2xl border border-green-500/20 text-center">
                          <h3 className="text-2xl font-bold mb-2">Sua TMB: {Math.round(tmbResultado)} calorias/dia</h3>
                          <p className="text-green-400 font-semibold mb-4">
                            Calorias que seu corpo gasta em repouso
                          </p>
                          <div className="bg-dark/50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Zap className="w-5 h-5 text-primary" />
                              <span className="text-primary font-semibold text-sm">Dica:</span>
                            </div>
                            <p className="text-light-gray text-sm">
                              Para manter o peso: {Math.round(tmbResultado * 1.4)} cal/dia (sedentário) a {Math.round(tmbResultado * 1.7)} cal/dia (ativo).
                              Para emagrecer: déficit de 300-500 calorias da manutenção.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Calculadora Proteína */}
                  {calculadoraAtiva === 'proteina' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-primary mb-2">
                            Peso (kg)
                          </label>
                          <input
                            type="number"
                            value={proteinaData.peso}
                            onChange={(e) => setProteinaData({...proteinaData, peso: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl bg-dark/50 border border-gray-600 text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                            placeholder="Ex: 70"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-primary mb-2">
                            Objetivo
                          </label>
                          <select
                            value={proteinaData.objetivo}
                            onChange={(e) => setProteinaData({...proteinaData, objetivo: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl bg-dark/50 border border-gray-600 text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                          >
                            <option value="">Selecione...</option>
                            <option value="emagrecer">Emagrecer</option>
                            <option value="hipertrofia">Ganhar massa</option>
                            <option value="manutencao">Manutenção</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-primary mb-2">
                            Nível de Atividade
                          </label>
                          <select
                            value={proteinaData.atividade}
                            onChange={(e) => setProteinaData({...proteinaData, atividade: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl bg-dark/50 border border-gray-600 text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                          >
                            <option value="">Selecione...</option>
                            <option value="baixa">Baixa (sedentário)</option>
                            <option value="moderada">Moderada (3-4x/semana)</option>
                            <option value="alta">Alta (5+x/semana)</option>
                          </select>
                        </div>
                      </div>
                      
                      <button
                        onClick={calcularProteina}
                        className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-4 px-8 rounded-xl text-lg hover:scale-105 transition-all duration-300 shadow-lg"
                      >
                        Calcular Proteína
                      </button>

                      {proteinaResultado && (
                        <div className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 p-6 rounded-2xl border border-purple-500/20 text-center">
                          <h3 className="text-2xl font-bold mb-2">Proteína ideal: {Math.round(proteinaResultado)}g/dia</h3>
                          <p className="text-purple-400 font-semibold mb-4">
                            Quantidade diária recomendada
                          </p>
                          <div className="bg-dark/50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Target className="w-5 h-5 text-primary" />
                              <span className="text-primary font-semibold text-sm">Dica:</span>
                            </div>
                            <p className="text-light-gray text-sm">
                              Distribua em 4-5 refeições: {Math.round(proteinaResultado/4)}-{Math.round(proteinaResultado/5)}g por refeição.
                              Fontes: carnes magras, ovos, laticínios, whey protein, leguminosas.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Calculadora Água */}
                  {calculadoraAtiva === 'agua' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-primary mb-2">
                            Peso (kg)
                          </label>
                          <input
                            type="number"
                            value={aguaData.peso}
                            onChange={(e) => setAguaData({...aguaData, peso: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl bg-dark/50 border border-gray-600 text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                            placeholder="Ex: 70"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-primary mb-2">
                            Nível de Atividade
                          </label>
                          <select
                            value={aguaData.atividade}
                            onChange={(e) => setAguaData({...aguaData, atividade: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl bg-dark/50 border border-gray-600 text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                          >
                            <option value="">Selecione...</option>
                            <option value="baixa">Baixa (sedentário)</option>
                            <option value="moderada">Moderada (treino regular)</option>
                            <option value="alta">Alta (treino intenso)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-primary mb-2">
                            Clima
                          </label>
                          <select
                            value={aguaData.clima}
                            onChange={(e) => setAguaData({...aguaData, clima: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl bg-dark/50 border border-gray-600 text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                          >
                            <option value="normal">Normal</option>
                            <option value="quente">Quente/Seco</option>
                            <option value="frio">Frio</option>
                          </select>
                        </div>
                      </div>
                      
                      <button
                        onClick={calcularAgua}
                        className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-bold py-4 px-8 rounded-xl text-lg hover:scale-105 transition-all duration-300 shadow-lg"
                      >
                        Calcular Hidratação
                      </button>

                      {aguaResultado && (
                        <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 p-6 rounded-2xl border border-cyan-500/20 text-center">
                          <h3 className="text-2xl font-bold mb-2">Hidratação ideal: {(aguaResultado/1000).toFixed(1)}L/dia</h3>
                          <p className="text-cyan-400 font-semibold mb-4">
                            Aproximadamente {Math.round(aguaResultado/250)} copos de 250ml
                          </p>
                          <div className="bg-dark/50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Droplets className="w-5 h-5 text-primary" />
                              <span className="text-primary font-semibold text-sm">Dica:</span>
                            </div>
                            <p className="text-light-gray text-sm">
                              Distribua: 500ml ao acordar, 200ml antes das refeições, 500ml durante treino.
                              Urina clara = boa hidratação. Ajuste conforme sede e atividade.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              /* Calculadora Premium */
              <motion.div variants={itemVariants} className="relative">
                {/* Premium Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-primary-dark text-black px-6 py-2 rounded-full font-bold text-sm shadow-lg z-10">
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4" />
                    CALCULADORA PREMIUM
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
                
                {/* Premium Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30 rounded-3xl blur-xl" />
                
                <div className="relative bg-gradient-to-br from-dark-lighter/95 to-dark/95 backdrop-blur-xl rounded-3xl border-2 border-primary/40 shadow-2xl shadow-primary/20 overflow-hidden">
                  <ImcCalculator />
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CalculadorasIndividuaisPage;