import { analisarPerfilCompleto } from '../utils/openai';

export async function POST(request: Request) {
  try {
    const dados = await request.json();
    
    const analise = await analisarPerfilCompleto(dados);
    
    return new Response(JSON.stringify(analise), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Erro na API de análise:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Erro ao processar análise',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}