import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowLeft, Scale, Crown, Sparkles, Brain, Shield, Zap } from 'lucide-react';
import ImcCalculator from '../components/ImcCalculator';
import WhatsAppButton from '../components/WhatsAppButton';

const ImcPage: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Scroll para o topo quando a página carrega
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
                <Scale className="w-5 h-5 text-primary" />
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                  Primeiro Passo Científico
                </span>
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent leading-tight">
                Calcule Seu IMC:
                <br />
                <span className="text-primary">O Primeiro Passo para Sua Transformação</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-light-gray max-w-3xl mx-auto leading-relaxed">
                Descubra onde você se encontra hoje e prepare-se para a transformação que só a metodologia ScarFit pode oferecer
              </p>
            </motion.div>
          </motion.div>

          {/* Features Premium */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16"
          >
            <motion.div variants={itemVariants} className="text-center">
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-6 border border-primary/20 h-full flex flex-col justify-center">
                <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Diagnóstico Preciso</h3>
                <p className="text-light-gray">Cálculo científico para entender seu ponto de partida</p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="text-center">
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-6 border border-primary/20 h-full flex flex-col justify-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Metodologia ScarFit</h3>
                <p className="text-light-gray">Baseado na ciência da transformação corporal</p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="text-center">
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-6 border border-primary/20 h-full flex flex-col justify-center">
                <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Próximos Passos</h3>
                <p className="text-light-gray">Direcionamento para sua análise completa</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Calculadora com design premium */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="max-w-3xl mx-auto"
          >
            <motion.div variants={itemVariants} className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-3xl blur-xl" />
              
              <div className="relative bg-gradient-to-br from-dark-lighter/90 to-dark/90 backdrop-blur-xl rounded-3xl border border-primary/20 shadow-2xl overflow-hidden">
                <ImcCalculator />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ImcPage;