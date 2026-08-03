import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutSummary from './components/AboutSummary';
import Events from './components/Events';
import Sponsors from './components/Sponsors';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-black text-gray-100 min-h-screen">
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-0"></div>
      <div
        className="absolute top-0 left-0 w-full h-[120vh] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/src/assets/images/hero.jpeg')" }}
      ></div>

      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <AboutSummary />
          <Events />

          {/* Subtle light background gradient section: Our Sponsors through Events Gallery */}
          <div style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 60%, #FFDBCD 100%)' }}>
            <Sponsors />
            <Gallery />
          </div>

          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;