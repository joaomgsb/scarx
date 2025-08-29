import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HeroVideo from '../components/HeroVideo';
import TransformationJourney from '../components/TransformationJourney';
import MethodologyShowcase from '../components/MethodologyShowcase';
import ScarXForWho from '../components/ScarXForWho';
import ResultsGallery from '../components/ResultsGallery';
import DiscoverPlanCTA from '../components/DiscoverPlanCTA';
import ProPlus from '../components/ProPlus';
import Faq from '../components/Faq';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

import AppShowcase from '../components/AppShowcase';
import OurClients from '../components/OurClients';
import ExclusiveDifferentials from '../components/ExclusiveDifferentials';

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
      
      <div id="journey">
        <TransformationJourney />
      </div>

      <div id="hero-video">
        <HeroVideo />
      </div>

      <div id="methodology">
        <MethodologyShowcase />
      </div>
      
      <div id="scarx-for-who">
        <ScarXForWho />
      </div>
      
      <div id="discover-plan">
        <DiscoverPlanCTA />
      </div>
      
      <div id="pro-plus">
        <ProPlus />
      </div>
      
      <div id="exclusive-differentials">
        <ExclusiveDifferentials />
      </div>
      
      <div id="app-showcase">
        <AppShowcase />
      </div>
      
      <div id="clients">
        <OurClients />
      </div>

      <div id="faq">
        <Faq />
      </div>
      
      <Footer />
    </div>
  );
};

export default HomePage;