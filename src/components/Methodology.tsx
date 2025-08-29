import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ClipboardCheck, Activity, MessageCircle, LineChart, Sparkles } from 'lucide-react';

const Methodology: React.FC = () => {
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const methodologySteps = [
    {
      icon: <ClipboardCheck className="h-8 w-8 text-black" />,
      title: "Check-in",
      description: "Entendemos sua rotina e objetivos para criar um plano verdadeiramente personalizado.",
    },
    {
      icon: <Activity className="h-8 w-8 text-black" />,
      title: "Montagem",
      description: "Adaptamos treinos e nutrição ao seu estilo de vida, garantindo evolução constante.",
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-black" />,
      title: "Suporte",
      description: "Acompanhamento diário e ajustes estratégicos para manter você no caminho certo.",
    },
    {
      icon: <LineChart className="h-8 w-8 text-black" />,
      title: "Evolução",
      description: "Protocolo único para resultados reais e consistentes, com evolução sustentável.",
    },
  ];

  return (
    <section id="methodology" className="relative py-20 md:py-24 bg-gradient-to-br from-dark via-dark-lighter to-dark text-white overflow-hidden" ref={ref}>
      {/* Background Effects Premium */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
        <div className="absolute top-1/4 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 md:w-96 h-72 md:h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <motion.div variants={itemVariants} className="relative">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-full px-4 md:px-6 py-2 mb-4 md:mb-6">
              <Sparkles className="w-4 md:w-5 h-4 md:h-5 text-primary" />
              <span className="text-primary font-semibold text-xs md:text-sm uppercase tracking-wider">
                MÉTODO EXCLUSIVO
              </span>
            </div>
            
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent leading-tight">
              Aqui, ciência, personalização e resultado andam juntos.
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-light-gray max-w-3xl mx-auto leading-relaxed">
              Metodologia única que combina ciência de ponta, personalização extrema e acompanhamento constante para garantir sua transformação.
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {methodologySteps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              
              <div className="relative bg-gradient-to-br from-dark-lighter/90 to-dark/90 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300 h-full flex flex-col group-hover:scale-105">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-br from-primary to-primary-dark rounded-xl shadow-lg">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-white group-hover:text-primary transition-colors duration-300 text-center">
                  {step.title}
                </h3>
                <p className="text-light-gray text-sm md:text-base leading-relaxed text-center flex-1">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Methodology;