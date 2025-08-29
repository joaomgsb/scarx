import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const HeroVideo: React.FC = () => {
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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const features = [
    "NUTRIÇÃO",
    "EXERCÍCIOS", 
    "SAÚDE",
    "LIFESTYLE",
    "ACOMPANHAMENTO"
  ];

  const scrollToElitePlan = () => {
    const element = document.getElementById('elite-plan');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="relative h-[80vh] overflow-hidden" ref={ref}>
      {/* Vídeo de fundo */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/video2.mp4" type="video/mp4" />
          Seu navegador não suporta vídeos.
        </video>
        
        {/* Overlay escuro para melhorar legibilidade */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

                           {/* Conteúdo sobre o vídeo */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="max-w-4xl mx-auto flex flex-col items-center justify-center h-full -mt-20"
          >
                      {/* Logo e Branding */}
            <motion.div variants={itemVariants} className="mb-8">
             <div>
                               <div className="flex justify-center">
                  <img 
                    src="/images/scarx.png" 
                    alt="SCARX Logo" 
                    className="h-20 md:h-32 lg:h-40 object-contain"
                  />
                </div>
                                <p className="text-xl md:text-2xl text-light font-medium -mt-12 mb-2">
                  PERSONAL TRAINING
                </p>
                <p className="text-lg md:text-xl text-primary font-semibold">
                  THE EXECUTIVE FIT LIFESTYLE
                </p>
             </div>
           </motion.div>

          {/* Lista de características */}
          <motion.div variants={itemVariants} className="mb-0">
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-light text-sm md:text-base font-medium">
              {features.map((feature, index) => (
                <React.Fragment key={feature}>
                  <span className="hover:text-primary transition-colors duration-300 cursor-pointer">
                    {feature}
                  </span>
                  {index < features.length - 1 && (
                    <span className="text-primary">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default HeroVideo; 