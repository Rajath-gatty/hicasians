
import React from 'react';
import NetworkIcon from './icons/NetworkIcon';
import GrowthIcon from './icons/GrowthIcon';
import SocialIcon from './icons/SocialIcon';

const InfoCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
    <div className="flex items-center justify-center h-16 w-16 mb-6 rounded-full bg-gradient-to-br from-orange-500 to-red-700 text-white">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-400">{children}</p>
  </div>
);

const AboutSummary: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-black/70 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">A Bond That Never Graduates</h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">More than graduates from the same campus, we are a vibrant community that keeps friendships alive, celebrates achievements, and creates new stories together across the UAE.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <InfoCard icon={<NetworkIcon />} title="A Shared Legacy">
            Bound by our HICAS roots, we carry forward the friendships, memories, and experiences that shaped us, no matter where life takes us.
          </InfoCard>
          <InfoCard icon={<GrowthIcon />} title="One Community">
            From fresh graduates to seasoned professionals, Hicasians UAE brings together alumni from different generations through meaningful connections and shared experiences.
          </InfoCard>
          <InfoCard icon={<SocialIcon />} title="Moments That Matter">
            Whether it's reunions, celebrations, sports, family gatherings, or cultural events, we create opportunities to reconnect, laugh, and make lasting memories together.
          </InfoCard>
        </div>
      </div>
    </section>
  );
};

export default AboutSummary;