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
  
  // Exemplo de template HTML para EmailJS:
  /*
  <!DOCTYPE html>
  <html>
  <head>
      <title>Nova Análise IMC - ScarFit</title>
  </head>
  <body>
      <h2>Nova Análise Personalizada Recebida</h2>
      
      <h3>Dados Pessoais:</h3>
      <p><strong>Nome:</strong> {{to_name}}</p>
      <p><strong>Email:</strong> {{to_email}}</p>
      <p><strong>WhatsApp:</strong> {{to_phone}}</p>
      
      <h3>Dados Físicos:</h3>
      <p><strong>Peso:</strong> {{peso}} kg</p>
      <p><strong>Altura:</strong> {{altura}}</p>
      <p><strong>Idade:</strong> {{idade}} anos</p>
      <p><strong>IMC:</strong> {{imc}}</p>
      <p><strong>Categoria:</strong> {{categoria}}</p>
      
      <h3>Perfil de Vida:</h3>
      <p><strong>Tempo sentado:</strong> {{tempo_sentado}}</p>
      <p><strong>Profissão:</strong> {{profissao}}</p>
      <p><strong>Horas de sono:</strong> {{horas_sono}}</p>
      
      <h3>Objetivos:</h3>
      <p><strong>Objetivo principal:</strong> {{objetivo}}</p>
      <p><strong>Impedimento:</strong> {{impedimento}}</p>
      
      <p><strong>Data de envio:</strong> {{data_envio}}</p>
      
      <hr>
      <p><em>Esta análise foi enviada através do sistema ScarFit</em></p>
  </body>
  </html>
  */
  
  // Exemplos de valores formatados que serão enviados:
  // tempo_sentado: "Menos de 4 horas", "4 a 6 horas", "6 a 8 horas", etc.
  // profissao: "Tecnologia/Informática", "Saúde/Medicina", "Educação", etc.
  // horas_sono: "Menos de 6 horas", "6 a 7 horas", "7 a 8 horas", etc.
  // objetivo: "Emagrecer", "Ganhar massa muscular", "Definir o corpo", etc.
  // impedimento: "Falta de tempo", "Falta de motivação", "Falta de consistência", etc. 