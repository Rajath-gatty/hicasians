import React from 'react';
import { motion } from 'motion/react';
import alumniGroupImg from '../src/assets/images/unity.png';

interface Stat {
  value: string;
  label: string;
}

const stats: Stat[] = [
  { value: '400+', label: 'Attendees' },
  { value: '25+', label: 'Batches & their Families' },
  { value: '5+', label: 'Events every year' },
  { value: '300+', label: 'Celebrity Endorsements' },
  { value: '100+', label: 'Non UAE Hicasians' },
  { value: '50+', label: 'Partners' },
];

const UnityStrength: React.FC = () => {
  return (
    <section id="unity" className="pt-20 overflow-hidden bg-transparent">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-start">
          {/* Left: heading and intro copy */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.35]">
              Unity is
              <br />
              Our Strength
            </h2>
            <p className="text-gray-600 mt-5 text-[13px] md:text-sm leading-relaxed max-w-sm">
              What began as a shared campus has grown into a network that spans batches, cities
              and generations. Every reunion, celebration and get-together adds another
              connection to the Hicasians UAE family.
            </p>
          </motion.div>

          {/* Right: key numbers */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-10">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <p className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                  {stat.value}
                </p>
                <p className="text-gray-600 mt-2 text-sm leading-snug">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Full-bleed alumni group photo */}
      <motion.img
        src={alumniGroupImg}
        alt="Hicasians UAE alumni together"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-12 md:mt-16 w-full h-auto object-contain select-none pointer-events-none"
      />
    </section>
  );
};

export default UnityStrength;
