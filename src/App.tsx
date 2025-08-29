import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WeightCounter from './components/WeightCounter';
import Problem from './components/Problem';
import Solution from './components/Solution';
import AboutFounder from './components/AboutFounder';
import TechnicalTeam from './components/TechnicalTeam';
import Story from './components/Story';
import Methodology from './components/Methodology';
import ProPlus from './components/ProPlus';
import Results from './components/Results';
import Target from './components/Target';
import Faq from './components/Faq';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Feedbacks from './components/Feedbacks';
import ImcPage from './pages/ImcPage';
import HomePage from './pages/HomePage';
import PlanosPersonalizadosPage from './pages/PlanosPersonalizadosPage';
import EntendaSituacaoPage from './pages/EntendaSituacaoPage';
import CalculadorasIndividuaisPage from './pages/CalculadorasIndividuaisPage';
import ArtigosPage from './pages/ArtigosPage';
import EstudosPage from './pages/EstudosPage';
import QuizPage from './pages/QuizPage';

function App() {
  useEffect(() => {
    // Update document title
    document.title = 'ScarFit | Mudanças de Hábitos';
    
    // Update favicon to use local logo
    const favicon = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (favicon) {
      favicon.href = '/images/logo.png';
    }
    
    // Also update shortcut icon if it exists
    const shortcutIcon = document.querySelector("link[rel='shortcut icon']") as HTMLLinkElement;
    if (shortcutIcon) {
      shortcutIcon.href = '/images/logo.png';
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/calculadora-imc" element={<ImcPage />} />
        <Route path="/planos-personalizados" element={<PlanosPersonalizadosPage />} />
        <Route path="/seu-diagnostico-inicial" element={<EntendaSituacaoPage />} />
        <Route path="/calculadoras-individuais" element={<CalculadorasIndividuaisPage />} />
        <Route path="/artigos" element={<ArtigosPage />} />
        <Route path="/estudos" element={<EstudosPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/experiencia" element={<QuizPage experienceOnly={true} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

