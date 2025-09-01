import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const AppShowcase: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="pt-8 pb-16 md:pt-12 md:pb-20 bg-dark overflow-hidden">
      <div className="container-custom px-0 md:px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col items-center justify-center"
        >
          <div className="text-center max-w-3xl mx-auto mb-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
              Tudo o que você precisa, no seu bolso.
            </h2>
            <p className="text-lg md:text-xl text-light leading-relaxed mb-6">
              Atualizações de protocolo, evolução acompanhada e suporte 24h da equipe ScarX. Transforme seu corpo com toda a tecnologia a seu favor.
            </p>
          </div>
          
          <div className="w-full max-w-3xl mx-auto mb-12">
            <img 
              src="/images/efeitos/celular.png" 
              alt="Aplicativo ScarFit" 
              className="w-full h-auto block mx-auto"
            />
          </div>

          {/* Seção do Quiz integrada */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-16"
          >
            {/* Header do Quiz */}
            <div className="text-center mb-12">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-primary"
              >
                Descubra o plano ideal para você
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-lg md:text-xl text-light leading-relaxed mb-8 max-w-3xl mx-auto"
              >
                Responda nosso quiz inteligente e descubra qual plano ScarX foi feito especialmente para seu perfil e objetivos.
              </motion.p>
            </div>

            {/* CTA do Quiz */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-center"
            >
              <div className="relative max-w-2xl mx-auto">
                <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-primary/30 shadow-xl shadow-primary/10">
                  <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">
                    Pronto para descobrir seu plano ideal?
                  </h3>
                  
                  <p className="text-base text-light mb-6 max-w-xl mx-auto">
                    Em apenas 5 minutos, nossa IA analisará seu perfil e recomendará o plano perfeito para você.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-4">
                    <Link
                      to="/quiz"
                      className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-primary via-primary-light to-primary text-black font-bold py-4 px-8 rounded-xl text-base shadow-xl hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-light to-primary rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity" />
                      <div className="relative flex items-center gap-2">
                        <span>Iniciar Quiz</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AppShowcase;
