import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { CheckCircle, MessageSquare, Sparkles, LineChart, Clock, Zap, Heart, CalendarClock, Crown, Star, Shield, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const ProPlus: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === benefits.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? benefits.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Touch event handlers for swipe
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left
      nextSlide();
    }

    if (touchStart - touchEnd < -75) {
      // Swipe right
      prevSlide();
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

  const benefits = [
    {
      icon: <MessageSquare className="h-5 w-5 text-primary" />,
      title: "Suporte WhatsApp 24/7",
      description: "Acesso direto à equipe sempre que precisar"
    },
    {
      icon: <Sparkles className="h-5 w-5 text-primary" />,
      title: "Gestão Personalizada",
      description: "Adaptação contínua aos seus objetivos"
    },
    {
      icon: <LineChart className="h-5 w-5 text-primary" />,
      title: "Ajustes Imediatos",
      description: "Modificações rápidas no protocolo"
    },
    {
      icon: <Heart className="h-5 w-5 text-primary" />,
      title: "Plano Alimentar PRO+",
      description: "Renovação quinzenal estratégica"
    },
    {
      icon: <CalendarClock className="h-5 w-5 text-primary" />,
      title: "Check-ins Semanais",
      description: "Acompanhamento constante da evolução"
    },
    {
      icon: <Clock className="h-5 w-5 text-primary" />,
      title: "Alinhamento Estratégico",
      description: "Estratégias exclusivas para seu biotipo"
    },
  ];

  return (
    <section id="pro-plus" className="section-padding section-transition" ref={ref}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <motion.div variants={itemVariants} className="relative">
            {/* Card "EXPERIÊNCIA PREMIUM" removido */}
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-primary leading-tight">
              Aqui sua mudança acontece com quem trata isso como prioridade.
            </h2>
            
            <p className="text-lg md:text-xl text-light-muted max-w-3xl mx-auto leading-relaxed">
              Sua transformação merece um padrão de elite, com atenção total em cada etapa.
            </p>
          </motion.div>
        </motion.div>

        {/* Main Content - Timeline Style */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Ana Spotlight */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
              <div className="relative p-8 md:p-12">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                  {/* Ana's Image */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark rounded-2xl blur-lg opacity-50" />
                      <img
                        src="images/ana.png"
                        alt="Ana Fontes - Gerente Executiva PRO+"
                        className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl object-cover shadow-2xl border-2 border-primary/40"
                      />
                      <div className="absolute -bottom-3 -right-3 bg-primary py-2 px-3 rounded-lg shadow-lg">
                        <p className="font-bold text-xs md:text-sm !text-black">Ana Fontes</p>
                        <p className="text-xs !text-black">Gerente Executiva</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Ana's Content */}
                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
                      Sua jornada não será solitária.

                    </h3>
                    
                    <p className="text-light-muted mb-6 leading-relaxed">
                      Nada de abandono no meio do caminho.
                      Eu serei a responsável por garantir atenção máxima, suporte, agilidade e motivação ilimitada durante todo seu processo.
                    </p>
                    
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-full px-4 py-2">
                      <Star className="w-4 h-4 text-primary" />
                      <span className="text-primary font-semibold text-sm">Acompanhamento Personalizado e Contínuo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Benefits Timeline */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="relative">
              {/* Mobile Carousel */}
              <div className="lg:hidden relative overflow-hidden rounded-2xl">
                <div 
                  className="flex transition-transform duration-300 ease-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {(() => {
                  // Find the maximum height needed for all cards
                  const maxHeight = Math.max(...benefits.map(b => {
                    // Approximate the height based on content length
                    const titleLines = Math.ceil(b.title.length / 30);
                    const descLines = Math.ceil(b.description.length / 50);
                    return 180 + (Math.max(titleLines - 1, 0) * 24) + (Math.max(descLines - 1, 0) * 20);
                  }));
                  
                  return benefits.map((benefit, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-2">
                      <div 
                        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-dark-accent/50 to-dark-accent/30 border border-primary/20 hover:border-primary/40 transition-all duration-300 h-full"
                        style={{ minHeight: `${maxHeight}px` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative p-6 md:p-8 h-full flex flex-col">
                          <div className="flex-1 flex flex-col">
                            <div className="flex items-start gap-6 flex-1">
                              <div className="relative flex-shrink-0">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                                <div className="relative p-4 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl border border-primary/30 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                                  <div className="text-primary">
                                    {benefit.icon}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-3">
                                  <h4 className="font-bold text-white group-hover:text-primary transition-colors text-lg md:text-xl">
                                    {benefit.title}
                                  </h4>
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <CheckCircle className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                  </div>
                                </div>
                                <p className="text-light-muted leading-relaxed text-sm md:text-base">
                                  {benefit.description}
                                </p>
                              </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-primary/10">
                              <div className="flex items-center gap-2 text-primary/60 text-xs">
                                <div className="w-1 h-1 bg-primary/60 rounded-full" />
                                <span>Incluído no PRO+</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ));
                })()}
                </div>

                {/* Navigation Arrows */}
                <button 
                  onClick={prevSlide}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-dark/80 backdrop-blur-sm border border-primary/20 hover:bg-primary/20 transition-colors"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5 text-primary" />
                </button>
                <button 
                  onClick={nextSlide}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-dark/80 backdrop-blur-sm border border-primary/20 hover:bg-primary/20 transition-colors"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5 text-primary" />
                </button>

                {/* Dots Indicator */}
                <div className="flex justify-center mt-6 gap-2">
                  {benefits.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        index === currentSlide ? 'bg-primary w-6' : 'bg-primary/30'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Desktop Grid */}
              <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="relative group"
                  >
                    <div className="ml-0 md:ml-16 lg:ml-0">
                      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-dark-accent/50 to-dark-accent/30 border border-primary/20 hover:border-primary/40 transition-all duration-300 group-hover:scale-105">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative p-6 md:p-8">
                          <div className="flex items-start gap-6">
                            <div className="relative flex-shrink-0">
                              <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                              <div className="relative p-4 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl border border-primary/30 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                                <div className="text-primary">
                                  {benefit.icon}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="font-bold text-white group-hover:text-primary transition-colors text-lg md:text-xl">
                                  {benefit.title}
                                </h4>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                  <CheckCircle className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                              </div>
                              <p className="text-light-muted leading-relaxed text-sm md:text-base">
                                {benefit.description}
                              </p>
                              <div className="mt-4 pt-4 border-t border-primary/10">
                                <div className="flex items-center gap-2 text-primary/60 text-xs">
                                  <div className="w-1 h-1 bg-primary/60 rounded-full" />
                                  <span>Incluído no PRO+</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 p-6 md:p-8">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
              <div className="relative">
                <div className="flex items-center justify-center gap-2 mb-4 md:mb-6">
                  <Shield className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  <span className="text-primary font-semibold text-base md:text-lg">Transformação Garantida</span>
                </div>
                
                <p className="text-base md:text-xl text-light-muted italic mb-6 md:mb-8 leading-relaxed max-w-3xl mx-auto">
                  Você não está assinando um plano. Está assumindo o controle do seu corpo com o método que muda não só o físico, mas a sua vida.
                </p>
                
                <a
                  href="https://wa.me/5541984961012?text=Olá! Quero contratar o Plano PRO+ - Experiência Premium da ScarFit. Estou interessado na experiência exclusiva com Ana Fontes e todos os benefícios premium."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2 md:gap-3 text-sm md:text-lg px-4 md:px-8 py-2.5 md:py-4"
                >
                  <Zap className="w-4 h-4 md:w-6 md:h-6" />
                  Iniciar Minha Transformação PRO+
                  <ArrowRight className="w-3 h-3 md:w-5 md:h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProPlus;