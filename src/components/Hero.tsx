import React, { useState, useRef } from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Play } from 'lucide-react';
import Plyr from 'plyr-react';
import 'plyr-react/plyr.css';

const Hero: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [showOverlay, setShowOverlay] = useState(true);
  const [showPlyr, setShowPlyr] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const plyrRef = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any

  const handleActivateSound = () => {
    if (videoRef.current && !showPlyr) {
      setShowOverlay(false);
      setShowPlyr(true);
      
      // Aguardar o Plyr renderizar e começar do início
      setTimeout(() => {
        if (plyrRef.current?.plyr?.media) {
          const plyrVideo = plyrRef.current.plyr.media;
          plyrVideo.currentTime = 0; // Sempre começar do início
          plyrVideo.muted = false;
          plyrVideo.volume = 1.0;
          plyrVideo.play();
        }
      }, 100);
    }
  };

  const plyrOptions = {
    controls: [
      'play-large', 
      'play', 
      'progress', 
      'current-time', 
      'duration', 
      'mute', 
      'volume', 
      'fullscreen'
    ],
    autoplay: false,
    muted: false,
    loop: { active: true },
    hideControls: false,
    clickToPlay: true,
    keyboard: { focused: true, global: false },
    tooltips: { controls: true, seek: true },
    captions: { active: false, language: 'auto', update: false },
    fullscreen: { enabled: true, fallback: true, iosNative: false },
    storage: { enabled: true, key: 'plyr' },
    speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 2] },
    quality: { default: 720, options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240] },
    volume: 1,
  };



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
              {/* Botão bonito: Ver Planos */}
              <Link
                to="plans"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                className="btn-primary w-full sm:w-auto cursor-pointer"
              >
                Ver Planos
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Botão simples: Faça o Quiz personalizado */}
              <a
                href="/quiz"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/30 text-white hover:bg-white/10 font-medium py-3 sm:py-4 px-6 sm:px-8 rounded-xl text-base sm:text-lg transition-all duration-300"
              >
                Faça o Quiz personalizado
              </a>
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

          {/* Coluna da direita - Vídeo com Plyr */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="hidden lg:flex justify-center lg:justify-start relative"
          >
            {/* Container do vídeo limpo */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl">
                <div className="w-full max-w-xl lg:max-w-2xl xl:max-w-4xl 2xl:max-w-6xl">
                  
                  {/* Vídeo HTML5 nativo - sempre rodando de fundo */}
                  {!showPlyr && (
                    <video
                      ref={videoRef}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-auto object-cover rounded-2xl"
                    >
                      <source src="/videohero.mp4" type="video/mp4" />
                    </video>
                  )}
                  
                  {/* Plyr - aparece apenas após clique */}
                  {showPlyr && (
                    <Plyr
                      ref={plyrRef}
                      source={{
                        type: 'video',
                        sources: [
                          {
                            src: '/videohero.mp4',
                            type: 'video/mp4',
                          },
                        ],
                      }}
                      options={plyrOptions}
                    />
                  )}
                  
                  {/* Overlay customizado */}
                  {showOverlay && (
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] cursor-pointer rounded-2xl z-10"
                         onClick={handleActivateSound}>
                      
                      {/* Botão de Play centralizado */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 hover:bg-white transition-all duration-300 hover:scale-110 shadow-2xl">
                          <Play className="w-8 h-8 text-black ml-1" fill="currentColor" />
                        </div>
                      </div>
                      
                      {/* Texto "ATIVAR SOM" no canto superior direito */}
                      <div className="absolute top-4 right-4">
                        <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-xl">
                          <span className="text-black font-bold text-sm tracking-wide">
                            ATIVAR SOM
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;