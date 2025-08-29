import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Globe, Clock, CheckCircle, Sparkles, Star } from 'lucide-react';

const AboutFounder: React.FC = () => {
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

  const credentials = [
    {
      icon: <Award className="text-primary h-6 w-6" />,
      text: "Treinador fisico certificado pela Enade Uruguay",
    },
    {
      icon: <Globe className="text-primary h-6 w-6" />,
      text: "Trouxe para o Brasil o que aprendeu viajando pra 7 países com as melhores escolas de treinamento do mundo.",
    },
    {
      icon: <Clock className="text-primary h-6 w-6" />,
      text: "Mais de 7 anos de experiência",
    },
    {
      icon: <CheckCircle className="text-primary h-6 w-6" />,
      text: "Ex-atleta federado de Taekwondo e Powerlifting.",
    },
  ];

  return (
    <section id="about-founder" className="relative py-20 md:py-24 bg-gradient-to-br from-dark via-dark-lighter to-dark text-white overflow-hidden" ref={ref}>
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
          <div className="lg:w-2/5">
            <motion.div
              variants={itemVariants}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              
              <div className="relative">
                <img
                  src="images/joao.jpeg"
                  alt="João Scar"
                  className="rounded-3xl shadow-2xl w-full h-auto object-cover border border-primary/30 group-hover:border-primary/50 transition-all duration-300"
                />
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-primary to-primary-dark text-black py-3 px-6 rounded-2xl shadow-2xl border border-primary/30 group-hover:scale-105 transition-all duration-300">
                  <p className="font-bold text-black">João Scar</p>
                  <p className="text-sm text-black">Fundador ScarFit</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="lg:w-3/5">
            <motion.div variants={itemVariants} className="relative">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-full px-4 md:px-6 py-2 mb-4 md:mb-6">
                <Award className="w-4 md:w-5 h-4 md:h-5 text-primary" />
                <span className="text-primary font-semibold text-xs md:text-sm uppercase tracking-wider">
                  CONHEÇA O FUNDADOR
                </span>
                <Sparkles className="w-4 md:w-5 h-4 md:h-5 text-primary" />
              </div>
            </motion.div>
            
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent leading-tight">
              A ScarFit nasceu de uma revolta pessoal minha.
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-light-gray mb-6 leading-relaxed">
              Eu nunca acreditei nesse negócio de te passar por uma análise, jogar uma ficha na tua mão e te largar. Cada pessoa tem uma rotina, tem variáveis. Aqui a gente leva tudo isso em consideração pra montar um plano que realmente funcione e se adapte pra você.
            </motion.p>
            
            <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {credentials.map((credential, index) => (
                <motion.div key={index} variants={itemVariants} className="flex items-center gap-3 group">
                  <div className="p-2 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300 border border-primary/20">
                    {credential.icon}
                  </div>
                  <p className="font-medium group-hover:text-primary transition-colors duration-300">{credential.text}</p>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div variants={itemVariants} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl blur group-hover:blur-md transition-all duration-300" />
              
              <div className="relative bg-gradient-to-br from-dark-lighter/90 to-dark/90 backdrop-blur-xl p-6 rounded-2xl border border-primary/20 hover:border-primary/40 transition-all duration-300 italic shadow-xl">
                <p className="text-lg mb-4">
                  "Nessa jornada, o seu objetivo é o único destino que aceito. Aqui, você não conta com sorte, conta comigo."
                </p>
                <p className="font-semibold text-primary">— João Scar</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutFounder;