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
        
        {/* Imagem - maior para aparecer mais */}
        <div className="relative h-52 md:h-56 overflow-hidden flex-shrink-0">
          <img 
            src={card.image} 
            alt={card.imageAlt}
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
              card.id === 'scarx' ? 'object-top' : 'object-center'
            }`}
          />
          {/* Overlay sutil */}
          <div className={`absolute inset-0 bg-gradient-to-t ${card.id === 'scarx' ? 'from-primary/20' : 'from-neutral-900/40'} to-transparent`} />
        </div>
        
        {/* Conteúdo - um pouco menor */}
        <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="text-center mb-4">
              <h3 className={`text-xl md:text-2xl font-bold ${card.titleColor} mb-3`}>
                {card.title}
              </h3>
              <div className={`w-14 h-1 ${card.dividerColor} mx-auto rounded-full`} />
            </div>
            
            <div className="space-y-2 text-center">
              {card.content.map((text, index) => (
                <p key={index} className={`text-sm md:text-base ${card.textColor} font-medium`}>
                  {text}
                </p>
              ))}
            </div>
          </div>
          
          {/* Ícones representativos */}
          <div className="flex justify-center items-center gap-3 mt-5">
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
          className="max-w-6xl mx-auto"
        >
          {/* Header - mesmo tamanho do ResultsGallery */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-primary mb-6">
              95% dos profissionais prescrevem o mesmo plano para corpos diferentes.
            </h2>
            <p className="text-xl text-light max-w-3xl mx-auto">
              A escolha é sua: continuar com métodos genéricos ou experimentar a metodologia ScarX.
            </p>
          </motion.div>

          {/* Layout Desktop - duas colunas */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-6 lg:gap-10 mb-12">
            {/* Coluna: Métodos Tradicionais */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="text-left">
                <h3 className="text-2xl font-semibold text-white">Métodos Tradicionais</h3>
                <div className="w-16 h-1 bg-white/20 mt-3 rounded-full" />
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#111111] border border-white/10">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/70">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3h18v18H3z"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white">Protocolos Genéricos</p>
                    <p className="text-white/60">Métodos que não consideram sua individualidade</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#111111] border border-white/10">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/70">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white">Falta de Acompanhamento</p>
                    <p className="text-white/60">Você fica sozinho após receber o plano</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#111111] border border-white/10">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/70">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/></svg>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white">Resultados Temporários</p>
                    <p className="text-white/60">Transformações que não se sustentam</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Coluna: Metodologia ScarFit */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="text-left">
                <h3 className="text-2xl font-semibold text-primary">Metodologia ScarX</h3>
                <div className="w-16 h-1 bg-primary mt-3 rounded-full" />
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#0b0b0b] border border-primary/20">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white">100% Personalizado</p>
                    <p className="text-white/70">Protocolos únicos para seu biotipo e rotina</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#0b0b0b] border border-primary/20">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4"/><path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/></svg>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white">Suporte Contínuo</p>
                    <p className="text-white/70">Equipe multidisciplinar disponível diariamente</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#0b0b0b] border border-primary/20">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 17l6-6 4 4 8-8"/></svg>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white">Transformação Duradoura</p>
                    <p className="text-white/70">Mudanças que se mantêm para toda a vida</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Layout Mobile - Carrossel */}
          <div className="lg:hidden mb-12">
            <div className="relative">
              {/* Conteúdo do carrossel */}
              <div className="min-h-[500px]">
                <motion.div
                  key={currentCard}
                  initial={{ opacity: 0, x: currentCard === 0 ? -100 : 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: currentCard === 0 ? 100 : -100 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);
                    if (swipe < -swipeConfidenceThreshold) {
                      setCurrentCard(currentCard === 0 ? 1 : 0);
                    } else if (swipe > swipeConfidenceThreshold) {
                      setCurrentCard(currentCard === 1 ? 0 : 1);
                    }
                  }}
                  className="w-full px-4"
                >
                  {currentCard === 0 ? (
                    /* Card: Métodos Tradicionais */
                    <div className="space-y-4">
                      <div className="text-center">
                        <h3 className="text-2xl font-semibold text-white">Métodos Tradicionais</h3>
                        <div className="w-16 h-1 bg-white/20 mt-3 mx-auto rounded-full" />
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#111111] border border-white/10">
                          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/70 flex-shrink-0">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3h18v18H3z"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
                          </div>
                          <div>
                            <p className="text-lg font-semibold text-white">Protocolos Genéricos</p>
                            <p className="text-white/60 text-sm">Métodos que não consideram sua individualidade</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#111111] border border-white/10">
                          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/70 flex-shrink-0">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                          </div>
                          <div>
                            <p className="text-lg font-semibold text-white">Falta de Acompanhamento</p>
                            <p className="text-white/60 text-sm">Você fica sozinho após receber o plano</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#111111] border border-white/10">
                          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/70 flex-shrink-0">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/></svg>
                          </div>
                          <div>
                            <p className="text-lg font-semibold text-white">Resultados Temporários</p>
                            <p className="text-white/60 text-sm">Transformações que não se sustentam</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Card: Metodologia ScarFit */
                    <div className="space-y-4">
                      <div className="text-center">
                        <h3 className="text-2xl font-semibold text-primary">Metodologia ScarX</h3>
                        <div className="w-16 h-1 bg-primary mt-3 mx-auto rounded-full" />
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#0b0b0b] border border-primary/20">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                          </div>
                          <div>
                            <p className="text-lg font-semibold text-white">100% Personalizado</p>
                            <p className="text-white/70 text-sm">Protocolos únicos para seu biotipo e rotina</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#0b0b0b] border border-primary/20">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4"/><path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/></svg>
                          </div>
                          <div>
                            <p className="text-lg font-semibold text-white">Suporte Contínuo</p>
                            <p className="text-white/70 text-sm">Equipe multidisciplinar disponível diariamente</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#0b0b0b] border border-primary/20">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 17l6-6 4 4 8-8"/></svg>
                          </div>
                          <div>
                            <p className="text-lg font-semibold text-white">Transformação Duradoura</p>
                            <p className="text-white/70 text-sm">Mudanças que se mantêm para toda a vida</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Indicadores de navegação */}
              <div className="flex justify-center mt-6 gap-2">
                <button
                  onClick={() => setCurrentCard(0)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentCard === 0 ? 'bg-white w-8' : 'bg-white/30'
                  }`}
                  aria-label="Métodos Tradicionais"
                />
                <button
                  onClick={() => setCurrentCard(1)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentCard === 1 ? 'bg-primary w-8' : 'bg-white/30'
                  }`}
                  aria-label="Metodologia ScarX"
                />
              </div>
            </div>
          </div>

          {/* CTA de transição */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="inline-flex items-center gap-4 rounded-2xl px-6 py-4 border border-primary/20 bg-primary/5">
              <div className="w-3 h-3 bg-primary rounded-full" />
              <span className="text-light font-medium text-base">
                Descubra como nossa metodologia funciona na prática
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TransformationJourney;