import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { useRef, useEffect, useState } from 'react';

// Import Lottie animations from arrastar folder
import scarAnimation from '../animations/arrastar/scar.json';
import gabrielaAnimation from '../animations/arrastar/gabriela.json';
import luizAnimation from '../animations/arrastar/luiz.json';
import danielAnimation from '../animations/arrastar/daniel.json';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  credentials: string;
  description: string;
  animationData: object;
}

// Interactive Lottie component with drag functionality
const InteractiveLottie = ({ animationData, className = "" }: { animationData: object, className?: string }) => {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);
  const dragStartX = useRef(0);
  const baseDragProgress = useRef(0);

  /* espera a animação carregar e garante frame 0 */
  useEffect(() => {
    const anim = lottieRef.current;
    if (!anim) return;

    // Aguarda um pequeno delay para garantir que a animação carregou
    const timer = setTimeout(() => {
      anim.pause();
      anim.goToAndStop(0, true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    dragStartX.current = e.clientX;
    baseDragProgress.current = dragProgress;
    setIsDragging(true);
    containerRef.current.style.cursor = 'grabbing';
    containerRef.current.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !containerRef.current || !lottieRef.current) return;

    const dx = e.clientX - dragStartX.current;
    const containerWidth = containerRef.current.offsetWidth;
    
    // Ajustar a sensibilidade para um meio termo
    const isMobile = window.innerWidth <= 768;
    const multiplier = isMobile ? 0.3 : 2; // Meio termo para mobile
    const maxDragDistance = containerWidth * multiplier;

    const delta = dx / maxDragDistance;
    const newProgress = Math.max(0, Math.min(1, baseDragProgress.current + delta));
    
    // Só atualizar se houver mudança significativa
    if (Math.abs(newProgress - dragProgress) > 0.01) {
      setDragProgress(newProgress);

      const totalFrames = lottieRef.current.getDuration(true);
      if (totalFrames && totalFrames > 0) {
        const targetFrame = Math.floor(newProgress * (totalFrames - 1));
        lottieRef.current.goToAndStop(targetFrame, true);
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    setIsDragging(false);
    baseDragProgress.current = dragProgress;
    containerRef.current.style.cursor = 'grab';
    containerRef.current.releasePointerCapture(e.pointerId);
  };

  // Touch events para mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    dragStartX.current = e.touches[0].clientX;
    baseDragProgress.current = dragProgress;
    setIsDragging(true);
    containerRef.current.style.cursor = 'grabbing';
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current || !lottieRef.current) return;

    const dx = e.touches[0].clientX - dragStartX.current;
    const containerWidth = containerRef.current.offsetWidth;
    
    // Mesma sensibilidade dos pointer events para consistência
    const maxDragDistance = containerWidth * 0.3;
    const delta = dx / maxDragDistance;
    const newProgress = Math.max(0, Math.min(1, baseDragProgress.current + delta));
    
    // Só atualizar se houver mudança significativa
    if (Math.abs(newProgress - dragProgress) > 0.01) {
      setDragProgress(newProgress);

      const totalFrames = lottieRef.current.getDuration(true);
      if (totalFrames && totalFrames > 0) {
        const targetFrame = Math.floor(newProgress * (totalFrames - 1));
        lottieRef.current.goToAndStop(targetFrame, true);
      }
    }
  };

  const handleTouchEnd = () => {
    if (!containerRef.current) return;
    setIsDragging(false);
    baseDragProgress.current = dragProgress;
    containerRef.current.style.cursor = 'grab';
  };

  return (
    <div className="relative w-full h-full" style={{ pointerEvents: 'none' }}>
      <div 
        ref={containerRef}
        className="absolute inset-0 m-auto"
        style={{
          width: 'calc(100% / 1.5)',
          height: 'calc(100% / 1.5)',
          touchAction: 'none',
          pointerEvents: 'auto',
          cursor: isDragging ? 'grabbing' : 'grab',
          zIndex: 10
        }}
        onPointerDown={(e) => {
          e.stopPropagation();
          handlePointerDown(e);
        }}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onTouchStart={(e) => {
          e.stopPropagation();
          handleTouchStart(e);
        }}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onClick={(e) => e.stopPropagation()}
      />
      <div className={`${className} w-full h-full`} style={{ pointerEvents: 'none' }}>
        <Lottie 
          lottieRef={lottieRef}
          animationData={animationData}
          loop={false}
          autoplay={false}
          className="w-full h-full pointer-events-none"
        />
      </div>
    </div>
  );
};

// Compact card for team member selection
const CompactTeamCard = ({ 
  member, 
  isSelected, 
  onClick 
}: { 
  member: TeamMember; 
  isSelected: boolean; 
  onClick: () => void;
}) => {
  return (
    <motion.div
      className={`glass-effect rounded-2xl p-3 sm:p-4 cursor-pointer transition-all duration-300 ${
        isSelected 
          ? 'ring-2 ring-primary shadow-lg shadow-primary/20 scale-105' 
          : 'hover:scale-102 hover:shadow-lg'
      }`}
      onClick={onClick}
      whileHover={{ scale: isSelected ? 1.05 : 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden flex-shrink-0 bg-dark/50 shadow-md">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-light mb-1 truncate">
            {member.name}
          </h3>
          <div className="text-primary font-medium text-xs sm:text-sm leading-tight h-6 sm:h-8 flex items-center">
            {member.role}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Detailed card for expanded view
const DetailedTeamCard = ({ member }: { member: TeamMember }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden"
    >
      {/* Premium background with enhanced gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark/75 via-dark/85 to-dark/80 rounded-3xl"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/8 via-transparent to-primary/8 rounded-3xl"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-white/3 via-transparent to-primary/5 rounded-3xl"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-primary/3 via-transparent to-primary/4 rounded-3xl"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-transparent to-primary/3 rounded-3xl"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/2 via-transparent to-primary/2 rounded-3xl"></div>
      
      {/* Enhanced pattern overlay */}
      <div className="absolute inset-0 opacity-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.15)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,193,7,0.15)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,193,7,0.08)_0%,transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.1)_0%,transparent_40%)]"></div>
      </div>
      
      {/* Main content */}
      <div className="relative glass-effect rounded-3xl p-6 sm:p-8 lg:p-12 border border-white/25 shadow-2xl shadow-primary/15 backdrop-blur-sm">
        {/* Desktop Layout - Grid 2 colunas */}
        <div className="hidden lg:grid grid-cols-2 gap-12 items-start min-h-[40rem]">
          {/* Left side - Info */}
          <div className="space-y-6">
            {/* Header section */}
            <div className="flex items-start gap-6">
              {/* Photo with premium border */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary rounded-2xl p-0.5 opacity-80"></div>
                <div className="relative w-28 h-28 rounded-2xl overflow-hidden bg-dark/50">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Basic info */}
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-light mb-2">
                  {member.name}
                </h3>
                <div className="text-primary font-semibold text-lg mb-3">
                  {member.role}
                </div>
                <div className="text-sm text-light-muted font-mono bg-dark/50 px-4 py-2 rounded-xl border border-white/10 inline-block">
                  {member.credentials}
                </div>
              </div>
            </div>

            {/* Expertise highlights */}
            <div className="bg-gradient-to-br from-dark/50 via-dark/60 to-dark/45 border border-white/15 rounded-2xl p-6 shadow-lg shadow-primary/5">
              <h4 className="text-primary font-semibold text-lg mb-4 flex items-center gap-2">
                <span className="text-primary">⭐</span>
                Especialização
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {member.name === "João Scar" && (
                  <>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-light-muted">7 países visitados</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-light-muted">Ex-atleta federado</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-light-muted">Metodologia única</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-light-muted">7+ anos de experiência</span>
                    </div>
                  </>
                )}
                {member.name === "Gabriela Trindade" && (
                  <>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-light-muted">Nutrição estratégica</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-light-muted">Protocolos individualizados</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-light-muted">Performance otimizada</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-light-muted">Composição corporal</span>
                    </div>
                  </>
                )}
                {member.name === "Luiz Camargo" && (
                  <>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-light-muted">20+ anos de experiência</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-light-muted">Formado desde 2000</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-light-muted">Centenas de alunos</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-light-muted">Excelência técnica</span>
                    </div>
                  </>
                )}
                {member.name === "Daniel França" && (
                  <>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-light-muted">Queima de gordura</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-light-muted">Recomposição corporal</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-light-muted">Resultados sustentáveis</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-light-muted">Protocolos individualizados</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Main description */}
            <div className="text-light-muted text-lg leading-relaxed space-y-3">
              {member.description.split('\n\n').map((paragraph, index) => (
                <p key={index} className={`text-justify ${index === 0 ? 'text-xl font-medium' : 'text-lg'}`}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Personal quote */}
            <div className="bg-gradient-to-r from-primary/15 via-primary/10 to-primary/15 border border-primary/25 rounded-2xl p-6 shadow-lg shadow-primary/10">
              <blockquote className="text-light-muted italic text-lg leading-relaxed mb-3 text-justify">
                "{member.name === "João Scar" 
                  ? "Nessa jornada, o seu objetivo é o único destino que aceito. Aqui, você não conta com sorte, conta comigo e com toda nossa equipe."
                  : member.name === "Gabriela Trindade"
                  ? "Minha missão é transformar sua alimentação em uma ferramenta poderosa de transformação, sem restrições extremas ou dietas insustentáveis."
                  : member.name === "Luiz Camargo"
                  ? "Com mais de 20 anos de experiência, minha missão é garantir que cada protocolo seja seguro, eficiente e adaptado às necessidades individuais."
                  : "Meu compromisso é desenvolver treinos que maximizem seus resultados respeitando suas limitações e objetivos específicos."
                }"
              </blockquote>
              <cite className="text-primary font-semibold">
                — {member.name}
              </cite>
            </div>
          </div>

          {/* Right side - Animation */}
          <div className="flex justify-end items-center">
            <div className="w-[36rem] h-[36rem] xl:w-[40rem] xl:h-[40rem] 2xl:w-[44rem] 2xl:h-[44rem]">
              <InteractiveLottie 
                animationData={member.animationData}
                className="w-full h-full scale-120 xl:scale-125 2xl:scale-130"
              />
            </div>
          </div>
        </div>

        {/* Mobile Layout - Sequência vertical */}
        <div className="lg:hidden space-y-8">
          {/* Card Info */}
          <div className="space-y-4 sm:space-y-6">
            {/* Header section */}
            <div className="flex items-start gap-4 sm:gap-6">
              {/* Photo with premium border */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary rounded-2xl p-0.5 opacity-80"></div>
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-dark/50">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Basic info */}
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-light mb-2">
                  {member.name}
                </h3>
                <div className="text-primary font-semibold text-base sm:text-lg mb-3">
                  {member.role}
                </div>
                <div className="text-xs sm:text-sm text-light-muted font-mono bg-dark/50 px-3 sm:px-4 py-2 rounded-xl border border-white/10 inline-block">
                  {member.credentials}
                </div>
              </div>
            </div>

            {/* Expertise highlights */}
            <div className="bg-gradient-to-br from-dark/50 via-dark/60 to-dark/45 border border-white/15 rounded-2xl p-4 sm:p-6 shadow-lg shadow-primary/5">
              <h4 className="text-primary font-semibold text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
                                  <span className="text-primary">⭐</span>
                Especialização
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {member.name === "João Scar" && (
                  <>
                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-light-muted">7 países visitados</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-light-muted">Ex-atleta federado</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-light-muted">Metodologia única</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-light-muted">7+ anos de experiência</span>
                    </div>
                  </>
                )}
                {member.name === "Gabriela Trindade" && (
                  <>
                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-light-muted">Nutrição estratégica</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-light-muted">Protocolos individualizados</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-light-muted">Performance otimizada</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-light-muted">Composição corporal</span>
                    </div>
                  </>
                )}
                {member.name === "Luiz Camargo" && (
                  <>
                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-light-muted">20+ anos de experiência</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-light-muted">Formado desde 2000</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-light-muted">Centenas de alunos</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-light-muted">Excelência técnica</span>
                    </div>
                  </>
                )}
                {member.name === "Daniel França" && (
                  <>
                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-light-muted">Queima de gordura</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-light-muted">Recomposição corporal</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-light-muted">Resultados sustentáveis</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-light-muted">Protocolos individualizados</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Main description */}
            <div className="text-light-muted text-sm sm:text-base leading-relaxed space-y-2 sm:space-y-3">
              {member.description.split('\n\n').map((paragraph, index) => (
                <p key={index} className={`text-justify ${index === 0 ? 'text-base sm:text-lg font-medium' : 'text-sm sm:text-base'}`}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Personal quote */}
            <div className="bg-gradient-to-r from-primary/15 via-primary/10 to-primary/15 border border-primary/25 rounded-2xl p-4 sm:p-6 shadow-lg shadow-primary/10">
              <blockquote className="text-light-muted italic text-sm sm:text-base leading-relaxed mb-3 text-justify">
                "{member.name === "João Scar" 
                  ? "Nessa jornada, o seu objetivo é o único destino que aceito. Aqui, você não conta com sorte, conta comigo e com toda nossa equipe."
                  : member.name === "Gabriela Trindade"
                  ? "Minha missão é transformar sua alimentação em uma ferramenta poderosa de transformação, sem restrições extremas ou dietas insustentáveis."
                  : member.name === "Luiz Camargo"
                  ? "Com mais de 20 anos de experiência, minha missão é garantir que cada protocolo seja seguro, eficiente e adaptado às necessidades individuais."
                  : "Meu compromisso é desenvolver treinos que maximizem seus resultados respeitando suas limitações e objetivos específicos."
                }"
              </blockquote>
              <cite className="text-primary font-semibold">
                — {member.name}
              </cite>
            </div>
          </div>

          {/* Animation - ENTRE o card e o texto */}
          <div className="flex justify-center items-center">
            <div className="w-[24rem] h-[24rem] sm:w-[28rem] sm:h-[28rem]">
              <InteractiveLottie 
                animationData={member.animationData}
                className="w-full h-full scale-125 sm:scale-115"
              />
            </div>
          </div>

          {/* Texto "Arraste para mudar o tema" - ABAIXO da animação */}
                      <div className="flex items-center justify-center gap-2 text-primary/80 text-sm sm:text-base font-medium">
            <span>Arraste para mudar o tema</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main component for the team section
const TeamExpertise: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const team: TeamMember[] = [
    {
      name: "João Scar",
      role: "Fundador & Metodologista",
      image: "images/joao.jpeg",
      credentials: "Certificado Enade Uruguay",
      description: "Eu nunca acreditei nesse negócio de te passar por uma análise, jogar uma ficha na tua mão e te largar. Cada pessoa tem uma rotina, tem variáveis. Aqui a gente leva tudo isso em consideração pra montar um plano que realmente funcione e se adapte pra você.",
      animationData: scarAnimation
    },
    {
      name: "Gabriela Trindade",
      role: "Nutricionista Esportiva",
      image: "images/gabrielasemfundo.png",
      credentials: "CRN 1426",
        description: "Gabriela Trindade traz um olhar técnico e estratégico para cada protocolo alimentar. Sua atuação na ScarX é garantir que sua alimentação seja um verdadeiro motor de progresso físico. Cada ajuste é pensado com precisão, respeitando sua individualidade e otimizando sua performance e composição corporal.",
      animationData: gabrielaAnimation
    },
    {
      name: "Luiz Camargo",
      role: "Responsável Técnico",
      image: "images/Luiz.jpeg",
      credentials: "CREF 083338-G/SP",
      description: "Com mais de 20 anos dedicados ao desenvolvimento físico, Luiz Camargo traz sua vasta experiência para a equipe técnica da ScarX. Sua expertise é fundamental para garantir a excelência técnica de todos os protocolos desenvolvidos.",
      animationData: luizAnimation
    },
    {
      name: "Daniel França",
      role: "Especialista em Emagrecimento",
      image: "images/daniel.jpeg",
      credentials: "CREF 153464-G/SP",
      description: "Daniel integra a equipe da ScarX com foco em resultados sustentáveis e altamente individualizados. Especialista em treinos estratégicos para queima de gordura e recomposição corporal, ele desenvolve protocolos que maximizam seus resultados respeitando suas limitações e objetivos específicos.",
      animationData: danielAnimation
    }
  ];

  // Auto-select first member on mount
  useEffect(() => {
    if (inView && !selectedMember) {
      setSelectedMember(team[0]);
    }
  }, [inView, selectedMember, team]);

  return (
    <section className="section-padding section-transition" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-primary mb-6">
              O time por trás do seu novo físico
            </h2>
            <p className="text-xl text-light-muted max-w-3xl mx-auto">
              Especialistas escolhidos a dedo que aplicam ciência, atenção diária e estratégia no seu progresso. Aqui sua evolução não é solitária.
            </p>
          </motion.div>

          {/* Compact team cards */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {team.map((member) => (
              <motion.div key={member.name} variants={cardVariants}>
                <CompactTeamCard
                  member={member}
                  isSelected={selectedMember?.name === member.name}
                  onClick={() => setSelectedMember(member)}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Detailed view */}
          <AnimatePresence mode="wait">
            {selectedMember && (
              <motion.div
                key={selectedMember.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <DetailedTeamCard member={selectedMember} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="glass-effect rounded-3xl p-4 sm:p-6 lg:p-8 xl:p-12 text-center">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-light mb-3 sm:mb-4 lg:mb-6">
                Nossa Filosofia
              </h3>
              <blockquote className="text-sm sm:text-base lg:text-lg xl:text-xl text-light-muted italic leading-relaxed max-w-4xl mx-auto text-justify">
                "Nessa jornada, o seu objetivo é o único destino que aceito. 
                Aqui, você não conta com sorte, conta comigo e com toda nossa equipe."
              </blockquote>
              <cite className="text-primary font-semibold mt-2 sm:mt-3 lg:mt-4 block text-xs sm:text-sm lg:text-base">
                — João Scar, Fundador
              </cite>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamExpertise;