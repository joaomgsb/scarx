import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle, Crown, Star, MessageSquare, ArrowRight } from 'lucide-react';

const PremiumPlans: React.FC = () => {
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

  const plans = [
    {
      name: "Elite PRO",
      duration: "12 meses",
      price: "R$ 120",
      period: "por mês",
      featured: true,
      badge: "Mais Popular",
      benefits: [
        "Equipe multidisciplinar completa",
        "Balança de bioimpedância em casa",
        "App exclusivo de treino e dieta",
        "Suporte WhatsApp prioritário",
        "Ajustes quinzenais estratégicos",
        "Revisão com João Scar",
        "Garantia de resultados"
      ]
    },
    {
      name: "PRO+",
      duration: "Experiência Premium",
      price: "Consulte",
      period: "valores",
      featured: false,
      badge: "Premium",
      benefits: [
        "Gerente executiva dedicada",
        "Suporte 24/7 prioritário",
        "Atendimento VIP exclusivo",
        "Todos os benefícios Elite PRO",
        "Acompanhamento personalizado",
        "Flexibilidade total de horários"
      ]
    }
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
          <motion.div variants={itemVariants} className="text-center mb-20">
            <h2 className="text-gradient mb-6">
              Planos de Transformação
            </h2>
            <p className="text-xl text-light-muted max-w-3xl mx-auto">
              Escolha a experiência que melhor se adapta aos seus objetivos. 
              Todos os planos incluem nossa metodologia exclusiva e garantia de resultados.
            </p>
          </motion.div>

          {/* Plans */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative group"
              >
                {/* Featured badge */}
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-primary text-dark px-6 py-2 rounded-full font-semibold text-sm flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      {plan.badge}
                    </div>
                  </div>
                )}

                <div className={`glass-effect rounded-3xl p-8 h-full transition-all duration-300 ${
                  plan.featured 
                    ? 'border-primary/30 scale-105 lg:scale-110' 
                    : 'border-neutral-800 group-hover:border-primary/20'
                }`}>
                  
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      {plan.featured ? (
                        <Crown className="w-6 h-6 text-primary" />
                      ) : (
                        <Star className="w-6 h-6 text-primary" />
                      )}
                      <h3 className="text-2xl font-semibold text-light">
                        {plan.name}
                      </h3>
                    </div>
                    
                    <div className="text-light-muted mb-4">
                      {plan.duration}
                    </div>
                    
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-primary">
                        {plan.price}
                      </span>
                      <span className="text-light-muted ml-2">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-4 mb-8">
                    {plan.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-light-muted">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-auto">
                    <a
                      href={`https://wa.me/5541984961012?text=Olá! Quero saber mais sobre o plano ${plan.name} da ScarFit.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                        plan.featured
                          ? 'bg-primary text-dark hover:bg-primary-dark hover:scale-105'
                          : 'border-2 border-primary text-primary hover:bg-primary hover:text-dark'
                      }`}
                    >
                      <MessageSquare className="w-5 h-5" />
                      Escolher {plan.name}
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Guarantee */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <div className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-dark" />
                </div>
                <h3 className="text-xl font-semibold text-light">
                  Garantia de Resultados
                </h3>
              </div>
              <p className="text-light-muted">
                Se você não estiver satisfeito nos primeiros 15 dias, 
                devolvemos 100% do seu investimento. Sem perguntas, sem complicações.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PremiumPlans;