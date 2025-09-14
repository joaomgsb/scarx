import React, { useMemo, useState } from 'react';
import { Check, XCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const ScarXForWho: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'is' | 'not'>('is');
  const [direction, setDirection] = useState<1 | -1>(1);

  const onSelectTab = (next: 'is' | 'not') => {
    if (next === activeTab) return;
    setDirection(next === 'is' ? -1 : 1);
    setActiveTab(next);
  };

  const variants = useMemo(() => ({
    enter: (dir: 1 | -1) => ({
      x: dir * 40,
      opacity: 0,
      filter: 'blur(4px)'
    }),
    center: { x: 0, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.5, ease: 'easeOut' } },
    exit: (dir: 1 | -1) => ({
      x: dir * -40,
      opacity: 0,
      filter: 'blur(4px)',
      transition: { duration: 0.35, ease: 'easeIn' }
    })
  }), []);

  return (
    <section className="relative bg-dark py-20 overflow-hidden">
      {/* Elementos geométricos de fundo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary transform rotate-12 translate-x-20 -translate-y-20 opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary transform rotate-45 translate-x-16 translate-y-16 opacity-30"></div>

      {/* Destaques vermelhos quando a aba NÃO é está ativa */}
      {activeTab === 'not' && (
        <>
          <div className="pointer-events-none absolute -top-12 -left-12 w-80 h-80 bg-red-600/20 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-1/3 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        </>
      )}

      <div className="container mx-auto px-4 lg:px-0 max-w-6xl">
        <div className="flex flex-col lg:flex-row -mx-4">
          {/* Lado Esquerdo - Conteúdo */}
          <div className="w-full lg:w-1/2 px-4 relative flex flex-col justify-center order-2 lg:order-1">
            {/* Abas */}
            <div className="mb-8">
              <div
                className="inline-flex items-center gap-1 p-1 rounded-xl border border-neutral-800 bg-neutral-900/60 backdrop-blur-xs"
                role="tablist"
                aria-label="Alternar público ScarX"
              >
                <button
                  role="tab"
                  aria-selected={activeTab === 'is'}
                  onClick={() => onSelectTab('is')}
                  className={
                    `px-4 py-2 rounded-lg text-sm md:text-base transition-colors focus:outline-none focus:ring-2 focus:ring-primary/60 ` +
                    (activeTab === 'is'
                      ? 'bg-neutral-800 text-light'
                      : 'text-light/70 hover:text-light')
                  }
                >
                  Para quem é a ScarX
                </button>
                <button
                  role="tab"
                  aria-selected={activeTab === 'not'}
                  onClick={() => onSelectTab('not')}
                  className={
                    `px-4 py-2 rounded-lg text-sm md:text-base transition-colors focus:outline-none focus:ring-2 ` +
                    (activeTab === 'not'
                      ? 'bg-red-600/20 text-red-400 focus:ring-red-500/40'
                      : 'text-light/70 hover:text-light')
                  }
                >
                  Para quem NÃO é a ScarX
                </button>
              </div>
            </div>

            {/* Conteúdo das abas com animação */}
            <div className="relative min-h-[220px]">
              <AnimatePresence mode="wait" custom={direction}>
                {activeTab === 'is' ? (
                  <motion.div
                    key="tab-is"
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="space-y-4"
                  >
                    <h2 className="text-4xl lg:text-5xl font-medium mb-4 leading-tight">
                      <span className="text-white italic">A ScarX é</span>
                      <br />
                      <span className="text-primary italic">PRA QUEM?</span>
                    </h2>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" strokeWidth={3} />
                        <p className="text-white text-lg">
                          Para quem deseja transformar o corpo com eficiência e liberdade.
                        </p>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" strokeWidth={3} />
                        <p className="text-white text-lg">
                          Para quem já tentou de tudo e precisa de um método técnico, claro e aplicável.
                        </p>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" strokeWidth={3} />
                        <p className="text-white text-lg">
                          Para iniciantes que querem uma base sólida e para avançados que buscam evolução contínua.
                        </p>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" strokeWidth={3} />
                        <p className="text-white text-lg">
                          Um método que gera resultados reais, para qualquer corpo, em qualquer nível, em qualquer rotina.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="tab-not"
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="space-y-4"
                  >
                    <h2 className="text-4xl lg:text-5xl font-medium mb-4 leading-tight">
                      <span className="text-white italic">A ScarX</span>
                      <br />
                      <span className="text-red-500 italic">NÃO É PARA QUEM?</span>
                    </h2>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" strokeWidth={3} />
                        <p className="text-white text-lg">Fisiculturistas hardcore.</p>
                      </div>

                      <div className="flex items-start space-x-3">
                        <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" strokeWidth={3} />
                        <p className="text-white text-lg">Quem busca método mágico/milagroso.</p>
                      </div>

                      <div className="flex items-start space-x-3">
                        <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" strokeWidth={3} />
                        <p className="text-white text-lg">Pessoas que não querem aderir a um processo estruturado.</p>
                      </div>
                    </div>

                    {/* Sutil card com tema vermelho */}
                    <div className="mt-6 rounded-xl border border-red-700/40 bg-red-600/10 p-4">
                      <p className="text-sm text-red-300">
                        Nosso método é técnico, progressivo e baseado em evidências. Se você busca atalhos,
                        provavelmente este não é o caminho certo.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Lado Direito - Foto */}
          <div className="w-full lg:w-1/2 px-4 mt-8 lg:mt-0 order-1 lg:order-2 mb-8 lg:mb-0">
            <div className="relative">
              {/* Elemento geométrico atrás da foto */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary transform rotate-12 opacity-80"></div>

              {/* Foto do João Scar */}
              <div className="relative z-10 ml-0 lg:ml-8">
                <img
                  src="/images/joaoscar.png"
                  alt="João Scar - Especialista em Transformação Corporal"
                  className="w-full max-w-md h-auto object-cover rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScarXForWho; 