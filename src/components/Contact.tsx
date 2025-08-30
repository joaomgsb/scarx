import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MessageSquare, Shield, Clock, Award, CheckCircle2, Sparkles, Crown, Zap } from 'lucide-react';

const Contact: React.FC = () => {
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

  const features = [
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Garantia Total",
      description: "Resultados ou seu dinheiro de volta"
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Resposta em 24h",
      description: "Protocolo pronto rapidamente"
    },
    {
      icon: <Award className="h-6 w-6 text-primary" />,
      title: "+1200 Transformados",
      description: "Metodologia comprovada"
    },
    {
      icon: <CheckCircle2 className="h-6 w-6 text-primary" />,
      title: "Suporte Contínuo",
      description: "Acompanhamento até o resultado"
    }
  ];

  return (
    <section id="contact" className="relative py-20 md:py-24 bg-gradient-to-br from-dark via-dark-lighter to-dark text-white overflow-hidden" ref={ref}>
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
          className="text-center max-w-4xl mx-auto mb-12 md:mb-16"
        >
          <motion.div variants={itemVariants} className="relative">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-full px-4 md:px-6 py-2 mb-4 md:mb-6">
              <Crown className="w-4 md:w-5 h-4 md:h-5 text-primary" />
              <span className="text-primary font-semibold text-xs md:text-sm uppercase tracking-wider">
                CHEGOU A HORA
              </span>
              <Sparkles className="w-4 md:w-5 h-4 md:h-5 text-primary" />
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent leading-tight">
              Pronto Para Sua
              <br />
              <span className="text-primary">Transformação Real?</span>
            </h2>
            
            <p className="text-lg md:text-xl text-light-gray max-w-3xl mx-auto leading-relaxed">
              Invista em uma experiência exclusiva que transformará seu corpo e sua vida para sempre.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto"
        >
          {/* Consulta Estratégica */}
          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
            
            <div className="relative bg-gradient-to-br from-dark-lighter/90 to-dark/90 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300 h-full flex flex-col">
              {/* Header do Card */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-2xl mb-4 shadow-lg">
                  <MessageSquare className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3">Consulta Estratégica Exclusiva</h3>
                <p className="text-light-gray text-center leading-relaxed mb-6 md:mb-0">
                  Primeiro passo para um plano sob medida. Nossa equipe fará uma análise completa 
                  do seu perfil e criará a estratégia perfeita para seus objetivos.
                </p>
              </div>
              
              {/* Conteúdo do meio - flex-grow para ocupar espaço disponível */}
              <div className="flex-grow flex flex-col justify-center">
                {/* Benefícios da Consulta */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-light-gray">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span className="text-sm">Análise completa do seu perfil físico</span>
                  </div>
                  <div className="flex items-center gap-3 text-light-gray">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span className="text-sm">Estratégia personalizada para seus objetivos</span>
                  </div>
                  <div className="flex items-center gap-3 text-light-gray">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span className="text-sm">Orientação sobre o melhor plano para você</span>
                  </div>
                  <div className="flex items-center gap-3 text-light-gray">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span className="text-sm">Esclarecimento de dúvidas sobre metodologia</span>
                  </div>
                </div>
                
                {/* Destaque especial */}
                <div className="bg-gradient-to-r from-primary/20 to-primary/10 rounded-xl p-4 border border-primary/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-primary font-semibold text-sm">Consulta Gratuita</span>
                  </div>
                  <p className="text-light-gray text-xs">
                    Sem compromisso. Conheça nossa metodologia e tire todas suas dúvidas antes de decidir.
                  </p>
                </div>
              </div>
              
              {/* Footer do Card - sempre no final */}
              <div className="space-y-4 mt-6">
                <a
                  href="https://wa.me/5541984961012?text=Olá! Gostaria de iniciar minha Consulta Estratégica com a ScarX para discutir meus objetivos de transformação."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-primary via-primary-light to-primary text-black font-bold py-4 px-4 md:px-8 rounded-2xl text-sm md:text-lg shadow-2xl hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105 w-full justify-center"
                  aria-label="Iniciar consulta estratégica via WhatsApp"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-light to-primary rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-center gap-2 md:gap-3">
                    <MessageSquare className="w-4 md:w-6 h-4 md:h-6 flex-shrink-0" />
                    <span className="text-sm md:text-lg whitespace-nowrap">Iniciar Consulta Estratégica</span>
                    <Zap className="w-4 md:w-6 h-4 md:h-6 group-hover:rotate-12 transition-transform flex-shrink-0" />
                  </div>
                </a>
                
                <p className="text-light-gray text-xs md:text-sm text-center italic">
                  ✨ Atendimento dedicado para resultados extraordinários
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Por que ScarFit */}
          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
            
            <div className="relative bg-gradient-to-br from-dark-lighter/90 to-dark/90 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300 h-full flex flex-col">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-2xl mb-4 shadow-lg">
                  <Award className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3">Por que ScarFit?</h3>
              </div>
              
              <p className="text-light-gray mb-6 text-center leading-relaxed">
                Metodologia exclusiva com acompanhamento de elite. Transformamos não apenas seu corpo, 
                mas sua relação com saúde e bem-estar.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 flex-grow">
                {features.map((feature, index) => (
                  <div key={index} className="flex flex-col items-center text-center p-3 rounded-xl hover:bg-primary/5 transition-all duration-300 group/item">
                    <div className="mb-2 p-2 bg-primary/10 rounded-lg group-hover/item:bg-primary/20 transition-all duration-300">
                      {feature.icon}
                    </div>
                    <h4 className="font-semibold text-white text-sm mb-1">{feature.title}</h4>
                    <p className="text-light-gray text-xs leading-tight benefits-description">{feature.description}</p>
                  </div>
                ))}
              </div>
              
              {/* Contato Direto */}
              <div className="mt-auto">
                <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-4 md:p-6 rounded-2xl border border-primary/20">
                  <h4 className="font-bold text-lg md:text-xl mb-3 text-center flex items-center justify-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    Contato Direto
                  </h4>
                  <div className="space-y-2 text-center">
                    <p className="text-light-gray text-sm">
                      <span className="font-semibold text-primary">WhatsApp:</span> +55 41 8496-1012
                    </p>
                    <p className="text-light-gray text-sm">
                      <span className="font-semibold text-primary">Email:</span> contato@scarfit.com.br
                    </p>
                    <p className="text-light-gray text-xs mt-3 italic">
                      Segunda a sexta: 05h às 22h | Sábado: 08h às 20h
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Final Premium */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-16 md:mt-20"
        >
          <div className="bg-gradient-to-br from-dark-lighter/90 to-dark/90 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-primary/20 max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-4 md:mb-6">
                <Sparkles className="w-5 md:w-6 h-5 md:h-6 text-primary" />
                <span className="text-primary font-semibold text-sm md:text-base">Transformação Garantida</span>
                <Sparkles className="w-5 md:w-6 h-5 md:h-6 text-primary" />
              </div>
              
              <h4 className="text-2xl md:text-3xl font-bold mb-4 text-white">Sua Nova Vida Começa Agora</h4>
              <p className="text-light-gray mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base">
                Mais de 1200 pessoas já transformaram suas vidas. Não deixe para amanhã 
                a transformação que você pode começar hoje.
              </p>
              
              <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm md:text-base">
                <Shield className="w-4 md:w-5 h-4 md:h-5" />
                <span>Transformação com resultados comprovados</span>
              </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;