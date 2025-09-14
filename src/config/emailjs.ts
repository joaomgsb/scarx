import emailjs from '@emailjs/browser';

// Configuração do EmailJS usando variáveis de ambiente
// Para configurar, acesse: https://www.emailjs.com/
// 1. Crie uma conta gratuita
// 2. Configure um Email Service (Gmail, Outlook, etc.)
// 3. Crie um Email Template
// 4. Configure as variáveis no arquivo .env

export const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
};

// Verificar se as variáveis estão configuradas
export const isEmailJSConfigured = () => {
  return EMAILJS_CONFIG.SERVICE_ID !== 'YOUR_SERVICE_ID' &&
         EMAILJS_CONFIG.TEMPLATE_ID !== 'YOUR_TEMPLATE_ID' &&
         EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY';
};

// Interface para os dados do quiz
export interface QuizEmailData {
  // Dados pessoais
  nome?: string;
  email: string;
  whatsapp: string;
  
  // Dados físicos
  peso: string;
  altura: string;
  idade: number;
  sexoBiologico: string;
  metaPeso: string;
  pesoMaximo: string;
  percentualGordura: string;
  
  // Objetivos
  objetivoPrincipal: string;
  objetivoSecundario: string[];
  
  // Histórico
  tentouEmagrecer: string[];
  medicacoes: string[];
  usarMedicamentos: string;
  disturbioAlimentar: string;
  cirurgiaBariatrica: string;
  condicoesMedicas: string[];
  frequenciaMedico: string;
  
  // Estilo de vida
  nivelAtividade: string;
  frequenciaAlcool: string;
  compartilhar?: string;
  
  // Análise gerada
  analiseIA?: string;
  planoRecomendado?: string;
  
  // Data
  dataEnvio: string;
}

// Função para calcular idade
const calculateAge = (birthDate: string): number => {
  if (!birthDate) return 30;
  
  let date: Date;
  
  if (birthDate.includes('-') && birthDate.split('-').length === 3) {
    const [year, month, day] = birthDate.split('-').map(Number);
    if (!day || !month || !year) return 30;
    date = new Date(year, month - 1, day);
  } else if (birthDate.includes('/') && birthDate.split('/').length === 3) {
    const [day, month, year] = birthDate.split('/').map(Number);
    if (!day || !month || !year) return 30;
    date = new Date(year, month - 1, day);
  } else {
    return 30;
  }
  
  const today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  const m = today.getMonth() - date.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
    age--;
  }
  
  return age;
};

// Função para enviar email com os dados do quiz
export const sendQuizEmail = async (quizData: any, analiseIA?: any, desconto?: number): Promise<boolean> => {
  if (!isEmailJSConfigured()) {
    console.warn('EmailJS não está configurado. Configure as variáveis de ambiente.');
    return false;
  }

  try {
    // Inicializar EmailJS
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    
    // Calcular idade
    const idade = calculateAge(quizData.dataNascimento);
    
    // Preparar dados para o template
    const templateParams = {
      // Dados pessoais (nome removido)
      email: quizData.email || 'Não informado',
      whatsapp: quizData.whatsapp || 'Não informado',
      desconto: desconto ? `R$ ${desconto},00` : 'Nenhum desconto aplicado',
      
      // Dados físicos
      peso: quizData.peso || 'Não informado',
      altura: quizData.altura || 'Não informado',
      idade: idade.toString(),
      sexo_biologico: quizData.sexoBiologico || 'Não informado',
      meta_peso: quizData.metaPeso || 'Não informado',
      peso_maximo: quizData.pesoMaximo || 'Não informado',
      percentual_gordura: quizData.percentualGordura || 'Não informado',
      
      // Objetivos
      objetivo_principal: quizData.objetivoPrincipal || 'Não informado',
      objetivo_secundario: Array.isArray(quizData.objetivoSecundario) 
        ? quizData.objetivoSecundario.join(', ') 
        : 'Não informado',
      
      // Histórico
      tentou_emagrecer: Array.isArray(quizData.tentouEmagrecer) 
        ? quizData.tentouEmagrecer.join(', ') 
        : 'Não informado',
      medicacoes: Array.isArray(quizData.medicacoes) 
        ? quizData.medicacoes.join(', ') 
        : 'Não informado',
      usar_medicamentos: quizData.usarMedicamentos || 'Não informado',
      disturbio_alimentar: quizData.disturbioAlimentar || 'Não informado',
      cirurgia_bariatrica: quizData.cirurgiaBariatrica || 'Não informado',
      condicoes_medicas: Array.isArray(quizData.condicoesMedicas) 
        ? quizData.condicoesMedicas.join(', ') 
        : 'Não informado',
      frequencia_medico: quizData.frequenciaMedico || 'Não informado',
      
      // Estilo de vida
      nivel_atividade: quizData.nivelAtividade || 'Não informado',
      frequencia_alcool: quizData.frequenciaAlcool || 'Não informado',
      compartilhar: quizData.compartilhar || 'Nada informado',
      
      // Análise IA (se disponível)
      analise_ia: analiseIA?.analisePersonalizada || 'Análise não disponível',
      plano_recomendado: analiseIA?.planoRecomendado || 'Não definido',
      motivacao: analiseIA?.motivacao || 'Não disponível',
      desafios: Array.isArray(analiseIA?.desafios) 
        ? analiseIA.desafios.join(', ') 
        : 'Não disponível',
      objetivos_ia: Array.isArray(analiseIA?.objetivos) 
        ? analiseIA.objetivos.join(', ') 
        : 'Não disponível',
      
      // Data
      data_envio: new Date().toLocaleString('pt-BR'),
    };

    // Enviar email
    const result = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams
    );

    console.log('Email enviado com sucesso:', result);
    return true;
    
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return false;
  }
};

