import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Zap, 
  Brain,
  Shield,
  Target
} from 'lucide-react';

const DiscoverPlanCTA: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-8, 8, -8],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const glowVariants = {
    animate: {
      opacity: [0.5, 1, 0.5],
      scale: [1, 1.05, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };



  return (
    <section id="discover-plan" className="relative py-8 md:py-12 overflow-hidden" ref={ref}>
      {/* Background Premium Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-lighter to-dark" />
        
        {/* Spotlight central */}
        <motion.div 
          variants={glowVariants}
          animate="animate"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/15 via-primary/5 to-transparent rounded-full blur-3xl"
        />
        
        {/* Partículas flutuantes */}
        <motion.div 
          variants={floatingVariants}
          animate="animate"
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-2xl"
        />
        <motion.div 
          variants={floatingVariants}
          animate="animate"
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary/8 rounded-full blur-3xl"
          style={{ animationDelay: '2s' }}
        />
        
        {/* Linhas de energia */}
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-primary"
            >
              Descubra o plano ideal para você
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-light-gray max-w-3xl mx-auto leading-relaxed mb-8"
            >
              Responda nosso quiz inteligente e descubra qual plano ScarX foi feito especialmente para seu perfil e objetivos.
            </motion.p>
          </motion.div>

          {/* Main CTA */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="relative max-w-2xl mx-auto">
              <div className="bg-gradient-to-br from-dark-lighter/95 to-dark/95 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-primary/40 shadow-xl shadow-primary/20">
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">
                  Pronto para descobrir seu plano ideal?
                </h3>
                
                <p className="text-base text-light-gray mb-6 max-w-xl mx-auto">
                  Em apenas 5 minutos, nossa IA analisará seu perfil e recomendará o plano perfeito para você.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-4">
                  <Link
                    to="/quiz"
                    className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-primary via-primary-light to-primary text-black font-bold py-4 px-8 rounded-xl text-base shadow-xl hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-light to-primary rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity" />
                    <div className="relative flex items-center gap-2">
                      <Brain className="w-5 h-5" />
                      <span>Iniciar Quiz</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </div>
                
                <div className="flex items-center justify-center gap-4 text-light-gray text-xs">
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-primary" />
                    <span>5 minutos</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-primary" />
                    <span>100% Gratuito</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-primary" />
                    <span>Resultado Imediato</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default DiscoverPlanCTA;