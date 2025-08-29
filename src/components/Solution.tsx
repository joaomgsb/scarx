import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-scroll';
import { CheckCircle, Sparkles, Star } from 'lucide-react';

const Solution: React.FC = () => {
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

  const benefits = [
    "Protocolos 100% personalizados, desenhados para sua individualidade e rotina",
    "Acompanhamento diário e ajustes contínuos para garantir sua evolução constante",
    "Metodologia baseada em ciência, com resultados comprovados e duradouros",
    "Equipe multidisciplinar completa (personal, nutri, fisio) para uma abordagem 360º",
    "Flexibilidade total: planos que se adaptam à sua vida, não o contrário",
    "Foco em resultados sustentáveis, para que sua transformação seja para sempre"
  ];

  return (
    <section className="relative py-20 md:py-24 bg-gradient-to-br from-dark via-dark-lighter to-dark text-white overflow-hidden" ref={ref}>
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
          className="flex flex-col lg:flex-row gap-12 items-center"
        >
          <div className="lg:w-1/2 relative">
            {/* Container do GIF com efeitos visuais premium */}
            <motion.div variants={itemVariants} className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-3xl blur-xl" />
              
              <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-primary/30">
                {/* Vídeo de fundo */}
                <video
                  src="/videos/videosite.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover rounded-3xl"
                  style={{ pointerEvents: 'none' }}
                >
                  Seu navegador não suporta vídeos HTML5.
                </video>
                
                {/* Overlay sutil para melhor legibilidade e integração visual */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-dark/30 rounded-3xl" />
                
                {/* Borda com glow effect */}
                <div className="absolute inset-0 rounded-3xl border-2 border-primary/40 shadow-lg shadow-primary/30" />
              </div>
            </motion.div>
          </div>
          
          <div className="lg:w-1/2">
            <motion.div variants={itemVariants} className="relative">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-full px-4 md:px-6 py-2 mb-4 md:mb-6">
                <Star className="w-4 md:w-5 h-4 md:h-5 text-primary" />
                <span className="text-primary font-semibold text-xs md:text-sm uppercase tracking-wider">
                  A RESPOSTA DEFINITIVA
                </span>
                <Sparkles className="w-4 md:w-5 h-4 md:h-5 text-primary" />
              </div>
            </motion.div>
            
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent leading-tight">
              A ScarX é a Resposta Definitiva para Seus Desafios de Transformação
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-light-gray mb-8 text-lg leading-relaxed">
              Cansado de métodos que não se encaixam na sua vida? A ScarX oferece uma abordagem única, 
              combinando ciência de ponta e personalização extrema para garantir que sua jornada de transformação 
              seja eficaz, sustentável e adaptada à sua realidade.
            </motion.p>
            
            <motion.div variants={containerVariants} className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div key={index} variants={itemVariants} className="flex items-start gap-3 group">
                  <div className="p-1 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300 mt-1">
                    <CheckCircle className="text-primary h-5 w-5" />
                  </div>
                  <p className="text-light-gray leading-relaxed group-hover:text-white transition-colors duration-300">{benefit}</p>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Link
                to="contact"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                className="btn-primary text-center inline-flex items-center gap-3 text-lg px-8 py-4 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/30"
              >
                <Sparkles className="w-6 h-6" />
                Quero Minha Melhor Versão!
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Solution;