import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'historia' | 'fundador'>('historia');
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

  const stats = [
    {
      title: '1200+',
      description: 'Vidas transformadas com nossa metodologia única e personalizada',
    },
    {
      title: '98%',
      description: 'Taxa de sucesso dos nossos alunos que seguem o protocolo completo',
    },
    {
      title: '7+',
      description: 'Anos de experiência e aperfeiçoamento da metodologia ScarX',
    },
    {
      title: '5',
      description: 'Países onde nossa metodologia já transformou vidas',
    }
  ];

  const credentials = [
    'Treinador físico certificado pela Enade Uruguay',
    'Experiência internacional em 7 países',
    'Ex-atleta federado de Taekwondo e Powerlifting',
    'Especialista em treinamento personalizado'
  ];

  return (
    <section className="section-padding section-transition" ref={ref}>
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-primary mb-6">
              Sobre a ScarX
            </h2>
            <p className="text-xl text-light max-w-3xl mx-auto">
              Conheça nossa história e quem está por trás dessa revolução no fitness personalizado
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div variants={itemVariants} className="max-w-2xl mx-auto mb-12">
            <div className="flex glass-effect rounded-2xl p-2 border border-neutral-800">
              <button
                onClick={() => setActiveTab('historia')}
                className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'historia'
                    ? 'bg-primary text-dark'
                    : 'text-light-muted hover:text-light'
                }`}
              >
                História da ScarX
              </button>
              
              <button
                onClick={() => setActiveTab('fundador')}
                className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'fundador'
                    ? 'bg-primary text-dark'
                    : 'text-light-muted hover:text-light'
                }`}
              >
                Sobre o Fundador
              </button>
            </div>
          </motion.div>

          {/* Tab Content */}
          <div className="min-h-[600px]">
            <AnimatePresence mode="wait">
              {activeTab === 'historia' && (
                <motion.div
                  key="historia"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="space-y-12"
                >
                  {/* Historia Content */}
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="card glass-effect rounded-3xl p-8 flex flex-col">
                      <h3 className="text-2xl font-bold text-light mb-4">A&nbsp;&nbsp;Origem</h3>
                      <p className="text-lg text-light-muted leading-relaxed mb-6 flex-1">
                        A ScarX nasceu de uma revolta pessoal. Cansado de ver pessoas recebendo 
                        planos genéricos que não funcionavam na vida real, João Scar decidiu criar 
                        uma metodologia que realmente se adaptasse à rotina única de cada pessoa.
                      </p>
                      <blockquote className="border-l-4 border-primary pl-4 text-light italic mt-auto">
                        "Cada pessoa tem uma rotina, tem variáveis. Aqui levamos tudo isso em consideração."
                      </blockquote>
                    </div>
                    
                    <div className="card glass-effect rounded-3xl p-8 flex flex-col">
                      <h3 className="text-2xl font-bold text-light mb-4">A&nbsp;&nbsp;Evolução</h3>
                      <p className="text-lg text-light-muted leading-relaxed mb-6 flex-1">
                        Com experiência internacional e formação em múltiplos países, trouxemos para o Brasil 
                        o que há de mais avançado no treinamento personalizado, sempre priorizando 
                        resultados sustentáveis e duradouros.
                      </p>
                      <blockquote className="border-l-4 border-primary pl-4 text-light italic mt-auto">
                        "Seu objetivo é o único destino que aceito."
                      </blockquote>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                      <div
                        key={index}
                        className="card glass-effect rounded-3xl p-6 text-center"
                      >
                        <div className="text-4xl md:text-5xl font-display font-medium text-primary mb-4">
                          {stat.title}
                        </div>
                        <p className="text-base text-light-muted">
                          {stat.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'fundador' && (
                <motion.div
                  key="fundador"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {/* Fundador Content */}
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="order-1 lg:order-1">
                      <div className="lg:card lg:glass-effect lg:rounded-3xl lg:overflow-hidden">
                        <img
                          src="/images/joaoscar.png"
                          alt="João Scar - Fundador da ScarX"
                          className="w-full h-auto object-cover rounded-3xl lg:rounded-none"
                        />
                      </div>
                    </div>
                    
                    <div className="order-2 lg:order-2 space-y-8">
                      <div>
                        <h3 className="text-3xl md:text-4xl font-bold text-light mb-4">
                          João Scar
                        </h3>
                        <p className="text-xl text-primary font-semibold mb-6">
                          Fundador & CEO da ScarX
                        </p>
                        <p className="text-lg text-light-muted leading-relaxed">
                          João Scar nunca acreditou em soluções genéricas. Com formação internacional 
                          e experiência prática em múltiplos países, ele desenvolveu uma metodologia 
                          única que considera cada pessoa como um universo particular.
                        </p>
                      </div>

                      {/* Credentials */}
                      <div className="space-y-3">
                        {credentials.map((credential, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                            <p className="text-light">{credential}</p>
                          </div>
                        ))}
                      </div>

                      {/* Quote */}
                      <div className="card glass-effect rounded-2xl p-6">
                        <blockquote className="text-lg text-light italic mb-4 leading-relaxed">
                          "Nessa jornada, o seu objetivo é o único destino que aceito. 
                          Aqui, você não conta com sorte, conta comigo."
                        </blockquote>
                        <cite className="text-primary font-semibold">— João Scar</cite>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection; 