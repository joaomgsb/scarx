import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Dumbbell, Users, Brain, Utensils, Sparkles, Star } from 'lucide-react';

const TechnicalTeam: React.FC = () => {
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
      text: "Formado desde 2000",
    },
    {
      icon: <Dumbbell className="text-primary h-6 w-6" />,
      text: "Mais de 20 anos de experiência",
    },
    {
      icon: <Users className="text-primary h-6 w-6" />,
      text: "Centenas de alunos transformados",
    },
    {
      icon: <Brain className="text-primary h-6 w-6" />,
      text: "Especialista em desenvolvimento físico",
    },
  ];

  return (
    <section id="technical-team" className="relative py-20 md:py-24 bg-gradient-to-br from-dark via-dark-lighter to-dark text-white overflow-hidden" ref={ref}>
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
          className="space-y-24"
        >
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-2/5">
              <motion.div
                variants={itemVariants}
                className="relative group"
              >
                <div>
                  <img
                    src="images/gabrielacomfundo.jpg"
                    alt="Gabriela Trindade"
                    className="rounded-3xl shadow-2xl w-full h-auto object-cover border border-primary/30 group-hover:border-primary/50 transition-all duration-300"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-primary to-primary-dark text-black py-3 px-6 rounded-2xl shadow-2xl border border-primary/30 group-hover:scale-105 transition-all duration-300">
                    <p className="font-bold text-black">Gabriela Trindade</p>
                    <p className="text-sm text-black">Nutricionista Esportiva</p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="lg:w-3/5">
              <motion.div variants={itemVariants} className="relative">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-full px-4 md:px-6 py-2 mb-4 md:mb-6">
                  <Utensils className="w-4 md:w-5 h-4 md:h-5 text-primary" />
                  <span className="text-primary font-semibold text-xs md:text-sm uppercase tracking-wider">
                    NUTRIÇÃO INTELIGENTE
                  </span>
                  <Sparkles className="w-4 md:w-5 h-4 md:h-5 text-primary" />
                </div>
              </motion.div>
              
              <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent leading-tight">
                Faça dieta sem sofrer!
              </motion.h2>
              
              <motion.p variants={itemVariants} className="text-lg md:text-xl text-light-gray mb-6 leading-relaxed">
                Gabriela Trindade traz um olhar técnico e estratégico para cada protocolo alimentar. Sua atuação na ScarX é garantir que sua alimentação seja um verdadeiro motor de progresso físico. Cada ajuste é pensado com precisão, respeitando sua individualidade e otimizando sua performance e composição corporal.
              </motion.p>
              
              <motion.div variants={itemVariants} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl blur group-hover:blur-md transition-all duration-300" />
                
                <div className="relative bg-gradient-to-br from-dark-lighter/90 to-dark/90 backdrop-blur-xl p-6 rounded-2xl border border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-xl">
                  <p className="text-sm font-semibold text-primary mb-2">CRN 1426</p>
                  <p className="text-light-gray mb-4">
                    "Minha missão é transformar sua alimentação em uma ferramenta poderosa de transformação, sem restrições extremas ou dietas insustentáveis. Aqui, você aprenderá a se alimentar de forma inteligente e prazerosa."
                  </p>
                  <p className="font-semibold text-primary italic">— Gabriela Trindade</p>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-2/5">
              <motion.div
                variants={itemVariants}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                
                <div className="relative">
                  <img
                    src="images/Luiz.jpeg"
                    alt="Luiz Camargo"
                    className="rounded-3xl shadow-2xl w-full h-auto object-cover border border-primary/30 group-hover:border-primary/50 transition-all duration-300"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-primary to-primary-dark text-black py-3 px-6 rounded-2xl shadow-2xl border border-primary/30 group-hover:scale-105 transition-all duration-300">
                    <p className="font-bold text-black">Luiz Camargo</p>
                    <p className="text-sm text-black">Responsável Técnico</p>
                  </div>
                </div>
              </motion.div>
            </div>
          
            <div className="lg:w-3/5">
              <motion.div variants={itemVariants} className="relative">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-full px-4 md:px-6 py-2 mb-4 md:mb-6">
                  <Users className="w-4 md:w-5 h-4 md:h-5 text-primary" />
                  <span className="text-primary font-semibold text-xs md:text-sm uppercase tracking-wider">
                    RESPONSÁVEL TÉCNICO
                  </span>
                  <Sparkles className="w-4 md:w-5 h-4 md:h-5 text-primary" />
                </div>
              </motion.div>
            
              <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent leading-tight">
                Experiência e conhecimento a serviço da sua transformação
              </motion.h2>
            
              <motion.p variants={itemVariants} className="text-lg md:text-xl text-light-gray mb-6 leading-relaxed">
                Com mais de 20 anos dedicados ao desenvolvimento físico, Luiz Camargo traz sua vasta experiência 
                para a equipe técnica da ScarX. Sua expertise é fundamental para garantir a excelência técnica 
                de todos os protocolos desenvolvidos.
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
                
                <div className="relative bg-gradient-to-br from-dark-lighter/90 to-dark/90 backdrop-blur-xl p-6 rounded-2xl border border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-xl">
                  <p className="text-sm font-semibold text-primary mb-2">CREF 083338-G/SP</p>
                  <p className="text-light-gray">
                    "Como Responsável Técnico da ScarX, garanto que cada protocolo seja desenvolvido com o mais 
                    alto padrão técnico e científico, sempre visando a segurança e eficiência para nossos alunos."
                  </p>
                  <p className="font-semibold text-primary italic mt-4">— Luiz Camargo</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="mt-32">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-2/5">
                <motion.div
                  variants={itemVariants}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                  
                  <div className="relative">
                    <img
                      src="images/daniel.jpeg"
                      alt="Daniel França"
                      className="rounded-3xl shadow-2xl w-full h-auto object-cover border border-primary/30 group-hover:border-primary/50 transition-all duration-300"
                    />
                    <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-primary to-primary-dark text-black py-3 px-6 rounded-2xl shadow-2xl border border-primary/30 group-hover:scale-105 transition-all duration-300">
                      <p className="font-bold text-black">Daniel França</p>
                      <p className="text-sm text-black">Especialista em Emagrecimento</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            
              <div className="lg:w-3/5">
                <motion.div variants={itemVariants} className="relative">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-full px-4 md:px-6 py-2 mb-4 md:mb-6">
                    <Dumbbell className="w-4 md:w-5 h-4 md:h-5 text-primary" />
                    <span className="text-primary font-semibold text-xs md:text-sm uppercase tracking-wider">
                      TREINOS ESTRATÉGICOS
                    </span>
                    <Sparkles className="w-4 md:w-5 h-4 md:h-5 text-primary" />
                  </div>
                </motion.div>
              
                <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent leading-tight">
                  Resultados sustentáveis e altamente individualizados
                </motion.h2>
              
                <motion.p variants={itemVariants} className="text-lg md:text-xl text-light-gray mb-6 leading-relaxed">
                  Daniel integra a equipe da ScarX com foco em resultados sustentáveis e altamente individualizados. 
                  Especialista em treinos estratégicos para queima de gordura e recomposição corporal, ele desenvolve 
                  protocolos que maximizam seus resultados respeitando suas limitações e objetivos específicos.
                </motion.p>
              
                <motion.div variants={itemVariants} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl blur group-hover:blur-md transition-all duration-300" />
                  
                  <div className="relative bg-gradient-to-br from-dark-lighter/90 to-dark/90 backdrop-blur-xl p-6 rounded-2xl border border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-xl">
                    <p className="text-sm font-semibold text-primary mb-2">CREF 153464-G/SP</p>
                    <p className="text-light-gray mb-4">
                      "Cada treino é uma oportunidade de evolução. Meu trabalho é criar estratégias que não apenas 
                      transformem seu corpo, mas que sejam sustentáveis a longo prazo, respeitando sua individualidade 
                      e estilo de vida."
                    </p>
                    <p className="font-semibold text-primary italic">— Daniel França</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalTeam;