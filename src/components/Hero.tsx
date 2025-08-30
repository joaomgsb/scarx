import React from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';

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
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-16 sm:pt-24"
      ref={ref}
    >
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videoteste.mp4" type="video/mp4" />
        </video>
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
      </div>

      {/* Subtle visual elements overlay */}
      <div className="absolute top-1/4 left-1/4 w-32 md:w-64 h-32 md:h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-48 md:w-96 h-48 md:h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 h-full flex items-center px-4 md:px-24 lg:px-28 w-full">
        {/* Container para duas colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          
          {/* Coluna da esquerda - Texto */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-left max-w-2xl"
          >
            {/* Headline principal */}
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-medium mb-4 leading-tight"
            >
              <span className="text-white">Você é </span>
              <span className="text-primary">único</span>
              <span className="text-white">. Seu </span>
              <span className="text-primary">plano</span>
              <span className="text-white"> também precisa ser.</span>
            </motion.h1>
            
            {/* Subtítulo */}
            <motion.p 
              variants={itemVariants}
              className="text-base sm:text-xl md:text-2xl text-gray-200 mb-6 leading-relaxed"
            >
              A fórmula feita para o seu corpo, calibrada ao ritmo da sua vida.
            </motion.p>

            {/* Country Flags */}
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
              <img src="/svg/brasil.svg" alt="Brasil" className="w-5 h-4 opacity-80 hover:opacity-100 transition-opacity" />
              <img src="/svg/uruguai.svg" alt="Uruguai" className="w-5 h-4 opacity-80 hover:opacity-100 transition-opacity" />
              <img src="/svg/chile.svg" alt="Chile" className="w-5 h-4 opacity-80 hover:opacity-100 transition-opacity" />
              <img src="/svg/EUA.svg" alt="Estados Unidos" className="w-5 h-4 opacity-80 hover:opacity-100 transition-opacity" />
              <img src="/svg/portugal.svg" alt="Portugal" className="w-5 h-4 opacity-80 hover:opacity-100 transition-opacity" />
            </motion.div>
            
            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-6">
              <Link
                to="plans"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 border-2 border-yellow-500 text-yellow-500 hover:scale-105 font-medium py-3 sm:py-4 px-6 sm:px-8 rounded-xl text-base sm:text-lg transition-all duration-300 group cursor-pointer"
              >
                Ver Resultados Reais
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            
            {/* Indicadores de qualidade - mais discretos */}
            <motion.div variants={itemVariants} className="flex flex-row gap-2 sm:gap-8 text-white/80">
              <div>
                <div className="text-xl sm:text-2xl font-medium text-primary">1200+</div>
                <div className="text-xs sm:text-sm">Vidas Transformadas</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-medium text-primary">10 anos</div>
                <div className="text-xs sm:text-sm">De Experiência</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-medium text-primary">98%</div>
                <div className="text-xs sm:text-sm">Taxa de Sucesso</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Coluna da direita - Imagem */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex justify-center lg:justify-start relative"
          >
            {/* Efeito de brilho de fundo */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-yellow-500/10 to-primary/20 rounded-full blur-3xl opacity-50 animate-pulse"></div>
            
            {/* Container da imagem com efeitos */}
            <div className="relative group">
              {/* Anel de brilho animado */}
              <div className="absolute -inset-2 bg-gradient-to-r from-primary via-yellow-500 to-primary rounded-full opacity-20 group-hover:opacity-40 blur-lg animate-spin-slow transition-opacity duration-500"></div>
              
              <motion.img 
                src="/images/hero.png" 
                alt="Hero ScarX" 
                className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl h-auto object-contain transform transition-all duration-500 hover:scale-105 hover:rotate-1 filter hover:brightness-110 hover:contrast-110"
                whileHover={{ 
                  scale: 1.05,
                  rotate: 1,
                  filter: "brightness(1.1) contrast(1.1) drop-shadow(0 20px 40px rgba(255, 193, 7, 0.3))"
                }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  y: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              />
              
              {/* Partículas flutuantes */}
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full opacity-60 animate-ping"></div>
              <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-yellow-500 rounded-full opacity-80 animate-pulse"></div>
              <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-primary rounded-full opacity-40 animate-bounce"></div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;