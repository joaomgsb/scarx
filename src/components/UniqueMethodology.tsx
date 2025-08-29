import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, CheckCircle, Sparkles, Star } from 'lucide-react';

const UniqueMethodology: React.FC = () => {
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

  const methodologyFeatures = [
    "100% Sob medida: Criamos métodos que respeitam sua individualidade",
    "Acompanhamento diário: Contato com toda a equipe via WhatsApp",
    "Base Científica: Nível de eficiência que você não encontra no Brasil.",
    "Equipe Multidisciplinar: Personal Trainers, Nutricionistas, Fisioterapeutas e Psicólogos",
    "Ajustes Constantes: Adaptação sempre que precisar sem custo extra.",
            "Aplicativo ScarX PRO: treinos em vídeo, dieta detalhada e acompanhamento direto no seu celular.",
  ];

  const outrosProblemas = [
    "Protocolos genéricos que não se adaptam à sua rotina",
    "Consulta cara com cada profissional separadamente",
    "Falta de acompanhamento após a primeira consulta",
    "Métodos ultrapassados sem base científica",
    "Cobranças extras para qualquer ajuste no plano",
    "Planilhas confusas e difíceis de seguir"
  ];

  return (
    <section id="unique-methodology" className="relative py-12 sm:py-16 md:py-24 bg-gradient-to-br from-dark via-dark-lighter to-dark text-white overflow-hidden" ref={ref}>
      {/* Background Effects Premium */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
        <div className="absolute top-1/4 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 md:w-96 h-72 md:h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
      </div>

      <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <motion.div variants={itemVariants} className="relative">
            <div className="relative w-full mb-8 md:mb-10 px-4 sm:px-0">
              <div className="absolute inset-0 flex items-center px-4 sm:px-0">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
              </div>
              <div className="relative flex justify-center">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-full px-4 md:px-6 py-2">
                  <Star className="w-4 md:w-5 h-4 md:h-5 text-primary" />
                  <span className="text-primary font-semibold text-xs md:text-sm uppercase tracking-wider">
                    METODOLOGIA ÚNICA
                  </span>
                  <Sparkles className="w-4 md:w-5 h-4 md:h-5 text-primary" />
                </div>
              </div>
            </div>
            
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent leading-tight px-4 sm:px-0">
              O que nos torna diferentes
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-base sm:text-lg md:text-xl text-light-gray max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Veja lado a lado por que a ScarX é a escolha certa para sua transformação
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 max-w-6xl mx-auto"
        >
          {/* Coluna Outros Profissionais */}
          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-red-500/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
            
            <div className="relative bg-gradient-to-br from-dark-lighter/90 to-dark/90 backdrop-blur-xl rounded-3xl p-5 sm:p-6 md:p-8 border border-red-500/20 hover:border-red-500/40 transition-all duration-300 h-full shadow-2xl overflow-hidden">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/20 to-red-500/10 border border-red-500/30 rounded-full px-6 py-2 mb-4">
                  <X className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 font-semibold text-sm uppercase tracking-wider">
                    Outros Profissionais
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Abordagem Comum</h3>
                <p className="text-light-gray">O que você encontra no mercado</p>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                {outrosProblemas.map((problema, index) => (
                  <div key={index} className="flex items-start gap-3 group/item hover:bg-red-500/5 p-2 sm:p-3 rounded-lg transition-all duration-300">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500/30 to-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 border border-red-500/30 group-hover/item:scale-110 transition-transform duration-300">
                      <X className="w-4 h-4 text-red-400" />
                    </div>
                    <p className="text-light-gray text-sm sm:text-base font-medium methodology-text group-hover/item:text-white transition-colors duration-300">{problema}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Coluna ScarX */}
          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
            
            <div className="relative bg-gradient-to-br from-dark-lighter/90 to-dark/90 backdrop-blur-xl rounded-3xl p-5 sm:p-6 md:p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300 h-full shadow-2xl overflow-hidden">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-full px-6 py-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                    ScarX
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 methodology-text">Nossa Metodologia Única</h3>
                <p className="text-light-gray">Ecossistema completo em um só lugar</p>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                {methodologyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 group/item hover:bg-primary/5 p-2 sm:p-3 rounded-lg transition-all duration-300">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-dark text-black flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg group-hover/item:scale-110 transition-transform duration-300 font-bold text-sm border border-primary/30">
                      {index + 1}
                    </div>
                    <p className="text-light-gray text-sm sm:text-base font-medium methodology-text group-hover/item:text-white transition-colors duration-300">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Final */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-br from-dark-lighter/90 to-dark/90 backdrop-blur-xl rounded-2xl p-5 sm:p-6 md:p-8 border border-primary/20 max-w-3xl mx-3 sm:mx-auto">
              <h4 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">A Diferença Está nos Detalhes</h4>
              <p className="text-white text-sm sm:text-base mb-4 sm:mb-6">
                Enquanto outros oferecem serviços isolados, nós criamos um ecossistema completo 
                para sua transformação. Tudo integrado, tudo personalizado, tudo focado em você.
              </p>
              <div className="inline-flex items-center gap-2 text-primary font-semibold">
                <span>Descubra nossa metodologia completa</span>
                <CheckCircle className="w-5 h-5" />
              </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UniqueMethodology;