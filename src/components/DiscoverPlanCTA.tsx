import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Zap, 
  Brain,
  Shield,
  Target
} from 'lucide-react';

const DiscoverPlanCTA: React.FC = () => {
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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-8, 8, -8],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const glowVariants = {
    animate: {
      opacity: [0.5, 1, 0.5],
      scale: [1, 1.05, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };



  return (
    <section id="discover-plan" className="relative py-16 md:py-24 bg-dark overflow-hidden" ref={ref}>
      {/* Background Premium Effects */}
      <div className="absolute inset-0">
        {/* Fundo sólido preto, sem partículas/linhas */}
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Header elegante */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-primary"
            >
              Descubra o plano ideal para você
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-light-muted max-w-3xl mx-auto leading-relaxed"
            >
              Um quiz rápido e inteligente para indicar o plano perfeito para seu perfil.
            </motion.p>
          </motion.div>

          {/* Main CTA */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="relative max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-black/80 to-gray-900/60 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10">
                <div className="text-center">
                  <h3 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
                    Seu plano ideal,<br />
                    <span className="text-primary">em minutos</span>
                  </h3>
                  
                  <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
                    Responda algumas perguntas estratégicas e descubra qual plano ScarX foi desenhado para você.
                  </p>

                  <div className="space-y-4 mb-10">
                    <div className="flex items-center justify-center gap-4 text-white/60">
                      <div className="h-px bg-white/20 flex-1"></div>
                      <span className="text-sm uppercase tracking-wider">Recomendação Personalizada</span>
                      <div className="h-px bg-white/20 flex-1"></div>
                    </div>
                  </div>

                  <Link
                    to="/quiz"
                    className="btn-primary text-lg"
                  >
                    <span>Descobrir meu plano</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default DiscoverPlanCTA;