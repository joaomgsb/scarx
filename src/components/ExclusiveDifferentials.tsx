import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Clock, 
  UserCheck, 
  Package, 
  TrendingUp,
  Gift
} from 'lucide-react';

const DiferenciaisExclusivos: React.FC = () => {
  const [isExploded, setIsExploded] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleGiftClick = () => {
    setIsExploded(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const giftVariants = {
    initial: { 
      scale: 1,
      rotate: 0,
    },
    hover: { 
      scale: 1.05,
      rotate: [0, -5, 5, 0],
      transition: { duration: 0.3 }
    },
    explode: {
      scale: [1, 1.2, 0],
      rotate: [0, 180, 360],
      transition: { 
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  const differentialVariants = {
    hidden: { 
      scale: 0,
      opacity: 0,
      y: 50
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  const differentials = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Suporte 24/7",
      description: "Assistência completa a qualquer momento do dia"
    },
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: "Gerente de relacionamento",
      description: "Acompanhamento personalizado e dedicado"
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: "Kit ScarX",
      description: "Balança, camiseta e carta personalizada"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Acompanhamento sob medida",
      description: "Plano adaptado às suas necessidades específicas"
    }
  ];

  return (
    <section
      id="diferenciais-exclusivos"
      className="relative py-20 px-4 bg-gradient-to-br from-dark via-dark to-gray-900 overflow-hidden"
      ref={ref}
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={containerVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-medium mb-6"
          >
            <span className="text-white">Diferenciais </span>
            <span className="text-primary">Exclusivos</span>
          </motion.h2>
          
          <motion.p 
            variants={containerVariants}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Descubra o que torna nossa experiência única e transformadora
          </motion.p>
        </motion.div>

        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <AnimatePresence mode="wait">
            {!isExploded ? (
              <motion.div
                key="gift"
                variants={giftVariants}
                initial="initial"
                whileHover="hover"
                onClick={handleGiftClick}
                className="cursor-pointer group flex flex-col items-center justify-center"
              >
                <div className="relative">
                  <Gift className="w-32 h-32 text-primary group-hover:text-primary/80 transition-colors" />
                  <motion.div
                    className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
                <motion.p 
                  className="text-center mt-4 text-gray-300 text-lg font-medium"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Clique para descobrir
                </motion.p>
              </motion.div>
            ) : (
              <motion.div
                key="differentials"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {differentials.map((differential, index) => (
                    <motion.div
                      key={index}
                      variants={differentialVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30 hover:border-primary/30 transition-all duration-300 hover:transform hover:scale-105 group"
                    >
                      <div className="flex flex-col items-center text-center space-y-4">
                        <div className="p-4 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                          <div className="text-primary">
                            {differential.icon}
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">
                          {differential.title}
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {differential.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-center mt-12"
                >
                  <button
                    onClick={() => setIsExploded(false)}
                    className="px-8 py-3 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 rounded-full transition-all duration-300 hover:scale-105"
                  >
                    Ver novamente
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default DiferenciaisExclusivos;