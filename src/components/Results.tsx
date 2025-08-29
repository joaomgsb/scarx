import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, Star, Sparkles } from 'lucide-react';

const transformations = [
  {
    name: "Heitor",
    before: "images/antes/heitorantes.jpeg",
    after: "images/antes/heitordepois.jpeg",
    highlight: "-35KG EM 8 MESES",
    testimonial: "Pensei que seria impossível, mas com o acompanhamento certo consegui transformar meu corpo."
  },
  {
    name: "Peter Jordan",
    before: "images/peterantes.png",
    after: "images/peterdepois.png",
    highlight: "TRANSFORMAÇÃO EM 90 DIAS",
            testimonial: "Nunca pensei que conseguiria mudar tanto em tão pouco tempo! A ScarX me provou que é possível."
  },
  {
    name: "João Scar",
    before: "images/antes.png",
    after: "images/depois.jpeg",
    highlight: "GANHO DE 22KG DE MASSA MAGRA",
    testimonial: "Nada melhor do que provar que a metodologia funciona do que aplicar ela a mim mesmo"
  },
  {
    name: "Alvaro",
    before: "images/alvaroantes.jpeg",
    after: "images/alvarodepois.jpeg",
    highlight: "100KG A MENOS COM O PRO+",
    testimonial: "O método do João mudou minha vida. Pela primeira vez consegui um resultado real e duradouro."
  },
  {
    name: "Ricardo",
    before: "images/antes/ricardoantes.jpeg",
    after: "images/antes/ricardodepois.jpeg",
    highlight: "TRANSFORMAÇÃO EM 6 MESES",
            testimonial: "A metodologia da ScarX é diferente de tudo que já experimentei. Os resultados são impressionantes!"
  },
  {
    name: "Enzo",
    before: "images/antes/felipeantes.jpeg",
    after: "images/antes/felipedepois.jpeg",
    highlight: "+18KG DE MASSA MAGRA",
    testimonial: "O suporte diário e os ajustes constantes fizeram toda diferença na minha evolução."
  },
  {
    name: "Gabriel Schmit",
    before: "images/antes/antes1.jpeg",
    after: "images/antes/depois1.jpeg",
    highlight: "RESULTADO EM 6 MESES",
            testimonial: "A metodologia da ScarX mudou completamente minha vida. Os resultados falam por si!"
  },
  {
    name: "João Simas",
    before: "images/antes/antes2.png",
    after: "images/antes/depois2.png",
    highlight: "TRANSFORMAÇÃO COMPLETA",
    testimonial: "Com dedicação e o suporte certo da equipe, consegui atingir meus objetivos!"
  }
];

const useCarousel = (items: any[], itemsPerView: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const totalSlides = isMobile ? items.length : Math.ceil(items.length / itemsPerView);
  const currentItems = isMobile 
    ? [items[currentIndex]]
    : items.slice(currentIndex * itemsPerView, (currentIndex + 1) * itemsPerView);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return { currentItems, next, prev, isMobile };
};

const Results: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const { currentItems, next, prev, isMobile } = useCarousel(transformations, 3);

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
    <section id="results" className="relative py-20 md:py-24 bg-gradient-to-br from-dark via-dark-lighter to-dark text-white overflow-hidden" ref={ref}>
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
              <Star className="w-4 md:w-5 h-4 md:h-5 text-primary" />
              <span className="text-primary font-semibold text-xs md:text-sm uppercase tracking-wider">
                RESULTADOS COMPROVADOS
              </span>
              <Sparkles className="w-4 md:w-5 h-4 md:h-5 text-primary" />
            </div>
            
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent leading-tight">
              Quando o plano é único, o resultado também é.
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-light-gray max-w-3xl mx-auto leading-relaxed">
              Veja os resultados de quem saiu do genérico e transformou o corpo com estratégia, ciência e acompanhamento ScarX.
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative max-w-6xl mx-auto"
        >
          <div className="relative">
            <div className="flex gap-8">
              {currentItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`relative group ${
                    isMobile ? 'w-full' : 'min-w-[calc(33.333%-1rem)] flex-1'
                  }`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                  
                  <div className="relative bg-gradient-to-br from-dark-lighter/90 to-dark/90 backdrop-blur-xl rounded-3xl border border-primary/20 hover:border-primary/40 transition-all duration-300 group-hover:scale-105 overflow-hidden shadow-2xl">
                    <div className="relative">
                      <div className="flex">
                        <div className="w-1/2 relative">
                          <img src={item.before} alt={`${item.name} antes`} className="w-full h-48 md:h-64 object-cover" />
                          <div className="absolute bottom-2 left-2 bg-dark/90 backdrop-blur-sm text-white py-1 px-3 text-sm rounded-lg border border-gray-600">
                            Antes
                          </div>
                        </div>
                        <div className="w-1/2 relative">
                          <img src={item.after} alt={`${item.name} depois`} className="w-full h-48 md:h-64 object-cover" />
                          <div className="absolute bottom-2 right-2 bg-primary/90 backdrop-blur-sm text-black py-1 px-3 text-sm rounded-lg font-semibold shadow-lg">
                            Depois
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-4 left-0 bg-gradient-to-r from-primary to-primary-dark text-black py-2 px-4 rounded-r-lg font-bold text-sm shadow-lg">
                        {item.highlight}
                      </div>

                    </div>
                    <div className="p-6 md:p-8">
                      <h4 className="text-xl md:text-2xl font-bold mb-3 text-white group-hover:text-primary transition-colors duration-300">{item.name}</h4>
                      <p className="text-light-gray italic text-sm md:text-base leading-relaxed">"{item.testimonial}"</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <button
            onClick={prev}
            className="absolute -left-6 md:-left-12 top-1/2 -translate-y-1/2 bg-gradient-to-r from-primary/90 to-primary-dark/90 hover:from-primary hover:to-primary-dark text-black p-3 md:p-4 rounded-full transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-primary/50 z-10"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          
          <button
            onClick={next}
            className="absolute -right-6 md:-right-12 top-1/2 -translate-y-1/2 bg-gradient-to-r from-primary/90 to-primary-dark/90 hover:from-primary hover:to-primary-dark text-black p-3 md:p-4 rounded-full transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-primary/50 z-10"
            aria-label="Próximo"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Results;export default Results;
