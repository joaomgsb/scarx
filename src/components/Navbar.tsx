import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setOpenDropdown(null);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  const handleDropdownToggle = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const navItems = [
    {
      name: 'Conheça a ScarX',
      type: 'dropdown',
      children: [
        { name: 'Início', to: 'hero', type: 'scroll' },
        { name: 'Para quem é', to: 'scarx-for-who', type: 'scroll' },
        { name: 'Resultados', to: 'results', type: 'scroll' },
        { name: 'Clientes', to: 'clients', type: 'scroll' },
      ],
    },
    {
      name: 'Metodologia',
      type: 'dropdown',
      children: [
        { name: 'Por que somos diferentes', to: 'journey', type: 'scroll' },
        { name: 'Como funciona na prática', to: 'hero-video', type: 'scroll' },
        { name: 'Plano PRO+', to: 'pro-plus', type: 'scroll' },
        { name: 'Planos', to: 'plans', type: 'scroll' },
        { name: 'Descubra seu plano', to: 'discover-plan', type: 'scroll' },
      ],
    },
    {
      name: 'Ferramentas',
      type: 'dropdown',
      children: [
        { name: 'Calculadora IMC Premium', to: '/calculadora-imc', type: 'router' },
        { name: 'Calculadoras Individuais', to: '/calculadoras-individuais', type: 'router' },
        { name: 'Seu Diagnóstico Inicial', to: '/seu-diagnostico-inicial', type: 'router' },
      ],
    },
    {
      name: 'Conteúdo',
      type: 'dropdown',
      children: [
        { name: 'Artigos de Autoridade', to: '/artigos', type: 'router' },
        { name: 'Estudos Científicos', to: '/estudos', type: 'router' },
      ],
    },
    { name: 'FAQ', to: 'faq', type: 'scroll' },
  ];

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-dark/90 backdrop-blur-md shadow-lg border-b border-neutral-800/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center py-1">
          {/* Logo */}
          <div className="flex items-center">
            <ScrollLink
              to="hero"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              className="cursor-pointer"
              aria-label="ScarX - Ir para o início"
            >
              <img 
                src="/images/scarx.png" 
                alt="ScarX" 
                className="h-16 md:h-20 lg:h-24 object-contain"
              />
            </ScrollLink>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.type === 'dropdown' ? (
                  <>
                    <button
                      className="text-white hover:text-primary transition-colors cursor-pointer font-medium text-sm py-2 flex items-center gap-1"
                      onMouseEnter={() => setOpenDropdown(item.name)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {item.name} 
                      <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {openDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-0 w-56 bg-dark-lighter/95 backdrop-blur-md border border-neutral-800 rounded-xl shadow-2xl py-2 z-20"
                          onMouseEnter={() => setOpenDropdown(item.name)}
                          onMouseLeave={() => setOpenDropdown(null)}
                        >
                          {item.children?.map((subItem) => (
                            subItem.type === 'scroll' ? (
                              <ScrollLink
                                key={subItem.name}
                                to={subItem.to}
                                spy={true}
                                smooth={true}
                                offset={-100}
                                duration={500}
                                className="block px-4 py-3 text-sm text-white hover:text-primary hover:bg-neutral-800/50 transition-all duration-200 cursor-pointer rounded-lg mx-2"
                                onClick={closeMenu}
                              >
                                {subItem.name}
                              </ScrollLink>
                            ) : (
                              <RouterLink
                                key={subItem.name}
                                to={subItem.to}
                                className="block px-4 py-3 text-sm text-white hover:text-primary hover:bg-neutral-800/50 transition-all duration-200 cursor-pointer rounded-lg mx-2"
                                onClick={closeMenu}
                              >
                                {subItem.name}
                              </RouterLink>
                            )
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  item.to && (
                    <ScrollLink
                      to={item.to}
                      spy={true}
                      smooth={true}
                      offset={-100}
                      duration={500}
                      className="text-white hover:text-primary transition-colors cursor-pointer font-medium text-sm py-2"
                      onClick={closeMenu}
                    >
                      {item.name}
                    </ScrollLink>
                  )
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-light focus:outline-none p-2 hover:bg-neutral-800 rounded-lg transition-colors"
              aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-dark/95 backdrop-blur-md border-t border-neutral-800"
          >
            <div className="container-custom py-6">
              <div className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    {item.type === 'dropdown' ? (
                      <>
                        <button
                          className="flex items-center justify-between w-full text-white hover:text-primary transition-colors cursor-pointer font-medium py-3 px-4 rounded-lg hover:bg-neutral-800/50"
                          onClick={() => handleDropdownToggle(item.name)}
                        >
                          {item.name} 
                          <ChevronDown className={`w-5 h-5 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {openDropdown === item.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="ml-4 border-l-2 border-primary/30 pl-4 space-y-1 mt-2"
                            >
                              {item.children?.map((subItem) => (
                                subItem.type === 'scroll' ? (
                                  <ScrollLink
                                    key={subItem.name}
                                    to={subItem.to}
                                    spy={true}
                                    smooth={true}
                                    offset={-100}
                                    duration={500}
                                    className="block text-white hover:text-primary transition-colors cursor-pointer text-sm py-2 px-3 rounded-lg hover:bg-neutral-800/30"
                                    onClick={closeMenu}
                                  >
                                    {subItem.name}
                                  </ScrollLink>
                                ) : (
                                  <RouterLink
                                    key={subItem.name}
                                    to={subItem.to}
                                    className="block text-white hover:text-primary transition-colors cursor-pointer text-sm py-2 px-3 rounded-lg hover:bg-neutral-800/30"
                                    onClick={closeMenu}
                                  >
                                    {subItem.name}
                                  </RouterLink>
                                )
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      item.to && (
                        <ScrollLink
                          to={item.to}
                          spy={true}
                          smooth={true}
                          offset={-100}
                          duration={500}
                          className="block text-white hover:text-primary transition-colors cursor-pointer font-medium py-3 px-4 rounded-lg hover:bg-neutral-800/50"
                          onClick={closeMenu}
                        >
                          {item.name}
                        </ScrollLink>
                      )
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;