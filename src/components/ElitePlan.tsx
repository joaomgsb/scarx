import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  MessageSquare, 
  Zap, 
  Crown,
  Shield,
  Star,
  CheckCircle,
  ArrowRight,
  Users,
  X
} from 'lucide-react';

const ElitePlan: React.FC = () => {
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

  // Estrutura dos planos principais (XPRO, XELITE e XPRIVATE)
  const planosComparacao = [
    {
      id: 'xpro',
      name: 'XPRO',
      tagline: 'Execução sob medida, com eficiência.',
      backgroundColorClass: 'bg-dark-lighter',
      textColorClass: 'text-white',
      buttonColorClass: 'bg-white text-dark hover:bg-gray-100',
      icon: <Shield className="w-8 h-8" />,
      whatsappText: 'Olá! Quero solicitar acesso ao plano XPRO da ScarFit.',
      features: [
        { text: 'X-Assessment completo', included: true },
        { text: 'Blueprint personalizado', included: true },
        { text: 'Ajustes semanais', included: true },
        { text: 'Painel de controle', included: true },
        { text: 'Suporte app/WhatsApp (SLA padrão)', included: true },
        { text: 'Check-ins quinzenais', included: true },
        { text: 'Gerente dedicado', included: false },
        { text: 'Check-ins semanais', included: false },
        { text: 'SLA acelerado', included: false },
        { text: 'Video-calls mensais', included: false },
        { text: 'Onboarding assistido', included: false },
        { text: 'Welcome kit exclusivo', included: false },
        { text: 'Revisão manual pelo João', included: false },
        { text: 'Calls on-demand', included: false },
        { text: 'Confidencialidade reforçada', included: false }
      ]
    },
    {
      id: 'xelite',
      name: 'XELITE',
      tagline: 'Prioridade e gerente de relacionamento.',
      backgroundColorClass: 'bg-blue-100',
      textColorClass: 'text-dark',
      buttonColorClass: 'bg-dark text-blue-100 hover:bg-dark-lighter',
      icon: <Star className="w-8 h-8" />,
      featured: true,
      whatsappText: 'Olá! Quero solicitar acesso ao plano XELITE da ScarFit.',
      features: [
        { text: 'X-Assessment completo', included: true },
        { text: 'Blueprint personalizado', included: true },
        { text: 'Ajustes semanais', included: true },
        { text: 'Painel de controle', included: true },
        { text: 'Suporte app/WhatsApp (SLA padrão)', included: true },
        { text: 'Check-ins quinzenais', included: true },
        { text: 'Gerente dedicado', included: true },
        { text: 'Check-ins semanais', included: true },
        { text: 'SLA acelerado', included: true },
        { text: 'Video-calls mensais', included: true },
        { text: 'Onboarding assistido', included: true },
        { text: 'Welcome kit exclusivo', included: true },
        { text: 'Revisão manual pelo João', included: false },
        { text: 'Calls on-demand', included: false },
        { text: 'Confidencialidade reforçada', included: false }
      ]
    },
    {
      id: 'xprivate',
      name: 'XPRIVATE',
      tagline: 'Direto com o fundador. Discrição e disponibilidade ampliadas.',
      backgroundColorClass: 'bg-primary',
      textColorClass: 'text-dark',
      buttonColorClass: 'bg-dark text-primary hover:bg-dark-lighter',
      icon: <Crown className="w-8 h-8" />,
      whatsappText: 'Olá! Quero solicitar acesso ao plano XPRIVATE da ScarFit. Gostaria de saber sobre a elegibilidade e o processo de aprovação.',
      features: [
        { text: 'X-Assessment completo', included: true },
        { text: 'Blueprint personalizado', included: true },
        { text: 'Ajustes semanais', included: true },
        { text: 'Painel de controle', included: true },
        { text: 'Suporte app/WhatsApp (SLA padrão)', included: true },
        { text: 'Check-ins quinzenais', included: true },
        { text: 'Gerente dedicado', included: true },
        { text: 'Check-ins semanais', included: true },
        { text: 'SLA acelerado', included: true },
        { text: 'Video-calls mensais', included: true },
        { text: 'Onboarding assistido', included: true },
        { text: 'Welcome kit exclusivo', included: true },
        { text: 'Revisão manual pelo João', included: true },
        { text: 'Calls on-demand', included: true },
        { text: 'Confidencialidade reforçada', included: true }
      ]
    }
  ];

  const renderPlanCard = (plano: typeof planosComparacao[0], index: number) => (
    <motion.div
      key={plano.id}
      className="relative group"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Glow Effect Dinâmico */}
      <motion.div 
        className={`absolute inset-0 ${
          plano.id === 'xelite' 
            ? 'bg-gradient-to-br from-primary/30 to-primary/15' 
            : 'bg-gradient-to-br from-blue-500/20 to-blue-600/10'
        } rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500`}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: index * 0.5,
          ease: "easeInOut"
        }}
      />
      
      {/* Card Principal */}
      <motion.div 
        className={`relative ${plano.backgroundColorClass} rounded-3xl p-8 shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out flex flex-col h-full min-h-[600px] ${
          plano.id === 'xelite' ? 'border-2 border-primary/40' : 'border border-gray-600'
        }`}
      >
        {/* Header do Card */}
        <div className="text-center mb-8">
          <motion.div 
            className={`inline-flex items-center justify-center w-20 h-20 ${
              plano.id === 'xelite' ? 'bg-dark' : 
              plano.id === 'xprivate' ? 'bg-dark' : 'bg-primary'
            } rounded-2xl mb-6 shadow-lg ${
              plano.id === 'xelite' ? 'text-blue-100' : 
              plano.id === 'xprivate' ? 'text-primary' : 'text-dark'
            }`}
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {plano.icon}
          </motion.div>
          
          {/* Nome do Plano */}
          <motion.h3 
            className={`text-3xl font-extrabold mb-4 ${plano.textColorClass} group-hover:scale-105 transition-transform duration-300`}
            whileHover={{ scale: 1.05 }}
          >
            {plano.name}
          </motion.h3>
          
          <p className={`text-lg leading-relaxed ${
            plano.id === 'xelite' ? 'text-dark/80' : 
            plano.id === 'xprivate' ? 'text-dark' : 'text-light-gray'
          }`}>
            {plano.tagline}
          </p>
        </div>

        {/* Features List */}
        <div className="flex-grow mb-8">
          <ul className={`space-y-4 ${plano.id === 'xpro' ? 'pt-8' : ''}`}>
            {plano.features.map((feature, featureIndex) => (
              <motion.li
                key={featureIndex}
                className="flex items-start gap-3 group/item h-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
              >
                <motion.div
                  className="mt-1 flex-shrink-0"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                >
                  {feature.included ? (
                    <CheckCircle className={`w-5 h-5 ${
                      plano.id === 'xelite' ? 'text-green-500' : 
                      plano.id === 'xprivate' ? 'text-white' : 'text-green-500'
                    }`} />
                  ) : (
                    <X className="w-5 h-5 text-gray-500" />
                  )}
                </motion.div>
                <span className={`leading-relaxed group-hover/item:scale-105 transition-transform duration-200 ${
                  feature.included 
                    ? plano.textColorClass
                    : plano.id === 'xelite' ? 'text-dark/60' : 'text-gray-500'
                }`}>
                  {feature.text}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <motion.div className="mt-auto mb-4">
          <motion.a
            href={`https://wa.me/5541984961012?text=${encodeURIComponent(plano.whatsappText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full ${plano.buttonColorClass} font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-lg group/cta`}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageSquare className="w-4 h-4" />
            QUERO COMEÇAR AGORA
            <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>

        {/* Imagens de Pagamento */}
        <div className="flex flex-col items-center justify-center gap-3">
          <motion.img 
            src="/images/pagamento.png" 
            alt="Formas de Pagamento" 
            className="h-8 w-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
          <motion.img 
            src="/images/comprasegura.png" 
            alt="Compra Segura" 
            className="h-8 w-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <section id="plans" className="relative py-12 md:py-16 overflow-hidden font-neue-haas" ref={ref}>
      {/* Background Premium Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-lighter to-dark" />
        
        {/* Spotlight central */}
        <motion.div 
          variants={glowVariants}
          animate="animate"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/15 via-primary/5 to-transparent rounded-full blur-3xl"
        />
        
        {/* Partículas flutuantes */}
        <motion.div 
          variants={floatingVariants}
          animate="animate"
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-2xl"
        />
        <motion.div 
          variants={floatingVariants}
          animate="animate"
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary/8 rounded-full blur-3xl"
          style={{ animationDelay: '2s' }}
        />
        
        {/* Linhas de energia */}
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          {/* Header Premium com Efeitos */}
          <motion.div variants={itemVariants} className="text-center mb-8">

            
            <motion.h2 
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight text-primary"
            >
              Escolha o nível
              <br />
              de atenção
            </motion.h2>
            
            <motion.h3 
              variants={itemVariants}
              className="text-2xl md:text-3xl font-bold text-light-muted mb-6"
            >
              O método é o mesmo — a gestão muda.
            </motion.h3>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-light-gray max-w-4xl mx-auto leading-relaxed"
            >
              Sob medida em todos os níveis. Diferença está em{' '}
              <span className="text-primary font-semibold">prioridade</span>,{' '}
              <span className="text-primary font-semibold">acesso</span> e{' '}
              <span className="text-primary font-semibold">concierge</span>.
            </motion.p>
          </motion.div>

          {/* Desktop Layout - Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4 max-w-7xl mx-auto"
          >
            {planosComparacao.map((plano, index) => (
              <motion.div key={plano.id} variants={itemVariants}>
                {renderPlanCard(plano, index)}
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default ElitePlan;