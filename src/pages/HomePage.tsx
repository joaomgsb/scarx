import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HeroVideo from '../components/HeroVideo';
import TransformationJourney from '../components/TransformationJourney';

import ScarXForWho from '../components/ScarXForWho';
import ResultsGallery from '../components/ResultsGallery';
import ProPlus from '../components/ProPlus';
import Faq from '../components/Faq';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

import AppShowcase from '../components/AppShowcase';
import OurClients from '../components/OurClients';
import ElitePlan from '../components/ElitePlan';
import DiscoverPlanCTA from '../components/DiscoverPlanCTA';
import BetterMeStats from '../components/BetterMeStats';
import BetterMeTeam from '../components/BetterMeTeam';
import AboutSection from '../components/AboutSection';

const HomePage: React.FC = () => {
  // Scroll para o topo quando a página carrega
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-dark text-light">
      <WhatsAppButton />
      <Navbar />
      
      {/* Seções integradas e fluidas */}
      <div id="hero">
        <Hero />
      </div>

      <div id="results">
        <ResultsGallery />
      </div>

      <div id="betterme-stats">
        <BetterMeStats />
      </div>
      
      <div id="journey">
        <TransformationJourney />
      </div>

      <div id="hero-video">
        <HeroVideo />
      </div>
      
      <div id="scarx-for-who">
        <ScarXForWho />
      </div>

      <div id="betterme-team">
        <BetterMeTeam />
      </div>

      <div id="about">
        <AboutSection />
      </div>
      
      <div id="pro-plus">
        <ProPlus />
      </div>
      
      <div id="plans">
        <ElitePlan />
      </div>
      
      <div id="discover-plan">
        <DiscoverPlanCTA />
      </div>
      
      <div id="clients">
        <OurClients />
      </div>

      {/* Tudo o que você precisa, no seu bolso. */}
      <div id="app-showcase">
        <AppShowcase />
      </div>

      <div id="faq">
        <Faq />
      </div>
      
      <Footer />
    </div>
  );
};

export default HomePage;