import React from 'react';
import { X, Clock, Users, BarChart, AlertTriangle, Target, Sparkles, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Problem: React.FC = () => {
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

          // Problemas que a ScarX NÃO faz (inimigos em comum)
  const problemasQueNaoFazemos = [
    {
      icon: <X className="text-red-400 h-8 w-8 mb-4" />,
      title: 'Treinos prontos para qualquer um? Não aqui.',
      description: 'Receber um plano genérico é como usar roupa que não serve: desconfortável e ineficaz. Você precisa de algo feito pra sua rotina, corpo e metas.',
    },
    {
      icon: <AlertTriangle className="text-red-400 h-8 w-8 mb-4" />,
      title: 'Sozinho, até o melhor plano falha.',
      description: 'Sem alguém no seu time, fica fácil desanimar. A falta de suporte contínuo te impede de ajustar o rumo quando os obstáculos aparecem.',
    },
  ];

          // Problemas que o usuário enfrenta e a ScarX resolve
  const problemasDoUsuario = [
    {
      icon: <Clock className="text-primary h-8 w-8 mb-4" />,
      title: 'Sua vida é corrida. Seu plano precisa acompanhar.',
      description: 'Não dá pra seguir fórmulas engessadas quando sua rotina muda a cada dia. Aqui, a flexibilidade vem antes da cobrança.',
    },
    {
      icon: <BarChart className="text-primary h-8 w-8 mb-4" />,
      title: 'Sem motivação, não há consistência.',
      description: 'Resultados demoram. Por isso, você precisa de alguém que esteja com você, reforçando o "porquê" mesmo quando o "como" parece difícil.',
    },
  ];

  return (
    <section className="relative py-20 md:py-24 bg-gradient-to-br from-dark via-dark-lighter to-dark text-white overflow-hidden" ref={ref}>
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
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-full px-4 md:px-6 py-2 mb-4 md:mb-6">
              <AlertTriangle className="w-4 md:w-5 h-4 md:h-5 text-primary" />
              <span className="text-primary font-semibold text-xs md:text-sm uppercase tracking-wider">
                RECONHECE ESSES PROBLEMAS?
              </span>
              <Sparkles className="w-4 md:w-5 h-4 md:h-5 text-primary" />
            </div>
            
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent leading-tight">
              Chega de Ciclos Viciosos: Por Que a ScarX é Diferente
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-light-gray max-w-3xl mx-auto leading-relaxed">
              Você já se sentiu invisível em academias lotadas? Já seguiu dietas restritivas que não duraram? Nós entendemos. A indústria fitness está cheia de promessas vazias e soluções genéricas. Mas a ScarX veio para mudar esse jogo.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Seção: O que NÃO fazemos (Inimigos em Comum) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-16"
        >
          <motion.div variants={itemVariants} className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/20 to-red-500/10 border border-red-500/30 rounded-full px-6 py-2 mb-4">
              <X className="w-5 h-5 text-red-400" />
              <span className="text-red-400 font-semibold text-sm uppercase tracking-wider">
                O que NÃO fazemos
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Inimigos em Comum</h3>
            <p className="text-light-gray">Práticas que combatemos e que você também deveria evitar</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {problemasQueNaoFazemos.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative group"
              >
                {/* Glow effect vermelho */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-red-500/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                
                <div className="relative bg-gradient-to-br from-dark-lighter/90 to-dark/90 backdrop-blur-xl rounded-3xl p-8 border border-red-500/20 hover:border-red-500/40 transition-all duration-300 flex flex-col items-center text-center h-full shadow-2xl">
                  {item.icon}
                  <h4 className="text-xl font-bold mb-4 text-white min-h-[3.5rem] flex items-center">{item.title}</h4>
                  <p className="text-light-gray flex-1 flex items-start leading-relaxed">{item.description}</p>
                  
                  {/* Indicador visual de "NÃO" */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                    <X className="w-5 h-5 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Divisor Visual */}
        <motion.div variants={itemVariants} className="flex items-center justify-center mb-16">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
          <div className="mx-6 bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-full px-6 py-2">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">VS</span>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        </motion.div>

        {/* Seção: Problemas que resolvemos */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-full px-6 py-2 mb-4">
              <Target className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                O que RESOLVEMOS
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Seus Verdadeiros Desafios</h3>
            <p className="text-light-gray">Problemas reais que enfrentamos juntos e solucionamos</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {problemasDoUsuario.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative group"
              >
                {/* Glow effect amarelo */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                
                <div className="relative bg-gradient-to-br from-dark-lighter/90 to-dark/90 backdrop-blur-xl rounded-3xl p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300 flex flex-col items-center text-center h-full shadow-2xl">
                  {item.icon}
                  <h4 className="text-xl font-bold mb-4 text-white min-h-[3.5rem] flex items-center">{item.title}</h4>
                  <p className="text-light-gray flex-1 flex items-start leading-relaxed">{item.description}</p>
                  
                  {/* Indicador visual de "RESOLVEMOS" */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg">
                    <Target className="w-5 h-5 text-black" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Final */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-br from-dark-lighter/90 to-dark/90 backdrop-blur-xl rounded-3xl p-8 border border-primary/20 max-w-2xl mx-auto shadow-2xl">
              <h4 className="text-2xl font-bold text-white mb-4">Reconheceu os Problemas?</h4>
              <p className="text-light-gray mb-6">
                Se você se identificou com os desafios que <strong>resolvemos</strong> e quer evitar as práticas que <strong>combatemos</strong>, 
                está na hora de conhecer uma abordagem que realmente funciona.
              </p>
              <div className="inline-flex items-center gap-2 text-primary font-semibold">
                <span>Descubra nossa solução abaixo</span>
                <Target className="w-5 h-5" />
              </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Problem;