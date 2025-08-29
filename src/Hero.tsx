import React from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Hero: React.FC = () => {
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

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center bg-hero-pattern bg-cover bg-center"
      ref={ref}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80 z-0" />
      
      <div className="container mx-auto px-4 relative z-10 pt-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-white mb-1 leading-tight"
          >
            TRANSFORME SEU FÍSICO <br className="hidden sm:block" />
            <span className="text-primary">DE UMA VEZ POR TODAS!</span>
          </motion.h1>
          
          <motion.div variants={itemVariants} className="flex justify-center gap-1 mb-4">
            <img src="/svg/brasil.svg" alt="Brasil" className="w-4 h-4" />
            <img src="/svg/uruguai.svg" alt="Uruguai" className="w-4 h-4" />
            <img src="/svg/chile.svg" alt="Chile" className="w-4 h-4" />
            <img src="/svg/EUA.svg" alt="Estados Unidos" className="w-4 h-4" />
            <img src="/svg/portugal.svg" alt="Portugal" className="w-4 h-4" />
          </motion.div>
          
          <motion.p 
            variants={itemVariants}
            className="text-light-gray text-lg md:text-xl mb-8 max-w-2xl mx-auto"
          >
            Esqueça os protocolos genéricos. Criamos soluções 100% personalizadas que se encaixam na sua rotina e transformam de verdade o seu corpo.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <Link
              to="contact"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              className="btn-primary text-center text-lg"
            >
              Quero Minha Transformação
            </Link>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex justify-center items-center gap-2">
            <div className="h-1 w-10 bg-primary rounded-full"></div>
            <p className="text-light-off text-sm font-medium">
              Método com base científica e acompanhamento díario.
            </p>
            <div className="h-1 w-10 bg-primary rounded-full"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;