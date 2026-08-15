
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="h-screen flex items-center justify-center text-center pt-28 md:pt-0">
      <div className="container mx-auto px-6">
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4 animate-fade-in-down"
          style={{ filter: 'drop-shadow(0px 4px 16px rgba(0, 0, 0, 0.65)) drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.4))' }}
        >
          HICASIAN UAE
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-500">
            Welcomes You All
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 w-fit mx-auto mb-8 animate-fade-in-up font-medium md:bg-black/60 md:backdrop-blur-md md:border md:border-white/15 md:px-6 md:py-3 md:rounded-full md:shadow-lg">
          This Onam, Lets Aarattu!
        </p>
        <a
          href="#events"
          className="inline-block bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300"
        >
          Join the Event
        </a>
      </div>
    </section>
  );
};

export default Hero;