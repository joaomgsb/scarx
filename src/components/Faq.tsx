import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown, HelpCircle, Sparkles, Star } from 'lucide-react';

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggle: () => void;
  index: number;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer, isOpen, toggle, index }) => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, delay: index * 0.1 },
    },
  };

  return (
    <motion.div 
      variants={itemVariants}
      className="relative group"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
      
      <div className={`relative glass-effect rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen 
          ? 'border-primary/40 shadow-lg shadow-primary/20' 
          : 'border-neutral-800 hover:border-primary/30'
      }`}>
        <button
          className="w-full flex justify-between items-center p-4 md:p-6 text-left focus:outline-none group"
          onClick={toggle}
          aria-expanded={isOpen}
        >
          <div className="flex items-start gap-4 flex-1">
            <div className={`p-2 rounded-lg transition-all duration-300 ${
              isOpen 
                ? 'bg-primary/20 text-primary' 
                : 'bg-neutral-800/50 text-light-muted group-hover:bg-primary/10 group-hover:text-primary'
            }`}>
              <HelpCircle className="h-5 w-5" />
            </div>
            <h4 className={`font-bold text-lg md:text-xl leading-tight transition-colors duration-300 ${
              isOpen ? 'text-primary' : 'text-light group-hover:text-primary'
            }`}>
              {question}
            </h4>
          </div>
          
          <div className={`ml-4 p-2 rounded-full transition-all duration-300 ${
            isOpen 
              ? 'bg-primary/20 text-primary rotate-180' 
              : 'bg-neutral-800/50 text-light-muted group-hover:bg-primary/10 group-hover:text-primary'
          }`}>
            <ChevronDown className="h-5 w-5 transition-transform duration-300" />
          </div>
        </button>
        
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 md:px-6 lg:px-8 pb-4 md:pb-6 lg:pb-8">
            <div className="pl-8 md:pl-12 border-l-2 border-primary/30">
              <p className="text-light-muted leading-relaxed text-base md:text-lg break-words">
                {answer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Faq: React.FC = () => {
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
        staggerChildren: 0.1,
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

  const faqItems = [
    {
      question: "Nunca fiz consultoria, é para mim?",
        answer: "Sim, absolutamente! A ScarX foi desenhada para todos que buscam resultados reais e duradouros, independentemente do seu nível de experiência. Nossa metodologia é intuitiva para iniciantes e robusta o suficiente para atletas experientes. Com acompanhamento premium e uma equipe dedicada, você terá todo o suporte para iniciar e manter sua jornada de transformação com confiança."
    },
    {
      question: "E se eu não conseguir seguir o plano por causa da rotina?",
        answer: "Esse é exatamente o diferencial da ScarX. Nós adaptamos completamente o protocolo à sua rotina, por mais imprevisível que ela seja. Trabalhamos com viajantes frequentes, empresários e pessoas com agendas extremamente ocupadas, garantindo que os protocolos se adaptem a você, e não o contrário."
    },
    {
      question: "Como funciona o acompanhamento diário?",
      answer: "Você terá acesso direto à equipe via WhatsApp, podendo tirar dúvidas, relatar dificuldades ou solicitar ajustes a qualquer momento. No plano PRO+, você conta com suporte 24/7 e atenção prioritária da nossa Gerente Executiva, Ana Fontes."
    },
    {
      question: "O plano alimentar é muito restritivo? Vou ter que cortar o que gosto?",
      answer: "Não trabalhamos com dietas restritivas ou proibições radicais. Nossa abordagem é incluir seus alimentos preferidos de forma estratégica, garantindo que você tenha prazer na alimentação enquanto alcança seus objetivos. A sustentabilidade do plano é nossa prioridade."
    },
    {
      question: "E se eu não gostar do protocolo passado?",
      answer: "Oferecemos garantia de satisfação. Se você não estiver satisfeito com o protocolo dentro dos primeiros 15 dias, faremos todos os ajustes necessários para adequá-lo às suas necessidades ou devolvemos seu investimento integralmente."
    },
    {
      question: "Como vocês avaliam meu físico?",
      answer: "Através de um questionário detalhado, fotos em diferentes ângulos (tratadas com total confidencialidade) e uma análise completa da sua rotina, histórico de treinos e alimentação. No plano PRO+, você também tem sessões de videoconferência para avaliações mais precisas."
    },
    {
      question: "Quanto tempo demora para meu plano ser preparado?",
      answer: "Após a contratação e preenchimento do questionário, seu plano personalizado é entregue em até 48 horas. No plano PRO+, esse prazo pode ser reduzido para 24 horas em casos de urgência."
    },
    {
              question: "Qual é a diferença entre os planos da ScarX?",
      answer: "Oferecemos diferentes níveis de serviço para atender diversas necessidades. O plano PRO+ é nossa experiência premium, com atendimento prioritário, acesso exclusivo à Gerente Executiva, suporte 24/7, ajustes imediatos e um nível de personalização sem precedentes."
    },
    {
      question: "Em quanto tempo terei resultados?",
      answer: "Os primeiros resultados visíveis geralmente aparecem entre 2 e 4 semanas, dependendo do seu ponto de partida e objetivo. No entanto, nossos clientes relatam mudanças positivas na disposição e bem-estar logo nos primeiros dias seguindo o protocolo."
    }
  ];

  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const toggleFaq = (index: number) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  return (
    <section id="faq" className="section-padding section-transition" ref={ref}>
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center max-w-4xl mx-auto mb-8"
        >
          <motion.div variants={itemVariants} className="relative">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-1.5 mb-4">
              <HelpCircle className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Dúvidas Frequentes
              </span>
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            

          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <div className="space-y-3">
            {faqItems.map((item, index) => (
              <FaqItem
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={openIndexes.includes(index)}
                toggle={() => toggleFaq(index)}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mt-12"
        >
          <div className="glass-effect rounded-3xl p-6 md:p-8 border border-neutral-800 max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Star className="w-6 h-6 text-primary" />
                <span className="text-primary font-semibold">Ainda tem dúvidas?</span>
                <Star className="w-6 h-6 text-primary" />
              </div>
              
              <h3 className="text-3xl font-bold mb-3 text-light">Fale Diretamente Conosco</h3>
              <p className="text-xl text-light-muted mb-6 max-w-2xl mx-auto">
                Nossa equipe está pronta para esclarecer qualquer dúvida e ajudar você a escolher 
                o melhor caminho para sua transformação.
              </p>
              
              <a
                href="https://wa.me/5541984961012?text=Olá! Tenho algumas dúvidas sobre os planos da ScarX e gostaria de conversar com a equipe."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-primary text-dark font-bold py-4 px-8 rounded-xl text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/30"
              >
                <HelpCircle className="w-6 h-6" />
                Converse Conosco: Sua Jornada Começa Aqui
                <Sparkles className="w-6 h-6" />
              </a>
            </div>
          </motion.div>
      </div>
    </section>
  );
};

export default Faq;