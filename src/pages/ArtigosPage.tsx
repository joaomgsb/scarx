import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  ArrowLeft, 
  BookOpen, 
  Clock, 
  ArrowRight,
  Dumbbell,
  Target,
  Zap,
  Heart,
  TrendingUp,
  Star,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  User
} from 'lucide-react';
import WhatsAppButton from '../components/WhatsAppButton';

interface Artigo {
  id: number;
  titulo: string;
  resumo: string;
  tempoLeitura: string;
  categoria: string;
  icone: React.ReactNode;
  conteudo: {
    introducao: string;
    secoes: {
      titulo: string;
      conteudo: string;
    }[];
    conclusao: string;
  };
  cor: string;
}

const ArtigosPage: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Scroll para o topo quando a página carrega
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [artigoSelecionado, setArtigoSelecionado] = useState<number | null>(null);

  const artigos: Artigo[] = [
    {
      id: 1,
      titulo: "A Importância da Massa Muscular e 15 Dicas Essenciais para o Ganho Muscular",
      resumo: "Ter uma baixa massa muscular não é apenas uma questão estética; ela está diretamente ligada a uma vida mais curta e a uma saúde significativamente comprometida. Descubra 15 dicas fundamentais para otimizar o ganho muscular.",
      tempoLeitura: "12 min",
      categoria: "Hipertrofia",
      icone: <Dumbbell className="h-6 w-6" />,
      cor: "from-blue-500 to-blue-600",
      conteudo: {
        introducao: "Ter uma baixa massa muscular não é apenas uma questão estética; ela está diretamente ligada a uma vida mais curta e a uma saúde significativamente comprometida. A manutenção e o aumento da massa muscular são cruciais para um metabolismo eficiente, queima de gordura e bem-estar geral. Para auxiliar nesse processo vital, apresentamos 15 dicas fundamentais para otimizar o ganho muscular, transformando seu corpo em uma verdadeira máquina de construção muscular.",
        secoes: [
          {
            titulo: "1. Elimine o Álcool da Sua Rotina",
            conteudo: "O consumo de álcool, mesmo que moderado, pode sabotar seus esforços de ganho muscular. O álcool interfere na síntese proteica, desidrata o corpo e afeta negativamente a qualidade do sono, todos fatores cruciais para a recuperação e o crescimento muscular. Para maximizar seus resultados, considere eliminar ou reduzir drasticamente o álcool de sua dieta."
          },
          {
            titulo: "2. Priorize uma Dieta Rica em Proteínas",
            conteudo: "A proteína é o bloco construtor dos músculos. Sem uma ingestão adequada, o crescimento muscular é simplesmente impossível. Certifique-se de que cada refeição contenha uma fonte de proteína de alta qualidade para fornecer os aminoácidos necessários para a reparação e o crescimento das fibras musculares."
          },
          {
            titulo: "3. Inclua Ovos e Carne Vermelha em Sua Alimentação",
            conteudo: "Ovos e carne vermelha são verdadeiros superalimentos para quem busca ganho muscular. Eles são ricos em proteínas completas, creatina natural, vitaminas do complexo B, ferro e zinco, nutrientes essenciais que suportam a produção de energia, a recuperação e o desenvolvimento muscular. Integre-os regularmente em sua dieta para colher seus benefícios."
          },
          {
            titulo: "4. Treine de 3 a 4 Vezes por Semana",
            conteudo: "Contrariando a crença popular de que mais é sempre melhor, treinar de 3 a 4 vezes por semana é mais do que suficiente para estimular o crescimento muscular. O corpo precisa de tempo para se recuperar e reconstruir as fibras musculares. Treinos excessivos podem levar ao overtraining, prejudicando seus resultados. A qualidade e a intensidade do treino superam a quantidade."
          },
          {
            titulo: "5. Comece o Dia com o Mais Difícil",
            conteudo: "Se a procrastinação é um obstáculo para seus treinos, comece o dia com a atividade física. Treinar pela manhã, antes que a mente crie desculpas e a rotina se torne mais agitada, pode ser a chave para a consistência. Essa abordagem garante que você cumpra seu compromisso com o treino, estabelecendo um tom positivo para o resto do dia."
          },
          {
            titulo: "6. O Movimento Gera Energia",
            conteudo: "Sentir-se cansado e pular o treino pode criar um ciclo vicioso. O movimento, paradoxalmente, gera energia. A falta de atividade física, por outro lado, pode roubar sua vitalidade. Mesmo quando a fadiga se instala, um treino leve ou uma caminhada podem revitalizar seu corpo e mente, quebrando o ciclo do cansaço."
          },
          {
            titulo: "7. Sono e Sol: Seus Anabolizantes Naturais",
            conteudo: "Oito horas de sono de qualidade e 30 minutos de exposição solar diária são poderosos anabolizantes naturais. O sono é fundamental para a recuperação muscular e a produção hormonal, enquanto a exposição ao sol estimula a produção de vitamina D, essencial para a saúde óssea e muscular, além de regular o humor e a energia. Priorize esses dois pilares para otimizar seus resultados."
          },
          {
            titulo: "8. Consuma 1,6g de Proteína por Kg de Peso Corporal",
            conteudo: "Para um crescimento muscular efetivo, a ingestão de proteína deve ser de aproximadamente 1,6 gramas por quilograma de peso corporal. Essa quantidade garante que seu corpo tenha um suprimento constante de aminoácidos para reparar e construir novas fibras musculares. Ajuste sua dieta para atingir essa meta diariamente."
          },
          {
            titulo: "9. Os Benefícios do Aumento da Massa Muscular",
            conteudo: "Construir massa muscular vai muito além da estética. Quanto mais músculos você desenvolve, mais rápido seu metabolismo se torna, facilitando a queima de gordura e tornando seu corpo mais saudável e eficiente. O investimento no ganho muscular é um investimento na sua saúde a longo prazo."
          },
          {
            titulo: "10. Execute Cada Exercício na Máxima Amplitude",
            conteudo: "A amplitude total de movimento (ADM) em cada exercício é crucial para maximizar o rompimento de fibras musculares e, consequentemente, o crescimento. Evite movimentos curtos e incompletos. Concentre-se em realizar cada repetição com a maior amplitude possível para otimizar o estímulo muscular."
          },
          {
            titulo: "11. Aplique Sobrecarga Progressiva",
            conteudo: "A sobrecarga progressiva é o princípio fundamental para o ganho de força e massa muscular. Isso significa aumentar gradualmente a demanda sobre seus músculos ao longo do tempo, seja através de mais repetições, mais peso ou maior controle e tempo sob tensão. Desafie-se constantemente para continuar progredindo."
          },
          {
            titulo: "12. Priorize a Execução Correta sobre a Carga",
            conteudo: "Nunca sacrifique a forma e a execução correta de um exercício em prol de levantar mais peso. Uma execução inadequada não só aumenta o risco de lesões, mas também diminui a eficácia do estímulo muscular. O controle da cadência e a técnica apurada são mais importantes do que a carga levantada."
          },
          {
            titulo: "13. Utilize Shakes de Whey Protein para Complementar",
            conteudo: "Shakes de Whey Protein são ferramentas úteis para auxiliar no alcance da sua meta diária de proteína, especialmente quando a ingestão através da alimentação sólida é insuficiente. Eles são práticos e de rápida absorção, mas devem ser vistos como um complemento, não um substituto para alimentos integrais."
          },
          {
            titulo: "14. Não Elimine Totalmente os Carboidratos",
            conteudo: "Cortar completamente os carboidratos pode comprometer seu desempenho nos treinos e aumentar o risco de catabolismo muscular. Os carboidratos são a principal fonte de energia do corpo, essenciais para treinos intensos e para evitar a quebra de massa muscular. O equilíbrio é a chave: escolha carboidratos complexos e de boa qualidade."
          },
          {
            titulo: "15. Consuma Carboidratos de Rápida Absorção Antes do Treino",
            conteudo: "Consumir carboidratos de rápida absorção, como frutas, antes do treino pode fornecer energia imediata e melhorar significativamente seu desempenho. Essa estratégia garante que você tenha combustível suficiente para um treino intenso, otimizando a entrega de nutrientes aos músculos durante o exercício."
          }
        ],
        conclusao: "Um plano de treino eficaz deve ser adaptado à sua realidade e rotina. Na Scarfit, a metodologia é diferenciada, oferecendo suporte completo com personal trainers, nutricionistas e fisioterapeutas, além de acompanhamento diário e estratégias flexíveis que se encaixam perfeitamente na sua vida. Invista em você e transforme seu corpo e sua saúde com um plano que realmente funciona."
      }
    },
    {
      id: 2,
      titulo: "Gordura Abdominal: Entenda os Riscos e 10 Estratégias para Queimá-la",
      resumo: "A gordura abdominal, especialmente a gordura visceral, é muito mais do que uma preocupação estética. Ela é um indicador de síndrome metabólica e está associada a uma série de problemas de saúde graves. Descubra 10 estratégias eficazes para combater essa gordura.",
      tempoLeitura: "15 min",
      categoria: "Emagrecimento",
      icone: <Target className="h-6 w-6" />,
      cor: "from-red-500 to-red-600",
      conteudo: {
        introducao: "A gordura abdominal, especialmente a gordura visceral, é muito mais do que uma preocupação estética. Ela é um indicador de síndrome metabólica e está associada a uma série de problemas de saúde graves, tanto a curto quanto a longo prazo. Entre eles, destacam-se o risco aumentado de AVC, câncer, ansiedade, confusão mental, demência, depressão, doenças hepáticas e cardíacas, dor lombar e diabetes tipo 2. Diante de um cenário tão preocupante, é fundamental adotar estratégias eficazes para combater essa gordura e transformar sua saúde.",
        secoes: [
          {
            titulo: "1. Regule seu Sono para um Metabolismo Otimizado",
            conteudo: "O sono é um pilar fundamental para a saúde metabólica. Um ritmo circadiano desregulado pode travar seu metabolismo, dificultando a queima de gordura. Para otimizar seu sono, adote hábitos simples, mas poderosos: procure dormir entre 21h e 23h e acordar entre 6h e 8h. Exponha-se ao sol pela manhã para regular seu relógio biológico e evite a luz azul de telas à noite. Lembre-se: seu corpo é como uma bateria; se não for recarregado adequadamente, nenhuma função, incluindo a queima de gordura, operará em sua capacidade máxima."
          },
          {
            titulo: "2. Aumente sua Atividade Física Diária com Caminhadas",
            conteudo: "Nossos ancestrais, há 120 anos, caminhavam cerca de 23,5 mil passos por dia. Em contraste, a vida moderna nos tornou sedentários. Volte a se mover incorporando mais caminhadas em sua rotina. Almeje entre 8 a 10 mil passos diários. Caminhar após as refeições ajuda a regular a glicemia, pela manhã ativa o metabolismo e à noite acalma o sistema nervoso. Este é um hábito acessível e benéfico para todos, sem exceção."
          },
          {
            titulo: "3. Conheça seu Ponto de Partida: Calcule seu IMC",
            conteudo: "Para traçar um caminho eficaz em direção aos seus objetivos de saúde, é crucial saber onde você está. O Índice de Massa Corporal (IMC) é uma ferramenta útil para entender se você se encontra em sobrepeso ou obesidade. Utilize calculadoras gratuitas, como a disponível em scarfit.com.br (clique no menu direito e depois em 'Calcular IMC'), para obter essa informação e guiar suas próximas ações."
          },
          {
            titulo: "4. Aumente a Ingestão de Proteínas para Mais Músculo e Menos Fome",
            conteudo: "A proteína é um macronutriente essencial para a construção muscular, a saciedade e o aumento do gasto energético em repouso. Para resultados ótimos, consuma cerca de 2 gramas de proteína por quilograma de peso corporal. Fontes recomendadas incluem carne vermelha (considerada a melhor), ovos (práticos), frango (ótimo custo-benefício) e peixes (fácil ingestão). Sem uma ingestão proteica adequada, seus esforços para queimar gordura e ganhar massa muscular serão limitados."
          },
          {
            titulo: "5. Estratégias Naturais para Aumentar a Testosterona",
            conteudo: "Níveis baixos de testosterona estão diretamente relacionados ao acúmulo de gordura abdominal. Felizmente, existem maneiras naturais de otimizar a produção desse hormônio vital. Exponha-se ao sol diariamente por cerca de 40 minutos, pratique treinos de força com progressão de carga, reduza o estresse crônico (o cortisol elevado prejudica a testosterona) e diminua o consumo de açúcar. Essas ações simples podem gerar melhorias significativas nos seus níveis de testosterona."
          },
          {
            titulo: "6. Controle o Estresse Crônico para Desbloquear a Queima de Gordura",
            conteudo: "O estresse crônico eleva os níveis de cortisol, um hormônio que contribui para o acúmulo de gordura visceral. Para gerenciar o estresse, incorpore práticas como meditação (20 minutos diários), caminhadas conscientes, técnicas de respiração controlada (como o método Wim Hof) e contato com a natureza. A importância dessas práticas simples é frequentemente subestimada, mas elas são cruciais para a saúde metabólica."
          },
          {
            titulo: "7. Combata a Inflamação para um Metabolismo Ativo",
            conteudo: "A inflamação crônica pode travar seu metabolismo e dificultar a perda de gordura. Para reduzir a inflamação, corte da sua dieta óleos vegetais processados (soja, canola, girassol), açúcar em excesso, alimentos ultraprocessados e, pelo menos por um tempo, o álcool. Priorize alimentos integrais e anti-inflamatórios para otimizar a função metabólica."
          },
          {
            titulo: "8. Hidrate-se Corretamente para o Funcionamento Ideal do Corpo",
            conteudo: "A desidratação afeta negativamente todas as funções corporais, incluindo o metabolismo e a clareza mental. Adote uma rotina de hidratação eficaz: beba 400ml de água ao acordar, 500ml antes de cada refeição e almeje consumir pelo menos 35ml de água por quilograma de peso corporal ao dia. Mantenha uma garrafa de 2L sempre com você para facilitar a ingestão contínua."
          },
          {
            titulo: "9. Priorize a Musculação para Queima de Gordura Contínua",
            conteudo: "Enquanto o cardio queima calorias durante o exercício, a musculação ativa a queima de gordura ao longo do dia, mesmo em repouso, devido ao aumento da massa muscular. Priorize exercícios livres e compostos para construir massa muscular de forma harmoniosa: agachamentos, remadas, supino e levantamento terra. Use máquinas para trabalhar pontos fracos específicos, mas foque nos exercícios livres para um desenvolvimento físico completo."
          },
          {
            titulo: "10. Evite Calorias Líquidas para Melhorar a Glicemia e a Saciedade",
            conteudo: "Calorias líquidas, presentes em bebidas açucaradas, podem piorar a glicemia e levar a picos de fome rapidamente. Elimine refrigerantes (especialmente os normais), sucos de caixinha, álcool e cafés açucarados. Opte por café puro e água com gás, que podem auxiliar na redução do consumo de calorias líquidas e na manutenção da saciedade."
          }
        ],
        conclusao: "Um plano de saúde e emagrecimento só será bem-sucedido se respeitar sua rotina e individualidade. Na Scarfit, a metodologia é completa e personalizada, com uma equipe de personal trainers, nutricionistas e fisioterapeutas, além de suporte diário e estratégias flexíveis que se adaptam à sua vida real. Invista em um plano que realmente funciona e transforme sua saúde de forma duradoura."
      }
    },
    {
      id: 3,
      titulo: "Simplificando o Treino: 7 Exercícios Essenciais para Resultados Incríveis",
      resumo: "No universo do fitness, é comum encontrar uma supervalorização da complexidade, com a crença de que treinos mirabolantes são a chave para resultados. No entanto, a verdade é que 90% das pessoas complicam o treino à toa. O básico bem feito é o que realmente gera resultados gigantes.",
      tempoLeitura: "10 min",
      categoria: "Treino",
      icone: <Zap className="h-6 w-6" />,
      cor: "from-green-500 to-green-600",
      conteudo: {
        introducao: "No universo do fitness, é comum encontrar uma supervalorização da complexidade, com a crença de que treinos mirabolantes são a chave para resultados. No entanto, a verdade é que 90% das pessoas complicam o treino à toa. O básico bem feito é o que realmente gera resultados gigantes. Se você busca um físico forte e harmonioso, mas se sente perdido em meio a tantas opções, este artigo é para você. Apresentamos 7 exercícios fundamentais que, se executados corretamente, farão seu físico sair do lugar e alcançar novos patamares.",
        secoes: [
          {
            titulo: "1. Levantamento Terra: O Rei dos Exercícios",
            conteudo: "Não há substituto para o Levantamento Terra. Este exercício composto é o rei, ativando o corpo inteiro, elevando a testosterona, corrigindo a postura e desenvolvendo força real. Comece com a barra e progrida gradualmente até conseguir realizar 4 repetições pesadas com boa forma. A maestria neste movimento é um divisor de águas para qualquer programa de treinamento."
          },
          {
            titulo: "2. Supino (Barra ou Halter): Essencial para Peito e Tríceps",
            conteudo: "Seja com barra ou halteres, o supino é o melhor exercício para desenvolver o peito e o tríceps. É um movimento fácil de progredir, que cria densidade muscular e trabalha o peitoral de forma abrangente. Aprender a respirar corretamente durante o supino faz toda a diferença na estabilidade e na capacidade de levantar mais peso com segurança."
          },
          {
            titulo: "3. Agachamento Livre: Pernas, Glúteos e Coluna Fortes",
            conteudo: "Para pernas, glúteos e coluna fortes, o agachamento livre é indispensável. Ele libera uma grande quantidade de hormônios anabólicos, trabalha a mobilidade e a flexibilidade, e gasta muitas calorias. Realize o agachamento com toda a amplitude, descendo o máximo que conseguir, sem sacrificar a forma. Esqueça os movimentos parciais; a profundidade é crucial para o máximo benefício."
          },
          {
            titulo: "4. Barra Fixa: Consciência Corporal e Força nas Costas",
            conteudo: "Se você ainda não consegue fazer uma barra fixa, é urgente desenvolver sua consciência corporal. A calistenia, e a barra fixa em particular, são extremamente úteis para a vida real. Este exercício é excelente para as costas e a parte posterior dos ombros, além de melhorar a postura. Treine até conseguir realizar 10 repetições completas, passando o queixo da barra, sem cruzar as pernas."
          },
          {
            titulo: "5. Prancha Isométrica: Simples e Poderosa para o Abdômen",
            conteudo: "A prancha isométrica é um exercício simples, mas incrivelmente eficaz para definir o abdômen. Ela fortalece o core, a lombar, melhora o controle corporal e define muito o abdômen. Faça a prancha todos os dias por pelo menos 2 minutos. A consistência é a chave para colher os benefícios deste exercício fundamental."
          },
          {
            titulo: "6. Remada Curvada: Costas Largas e Equilíbrio",
            conteudo: "Para construir costas largas e fortes, a remada curvada é superior a muitos outros exercícios de puxada. Ela trabalha a região lombar, corrige ombros curvados para frente e melhora significativamente o equilíbrio. É um exercício desafiador, mas seus resultados são inegáveis para o desenvolvimento de uma musculatura dorsal densa e equilibrada."
          }
        ],
        conclusao: "Embora esses exercícios sejam excelentes, o plano ideal é sempre personalizado para sua genética, rotina e objetivos específicos. Na Scarfit, você encontra uma metodologia completa com personal trainers, nutricionistas e fisioterapeutas, além de auxílio 24/7. Confira a metodologia no site scarfit.com.br e descubra como um plano sob medida pode transformar seus resultados."
      }
    },
    {
      id: 4,
      titulo: "10 Hábitos Transformadores para Emagrecer 12kg em 60 Dias",
      resumo: "Emagrecer pode parecer uma jornada complexa, mas a verdade é que a adoção de hábitos simples e consistentes pode gerar resultados surpreendentes. Se você busca uma transformação significativa em seu corpo e saúde, este guia apresenta 10 hábitos poderosos.",
      tempoLeitura: "18 min",
      categoria: "Emagrecimento",
      icone: <TrendingUp className="h-6 w-6" />,
      cor: "from-purple-500 to-purple-600",
      conteudo: {
        introducao: "Emagrecer pode parecer uma jornada complexa, mas a verdade é que a adoção de hábitos simples e consistentes pode gerar resultados surpreendentes. Se você busca uma transformação significativa em seu corpo e saúde, este guia apresenta 10 hábitos poderosos que podem te ajudar a perder até 12kg em apenas 60 dias. Prepare-se para uma mudança de vida!",
        secoes: [
          {
            titulo: "1. Elimine Completamente o Álcool",
            conteudo: "O álcool é um dos maiores sabotadores do emagrecimento. Além de ser rico em calorias vazias, ele interfere no metabolismo de gorduras, desidrata o corpo e prejudica a qualidade do sono, fatores cruciais para a perda de peso. Cortar o álcool totalmente, mesmo que por um período, pode acelerar drasticamente seus resultados e trazer benefícios notáveis para sua saúde geral."
          },
          {
            titulo: "2. Priorize Alimentos Ricos em Nutrientes",
            conteudo: "Em vez de focar apenas na restrição calórica, concentre-se em nutrir seu corpo com alimentos de verdade. Em apenas 7 dias, você notará um aumento significativo de energia, melhora no sistema imunológico e uma redução na vontade de comer besteiras. Alimentos ricos em vitaminas, minerais e aminoácidos essenciais otimizam o funcionamento do seu corpo, transformando-o em uma máquina eficiente de queima de gordura."
          },
          {
            titulo: "3. Otimize a Qualidade do Seu Sono",
            conteudo: "O sono é um pilar fundamental para o emagrecimento e a saúde. Um sono de má qualidade pode desregular hormônios relacionados à fome e saciedade, dificultando a perda de peso. Para melhorar seu sono, adote a Regra 3-2-1: 3 horas antes de dormir, pare de comer; 2 horas antes, pare de trabalhar; 1 hora antes, evite telas. Além disso, garanta um ambiente de sono ideal: cama limpa e confortável, quarto completamente escuro e procure dormir entre 21h e 22h. Você acordará mais disposto e seu metabolismo agradecerá."
          },
          {
            titulo: "4. Conheça seu Ponto de Partida: Calcule seu IMC",
            conteudo: "Para traçar um plano de emagrecimento eficaz, é essencial saber onde você está. O Índice de Massa Corporal (IMC) é uma ferramenta útil para identificar se você está em sobrepeso ou obesidade. Utilize calculadoras gratuitas, como a disponível em scarfit.com.br (clique no menu superior e depois em 'Calcular IMC'), para obter essa informação e direcionar suas estratégias de forma mais precisa."
          },
          {
            titulo: "5. Aumente a Ingestão de Proteínas",
            conteudo: "A proteína é um macronutriente poderoso para o emagrecimento. Ela promove saciedade, ajuda a preservar a massa muscular durante a perda de peso e aumenta o gasto energético em repouso. Almeje consumir cerca de 2 gramas de proteína por quilograma de peso corporal. Fontes como carne vermelha, ovos, frango e peixes são excelentes opções. Sem proteína suficiente, seus resultados serão limitados."
          },
          {
            titulo: "6. Gerencie o Estresse e Evite Pessoas Estressantes",
            conteudo: "O estresse crônico eleva os níveis de cortisol, um hormônio que favorece o acúmulo de gordura visceral. Evitar fontes de estresse, incluindo pessoas que te sobrecarregam, pode ter um impacto significativo na sua capacidade de emagrecer. O cortisol elevado estimula diretamente a lipogênese (formação de gordura) nessas células, tornando a gestão do estresse uma estratégia inteligente para a perda de peso."
          },
          {
            titulo: "7. Busque o Equilíbrio, Não a Perfeição",
            conteudo: "A busca pela perfeição na dieta pode levar à frustração e à compulsão alimentar. Em vez de calcular cada caloria, adote a regra 80/20: coma 80% de alimentos saudáveis e reserve 20% para o que você quiser. Essa abordagem flexível e equilibrada é mais sustentável a longo prazo e evita o ciclo vicioso das dietas restritivas."
          },
          {
            titulo: "8. Mantenha-se Hidratado: Beba Mais Água",
            conteudo: "A água é essencial para todas as funções metabólicas do corpo. A desidratação pode retardar o metabolismo e aumentar a sensação de fome. Adote o hábito de beber 400ml de água ao acordar, dois copos antes de cada refeição e durante o treino. Tenha uma garrafa grande e encha-a diariamente para garantir uma hidratação adequada ao longo do dia."
          },
          {
            titulo: "9. Considere o Jejum Intermitente (com Cautela)",
            conteudo: "O jejum intermitente, quando bem orientado, pode ativar a autofagia, um processo de limpeza natural do corpo que remove células velhas e danificadas, promovendo a renovação celular e otimizando o metabolismo. No entanto, é crucial que o jejum prolongado seja feito com acompanhamento profissional para garantir a segurança e a eficácia."
          },
          {
            titulo: "10. Crie um Déficit Calórico Sustentável",
            conteudo: "Para emagrecer, é fundamental consumir menos calorias do que você gasta. Um déficit calórico de 300-500 calorias diárias é um bom ponto de partida. Se a fome for um problema, estratégias como beber café preto, água com gás, escovar os dentes após as refeições e comer mais devagar podem ajudar a controlar o apetite. Lembre-se: sem déficit calórico, não há emagrecimento."
          }
        ],
        conclusao: "Um plano de emagrecimento eficaz deve ser adaptado à sua vida real. Na Scarfit, você encontra uma metodologia completa com personal trainers, nutricionistas e fisioterapeutas, além de suporte diário e estratégias flexíveis que se encaixam perfeitamente na sua rotina. Invista em um plano que realmente funciona e transforme sua saúde de forma duradoura. Assista a histórias de sucesso em scarfit.com.br e inspire-se para sua própria jornada."
      }
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

  const abrirArtigo = (id: number) => {
    setArtigoSelecionado(id);
    window.scrollTo(0, 0);
  };

  const fecharArtigo = () => {
    setArtigoSelecionado(null);
    window.scrollTo(0, 0);
  };

  const artigoAtual = artigos.find(a => a.id === artigoSelecionado);

  if (artigoSelecionado && artigoAtual) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark via-dark-lighter to-dark text-white">
        <WhatsAppButton />
        
        {/* Header do Artigo */}
        <div className="container mx-auto px-4 py-8">
          <button 
            onClick={fecharArtigo}
            className="inline-flex items-center text-light-gray hover:text-primary transition-all duration-300 group mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar para artigos
          </button>
        </div>

        {/* Conteúdo do Artigo */}
        <article className="container mx-auto px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            {/* Header do Artigo */}
            <header className="text-center mb-12">
              <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${artigoAtual.cor} rounded-full px-6 py-2 mb-6`}>
                {artigoAtual.icone}
                <span className="text-white font-semibold text-sm uppercase tracking-wider">
                  {artigoAtual.categoria}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {artigoAtual.titulo}
              </h1>
              
              <div className="flex items-center justify-center gap-6 text-light-gray mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{artigoAtual.tempoLeitura} de leitura</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Por João Scar</span>
                </div>
              </div>
            </header>

            {/* Conteúdo */}
            <div className="bg-gradient-to-br from-dark-lighter/90 to-dark/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-primary/20 mb-12">
              <div className="prose prose-lg prose-invert max-w-none">
                {/* Introdução */}
                <div className="mb-12">
                  <p className="text-xl text-light-gray leading-relaxed">
                    {artigoAtual.conteudo.introducao}
                  </p>
                </div>

                {/* Seções */}
                <div className="space-y-8">
                  {artigoAtual.conteudo.secoes.map((secao, index) => (
                    <div key={index} className="bg-dark/30 rounded-2xl p-6 border border-primary/10">
                      <h3 className="text-2xl font-bold mb-4 text-primary">
                        {secao.titulo}
                      </h3>
                      <p className="text-light-gray leading-relaxed text-lg">
                        {secao.conteudo}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Conclusão */}
                <div className="mt-12 p-8 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl border border-primary/20">
                  <h3 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">
                    <Star className="w-6 h-6" />
                    Conclusão
                  </h3>
                  <p className="text-lg text-light-gray leading-relaxed">
                    {artigoAtual.conteudo.conclusao}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Final */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-dark-lighter/90 to-dark/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-primary/20">
                <h3 className="text-3xl font-bold mb-4">Pronto Para Sua Transformação?</h3>
                <p className="text-xl text-light-gray mb-8 max-w-2xl mx-auto">
                  Coloque essas dicas em prática com um plano 100% personalizado para seu biotipo e rotina.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://wa.me/5541984961012?text=Olá! Li o artigo sobre transformação e quero saber mais sobre os planos da ScarX."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-primary to-primary-dark text-black font-bold py-4 px-8 rounded-xl text-lg flex items-center justify-center gap-3 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/30"
                  >
                    <MessageSquare className="w-6 h-6" />
                    Quero Meu Plano Personalizado
                  </a>
                  
                  <Link
                    to="/calculadora-imc"
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-black font-bold py-4 px-8 rounded-xl text-lg flex items-center justify-center gap-3 transition-all duration-300"
                  >
                    Calcular Meu IMC Grátis
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
                <BookOpen className="w-5 h-5 text-primary" />
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                  Artigos de Autoridade
                </span>
                <Star className="w-5 h-5 text-primary" />
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent leading-tight">
                Conhecimento
                <br />
                <span className="text-primary">Que Transforma</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-light-gray max-w-3xl mx-auto leading-relaxed">
                Artigos baseados na experiência real de quem já transformou mais de 1200 vidas. 
                Conteúdo de autoridade direto do fundador da ScarFit.
              </p>
            </motion.div>
          </motion.div>

          {/* Grid de Artigos */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          >
            {artigos.map((artigo) => (
              <motion.article
                key={artigo.id}
                variants={itemVariants}
                className="group cursor-pointer"
                onClick={() => abrirArtigo(artigo.id)}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                  
                  <div className="relative bg-gradient-to-br from-dark-lighter/90 to-dark/90 backdrop-blur-xl rounded-3xl p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300 group-hover:scale-105 h-full flex flex-col">
                    {/* Header do Card */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${artigo.cor} rounded-full px-4 py-2`}>
                        {artigo.icone}
                        <span className="text-white font-semibold text-sm">
                          {artigo.categoria}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-light-gray text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{artigo.tempoLeitura}</span>
                      </div>
                    </div>
                    
                    {/* Conteúdo do Card */}
                    <div className="flex-grow">
                      <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                        {artigo.titulo}
                      </h2>
                      
                      <p className="text-light-gray leading-relaxed mb-6">
                        {artigo.resumo}
                      </p>
                    </div>
                    
                    {/* Footer do Card */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-700">
                      <div className="flex items-center gap-2 text-light-gray text-sm">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-black font-bold text-xs">JS</span>
                        </div>
                        <span>João Scar</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all duration-300">
                        <span className="font-semibold">Ler artigo</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
                <h3 className="text-3xl font-bold mb-6">Transforme Conhecimento em Resultados</h3>
                <p className="text-xl text-light-gray mb-8 max-w-2xl mx-auto">
                  Ler é o primeiro passo. Aplicar com orientação profissional é o que gera transformação real. 
                  Descubra como nossos planos podem acelerar seus resultados.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://wa.me/5541984961012?text=Olá! Li os artigos da ScarX e quero saber mais sobre como ter um plano personalizado."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-primary to-primary-dark text-black font-bold py-4 px-8 rounded-xl text-lg flex items-center justify-center gap-3 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/30"
                  >
                    <MessageSquare className="w-6 h-6" />
                    Falar com Especialista
                  </a>
                  
                  <Link
                    to="/calculadora-imc"
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-black font-bold py-4 px-8 rounded-xl text-lg flex items-center justify-center gap-3 transition-all duration-300"
                  >
                    <Target className="w-6 h-6" />
                    Calcular Meu IMC
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

export default ArtigosPage;