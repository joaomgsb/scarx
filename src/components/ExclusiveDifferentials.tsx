import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { 
  Headphones, 
  UserCheck, 
  Package, 
  Target,
  Sparkles,
  Brain
} from 'lucide-react';

const ExclusiveDifferentials: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const differentials = [
    {
      id: 1,
      title: "Suporte 24/7",
      icon: <Headphones className="w-6 h-6 text-primary" />,
      description: "Assistência completa a qualquer hora do dia"
    },
    {
      id: 2,
      title: "Gerente de relacionamento",
      icon: <UserCheck className="w-6 h-6 text-primary" />,
      description: "Acompanhamento personalizado com profissional dedicado"
    },
    {
      id: 3,
      title: "Kit ScarX",
      icon: <Package className="w-6 h-6 text-primary" />,
      description: "Balança, camiseta exclusiva e carta personalizada"
    },
    {
      id: 4,
      title: "Acompanhamento sob medida",
      icon: <Target className="w-6 h-6 text-primary" />,
      description: "Plano totalmente adaptado ao seu perfil e objetivos"
    }
  ];

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

  const handleBoxClick = () => {
    if (!isOpened) {
      setIsOpened(true);
    }
  };

  return (
    <section className="section-padding section-transition relative overflow-hidden" ref={ref}>
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-lighter to-dark" />
        
        {/* Spotlight central */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Título da seção */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-primary leading-tight">
              Diferenciais <span className="text-white">Exclusivos</span>
            </h2>
            <p className="text-lg md:text-xl text-light-muted max-w-3xl mx-auto leading-relaxed">
              Descubra o que torna o ScarX único no mercado
            </p>
          </motion.div>

          {/* Container da caixa e cards */}
          <motion.div variants={itemVariants} className="relative flex flex-col items-center">
            {/* Caixa de presente com texto centralizado */}
            <motion.div 
              className={`relative cursor-pointer transition-all duration-1000 transform ${
                isOpened ? 'scale-110' : 'hover:scale-105'
              } flex flex-col items-center`}
              onClick={handleBoxClick}
              whileHover={{ scale: isOpened ? 1.1 : 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Corpo da caixa */}
              <div className="relative mb-6">
                {/* Base da caixa */}
                <div className="w-32 h-32 bg-gradient-to-br from-primary to-primary-dark rounded-lg shadow-2xl border-4 border-primary/40">
                  {/* Laço da caixa */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-full bg-yellow-300 opacity-80"></div>
                    <div className="absolute w-full h-4 bg-yellow-300 opacity-80"></div>
                  </div>
                </div>
                
                {/* Tampa da caixa com animação */}
                <motion.div 
                  className="absolute top-0 left-0 w-32 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-t-lg border-4 border-primary/40 border-b-0"
                  animate={isOpened ? {
                    rotateX: -120,
                    y: -32,
                    z: 16
                  } : {
                    rotateX: 0,
                    y: 0,
                    z: 0
                  }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  style={{
                    transformOrigin: 'bottom center',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* Parte do laço na tampa */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-full bg-yellow-300 opacity-80"></div>
                  </div>
                </motion.div>
              </div>

              {/* Texto de instrução - sempre centralizado com a caixa */}
              {!isOpened && (
                <motion.div 
                  className="text-center"
                  animate={{ opacity: [1, 0.6, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <p className="text-lg font-semibold text-primary flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Clique para descobrir!
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Cards dos diferenciais - só aparecem quando a caixa é aberta */}
            <motion.div 
              className="w-full max-w-6xl"
              animate={{
                height: isOpened ? "auto" : 0,
                marginTop: isOpened ? 64 : 0, // mt-16 = 64px
                opacity: isOpened ? 1 : 0
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{ overflow: "visible" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {differentials.map((differential, index) => {
                // Calcular posições finais baseadas no grid
                const getCardPosition = (index: number) => {
                  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
                  const isTablet = typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024;
                  
                  if (isMobile) {
                    // Mobile: 1 coluna
                    return {
                      x: 0,
                      y: index * 280 // Espaçamento entre cards mobile
                    };
                  } else if (isTablet) {
                    // Tablet: 2 colunas
                    const row = Math.floor(index / 2);
                    const col = index % 2;
                    return {
                      x: col * 300 - 150, // Centralizado
                      y: row * 280
                    };
                  } else {
                    // Desktop: 4 colunas
                    const cardWidth = 280;
                    const gap = 32;
                    const totalWidth = 4 * cardWidth + 3 * gap;
                    const startX = -totalWidth / 2 + cardWidth / 2;
                    
                    return {
                      x: startX + index * (cardWidth + gap),
                      y: 0
                    };
                  }
                };

                const finalPosition = getCardPosition(index);

                return (
                  <motion.div
                    key={differential.id}
                    className="relative group"
                    initial={{ 
                      opacity: 0, 
                      scale: 0.1,
                      x: 0, // Começa no centro da caixa
                      y: -400, // Posição da caixa (ajustar conforme necessário)
                      rotate: Math.random() * 360 // Rotação aleatória inicial
                    }}
                    animate={isOpened ? { 
                      opacity: 1, 
                      scale: 1,
                      x: 0, // Vai para posição final do grid
                      y: 0,
                      rotate: 0
                    } : { 
                      opacity: 0, 
                      scale: 0.1,
                      x: 0,
                      y: -400,
                      rotate: Math.random() * 360
                    }}
                    transition={{ 
                      duration: 1.2, 
                      delay: isOpened ? 0.8 + (index * 0.3) : 0,
                      ease: [0.175, 0.885, 0.32, 1.275],
                      type: "spring",
                      damping: 20,
                      stiffness: 100
                    }}
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-dark-accent/50 to-dark-accent/30 border border-primary/20 hover:border-primary/40 transition-all duration-300 group-hover:scale-105 h-full">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative p-6 md:p-8 h-full flex flex-col">
                        {/* Ícone */}
                        <div className="flex-shrink-0 mb-6">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                            <div className="relative p-4 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl border border-primary/30 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300 inline-flex">
                              {differential.icon}
                            </div>
                          </div>
                        </div>

                        {/* Conteúdo */}
                        <div className="flex-1 flex flex-col">
                          <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors mb-3 leading-tight">
                            {differential.title}
                          </h3>
                          <p className="text-light-muted leading-relaxed text-sm md:text-base flex-1">
                            {differential.description}
                          </p>
                          
                          {/* Indicador visual */}
                          <div className="mt-6 pt-4 border-t border-primary/10">
                            <div className="flex items-center gap-2 text-primary/60 text-xs">
                              <div className="w-1 h-1 bg-primary/60 rounded-full" />
                              <span>Diferencial ScarX</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              </div>
            </motion.div>

            {/* Botão de ação (aparece depois da animação) */}
            {isOpened && (
              <motion.div 
                className="mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.5 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/quiz"
                    className="btn-primary inline-flex items-center gap-3"
                  >
                    <Brain className="w-5 h-5" />
                    Descobrir Meu Plano Ideal
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExclusiveDifferentials;
