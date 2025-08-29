import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';


const TransformationJourney: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [currentCard, setCurrentCard] = useState(0);

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

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setCurrentCard((prev) => (prev + newDirection + 2) % 2);
  };

  const cards = [
    {
      id: 'traditional',
      title: 'MÉTODOS TRADICIONAIS:',
      image: '/images/triste.png',
      imageAlt: 'Profissional insatisfeito com métodos tradicionais',
      borderColor: 'border-neutral-700',
      bgGradient: 'from-neutral-800/80 to-neutral-900/90',
      hoverBorder: 'group-hover:border-neutral-600',
      hoverShadow: 'group-hover:shadow-neutral-900/50',
      titleColor: 'text-neutral-300',
      dividerColor: 'bg-neutral-600',
      textColor: 'text-neutral-400',
      iconBg: 'bg-neutral-700',
      iconColor: 'text-neutral-400',
      content: [
        'Protocolos genéricos que não consideram sua individualidade',
        'Falta de acompanhamento personalizado e suporte contínuo',
        'Resultados temporários que não se sustentam no longo prazo'
      ],
      icons: [
        <svg key="1" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>,
        <svg key="2" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>,
        <svg key="3" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ]
    },
    {
      id: 'scarx',
      title: 'METODOLOGIA SCARX:',
      image: '/images/feliz.jpg',
      imageAlt: 'Profissional satisfeito com metodologia ScarX',
      borderColor: 'border-primary/30',
      bgGradient: 'from-primary/10 via-primary/5 to-dark/90',
      hoverBorder: 'group-hover:border-primary/50',
      hoverShadow: 'group-hover:shadow-primary/20',
      titleColor: 'text-primary',
      dividerColor: 'bg-primary',
      textColor: 'text-light',
      iconBg: 'bg-primary',
      iconColor: 'text-dark',
      content: [
        'Protocolos 100% personalizados para seu biotipo e rotina',
        'Acompanhamento diário com equipe multidisciplinar especializada',
        'Transformações duradouras que se mantêm para toda a vida'
      ],
      icons: [
        <svg key="1" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>,
        <svg key="2" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>,
        <svg key="3" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ]
    }
  ];

  const renderCard = (card: typeof cards[0]) => (
    <div className="relative group h-full">
      <div className={`relative overflow-hidden rounded-2xl border-2 ${card.borderColor} bg-gradient-to-br ${card.bgGradient} backdrop-blur-sm transition-all duration-500 ${card.hoverBorder} ${card.hoverShadow} h-full flex flex-col`}>
        {/* Efeito de brilho sutil para ScarX */}
        {card.id === 'scarx' && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        )}
        
        {/* Imagem */}
        <div className="relative h-48 md:h-56 overflow-hidden flex-shrink-0">
          <img 
            src={card.image} 
            alt={card.imageAlt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Overlay sutil */}
          <div className={`absolute inset-0 bg-gradient-to-t ${card.id === 'scarx' ? 'from-primary/20' : 'from-neutral-900/40'} to-transparent`} />
        </div>
        
        {/* Conteúdo */}
        <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
          <div>
            <div className="text-center mb-4">
              <h3 className={`text-2xl md:text-3xl font-bold ${card.titleColor} mb-3`}>
                {card.title}
              </h3>
              <div className={`w-16 h-1 ${card.dividerColor} mx-auto rounded-full`} />
            </div>
            
            <div className="space-y-3 text-center">
              {card.content.map((text, index) => (
                <p key={index} className={`text-base md:text-lg ${card.textColor} font-medium`}>
                  {text}
                </p>
              ))}
            </div>
          </div>
          
          {/* Ícones representativos */}
          <div className="flex justify-center items-center gap-4 mt-6">
            {card.icons.map((icon, index) => (
              <div key={index} className={`p-2 rounded-full ${card.iconBg} ${card.iconColor}`}>
                {icon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="section-padding section-transition relative overflow-hidden" ref={ref}>
      {/* Background com gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/50 via-dark to-neutral-800/30" />
      
      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 leading-tight">
              95% dos profissionais prescrevem o mesmo plano para corpos diferentes.
            </h2>
            <p className="text-lg md:text-xl text-light-muted max-w-3xl mx-auto leading-relaxed">
              A escolha é sua: continuar com métodos genéricos ou experimentar a metodologia ScarX.
            </p>
          </motion.div>

          {/* Desktop Layout - Grid */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-6 lg:gap-8 mb-12">
            {cards.map((card, index) => (
              <motion.div key={card.id} variants={cardVariants}>
                {renderCard(card)}
              </motion.div>
            ))}
          </div>

          {/* Mobile Layout - Carousel */}
          <div className="lg:hidden mb-12">
            <div className="relative">
              {/* Carousel Container */}
              <div className="relative overflow-hidden rounded-2xl">
                <motion.div
                  key={currentCard}
                  custom={currentCard}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);
                    if (swipe < -swipeConfidenceThreshold) {
                      paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                      paginate(-1);
                    }
                  }}
                  className="w-full"
                >
                  {renderCard(cards[currentCard])}
                </motion.div>
              </div>



              {/* Dots Indicator */}
              <div className="flex justify-center mt-4 gap-2">
                {cards.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentCard(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentCard === index ? 'bg-primary w-6' : 'bg-neutral-600'
                    }`}
                    aria-label={`Ir para card ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* CTA de transição */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="inline-flex items-center gap-4 glass-effect rounded-2xl px-6 py-4 border border-primary/20 bg-primary/5">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
              <span className="text-light font-medium text-base">
              Entre performance e estilo de vida, prefira os dois.
              </span>
            </div>
            <p className="text-light-muted mt-3 text-base">
              Descubra como nossa abordagem personalizada pode transformar sua vida.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TransformationJourney;