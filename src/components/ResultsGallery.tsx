import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star } from 'lucide-react';

// Componente para as estatísticas com animação lenta
const AnimatedStats: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [stats, setStats] = useState({
    lives: 0,
    years: 0,
    success: 0
  });

  const [animationComplete, setAnimationComplete] = useState({
    lives: false,
    years: false,
    success: false
  });

  useEffect(() => {
    if (!inView) return;

    // Animação bem lenta dos valores
    const duration = 4000; // 4 segundos para completar
    const steps = 120; // 120 passos para suavidade
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      const newLives = Math.floor(1200 * progress);
      const newYears = Math.floor(10 * progress);
      const newSuccess = Math.floor(98 * progress);

      setStats({
        lives: newLives,
        years: newYears,
        success: newSuccess
      });

      // Verificar se cada animação terminou
      setAnimationComplete(prev => ({
        lives: prev.lives || newLives >= 1200,
        years: prev.years || newYears >= 10,
        success: prev.success || newSuccess >= 98
      }));

      if (currentStep >= steps) {
        clearInterval(interval);
        // Garantir que os valores finais sejam exatos
        setStats({
          lives: 1200,
          years: 10,
          success: 98
        });
        // Marcar todas as animações como completas
        setAnimationComplete({
          lives: true,
          years: true,
          success: true
        });
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="mt-20 pt-16 border-t border-neutral-800"
    >
      <div className="text-center mb-8">
        <h3 className="text-xl md:text-2xl font-bold text-light mb-3">
          Números que Comprometem
        </h3>
        <p className="text-base text-light-muted max-w-2xl mx-auto">
          Resultados reais de uma metodologia que transforma vidas todos os dias
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-8">
        <div className="text-center">
          <div className={`text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 transition-colors duration-300 ${
            animationComplete.lives ? 'text-primary' : 'text-gray-400'
          }`}>
            {stats.lives}+
          </div>
          <div className="text-xs sm:text-sm text-light-muted">
            Vidas Transformadas
          </div>
        </div>
        
        <div className="text-center">
          <div className={`text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 transition-colors duration-300 ${
            animationComplete.years ? 'text-primary' : 'text-gray-400'
          }`}>
            {stats.years} anos
          </div>
          <div className="text-xs sm:text-sm text-light-muted">
            De Experiência
          </div>
        </div>
        
        <div className="text-center">
          <div className={`text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 transition-colors duration-300 ${
            animationComplete.success ? 'text-primary' : 'text-gray-400'
          }`}>
            {stats.success}%
          </div>
          <div className="text-xs sm:text-sm text-light-muted">
            Taxa de Sucesso
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ResultsGallery: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Array completo com todas as transformações disponíveis
  const transformations = [
    {
      name: "Heitor",
      before: "images/antes/heitorantes.jpeg",
      after: "images/antes/heitordepois.jpeg",
      testimonial: "Pensei que seria impossível, mas com o acompanhamento certo consegui transformar meu corpo."
    },
    {
      name: "Peter Jordan",
      before: "images/peterantes.png",
      after: "images/peterdepois.png",
              testimonial: "Nunca pensei que conseguiria mudar tanto em tão pouco tempo! A ScarX me provou que é possível."
    },
    {
      name: "João Scar",
      before: "images/antes.png",
      after: "images/depois.jpeg",
      testimonial: "Nada melhor do que provar que a metodologia funciona do que aplicar ela a mim mesmo"
    },
    {
      name: "Alvaro",
      before: "images/alvaroantes.jpeg",
      after: "images/alvarodepois.jpeg",
      testimonial: "O método do João mudou minha vida. Pela primeira vez consegui um resultado real e duradouro."
    },
    {
      name: "Ricardo",
      before: "images/antes/ricardoantes.jpeg",
      after: "images/antes/ricardodepois.jpeg",
              testimonial: "A metodologia da ScarX é diferente de tudo que já experimentei. Os resultados são impressionantes!"
    },
    {
      name: "Enzo",
      before: "images/antes/felipeantes.jpeg",
      after: "images/antes/felipedepois.jpeg",
      testimonial: "O suporte diário e os ajustes constantes fizeram toda diferença na minha evolução."
    },
    {
      name: "Gabriel Schmit",
      before: "images/antes/antes1.jpeg",
      after: "images/antes/depois1.jpeg",
              testimonial: "A metodologia da ScarX mudou completamente minha vida. Os resultados falam por si!"
    },
    {
      name: "João Simas",
      before: "images/antes/antes2.png",
      after: "images/antes/depois2.png",
      testimonial: "Com dedicação e o suporte certo da equipe, consegui atingir meus objetivos!"
    }
  ];

  // Triplicar os itens para criar o efeito infinito perfeito
  const triplicatedTransformations = [...transformations, ...transformations, ...transformations];

  useEffect(() => {
    if (!inView) return;

    const itemWidth = 320 + 24; // 80*4 (w-80) + 24 (gap-6)
    const totalWidth = transformations.length * itemWidth;
    const speed = 0.3; // pixels por frame (um pouco mais lento que feedbacks)

    const animate = () => {
      setCurrentTranslate(prev => {
        const newTranslate = prev - speed;
        
        // Quando chegamos no final do primeiro conjunto, resetamos para o início do segundo
        if (Math.abs(newTranslate) >= totalWidth) {
          setTimeout(() => {
            setIsTransitioning(true);
            setCurrentTranslate(0);
            setTimeout(() => setIsTransitioning(false), 50);
          }, 0);
          return newTranslate;
        }
        
        return newTranslate;
      });
    };

    const animationId = setInterval(animate, 16); // ~60fps

    return () => clearInterval(animationId);
  }, [inView, transformations.length]);

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

  return (
    <section className="section-padding section-transition" ref={ref}>
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <h2 className="text-primary mb-6">
              Transformações Reais
            </h2>
            <p className="text-xl text-light-muted max-w-3xl mx-auto">
              Resultados que falam por si. Cada transformação é uma história de superação e dedicação.
            </p>
          </motion.div>

          {/* Infinite Carousel */}
          <motion.div variants={itemVariants} className="relative overflow-hidden">
            <div 
              ref={containerRef}
              className="flex gap-6"
              style={{
                transform: `translateX(${currentTranslate}px)`,
                transition: isTransitioning ? 'none' : 'transform 0.1s ease-out',
                willChange: 'transform'
              }}
            >
              {triplicatedTransformations.map((transformation, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-80"
                >
                  <div className="glass-effect rounded-2xl border border-neutral-800 overflow-hidden">
                    {/* Images */}
                    <div className="grid grid-cols-2">
                      <div className="relative">
                        <img 
                          src={transformation.before} 
                          alt={`${transformation.name} antes`}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute bottom-2 left-2 bg-dark/80 backdrop-blur-sm text-light px-2 py-1 rounded text-xs">
                          Antes
                        </div>
                      </div>
                      <div className="relative">
                        <img 
                          src={transformation.after} 
                          alt={`${transformation.name} depois`}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute bottom-2 right-2 bg-primary text-dark px-2 py-1 rounded text-xs font-semibold">
                          Depois
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-light">{transformation.name}</h3>
                      <p className="text-light-muted text-sm leading-relaxed italic">
                        "{transformation.testimonial}"
                      </p>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-1 mt-4 text-primary">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Estatísticas com animação lenta */}
          <AnimatedStats />

        </motion.div>
      </div>
    </section>
  );
};

export default ResultsGallery;