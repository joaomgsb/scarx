import React from 'react';
import { Link } from 'react-scroll';
import { Instagram, MessageSquare, Mail, Phone, MapPin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark-lighter border-t border-neutral-800">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div>
            <img src="/images/scarx.png" alt="ScarX" className="h-20 mb-6 -mt-4" />
            <p className="text-light-muted mb-6 leading-relaxed">
              Metodologia exclusiva de transformação corporal com base científica 
              e acompanhamento personalizado.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://wa.me/5541984961012"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-dark-accent rounded-lg flex items-center justify-center text-light-muted hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/scarfitbr/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-dark-accent rounded-lg flex items-center justify-center text-light-muted hover:text-pink-500 hover:bg-pink-500/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/joaoscar_"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-dark-accent rounded-lg flex items-center justify-center text-light-muted hover:text-black hover:bg-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-light mb-6">Navegação</h3>
            <ul className="space-y-3">
              {[
                { name: 'Início', to: 'hero' },
                { name: 'Metodologia', to: 'methodology' },
                { name: 'Resultados', to: 'results' },
                { name: 'Equipe', to: 'team' },
                { name: 'Planos', to: 'plans' },
                { name: 'Contato', to: 'contact' }
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.to}
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    className="text-light-muted hover:text-primary transition-colors cursor-pointer"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="font-semibold text-light mb-6">Serviços</h3>
            <ul className="space-y-3">
              <li className="text-light-muted">Consultoria Personalizada</li>
              <li className="text-light-muted">Acompanhamento Nutricional</li>
              <li className="text-light-muted">Treinos Individualizados</li>
              <li className="text-light-muted">Suporte Multidisciplinar</li>
              <li className="text-light-muted">Análise de Bioimpedância</li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-semibold text-light mb-6">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-light-muted">(41) 98496-1012</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-light-muted">contato@scarfit.com.br</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-light-muted">São Paulo, Rua Oscar Freire 1375 – Cerqueira César</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="font-medium text-light mb-2">Horário de Atendimento</h4>
              <p className="text-light-muted text-sm">Segunda a sexta: 5h às 22h</p>
              <p className="text-light-muted text-sm">Sábado: 8h às 20h</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-light-muted text-sm">
                © {currentYear} ScarX. Todos os direitos reservados.
              </p>
              <p className="text-light-muted text-sm">
                CNPJ: 56.203.803/0001-06 | CREF 083338-G/SP
              </p>
            </div>
            <div className="text-center">
              <p className="text-light-muted text-sm">
                Desenvolvido por{' '}
                <a 
                  href="https://inovajs.com.br" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  Inova.js
                </a>
              </p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-light-muted hover:text-primary transition-colors text-sm">
                Termos de Uso
              </a>
              <a href="#" className="text-light-muted hover:text-primary transition-colors text-sm">
                Política de Privacidade
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;