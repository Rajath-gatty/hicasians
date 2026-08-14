import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutSummary from './components/AboutSummary';
import Events from './components/Events';
import UnityStrength from './components/UnityStrength';
import Sponsors from './components/Sponsors';
import Gallery from './components/Gallery';
import SocialInitiatives from './components/SocialInitiatives';
import Legacy from './components/Legacy';
import ConfettiTransition from './components/ConfettiTransition';
import Contact from './components/Contact';
import Footer from './components/Footer';
import heroImg from './src/assets/images/hero-thumbnail.jpeg';
import heroVideo from './src/assets/videos/event-banner-video.mp4';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-black text-gray-100">
      <video
        className="absolute inset-x-0 top-0 h-[120vh] w-full object-cover object-center"
        autoPlay
        loop
        muted
        playsInline
        poster={heroImg}
        aria-hidden="true"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Ensures header and hero copy remain legible over the video. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[120vh] bg-black/60 md:bg-black/50" />

      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <AboutSummary />
          <Events />

          {/* Light sections: sponsors through the legacy story */}
          <div className="bg-white">
            <Sponsors />
            <UnityStrength />
            <SocialInitiatives />
            <Legacy />
          </div>

          {/* Peach gallery band, blended into the white above with a diagonal + confetti */}
          {/* Peach gallery band, blended into the white above with a diagonal + confetti.
              The peach fade is a fixed 720px tall so it resolves to white just below the
              gallery heading instead of stretching across the whole photo grid. */}
          <div
            className="relative pt-16 md:pt-24"
            style={{
              backgroundColor: '#FFFFFF',
              backgroundImage: 'linear-gradient(180deg, #FFDBCD 0%, #FFEFE8 55%, #FFFFFF 100%)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% 720px',
            }}
          >
            <ConfettiTransition />
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