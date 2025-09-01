import OpenAI from 'openai';

// Verificar se a chave da API está definida
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
  console.warn('⚠️ VITE_OPENAI_API_KEY não está definida. A análise de IA não funcionará corretamente.');
}

const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true
});

interface DadosUsuario {
  peso: number;
  altura: number;
  idade?: number;
  imc: number;
  categoria: string;
  frequenciaTreino?: string;
  tipoTreino?: string;
  nivelExperiencia?: string;
  objetivo?: string;
  objetivoSecundario?: string[];
  sexoBiologico?: string;
  tentouEmagrecer?: string[];
  medicacoes?: string[];
  condicoesMedicas?: string[];
  nivelAtividade?: string;
  frequenciaAlcool?: string;
}

interface AnaliseIA {
  analisePersonalizada: string;
  planoRecomendado: string;
  motivacao: string;
  desafios: string[];
  objetivos: string[];
}

export async function analisarPerfilCompleto(dados: DadosUsuario): Promise<AnaliseIA> {
  try {
    // Verificar se a API key está disponível
    if (!apiKey) {
      throw new Error('Chave da API OpenAI não configurada');
    }

    console.log('🤖 Iniciando análise com OpenAI...', { 
      peso: dados.peso, 
      altura: dados.altura, 
      imc: dados.imc.toFixed(1),
      categoria: dados.categoria 
    });

    const prompt = `
Você é um especialista em fitness e nutrição da ScarFit. Analise o perfil completo abaixo e forneça uma análise ESPECÍFICA, TÉCNICA e PERSONALIZADA baseada nos dados reais fornecidos.

DADOS DO USUÁRIO:
- Peso: ${dados.peso}kg
- Altura: ${dados.altura}m
- Idade: ${dados.idade || 'não informada'} anos
- IMC: ${dados.imc.toFixed(1)}
- Categoria IMC: ${dados.categoria}
${dados.frequenciaTreino ? `- Frequência de treino: ${dados.frequenciaTreino}x por semana` : ''}
${dados.tipoTreino ? `- Tipo de treino: ${dados.tipoTreino}` : ''}
${dados.nivelExperiencia ? `- Nível de experiência: ${dados.nivelExperiencia}` : ''}
${dados.objetivo ? `- Objetivo principal: ${dados.objetivo}` : ''}

PLANOS DISPONÍVEIS:
- ESSENTIAL: Isca de entrada - 3 meses (R$ 469) - Para testar o método com baixa fricção
- LEGACY: Melhor custo-benefício - 10 meses (R$ 1.350) - Acompanhamento contínuo sem ruído
- PRIVATE: Experiência completa - 12 meses (R$ 3.290) - Acesso direto e decisões rápidas

REGRAS PARA RECOMENDAÇÃO:
- IMC abaixo de 18.5 (Abaixo do peso): Recomendar LEGACY ou PRIVATE (precisa acompanhamento mais próximo)
- IMC 18.5-24.9 (Peso normal): Recomendar ESSENTIAL ou LEGACY (manutenção ou definição)
- IMC 25-29.9 (Sobrepeso): Recomendar LEGACY (melhor custo-benefício para transformação)
- IMC 30-34.9 (Obesidade Grau 1): Recomendar LEGACY ou PRIVATE (transformação significativa)
- IMC 35+ (Obesidade Grau 2/3): Recomendar PRIVATE (acompanhamento intensivo necessário)

CONSIDERE TAMBÉM:
- Nível de atividade física atual
- Objetivos secundários mencionados
- Histórico de tentativas anteriores
- Condições médicas existentes
- Frequência de consumo de álcool

INSTRUÇÕES CRÍTICAS:
1. ANÁLISE TÉCNICA: Use dados específicos como IMC exato, idade, frequência de treino para criar insights únicos
2. EVITE GENERALIDADES: Não use frases como "com dedicação você consegue" ou análises genéricas tipo horóscopo
3. SEJA ESPECÍFICO: Mencione números exatos (IMC, idade, frequência) e como eles impactam o metabolismo/resultados
4. FOQUE EM FISIOLOGIA: Explique como a idade afeta o metabolismo, como o IMC atual influencia estratégias, etc.
5. DESAFIOS REAIS: Identifique desafios específicos baseados no perfil (ex: metabolismo mais lento aos 40+, necessidade de mais proteína para ganho muscular, etc.)
6. ESTA É UMA ANÁLISE PRÉVIA: Deixe claro que é uma análise superficial e que a análise completa vem com os planos

Responda APENAS em formato JSON válido:
{
  "analisePersonalizada": "análise técnica específica de 3-4 frases usando dados exatos e explicando impactos fisiológicos",
  "planoRecomendado": "ESSENTIAL, LEGACY ou PRIVATE",
  "motivacao": "insight motivador baseado no perfil específico, não genérico",
  "desafios": ["desafio específico baseado na idade/IMC", "desafio baseado na frequência de treino", "desafio metabólico específico"],
  "objetivos": ["objetivo específico para o IMC atual", "objetivo baseado na idade/experiência", "objetivo de composição corporal específico"]
}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Você é um especialista em fitness da ScarFit. SEMPRE seja específico e técnico, usando dados exatos fornecidos. EVITE generalidades ou frases motivacionais vazias. Foque em fisiologia, metabolismo e impactos reais dos dados do usuário. Esta é uma análise PRÉVIA - a análise completa vem com os planos."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.1,
      max_tokens: 600
    });

    const resposta = completion.choices[0]?.message?.content;
    
    if (!resposta) {
      throw new Error('Resposta vazia da OpenAI');
    }

    console.log('✅ Resposta recebida da OpenAI:', resposta.substring(0, 100) + '...');

    // Limpar a resposta removendo markdown se houver
    const respostaLimpa = resposta.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    try {
      const analise = JSON.parse(respostaLimpa);
      
      // Validar se tem todas as propriedades necessárias
      if (!analise.analisePersonalizada || !analise.planoRecomendado || !analise.motivacao) {
        throw new Error('Resposta incompleta da IA');
      }
      
      console.log('🎯 Análise processada com sucesso:', {
        planoRecomendado: analise.planoRecomendado,
        temAnalise: !!analise.analisePersonalizada,
        temMotivacao: !!analise.motivacao
      });
      
      return analise;
    } catch (parseError) {
      console.error('❌ Erro ao fazer parse da resposta:', parseError);
      console.error('Resposta recebida:', respostaLimpa);
      throw new Error('Resposta da IA não está em formato JSON válido');
    }

  } catch (error) {
    console.error('❌ Erro na análise com OpenAI:', error);
    
    // Se o erro for relacionado à API key ou configuração
    if (error instanceof Error) {
      if (error.message.includes('API key') || error.message.includes('401')) {
        console.error('🔑 Problema com a chave da API OpenAI');
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        console.error('🌐 Problema de conexão com a API OpenAI');
      }
    }
    
    throw error;
  }
}