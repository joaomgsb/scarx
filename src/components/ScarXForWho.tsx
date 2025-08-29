import React from 'react';

const ScarXForWho: React.FC = () => {
  return (
    <section className="relative bg-dark py-20 overflow-hidden">
      {/* Elementos geométricos de fundo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary transform rotate-12 translate-x-20 -translate-y-20 opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary transform rotate-45 translate-x-16 translate-y-16 opacity-30"></div>
      
      <div className="container mx-auto px-4 lg:px-0 max-w-6xl">
        <div className="flex flex-col lg:flex-row -mx-4">
          
          {/* Lado Esquerdo - Conteúdo */}
          <div className="w-full lg:w-1/2 px-4 relative flex flex-col justify-center order-2 lg:order-1">
            <h2 className="text-4xl lg:text-5xl font-medium mb-8 leading-tight">
              <span className="text-white italic">A ScarX é</span>
              <br />
              <span className="text-primary italic">PRA QUEM?</span>
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-primary rounded-full mt-1 flex-shrink-0"></div>
                <p className="text-white text-lg">
                  Para quem deseja transformar o corpo com eficiência e liberdade.
                </p>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-primary rounded-full mt-1 flex-shrink-0"></div>
                <p className="text-white text-lg">
                  Para quem já tentou de tudo e precisa de um método técnico, claro e aplicável.
                </p>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-primary rounded-full mt-1 flex-shrink-0"></div>
                <p className="text-white text-lg">
                  Para iniciantes que querem uma base sólida e para avançados que buscam evolução contínua.
                </p>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-primary rounded-full mt-1 flex-shrink-0"></div>
                <p className="text-white text-lg">
                  Um método que gera resultados reais, para qualquer corpo, em qualquer nível, em qualquer rotina.
                </p>
              </div>
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