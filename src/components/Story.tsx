import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Play, Quote, Sparkles, Star } from 'lucide-react';

const Story: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  const togglePlay = () => {
    const video = document.getElementById('story-video') as HTMLVideoElement;
    
    if (!isPlaying) {
      setIsPlaying(true);
      setHasStarted(true);
      
      // Se o vídeo já existe (foi pausado), continuar tocando
      if (video && hasStarted) {
        video.play();
      }
    } else {
      if (video) {
        video.pause();
        setIsPlaying(false);
      }
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

  return (
    <section id="story" className="relative py-20 md:py-24 bg-gradient-to-br from-dark via-dark-lighter to-dark text-white overflow-hidden" ref={ref}>
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
                VEJA ESSA HISTÓRIA
              </span>
              <Sparkles className="w-4 md:w-5 h-4 md:h-5 text-primary" />
            </div>
            
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent leading-tight">
              De aluno a inspiração
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-light-gray max-w-3xl mx-auto leading-relaxed">
              Conheça a história do Peter, que transformou não apenas seu físico, mas sua vida inteira.
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="w-full lg:max-w-6xl mx-auto"
        >
          {/* Video Container sem card de fundo */}
          <motion.div variants={itemVariants} className="relative group mb-24">
            {/* Imagem de capa - tamanho normal sem cortes */}
            {!hasStarted && (
              <div className="relative w-full max-w-4xl mx-auto">
                <img
                  src="/images/peterscarfit.jpg"
                  alt="Peter Jordan - Transformação ScarX"
                  className="w-full h-auto rounded-2xl md:rounded-3xl shadow-2xl border border-primary/40"
                />
              </div>
            )}
            
            {/* Vídeo - formato 9:16 */}
            {hasStarted && (
              <div className="relative w-full max-w-md mx-auto bg-transparent" style={{ aspectRatio: '9/16' }}>
                <video
                  id="story-video"
                  src="/videos/mockup.mp4"
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl md:rounded-3xl"
                  playsInline
                  autoPlay
                  onEnded={handleVideoEnd}
                  onClick={togglePlay}
                />
              </div>
            )}
              
              {/* Botão de Play - Centralizado sem sobreposição de fundo */}
              {!isPlaying && (
                <button
                  onClick={togglePlay}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group/play"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                    <div className="relative bg-gradient-to-br from-primary to-primary-dark p-4 md:p-6 rounded-full shadow-2xl group-hover/play:scale-110 transition-transform duration-300">
                      <Play className="w-8 h-8 md:w-12 md:h-12 text-black ml-1" />
                    </div>
                  </div>
                </button>
              )}
        </motion.div>

          {/* Depoimento do Peter com Design Premium */}
          <motion.div variants={itemVariants} className="relative">
            {/* Foto do Peter posicionada acima do card */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark rounded-full blur opacity-75" />
                <img
                  src="/images/peter.png"
                  alt="Peter Jordan"
                  className="relative w-24 h-24 rounded-full object-cover border-4 border-primary shadow-2xl"
                />
              </div>
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-3xl blur-xl" />
            
            {/* Card do Depoimento */}
            <div className="relative bg-gradient-to-br from-dark-lighter/90 to-dark/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 pt-16 border border-primary/20 shadow-2xl text-center">
              {/* Ícone de Quote */}
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full">
                  <Quote className="w-8 h-8 text-primary" />
                </div>
              </div>

              {/* Nome */}
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">Peter Jordan</h3>
              
              {/* Depoimento */}
              <blockquote className="text-lg md:text-xl text-light-gray leading-relaxed italic mb-6 max-w-3xl mx-auto">
                "Os protocolos com o João é outra história. Ele adapta tudo para quem tem uma rotina casca-grossa como a minha, e o resultado sempre aparece"
              </blockquote>

              {/* Decoração inferior */}
              <div className="flex items-center justify-center gap-2">
                <div className="w-12 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"></div>
                <Star className="w-4 h-4 text-primary" />
                <div className="w-12 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"></div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Story;