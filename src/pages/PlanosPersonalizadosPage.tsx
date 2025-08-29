import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  ArrowLeft, 
  CheckCircle, 
  MessageSquare, 
  Target, 
  Zap, 
  Shield,
  Clock,
  Award,
  TrendingUp,
  Users,
  Star,
  Loader2,
  Crown,
  Sparkles
} from 'lucide-react';
import WhatsAppButton from '../components/WhatsAppButton';
import { analisarPerfilCompleto } from '../utils/openai';

interface DadosUsuario {
  peso: number;
  altura: number;
  idade: number;
  imc: number;
  categoria: string;
}

interface AnaliseIA {
  analisePersonalizada: string;
  planoRecomendado: string;
  motivacao: string;
  desafios: string[];
  objetivos: string[];
}

const PlanosPersonalizadosPage: React.FC = () => {
  const [dadosUsuario, setDadosUsuario] = useState<DadosUsuario | null>(null);
  const [analiseIA, setAnaliseIA] = useState<AnaliseIA | null>(null);
  const [carregandoAnalise, setCarregandoAnalise] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    // Sempre começar no topo da página
    window.scrollTo(0, 0);
    
    // Detectar de onde o usuário está vindo através do referrer ou parâmetro
    const urlParams = new URLSearchParams(window.location.search);
    const origem = urlParams.get('origem');
    
    if (origem === 'entenda-situacao') {
      // Vem da página "Seu Diagnóstico Inicial"
      const dadosCompletos = localStorage.getItem('dadosCompletos');
      if (dadosCompletos) {
        const dadosCompletosParseados = JSON.parse(dadosCompletos);
        
        // Usar dados da análise completa
        setDadosUsuario({
          peso: dadosCompletosParseados.peso,
          altura: dadosCompletosParseados.altura,
          idade: dadosCompletosParseados.idade || 30,
          imc: dadosCompletosParseados.imc,
          categoria: dadosCompletosParseados.categoria
        });
        
        // Usar análise já processada
        if (dadosCompletosParseados.resultados?.analiseIA) {
          setAnaliseIA(dadosCompletosParseados.resultados.analiseIA);
        }
      }
    } else {
      // Vem da calculadora IMC ou acesso direto
      const dadosIMC = localStorage.getItem('dadosImcUsuario');
      if (dadosIMC) {
        const dadosParsed = JSON.parse(dadosIMC);
        setDadosUsuario(dadosParsed);
        gerarAnaliseIA(dadosParsed);
      }
    }
  }, []);

  const gerarAnaliseIA = async (dados: DadosUsuario) => {
    setCarregandoAnalise(true);
    try {
      const analise = await analisarPerfilCompleto(dados);
      setAnaliseIA(analise);
    } catch (error) {
      console.error('Erro ao gerar análise:', error);
      // Fallback para análise estática se a API falhar
      setAnaliseIA(gerarAnaliseEstatica(dados));
    } finally {
      setCarregandoAnalise(false);
    }
  };

  const gerarAnaliseEstatica = (dados: DadosUsuario): AnaliseIA => {
    const { categoria, imc, idade } = dados;
    
    if (categoria === 'Peso normal') {
      return {
        analisePersonalizada: `Com IMC ${imc.toFixed(1)}, você está na faixa ideal, mas pode otimizar sua composição corporal. Aos ${idade} anos, é o momento perfeito para definir músculos e manter resultados duradouros.`,
        planoRecomendado: 'Master+',
        motivacao: 'Você já tem uma base sólida. Agora é hora de esculpir o corpo dos seus sonhos!',
        desafios: ['Manter a motivação', 'Definir músculos', 'Evitar o platô'],
        objetivos: ['Definição muscular', 'Melhora da performance', 'Manutenção do peso ideal']
      };
    } else if (categoria === 'Abaixo do peso') {
      return {
        analisePersonalizada: `Com IMC ${imc.toFixed(1)}, você precisa de estratégias específicas para ganho de massa muscular saudável. Aos ${idade} anos, seu metabolismo permite excelentes resultados com o protocolo certo.`,
        planoRecomendado: 'Elite PRO',
        motivacao: 'Seu potencial de ganho de massa é incrível. Vamos construir o físico que você merece!',
        desafios: ['Ganhar peso saudável', 'Construir massa muscular', 'Melhorar apetite'],
        objetivos: ['Ganho de massa magra', 'Aumento da força', 'Melhora da saúde geral']
      };
    } else if (categoria === 'Sobrepeso') {
      return {
        analisePersonalizada: `Com IMC ${imc.toFixed(1)}, você está próximo do seu objetivo. Aos ${idade} anos, um protocolo personalizado pode transformar completamente sua composição corporal em poucos meses.`,
        planoRecomendado: 'Elite PRO',
        motivacao: 'Você está mais perto do que imagina! Com o plano certo, a transformação será surpreendente.',
        desafios: ['Perder gordura localizada', 'Acelerar metabolismo', 'Manter consistência'],
        objetivos: ['Redução de gordura', 'Tonificação muscular', 'Melhora da autoestima']
      };
    } else {
      return {
        analisePersonalizada: `Com IMC ${imc.toFixed(1)}, você tem um grande desafio pela frente, mas com o suporte adequado, pode alcançar uma transformação extraordinária. Aos ${idade} anos, já ajudamos centenas de pessoas com perfil similar.`,
        planoRecomendado: 'PRIVATE',
        motivacao: 'Sua jornada de transformação será inspiradora. Estamos aqui para cada passo!',
        desafios: ['Mudança de hábitos', 'Perda de peso sustentável', 'Ganho de energia'],
        objetivos: ['Perda significativa de peso', 'Melhora da saúde', 'Transformação completa do estilo de vida']
      };
    }
  };

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

  const planos = [
    {
      nome: 'Premium+',
      duracao: '3 meses',
      preco: 'R$ 469,00',
      parcelas: '12× R$ 39,09',
      destaque: false,
      beneficios: [
        'Nutricionista Esportivo',
        'Personal Trainer',
        'Fisioterapeuta',
        'Análise Física',
        'Suporte Essential'
      ],
      ideal: 'Ideal para quem quer começar a transformação'
    },
    {
      nome: 'Master+',
      duracao: '7 meses',
      preco: 'R$ 859,00',
      parcelas: '12× R$ 73,25',
      destaque: false,
      beneficios: [
        'Nutricionista Esportivo',
        'Personal Trainer',
        'Fisioterapeuta',
        'Análise Física',
        'Suporte PRO',
        'Apps de Treino & Dieta'
      ],
      ideal: 'Para quem busca resultados consistentes'
    },
    {
      nome: 'Elite PRO',
      duracao: '12 meses',
      preco: 'R$ 1.450,00',
      parcelas: '12× R$ 115,00',
      destaque: true,
      selo: 'Melhor custo-benefício',
      beneficios: [
        'Personal, Nutricionista e Fisioterapeuta',
        'Análise Física Completa',
        'App de Treino & Dieta',
        'Suporte PRO+',
        'Gerente Executivo',
        '7 treinos presenciais em qualquer cidade',
        'Consulta inicial via Meet direto c/ João Scar'
      ],
      ideal: 'Para transformações completas e duradouras'
    },
    {
      nome: 'PRIVATE',
      duracao: '18 meses',
      preco: 'R$ 2.650,00',
      parcelas: '18× R$ 158,00',
      destaque: false,
      premium: true,
      beneficios: [
        'Personal, Nutricionista e Fisioterapeuta',
        'Análise Física Completa',
        'App de Treino & Dieta',
        'Suporte PRIVATE+',
        'Gerente Executivo PRO',
        '12 treinos presenciais em qualquer cidade',
        'Mentoria 1×1 via Google Meet c/ João Scar',
        'Adicione outra pessoa ao seu plano sem custo adicional'
      ],
      ideal: 'Experiência premium e exclusiva'
    }
  ];

  const diferenciais = [
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      titulo: '100% Personalizado',
      descricao: 'Cada protocolo é único, criado especificamente para seu biotipo, rotina e objetivos.'
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      titulo: 'Resultados Rápidos',
      descricao: 'Metodologia comprovada que acelera sua transformação de forma saudável e sustentável.'
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      titulo: 'Garantia Total',
      descricao: 'Se não ficar satisfeito nos primeiros 15 dias, devolvemos 100% do seu investimento.'
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      titulo: '+1200 Transformados',
      descricao: 'Mais de 1200 pessoas já transformaram suas vidas com nossa metodologia exclusiva.'
    }
  ];

  return (
    <div className="min-h-screen bg-dark text-white">
      <WhatsAppButton />
      
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <Link 
          to="/calculadora-imc" 
          className="inline-flex items-center text-light-gray hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar para calculadora
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-dark to-dark-lighter" ref={ref}>
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <span className="text-primary font-semibold text-lg mb-2 block">
                SEU PLANO PERSONALIZADO ESTÁ PRONTO
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Transforme Seu Corpo com um Plano 
                <span className="text-primary"> 100% Sob Medida</span>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-dark-lighter rounded-xl p-8 mb-12 border border-primary/20">
              <div className="flex items-center justify-center mb-4">
                <TrendingUp className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Análise Inteligente do Seu Perfil</h3>
              
              {carregandoAnalise ? (
                <div className="flex items-center justify-center gap-3">
                  <Loader2 className="h-6 w-6 text-primary animate-spin" />
                  <span className="text-light-gray">Gerando análise personalizada com IA...</span>
                </div>
              ) : analiseIA ? (
                <>
                  <p className="text-lg text-light-gray leading-relaxed mb-4">
                    {analiseIA.analisePersonalizada}
                  </p>
                  <div className="bg-primary/20 p-4 rounded-lg border border-primary/30 mb-4">
                    <p className="text-primary font-semibold text-sm mb-2">
                      💡 Motivação Personalizada:
                    </p>
                    <p className="text-light-gray text-sm">
                      {analiseIA.motivacao}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-primary/20 px-4 py-2 rounded-lg">
                    <Star className="h-5 w-5 text-primary" />
                    <span className="text-primary font-semibold">
                      Plano Recomendado: {analiseIA.planoRecomendado}
                    </span>
                  </div>
                </>
              ) : (
                <p className="text-lg text-light-gray leading-relaxed">
                  Analisando seu perfil para criar a melhor estratégia de transformação...
                </p>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-16 bg-gradient-to-br from-light-off to-light-off/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-center mb-12"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-6 text-primary">
              Por que a ScarFit é Diferente?
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-3xl mx-auto">
              Não somos mais uma consultoria fitness. Somos especialistas em transformação corporal 
              com metodologia exclusiva e resultados comprovados.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {diferenciais.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                
                <div className="relative bg-gradient-to-br from-white/95 to-white/90 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-primary/20 hover:border-primary/40 group-hover:scale-105">
                  <div className="flex justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-primary">{item.titulo}</h3>
                  <p className="text-gray-600">{item.descricao}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Planos */}
      <section className="py-16 bg-dark">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-center mb-12"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-6">
              Escolha Seu Plano de Transformação
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-light-gray max-w-3xl mx-auto">
              Todos os planos incluem acompanhamento profissional, protocolos personalizados e garantia de resultados. 
              A diferença está no nível de suporte e duração da transformação.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 max-w-7xl mx-auto"
          >
            {planos.map((plano, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative rounded-xl p-6 ${
                  plano.destaque 
                    ? 'bg-gradient-to-b from-primary/20 to-primary/5 border-2 border-primary transform scale-105' 
                    : plano.premium
                    ? 'bg-gradient-to-b from-purple-900/20 to-purple-900/5 border-2 border-purple-500'
                    : 'bg-dark-lighter border border-gray-700'
                } hover:scale-105 transition-all duration-300 flex flex-col h-full`}
              >
                {plano.destaque && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-dark px-4 py-2 rounded-full font-bold text-sm z-10">
                    ⭐ {plano.selo}
                  </div>
                )}
                
                {plano.premium && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center gap-1 z-10">
                    <Crown className="w-4 h-4" />
                    PREMIUM
                  </div>
                )}
                
                <div className="text-center mb-6 mt-2">
                  <h3 className="text-2xl font-bold mb-2">{plano.nome}</h3>
                  <p className="text-light-gray text-sm mb-3">{plano.duracao}</p>
                  {/* Preços e parcelas removidos */}
                  <p className="text-sm text-light-gray mt-2 italic">{plano.ideal}</p>
                </div>

                <div className="space-y-3 mb-8 flex-grow">
                  {plano.beneficios.map((beneficio, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-light-gray text-sm">{beneficio}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                  <a
                  href={`https://wa.me/5541984961012?text=Olá! Quero contratar o plano ${plano.nome} da ScarFit. Acabei de ver meu resultado do IMC e gostaria de iniciar minha transformação.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                    plano.destaque
                      ? 'bg-primary text-dark hover:bg-primary-dark'
                      : plano.premium
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-dark border border-primary text-primary hover:bg-primary hover:text-dark'
                  }`}
                >
                  <MessageSquare className="w-5 h-5" />
                  Escolher {plano.nome}
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-primary/20 to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="max-w-3xl mx-auto"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-6">
              Pronto Para Sua Transformação?
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-light-gray mb-8">
              Mais de 1200 pessoas já transformaram suas vidas com a ScarFit. 
              Não deixe para amanhã a transformação que você pode começar hoje.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/5541984961012?text=Olá! Quero saber mais sobre os planos da ScarFit. Vi meu resultado do IMC e estou interessado em começar minha transformação."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-lg flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                Falar com Especialista
              </a>
              <Link
                to="/"
                className="btn-secondary text-lg flex items-center justify-center gap-2"
              >
                Conhecer Mais a ScarFit
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PlanosPersonalizadosPage;