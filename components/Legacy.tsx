import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import collegeImg from '../src/assets/images/legacy/college.png';
import khannaiyannImg from '../src/assets/images/legacy/khannaiyann.png';
import sarasuwathiImg from '../src/assets/images/legacy/sarasuwathi.png';
import priyaImg from '../src/assets/images/legacy/priya.png';

const COLLEGE_WEBSITE = 'https://hicas.ac.in/';

const people = [
  { name: 'Shri. T.S.R. Khannaiyann', role: 'Founder & Chairman', image: khannaiyannImg },
  { name: 'Smt. T.R.K Sarasuwathi', role: 'Managing Trustee', image: sarasuwathiImg },
  { name: 'Dr. K. Priya', role: 'Executive Trustee & Secretary', image: priyaImg },
];

const Legacy: React.FC = () => {
  return (
    <section id="legacy" className="pb-12 md:pb-16 bg-transparent overflow-hidden">
      {/* Full-bleed campus banner, tilted slightly so it sits on the white as a photo strip */}
      <motion.img
        src={collegeImg}
        alt="Hindusthan College of Arts & Science campus"
        initial={{ opacity: 0, y: -12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full h-40 sm:h-56 md:h-auto object-cover rotate-[-0.6deg] scale-[1.02] select-none pointer-events-none"
      />

      <div className="container mx-auto px-6 max-w-6xl pt-12 md:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            The Legacy
          </h2>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            A brief history of HICAS and how it shaped us
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: the people behind the institution */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 max-w-sm">
            {people.map((person, index) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full aspect-[7/8] object-cover object-top bg-gray-100"
                />
                <p className="text-gray-900 font-bold text-sm mt-3 leading-snug">{person.name}</p>
                <p className="text-gray-600 text-sm leading-snug">{person.role}</p>
              </motion.div>
            ))}
          </div>

          {/* Right: history copy and college link */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-xl"
          >
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              Hindusthan College of Arts &amp; Science in Coimbatore is where our story starts.
              Affiliated to Bharathiar University, the campus brought together students from very
              different backgrounds and gave them a shared place to grow.
            </p>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed mt-4">
              The friendships formed in those classrooms, corridors and college grounds did not end
              at graduation. They travelled with us, and today they are the foundation of the
              Hicasians community here in the UAE.
            </p>

            <a
              href={COLLEGE_WEBSITE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-lg bg-orange-400 hover:bg-orange-500 text-gray-900 font-semibold text-sm shadow-lg shadow-orange-500/20 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600/50"
            >
              View our College Website
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Legacy;
