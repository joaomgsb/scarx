import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, Briefcase, Globe, Calendar, Crown, Sparkles } from 'lucide-react';

const Target: React.FC = () => {
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

  const targetProfiles = [
    {
      icon: <Briefcase className="h-10 w-10 text-primary" />,
      title: "Empresários e Executivos",
      description: "Para quem tem agendas lotadas e imprevisíveis, mas entende a importância de cuidar da saúde."
    },
    {
      icon: <Globe className="h-10 w-10 text-primary" />,
      title: "Diplomatas e Viajantes",
      description: "Adaptamos protocolos para quem está sempre em trânsito e precisa de soluções que funcionem em qualquer lugar."
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Influenciadores",
      description: "Para quem tem a imagem como parte do trabalho e precisa de resultados visíveis e sustentáveis."
    },
    {
      icon: <Calendar className="h-10 w-10 text-primary" />,
      title: "Pessoas com Rotinas Diversas",
      description: "Seja sua rotina tranquila ou caótica, nosso método se adapta à sua realidade para garantir resultados."
    }
  ];

  return (
    <section id="target" className="relative py-20 md:py-24 bg-gradient-to-br from-dark via-dark-lighter to-dark text-white overflow-hidden" ref={ref}>
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
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-full px-6 py-2 mb-6">
              <Crown className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                PARA QUEM É A SCARX?
              </span>
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent leading-tight">
              Nossa consultoria é para você
              <br />
              <span className="text-primary">que busca uma transformação real</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-light-gray max-w-3xl mx-auto leading-relaxed">
              A ScarX foi desenvolvida para atender pessoas exigentes, que valorizam exclusividade e resultados, 
              independentemente do seu estilo de vida ou rotina.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {targetProfiles.map((profile, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              
              <div className="relative bg-gradient-to-br from-dark-lighter/90 to-dark/90 backdrop-blur-xl rounded-3xl p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300 group-hover:scale-105 h-full flex flex-col">
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300 flex-shrink-0">
                    {profile.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary transition-colors duration-300">
                      {profile.title}
                    </h3>
                    <p className="text-light-gray leading-relaxed">
                      {profile.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Target;