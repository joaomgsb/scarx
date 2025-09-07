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

          {/* Seção do Quiz removida deste componente. O Quiz agora vive em DiscoverPlanCTA. */}
        </motion.div>
      </div>
    </section>
  );
};

export default AppShowcase;