// Template HTML para EmailJS (cole este código no EmailJS Dashboard)
export const HTML_TEMPLATE = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> Nova Análise Quiz ScarX</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8f9fa;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 8px;
        }
        
        .header p {
            opacity: 0.9;
            font-size: 16px;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .section {
            margin-bottom: 35px;
        }
        
        .section h2 {
            color: #3B82F6;
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 2px solid #E5E7EB;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .info-item {
            background: #F8F9FA;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #3B82F6;
        }
        
        .info-item strong {
            color: #374151;
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
        }
        
        .info-item span {
            color: #6B7280;
        }
        
        .highlight-box {
            background: linear-gradient(135deg, #3B82F6/10 0%, #60A5FA/5 100%);
            border: 1px solid #3B82F6/20;
            border-radius: 12px;
            padding: 20px;
            margin: 20px 0;
        }
        
        .highlight-box h3 {
            color: #3B82F6;
            margin-bottom: 10px;
            font-size: 18px;
        }
        
        .highlight-box p {
            color: #374151;
            margin-bottom: 8px;
        }
        
        .footer {
            background: #F3F4F6;
            padding: 25px 30px;
            text-align: center;
            border-top: 1px solid #E5E7EB;
        }
        
        .footer p {
            color: #6B7280;
            font-size: 14px;
            margin-bottom: 10px;
        }
        
        .logo {
            font-size: 18px;
            font-weight: 700;
            color: #3B82F6;
        }
        
        .status-badge {
            display: inline-block;
            padding: 4px 12px;
            background: #10B981;
            color: white;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        @media (max-width: 600px) {
            .container {
                margin: 10px;
                border-radius: 8px;
            }
            
            .header {
                padding: 25px 20px;
            }
            
            .header h1 {
                font-size: 24px;
            }
            
            .content {
                padding: 30px 20px;
            }
            
            .info-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎯 Nova Análise Quiz ScarX</h1>
            <p>Dados completos do lead capturado</p>
            <div style="margin-top: 15px;">
                <span class="status-badge">Novo Lead</span>
                {{#desconto}}
                <span class="status-badge" style="background: #F59E0B; margin-left: 10px;">Desconto: {{desconto}}</span>
                {{/desconto}}
            </div>
        </div>
        
        <div class="content">
            <!-- Dados Pessoais -->
            <div class="section">
                <h2>👤 Dados Pessoais</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <strong>Email:</strong>
                        <span>{{email}}</span>
                    </div>
                    <div class="info-item">
                        <strong>WhatsApp:</strong>
                        <span>{{whatsapp}}</span>
                    </div>
                    <div class="info-item">
                        <strong>Idade:</strong>
                        <span>{{idade}} anos</span>
                    </div>
                    <div class="info-item">
                        <strong>Sexo Biológico:</strong>
                        <span>{{sexo_biologico}}</span>
                    </div>
                </div>
            </div>
            
            <!-- Dados Físicos -->
            <div class="section">
                <h2>📊 Dados Físicos</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <strong>Peso Atual:</strong>
                        <span>{{peso}} kg</span>
                    </div>
                    <div class="info-item">
                        <strong>Altura:</strong>
                        <span>{{altura}} cm</span>
                    </div>
                    <div class="info-item">
                        <strong>Meta de Peso:</strong>
                        <span>{{meta_peso}} kg</span>
                    </div>
                    <div class="info-item">
                        <strong>Peso Máximo:</strong>
                        <span>{{peso_maximo}} kg</span>
                    </div>
                    <div class="info-item">
                        <strong>Percentual de Gordura:</strong>
                        <span>{{percentual_gordura}}</span>
                    </div>
                </div>
            </div>
            
            <!-- Objetivos -->
            <div class="section">
                <h2>🎯 Objetivos</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <strong>Objetivo Principal:</strong>
                        <span>{{objetivo_principal}}</span>
                    </div>
                </div>
                <div class="info-item" style="margin-top: 15px;">
                    <strong>Objetivos Secundários:</strong>
                    <span>{{objetivo_secundario}}</span>
                </div>
            </div>
            
            <!-- Histórico de Saúde -->
            <div class="section">
                <h2>🏥 Histórico de Saúde</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <strong>Tentativas de Emagrecimento:</strong>
                        <span>{{tentou_emagrecer}}</span>
                    </div>
                    <div class="info-item">
                        <strong>Medicações Recentes:</strong>
                        <span>{{medicacoes}}</span>
                    </div>
                    <div class="info-item">
                        <strong>Usar Medicamentos:</strong>
                        <span>{{usar_medicamentos}}</span>
                    </div>
                    <div class="info-item">
                        <strong>Distúrbio Alimentar:</strong>
                        <span>{{disturbio_alimentar}}</span>
                    </div>
                    <div class="info-item">
                        <strong>Cirurgia Bariátrica:</strong>
                        <span>{{cirurgia_bariatrica}}</span>
                    </div>
                    <div class="info-item">
                        <strong>Condições Médicas:</strong>
                        <span>{{condicoes_medicas}}</span>
                    </div>
                    <div class="info-item">
                        <strong>Frequência Médico:</strong>
                        <span>{{frequencia_medico}}</span>
                    </div>
                </div>
            </div>
            
            <!-- Estilo de Vida -->
            <div class="section">
                <h2>💪 Estilo de Vida</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <strong>Nível de Atividade:</strong>
                        <span>{{nivel_atividade}}</span>
                    </div>
                    <div class="info-item">
                        <strong>Frequência Álcool:</strong>
                        <span>{{frequencia_alcool}}</span>
                    </div>
                </div>
                
                {{#compartilhar}}
                <div class="info-item" style="margin-top: 15px;">
                    <strong>Informações Adicionais:</strong>
                    <span>{{compartilhar}}</span>
                </div>
                {{/compartilhar}}
            </div>
            
            <!-- Análise IA -->
            {{#analise_ia}}
            <div class="section">
                <h2>🤖 Análise da IA</h2>
                <div class="highlight-box">
                    <h3>Plano Recomendado: {{plano_recomendado}}</h3>
                    <p><strong>Análise:</strong> {{analise_ia}}</p>
                    <p><strong>Motivação:</strong> {{motivacao}}</p>
                    <p><strong>Desafios:</strong> {{desafios}}</p>
                    <p><strong>Objetivos IA:</strong> {{objetivos_ia}}</p>
                </div>
            </div>
            {{/analise_ia}}
        </div>
        
        <div class="footer">
            <div class="logo">ScarX</div>
            <p>Análise enviada em: {{data_envio}}</p>
            <p>Este email foi gerado automaticamente pelo sistema ScarX Quiz</p>
        </div>
    </div>
</body>
</html>
`; 