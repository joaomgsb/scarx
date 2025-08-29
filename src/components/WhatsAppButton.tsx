import React from 'react';

const WhatsAppButton: React.FC = () => {
  return (
    <a
              href="https://wa.me/5541984961012?text=Olá, quero saber mais sobre a ScarX!"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 p-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-110 z-50 flex items-center justify-center"
      aria-label="Fale conosco no WhatsApp"
    >
      <img src="/images/icon/iconwhat.png" alt="WhatsApp" className="w-7 h-7" />
    </a>
  );
};

export default WhatsAppButton;