import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sparkles, Star } from 'lucide-react';

const Feedbacks: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Array completo com todas as imagens de feedback disponíveis
  const feedbacks = [
    "images/feedback1.jpeg",
    "images/feedback2.jpeg", 
    "images/feedback3.jpeg",
    "images/feedback6.png",
    "images/feedback7.png",
    "images/feedback8.png",
    "images/feedback9.png",
    "images/feedback10.jpeg"
  ];

  // Triplicar os itens para criar o efeito infinito perfeito
  const triplicatedFeedbacks = [...feedbacks, ...feedbacks, ...feedbacks];

  useEffect(() => {
    if (!inView) return;

    const itemWidth = 384 + 24; // 96*4 (w-96) + 24 (gap-6)
    const totalWidth = feedbacks.length * itemWidth;
    const speed = 0.5; // pixels por frame

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
  }, [inView, feedbacks.length]);

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
    <section id="feedbacks" className="section-padding section-transition" ref={ref}>
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <motion.div variants={itemVariants} className="relative">
            {/* Card "DEPOIMENTOS REAIS" removido */}
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-primary leading-tight">
              Quando o plano é único, o resultado também é único.
            </h2>
            
            <p className="text-lg md:text-xl text-light-muted max-w-3xl mx-auto leading-relaxed">
              Veja os resultados de quem saiu dos métodos genéricos e transformou o corpo com estratégia, ciência e acompanhamento ScarX.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative overflow-hidden"
        >
          <motion.div variants={itemVariants} className="relative">
            <div 
              ref={containerRef}
              className="flex gap-6"
              style={{
                transform: `translateX(${currentTranslate}px)`,
                transition: isTransitioning ? 'none' : 'transform 0.1s ease-out',
                willChange: 'transform'
              }}
            >
              {triplicatedFeedbacks.map((feedback, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-80 md:w-96"
                >
                  <div className="h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={feedback}
                      alt={`Feedback ${(index % feedbacks.length) + 1}`}
                      className="w-full h-full object-contain bg-gradient-to-br from-neutral-900 to-neutral-800"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Feedbacks;