import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Sparkles, Crown } from 'lucide-react';

interface Client {
  name: string;
  description: string;
  image: string;
  feedback: string;
  instagram?: string;
  twitter?: string;
}

const OurClients: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const clients: Client[] = [
    {
      name: "Avelino Morganti",
      description: "Empresário e youtuber",
      image: "/images/clientes/avelino.png",
              feedback: "Excelente profissional! A abordagem científica da ScarX fez toda a diferença na minha transformação.",
      twitter: "@avelinomorganti"
    },
    {
      name: "Daniel Scott",
      description: "Consultor, Palestrante, Conselheiro",
      image: "/images/clientes/scot.png",
      feedback: "Transformação incrível! O João me ajudou a alcançar o shape dos meus sonhos de forma sustentável e eficiente.",
      instagram: "@odanielscott"
    },
    {
      name: "Peter Jordan",
      description: "Youtuber e empresário",
      image: "/images/peter.png",
              feedback: "Parceria incrível! A metodologia da ScarX é única e os resultados falam por si só.",
      instagram: "@petjordan"
    },
    {
      name: "Felippe Hermes",
      description: "Co-founder Blocktrendsbr",
      image: "/images/clientes/felippe.png",
      feedback: "Método revolucionário! Consegui resultados que nunca imaginei possível com a orientação do João.",
      instagram: "@Felippe_Hermes"
    }
  ];

  // Ordem específica para mobile: Peter, Daniel, Felippe, Avelino
  const mobileClients: Client[] = [
    clients[2], // Peter Jordan
    clients[1], // Daniel Scott
    clients[3], // Felippe Hermes
    clients[0]  // Avelino Morganti
  ];

  // Triplicar os clientes para criar o efeito infinito
  const triplicatedClients = isMobile 
    ? [...mobileClients, ...mobileClients, ...mobileClients]
    : [...clients, ...clients, ...clients];

  useEffect(() => {
    if (!inView || !isMobile) return;

    const itemWidth = 320 + 24; // w-80 (320px) + gap-6 (24px)
    const totalWidth = mobileClients.length * itemWidth;
    const speed = 0.4; // pixels por frame

    const animate = () => {
      setCurrentTranslate(prev => {
        const newTranslate = prev - speed;
        
        // Quando chegamos no final do primeiro conjunto, resetamos para o início do segundo
        if (Math.abs(newTranslate) >= totalWidth) {
          setTimeout(() => {
            setIsTransitioning(true);
            setCurrentTranslate(0);
            setTimeout(() => setIsTransitioning(false), 50);
          }, 0);
          return newTranslate;
        }
        
        return newTranslate;
      });
    };

    const animationId = setInterval(animate, 16); // ~60fps

    return () => clearInterval(animationId);
  }, [inView, isMobile, mobileClients.length]);

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

  return (
    <section id="clients" className="section-padding" ref={ref}>
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <motion.div variants={itemVariants} className="relative">
            {/* Card "NOSSOS CLIENTES" removido */}
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-primary leading-tight">
              Quem confiou em nós?
            </h2>
            
            <p className="text-light-muted text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto">
              Empresários, influenciadores e pessoas de sucesso que confiaram em nossa metodologia
            </p>
          </motion.div>
        </motion.div>

        {/* Desktop Layout - Grid estático */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="hidden lg:grid lg:grid-cols-4 gap-6 md:gap-8"
        >
          {clients.map((client, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="card card-hover text-center p-6 md:p-8 group relative overflow-hidden"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Profile image */}
              <div className="relative mb-6">
                <div className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full overflow-hidden border-2 border-primary/30 group-hover:border-primary/60 transition-all duration-300 relative">
                  <img 
                    src={client.image} 
                    alt={client.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                  {client.name}
                </h3>
                
                <p className="text-primary text-sm md:text-base font-medium mb-3">
                  {client.description}
                </p>
                
                {client.instagram && (
                  <p className="text-light-muted text-xs md:text-sm mb-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                    {client.instagram}
                  </p>
                )}
                {client.twitter && (
                  <p className="text-light-muted text-xs md:text-sm mb-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                    {client.twitter}
                  </p>
                )}
                
                {/* Stars */}
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-4 h-4 text-primary fill-current opacity-80 group-hover:opacity-100 transition-all duration-300"
                      style={{
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
                
                {/* Testimonial */}
                <blockquote className="text-light-muted text-sm md:text-base italic leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                  "{client.feedback}"
                </blockquote>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Layout - Looping infinito */}
        <div className="lg:hidden">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative overflow-hidden"
          >
            <div 
              ref={containerRef}
              className="flex gap-6"
              style={{
                transform: `translateX(${currentTranslate}px)`,
                transition: isTransitioning ? 'none' : 'transform 0.1s linear'
              }}
            >
              {triplicatedClients.map((client, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="card card-hover text-center p-6 w-80 flex-shrink-0 group relative overflow-hidden"
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Profile image */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-primary/30 group-hover:border-primary/60 transition-all duration-300 relative">
                      <img 
                        src={client.image} 
                        alt={client.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                      {client.name}
                    </h3>
                    
                    <p className="text-primary text-sm font-medium mb-3">
                      {client.description}
                    </p>
                    
                    {client.instagram && (
                      <p className="text-light-muted text-xs mb-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                        {client.instagram}
                      </p>
                    )}
                    {client.twitter && (
                      <p className="text-light-muted text-xs mb-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                        {client.twitter}
                      </p>
                    )}
                    
                    {/* Stars */}
                    <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-4 h-4 text-primary fill-current opacity-80 group-hover:opacity-100 transition-all duration-300"
                          style={{
                            animationDelay: `${i * 0.1}s`,
                          }}
                        />
                      ))}
                    </div>
                    
                    {/* Testimonial */}
                    <blockquote className="text-light-muted text-sm italic leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                      "{client.feedback}"
                    </blockquote>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurClients; 