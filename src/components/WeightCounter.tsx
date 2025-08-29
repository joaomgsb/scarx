import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Target, Award } from 'lucide-react';

const WeightCounter: React.FC = () => {
  const [count, setCount] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);
  const targetWeight = 9440;
  const targetClients = 1200;
  const progressPercentage = 94.4; // Valor exato para 9.440kg de 10.000kg

  useEffect(() => {
    const duration = 2500;
    const steps = 100; // Mais steps para animação mais suave
    const weightIncrement = targetWeight / steps;
    const clientsIncrement = targetClients / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      if (currentStep < steps) {
        const newCount = Math.min(Math.round(weightIncrement * (currentStep + 1)), targetWeight);
        const newClientsCount = Math.min(Math.round(clientsIncrement * (currentStep + 1)), targetClients);
        
        setCount(newCount);
        setClientsCount(newClientsCount);
        currentStep++;
      } else {
        // Garantir que os valores finais sejam exatos
        setCount(targetWeight);
        setClientsCount(targetClients);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
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

  return (
    <section className="relative py-20 bg-gradient-to-br from-dark via-dark-lighter to-dark overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, threshold: 0.3 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-full px-6 py-2 mb-6">
              <Award className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Resultados Comprovados
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Transformações que 
              <span className="text-primary"> Falam por Si</span>
            </h2>
            
            <p className="text-xl text-light-gray max-w-3xl mx-auto">
              Números reais de uma metodologia que funciona. Cada quilograma representa uma vida transformada.
            </p>
          </motion.div>

          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 items-stretch">
            
            {/* Weight Loss Card */}
            <motion.div variants={itemVariants} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              
              <div className="relative bg-gradient-to-br from-dark-lighter/90 to-dark/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-primary/20 hover:border-primary/40 transition-all duration-300 h-full flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <div className="p-4 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl">
                    <TrendingUp className="w-8 h-8 text-primary" />
                  </div>
                  <motion.div 
                    variants={floatingVariants}
                    animate="animate"
                    className="text-right"
                  >
                    <div className="text-sm text-light-gray mb-1">Meta Atual</div>
                    <div className="text-primary font-semibold">{progressPercentage.toFixed(1)}% de 10.000kg</div>
                  </motion.div>
                </div>
                
                <div className="text-center mb-8 flex-grow flex flex-col justify-center">
                  <div className="flex items-baseline justify-center gap-2 mb-4">
                    <motion.span
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className="text-6xl md:text-7xl font-bold text-white"
                    >
                      +{count.toLocaleString()}
                    </motion.span>
                    <span className="text-3xl md:text-4xl font-bold text-primary">kg</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Peso Eliminado
                  </h3>
                  <p className="text-light-gray">
                    Resultado coletivo de nossa metodologia exclusiva
                  </p>
                </div>
                
                {/* Progress Bar */}
                <div className="relative mt-auto">
                  <div className="w-full bg-dark rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: progressPercentage / 100 }}
                      transition={{ duration: 2.5, delay: 1, ease: "easeOut" }}
                      style={{ originX: 0 }}
                      className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full shadow-lg w-full"
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-light-gray">
                    <span>0kg</span>
                    <span>10.000kg</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Clients Transformed Card */}
            <motion.div variants={itemVariants} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              
              <div className="relative bg-gradient-to-br from-dark-lighter/90 to-dark/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-primary/20 hover:border-primary/40 transition-all duration-300 h-full flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <div className="p-4 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <motion.div 
                    variants={floatingVariants}
                    animate="animate"
                    className="text-right"
                  >
                    <div className="text-sm text-light-gray mb-1">Desde 2020</div>
                    <div className="text-primary font-semibold">Crescimento Contínuo</div>
                  </motion.div>
                </div>
                
                <div className="text-center mb-8 flex-grow flex flex-col justify-center">
                  <div className="flex items-baseline justify-center gap-2 mb-4">
                    <motion.span
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                      className="text-6xl md:text-7xl font-bold text-white"
                    >
                      +{clientsCount.toLocaleString()}
                    </motion.span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Vidas Transformadas
                  </h3>
                  <p className="text-light-gray">
                    Pessoas que alcançaram seus objetivos conosco
                  </p>
                </div>
                
                {/* Achievement Badges */}
                <div className="grid grid-cols-2 gap-4 mt-auto">
                  <div className="text-center p-4 bg-dark/50 rounded-xl border border-primary/10">
                    <div className="text-2xl font-bold text-primary mb-1">98%</div>
                    <div className="text-xs text-light-gray">Taxa de Sucesso</div>
                  </div>
                  <div className="text-center p-4 bg-dark/50 rounded-xl border border-primary/10">
                    <div className="text-2xl font-bold text-primary mb-1">4.9</div>
                    <div className="text-xs text-light-gray">Avaliação Média</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="inline-flex items-center gap-4 bg-gradient-to-r from-dark-lighter/90 to-dark/90 backdrop-blur-xl rounded-2xl p-6 border border-primary/20">
              <Target className="w-8 h-8 text-primary" />
              <div className="text-left">
                <div className="text-white font-semibold">Próxima Meta: 15.000kg</div>
                <div className="text-light-gray text-sm">Junte-se à nossa comunidade de transformação</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WeightCounter;