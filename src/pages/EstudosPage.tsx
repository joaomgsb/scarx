import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  ArrowLeft, 
  Microscope, 
  ExternalLink, 
  BookOpen, 
  Award,
  Brain,
  Shield,
  Star,
  Target,
  Activity,
  Heart,
  Zap,
  Users,
  Clock,
  TrendingUp
} from 'lucide-react';
import WhatsAppButton from '../components/WhatsAppButton';

interface Estudo {
  id: number;
  titulo: string;
  link: string;
  pmid: string;
  categoria: string;
  icone: React.ReactNode;
  cor: string;
  interpretacao: string;
  influencia: string;
}

const EstudosPage: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Scroll para o topo quando a página carrega
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [estudoSelecionado, setEstudoSelecionado] = useState<number | null>(null);

  const estudos: Estudo[] = [
    {
      id: 1,
      titulo: "Health Benefits Beyond the Scale: The Role of Diet and Nutrition During Weight Loss Programmes",
      link: "https://pubmed.ncbi.nlm.nih.gov/39519418/",
      pmid: "39519418",
      categoria: "Nutrição e Saúde Metabólica",
      icone: <Heart className="h-6 w-6" />,
      cor: "from-red-500 to-red-600",
      interpretacao: "Este estudo destaca que as intervenções dietéticas e nutricionais em programas de perda de peso oferecem benefícios de saúde muito além da simples redução de peso. Ele enfatiza melhorias na saúde metabólica e cardiovascular, equilíbrio do microbioma intestinal, redução da inflamação, melhor qualidade do sono, bem-estar mental e qualidade de vida geral. A pesquisa sugere uma mudança de foco de uma abordagem centrada apenas no peso para um modelo mais holístico que prioriza ganhos de saúde abrangentes e a longo prazo, tratando a obesidade como uma doença crônica e complexa.",
      influencia: "Este estudo reforça a visão da ScarFit de que a saúde e o bem-estar vão além dos números na balança. Nossa abordagem se concentra em melhorias metabólicas, cardiovasculares e na qualidade de vida geral, utilizando a nutrição como uma ferramenta poderosa para alcançar esses objetivos. A ScarFit adota uma perspectiva holística, reconhecendo que a perda de peso é um resultado de um corpo mais saudável e não o único objetivo. Isso nos permite criar planos nutricionais que promovem benefícios duradouros e sustentáveis para a saúde de nossos clientes."
    },
    {
      id: 2,
      titulo: "Efficacy of Split Versus Full-Body Resistance Training on Strength and Muscle Growth: A Systematic Review With Meta-Analysis",
      link: "https://pubmed.ncbi.nlm.nih.gov/38595233/",
      pmid: "38595233",
      categoria: "Treinamento de Força",
      icone: <Zap className="h-6 w-6" />,
      cor: "from-blue-500 to-blue-600",
      interpretacao: "Esta revisão sistemática e meta-análise comparou a eficácia de rotinas de treinamento de força divididas (Split) e de corpo inteiro (Full-Body) no ganho de força e crescimento muscular em adultos saudáveis. Os resultados indicam que não há diferença significativa entre os dois tipos de rotina em termos de ganhos de força ou hipertrofia muscular, desde que o volume de treino seja equivalente. Isso significa que a escolha entre uma rotina Split ou Full-Body pode ser baseada nas preferências pessoais do indivíduo, sem comprometer os resultados.",
      influencia: "Este estudo valida a flexibilidade na prescrição de treinos na ScarFit. Reconhecemos que a adesão e a consistência são cruciais para o sucesso a longo prazo. Ao demonstrar que tanto as rotinas Split quanto as Full-Body são eficazes quando o volume é igualado, podemos oferecer aos nossos clientes a liberdade de escolher o estilo de treino que melhor se adapta às suas preferências, rotina e estilo de vida, garantindo que o plano seja sustentável e prazeroso, sem sacrificar os resultados."
    },
    {
      id: 3,
      titulo: "Sleep patterns and risk of chronic disease as measured by long-term monitoring with commercial wearable devices in the All of Us Research Program",
      link: "https://pubmed.ncbi.nlm.nih.gov/39030265/",
      pmid: "39030265",
      categoria: "Sono e Saúde",
      icone: <Clock className="h-6 w-6" />,
      cor: "from-purple-500 to-purple-600",
      interpretacao: "Este estudo, que utilizou dados de dispositivos vestíveis comerciais, demonstrou que os padrões de sono – incluindo estágios, duração e regularidade – estão associados ao risco de doenças crônicas. A pesquisa revelou que o sono REM e o sono profundo estão inversamente relacionados à incidência de fibrilação atrial, e que a irregularidade do sono aumenta o risco de obesidade, hiperlipidemia, hipertensão, transtorno depressivo maior e transtorno de ansiedade generalizada. Além disso, foram observadas associações em forma de J entre a duração média diária do sono e a hipertensão, depressão e ansiedade. Os achados sugerem que a qualidade e a regularidade do sono são fatores cruciais para a prevenção de doenças crônicas.",
      influencia: "Na ScarFit, este estudo reforça a importância de um sono de qualidade como um pilar fundamental para a saúde geral e a prevenção de doenças crônicas. Nossas estratégias de bem-estar e performance incluem a otimização dos padrões de sono, reconhecendo que a duração, os estágios e a regularidade do sono impactam diretamente o metabolismo, o humor e a saúde cardiovascular. Orientamos nossos clientes a priorizar o sono como parte integrante de seu plano de saúde, visando não apenas a performance física, mas também a longevidade e a qualidade de vida."
    },
    {
      id: 4,
      titulo: "Energy metabolism in health and diseases",
      link: "https://pubmed.ncbi.nlm.nih.gov/39966374/",
      pmid: "39966374",
      categoria: "Metabolismo Energético",
      icone: <Activity className="h-6 w-6" />,
      cor: "from-green-500 to-green-600",
      interpretacao: "Esta revisão abrangente explora o papel fundamental do metabolismo energético na manutenção das funções fisiológicas e em diversas condições de saúde e doença. O estudo detalha vias críticas como a glicólise, fosforilação oxidativa, metabolismo de ácidos graxos e aminoácidos, e seus mecanismos regulatórios. Ele destaca que, em estados patológicos como doenças neurodegenerativas, autoimunes e câncer, ocorre um extenso reprogramação metabólica, resultando em metabolismo de glicose prejudicado e disfunção mitocondrial, que aceleram a progressão da doença. A pesquisa enfatiza a importância da homeostase metabólica e o potencial de novas tecnologias para diagnósticos precisos e intervenções terapêuticas personalizadas.",
      influencia: "Na ScarFit, este estudo reforça nossa compreensão da centralidade do metabolismo energético para a saúde e o desempenho. Nossas estratégias de nutrição e treino são projetadas para otimizar as vias metabólicas, visando não apenas a composição corporal, mas também a prevenção de doenças e a melhoria da vitalidade geral. Reconhecemos que um metabolismo saudável é a base para a performance ideal e a longevidade, e por isso, nossos planos são personalizados para promover a homeostase metabólica e a eficiência energética em nossos clientes."
    },
    {
      id: 5,
      titulo: "Nutritional Strategies for Optimizing Health, Sports Performance, and Recovery for Female Athletes and Other Physically Active Women: A Systematic Review",
      link: "https://pubmed.ncbi.nlm.nih.gov/38994896/",
      pmid: "38994896",
      categoria: "Nutrição Esportiva Feminina",
      icone: <Users className="h-6 w-6" />,
      cor: "from-pink-500 to-pink-600",
      interpretacao: "Esta revisão sistemática aborda a escassez de estudos focados em recomendações nutricionais específicas para atletas femininas e mulheres fisicamente ativas. Ela conclui que dietas ricas em carboidratos melhoram o desempenho em atividades que esgotam o glicogênio muscular, e refeições pré-exercício com alto índice glicêmico aumentam o metabolismo de carboidratos. A ingestão de 5-6 refeições proteicas ao longo do dia, com cada uma contendo mais de 25g de proteína, favorece o anabolismo muscular. Além disso, suplementos como cafeína, precursores de óxido nítrico, β-alanina e certos alimentos esportivos (carboidratos, proteínas ou suas combinações, e micronutrientes em casos de deficiências) podem influenciar positivamente o desempenho esportivo e a saúde dessas mulheres.",
      influencia: "Este estudo é fundamental para a ScarFit, pois nos permite desenvolver estratégias nutricionais personalizadas e baseadas em evidências para mulheres, um grupo frequentemente sub-representado na pesquisa esportiva. A ênfase na importância dos carboidratos para o desempenho, da distribuição proteica para o anabolismo e do papel dos suplementos específicos nos ajuda a otimizar os planos de nutrição para nossas clientes, visando não apenas a performance atlética, mas também a saúde geral e a recuperação. Isso garante que nossas recomendações sejam cientificamente embasadas e adaptadas às necessidades fisiológicas únicas das mulheres ativas."
    },
    {
      id: 6,
      titulo: "The Role of Physical Exercise as a Therapeutic Tool to Improve Lipedema: A Consensus Statement",
      link: "https://pubmed.ncbi.nlm.nih.gov/38958868/",
      pmid: "38958868",
      categoria: "Exercício Terapêutico",
      icone: <Shield className="h-6 w-6" />,
      cor: "from-teal-500 to-teal-600",
      interpretacao: "Este consenso destaca o papel crucial do exercício físico como uma abordagem não farmacológica no manejo do lipedema, uma doença crônica caracterizada pelo acúmulo anormal de gordura. Embora o lipedema seja resistente a dietas e exercícios, o estudo aponta que o exercício contribui para melhorias na função mitocondrial, drenagem linfática e redução da inflamação. Vários tipos de exercício, como aquáticos e treinamento de força, aliviam os sintomas e melhoram a qualidade de vida dos pacientes. O documento ressalta a necessidade de diretrizes padronizadas para a prescrição de exercícios e o manejo a longo prazo de pacientes com lipedema.",
      influencia: "Este estudo reforça a importância do exercício físico como uma ferramenta terapêutica e de manejo de condições crônicas, mesmo aquelas que tradicionalmente são consideradas resistentes a intervenções convencionais. Na ScarFit, entendemos que o exercício vai além da estética e da performance, sendo um pilar fundamental para a saúde e o bem-estar geral. A abordagem multifacetada do exercício, incluindo o treinamento de força, é integrada em nossos programas para promover não apenas o ganho muscular e a queima de gordura, mas também a melhoria da função metabólica, a redução da inflamação e a otimização da qualidade de vida de nossos clientes, adaptando-se às suas necessidades individuais e condições de saúde."
    },
    {
      id: 7,
      titulo: "Effects of Acute Sleep Deprivation on Sporting Performance in Athletes: A Comprehensive Systematic Review and Meta-Analysis",
      link: "https://pubmed.ncbi.nlm.nih.gov/39006249/",
      pmid: "39006249",
      categoria: "Sono e Performance",
      icone: <TrendingUp className="h-6 w-6" />,
      cor: "from-indigo-500 to-indigo-600",
      interpretacao: "Esta meta-análise avaliou o impacto da privação aguda de sono no desempenho esportivo de atletas. Os resultados mostram que a privação de sono afeta significativamente a performance atlética geral, com um impacto negativo mais pronunciado na privação parcial de sono no final da noite. Diversos tipos de desempenho físico, como exercícios intermitentes de alta intensidade, controle de habilidades, velocidade, resistência aeróbica e potência explosiva, são adversamente afetados. Além disso, o desempenho atlético geral dos atletas na parte da tarde é inferior ao da manhã após a privação de sono.",
      influencia: "Este estudo sublinha a importância crítica do sono para o desempenho atlético e a recuperação. Na ScarFit, integramos a otimização do sono como um componente essencial dos planos de treino e nutrição. Reconhecemos que a privação de sono pode comprometer os resultados do treinamento e aumentar o risco de lesões. Por isso, educamos nossos clientes sobre a necessidade de um sono adequado e fornecemos estratégias para melhorar a qualidade do sono, garantindo que eles maximizem seu potencial de desempenho e recuperação."
    },
    {
      id: 8,
      titulo: "Effects of Short-Term Low Energy Availability on Metabolism and Performance-Related Parameters in Physically Active Adults",
      link: "https://pubmed.ncbi.nlm.nih.gov/39861408/",
      pmid: "39861408",
      categoria: "Disponibilidade Energética",
      icone: <Target className="h-6 w-6" />,
      cor: "from-orange-500 to-orange-600",
      interpretacao: "Este estudo investigou os efeitos da baixa disponibilidade de energia (LEA) de curto prazo no metabolismo e nos parâmetros relacionados ao desempenho em adultos fisicamente ativos. A pesquisa mostrou que a restrição energética, mesmo por apenas cinco dias, pode levar a adaptações metabólicas significativas, afetando a disponibilidade e regulação da glicose e gorduras. Embora o desempenho de resistência não tenha sido influenciado no curto prazo, houve alterações no peso corporal, massa gorda e certos marcadores sanguíneos. O estudo sugere a necessidade de mais pesquisas sobre exposições mais longas à LEA e comparações específicas por sexo.",
      influencia: "Este estudo é crucial para a ScarFit, pois destaca a importância de uma disponibilidade energética adequada para a saúde metabólica e o desempenho. Nossos programas de nutrição e treino são cuidadosamente planejados para garantir que nossos clientes tenham energia suficiente para suportar suas atividades físicas e otimizar seu metabolismo, evitando os efeitos negativos da baixa disponibilidade de energia. Enfatizamos a importância de uma ingestão calórica e de nutrientes balanceada para sustentar o treinamento, a recuperação e a saúde geral, garantindo que o corpo funcione de forma eficiente e sustentável."
    },
    {
      id: 9,
      titulo: "The effect of protein intake on athletic performance: a systematic review and meta-analysis",
      link: "https://pubmed.ncbi.nlm.nih.gov/39628467/",
      pmid: "39628467",
      categoria: "Proteína e Performance",
      icone: <Brain className="h-6 w-6" />,
      cor: "from-cyan-500 to-cyan-600",
      interpretacao: "Esta revisão sistemática e meta-análise investigou o impacto da ingestão de proteínas no desempenho atlético. Embora a ingestão geral de proteínas não tenha mostrado uma melhora estatisticamente significativa no desempenho atlético, a análise de subgrupos revelou que a proteína melhora significativamente o desempenho de resistência, especialmente quando co-ingerida com carboidratos. O estudo também indicou que a ingestão de proteínas melhora os níveis de glicogênio muscular. Isso sugere que a proteína é mais eficaz para atletas de resistência quando combinada com carboidratos, em vez de alta ingestão de proteína isolada.",
      influencia: "Este estudo valida a importância da ingestão adequada de proteínas, especialmente em combinação com carboidratos, para otimizar o desempenho de resistência e os níveis de glicogênio muscular. Na ScarFit, integramos essas descobertas em nossos planos nutricionais, enfatizando a importância de uma dieta balanceada que inclua proteínas e carboidratos para maximizar a energia, a recuperação e o desempenho atlético. Isso nos permite fornecer recomendações nutricionais precisas e baseadas em evidências para nossos clientes, garantindo que eles atinjam seus objetivos de forma eficaz e sustentável."
    },
    {
      id: 10,
      titulo: "Nutritional Strategies to Improve Post-exercise Recovery and Subsequent Exercise Performance: A Narrative Review",
      link: "https://pubmed.ncbi.nlm.nih.gov/40221559/",
      pmid: "40221559",
      categoria: "Recuperação e Nutrição",
      icone: <Award className="h-6 w-6" />,
      cor: "from-emerald-500 to-emerald-600",
      interpretacao: "Esta revisão narrativa explora as estratégias nutricionais para otimizar a recuperação pós-exercício e o desempenho subsequente, especialmente em atletas com curtos períodos de recuperação. A ingestão de carboidratos é crucial para a reposição de glicogênio, e a proteína é essencial para acelerar a recuperação muscular. A co-ingestão de carboidratos com proteínas ou gorduras é benéfica para a ressíntese de glicogênio e reparo muscular. A revisão também aborda os benefícios da co-ingestão de creatina e cafeína para a síntese de glicogênio e desempenho, e a importância da hidratação com bebidas à base de leite e soluções eletrolíticas. Micronutrientes como ácidos graxos ômega-3, antioxidantes e bicarbonato de sódio também são destacados por seu papel na redução de danos musculares e melhoria do equilíbrio ácido-base.",
      influencia: "Este estudo reforça a abordagem multifacetada da ScarFit para a recuperação e o desempenho. Nossos programas de nutrição são projetados para otimizar a ingestão de carboidratos e proteínas no pós-exercício, garantindo a reposição de glicogênio e o reparo muscular. A importância da hidratação e o papel de micronutrientes específicos são integrados em nossas recomendações, permitindo que nossos clientes se recuperem de forma mais eficiente e estejam prontos para o próximo desafio. Isso demonstra nosso compromisso em fornecer estratégias nutricionais baseadas em evidências para maximizar o potencial atlético e a saúde geral."
    }
  ];

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

  const abrirEstudo = (id: number) => {
    setEstudoSelecionado(id);
    window.scrollTo(0, 0);
  };

  const fecharEstudo = () => {
    setEstudoSelecionado(null);
    window.scrollTo(0, 0);
  };

  const estudoAtual = estudos.find(e => e.id === estudoSelecionado);

  if (estudoSelecionado && estudoAtual) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark via-dark-lighter to-dark text-white">
        <WhatsAppButton />
        
        {/* Header do Estudo */}
        <div className="container mx-auto px-4 py-8">
          <button 
            onClick={fecharEstudo}
            className="inline-flex items-center text-light-gray hover:text-primary transition-all duration-300 group mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar para estudos
          </button>
        </div>

        {/* Conteúdo do Estudo */}
        <article className="container mx-auto px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            {/* Header do Estudo */}
            <header className="text-center mb-12">
              <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${estudoAtual.cor} rounded-full px-6 py-2 mb-6`}>
                {estudoAtual.icone}
                <span className="text-white font-semibold text-sm uppercase tracking-wider">
                  {estudoAtual.categoria}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                {estudoAtual.titulo}
              </h1>
              
              <div className="flex items-center justify-center gap-6 text-light-gray mb-8">
                <div className="flex items-center gap-2">
                  <Microscope className="w-4 h-4" />
                  <span>PMID: {estudoAtual.pmid}</span>
                </div>
                <a
                  href={estudoAtual.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:text-primary-light transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Ver no PubMed</span>
                </a>
              </div>
            </header>

            {/* Conteúdo */}
            <div className="bg-gradient-to-br from-dark-lighter/90 to-dark/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-primary/20 mb-12">
              <div className="space-y-8">
                {/* Interpretação */}
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">
                    <BookOpen className="w-6 h-6" />
                    Interpretação Simplificada
                  </h3>
                  <div className="bg-dark/30 rounded-2xl p-6 border border-primary/10">
                    <p className="text-light-gray leading-relaxed text-lg">
                      {estudoAtual.interpretacao}
                    </p>
                  </div>
                </div>

                {/* Influência na ScarFit */}
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">
                    <Star className="w-6 h-6" />
                    Como Este Estudo Influencia Nossa Abordagem
                  </h3>
                  <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-6 border border-primary/20">
                    <p className="text-light-gray leading-relaxed text-lg">
                      {estudoAtual.influencia}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-dark-lighter/90 to-dark/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-primary/20">
                <h3 className="text-3xl font-bold mb-4">Ciência Aplicada na Prática</h3>
                <p className="text-xl text-light-gray mb-8 max-w-2xl mx-auto">
                  Veja como transformamos evidências científicas em resultados reais com nossos planos personalizados.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://wa.me/5541984961012?text=Olá! Vi os estudos científicos da ScarX e quero saber mais sobre como vocês aplicam a ciência nos planos personalizados."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-primary to-primary-dark text-black font-bold py-4 px-8 rounded-xl text-lg flex items-center justify-center gap-3 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/30"
                  >
                    <Microscope className="w-6 h-6" />
                    Aplicar Ciência ao Meu Plano
                  </a>
                  
                  <Link
                    to="/calculadora-imc"
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-black font-bold py-4 px-8 rounded-xl text-lg flex items-center justify-center gap-3 transition-all duration-300"
                  >
                    Começar Avaliação Gratuita
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-dark-lighter to-dark text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      
      <WhatsAppButton />
      
      {/* Header */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <Link 
          to="/" 
          className="inline-flex items-center text-light-gray hover:text-primary transition-all duration-300 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Voltar para página inicial
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-16 relative z-10" ref={ref}>
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <motion.div variants={itemVariants} className="relative">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-full px-6 py-2 mb-6">
                <Microscope className="w-5 h-5 text-primary" />
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                  Evidências Científicas
                </span>
                <Award className="w-5 h-5 text-primary" />
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent leading-tight">
                Ciência que
                <br />
                <span className="text-primary">Comprova Resultados</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-light-gray max-w-3xl mx-auto leading-relaxed">
                Nossa metodologia não é baseada em achismo. Cada estratégia da ScarFit é fundamentada em 
                <span className="text-primary font-semibold"> pesquisas científicas rigorosas</span> 
                publicadas em revistas de alto impacto.
              </p>
            </motion.div>
          </motion.div>

          {/* Estatísticas */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16"
          >
            <motion.div variants={itemVariants} className="text-center">
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-6 border border-primary/20">
                <div className="text-4xl font-bold text-primary mb-2">10+</div>
                <p className="text-light-gray">Estudos Analisados</p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="text-center">
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-6 border border-primary/20">
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <p className="text-light-gray">Baseado em Evidências</p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="text-center">
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-6 border border-primary/20">
                <div className="text-4xl font-bold text-primary mb-2">PubMed</div>
                <p className="text-light-gray">Fonte Confiável</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Grid de Estudos */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto items-stretch"
          >
            {estudos.map((estudo) => (
              <motion.article
                key={estudo.id}
                variants={itemVariants}
                className="group cursor-pointer"
                onClick={() => abrirEstudo(estudo.id)}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                  
                  <div className="relative bg-gradient-to-br from-dark-lighter/90 to-dark/90 backdrop-blur-xl rounded-3xl p-6 border border-primary/20 hover:border-primary/40 transition-all duration-300 group-hover:scale-105 h-full flex flex-col min-h-[400px]">
                    {/* Header do Card */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                      <div className={`inline-flex items-center gap-1 sm:gap-2 bg-gradient-to-r ${estudo.cor} rounded-full px-2 sm:px-3 py-1 self-start`}>
                        {estudo.icone}
                        <span className="text-white font-semibold text-xs sm:text-xs leading-tight">
                          {estudo.categoria}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1 sm:gap-2 text-light-gray text-xs self-start sm:self-auto">
                        <Microscope className="w-3 h-3 flex-shrink-0" />
                        <span className="whitespace-nowrap">PMID: {estudo.pmid}</span>
                      </div>
                    </div>
                    
                    {/* Conteúdo do Card */}
                    <div className="flex-grow">
                      <h2 className="text-base sm:text-lg font-bold mb-3 group-hover:text-primary transition-colors duration-300 leading-tight min-h-[84px] flex items-start">
                        {estudo.titulo}
                      </h2>
                      
                      <p className="text-light-gray text-xs sm:text-sm leading-relaxed mb-4 min-h-[60px] overflow-hidden">
                        {estudo.interpretacao.substring(0, 150)}...
                      </p>
                    </div>
                    
                    {/* Footer do Card */}
                    <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-700">
                      <a
                        href={estudo.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 sm:gap-2 text-light-gray hover:text-primary text-xs transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>PubMed</span>
                      </a>
                      
                      <div className="flex items-center gap-1 sm:gap-2 text-primary group-hover:gap-3 transition-all duration-300">
                        <span className="font-semibold text-xs sm:text-sm">Ler análise</span>
                        <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-center mt-20"
          >
            <motion.div variants={itemVariants} className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-3xl blur-xl" />
              
              <div className="relative bg-gradient-to-br from-dark-lighter/90 to-dark/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-primary/20 max-w-4xl mx-auto">
                <h3 className="text-3xl font-bold mb-6">Ciência Aplicada aos Seus Resultados</h3>
                <p className="text-xl text-light-gray mb-8 max-w-2xl mx-auto">
                  Não deixe seus objetivos nas mãos do achismo. Descubra como aplicamos essas evidências 
                  científicas em planos 100% personalizados para sua transformação.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://wa.me/5541984961012?text=Olá! Vi os estudos científicos da ScarX e quero saber como vocês aplicam a ciência em planos personalizados."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-primary to-primary-dark text-black font-bold py-4 px-8 rounded-xl text-lg flex items-center justify-center gap-3 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/30"
                  >
                    <Microscope className="w-6 h-6" />
                    Aplicar Ciência ao Meu Caso
                  </a>
                  
                  <Link
                    to="/calculadora-imc"
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-black font-bold py-4 px-8 rounded-xl text-lg flex items-center justify-center gap-3 transition-all duration-300"
                  >
                    <Target className="w-6 h-6" />
                    Começar Avaliação
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EstudosPage;