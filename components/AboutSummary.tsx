import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Automatically import all promoter posters from src/assets/images/promoters
const promoterModules = (import.meta as any).glob(
  '../src/assets/images/promoters/*.{png,jpg,jpeg,webp,avif}',
  { eager: true, import: 'default' }
) as Record<string, string>;

const promoters: { id: number; name: string; image: string }[] = Object.entries(promoterModules)
  .sort(([pathA], [pathB]) => {
    const numA = parseInt(pathA.match(/image-(\d+)/)?.[1] || '0', 10);
    const numB = parseInt(pathB.match(/image-(\d+)/)?.[1] || '0', 10);
    return numA - numB;
  })
  .map(([path, src], index) => ({
    id: index + 1,
    name: (path.split('/').pop() || `promoter-${index + 1}`).replace(/\.[^/.]+$/, ''),
    image: src,
  }));

// Width of one mobile poster slide, as a fraction of the visible carousel width.
// The remaining space lets the previous/next posters peek in from the edges.
const MOBILE_SLIDE_FRACTION = 0.6;

const InfoCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="shrink-0 basis-[85%] snap-start lg:basis-auto lg:shrink bg-gray-800/40 backdrop-blur-sm px-6 py-5 rounded-xl border border-gray-700/50 shadow-lg transition-colors duration-300 hover:border-gray-600 hover:bg-gray-800/60">
    <h3 className="text-lg md:text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm md:text-[15px] leading-relaxed">{children}</p>
  </div>
);

const PromotersCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const total = promoters.length;

  // Autoplay with pause on hover
  useEffect(() => {
    if (isPaused || total <= 1) return;
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % total), 4500);
    return () => clearInterval(timer);
  }, [isPaused, total]);

  if (total === 0) return null;

  // Centre the active slide inside the visible area (percentages resolve
  // against the track width, which stays equal to the visible width)
  const trackOffset = ((1 - MOBILE_SLIDE_FRACTION) / 2 - current * MOBILE_SLIDE_FRACTION) * 100;

  const goTo = (index: number) => setCurrent(((index % total) + total) % total);

  return (
    <div
      className="flex flex-col items-center h-full w-full min-w-0"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <h3 className="shrink-0 text-lg md:text-xl font-bold text-white mb-6 text-center">Our Partners</h3>

      <div className="flex-1 min-h-0 w-full flex items-center justify-center">
        {/* Mobile / tablet: peeking poster carousel */}
        <div className="w-full overflow-hidden lg:hidden">
          <motion.div
            className="flex items-center cursor-grab active:cursor-grabbing"
            animate={{ x: `${trackOffset}%` }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            drag="x"
            dragDirectionLock
            dragElastic={0.15}
            dragMomentum={false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragStart={() => setIsPaused(true)}
            onDragEnd={(_, info) => {
              setIsPaused(false);
              if (info.offset.x < -40) goTo(current + 1);
              else if (info.offset.x > 40) goTo(current - 1);
            }}
          >
            {promoters.map((promoter, index) => {
              const isActive = index === current;
              return (
                <div
                  key={promoter.id}
                  className="shrink-0 grow-0 px-2"
                  style={{ flexBasis: `${MOBILE_SLIDE_FRACTION * 100}%` }}
                >
                  <button
                    type="button"
                    onClick={() => goTo(index)}
                    aria-label={`Show promoter image ${index + 1}`}
                    aria-current={isActive}
                    className={`block w-full aspect-[3/4] rounded-xl overflow-hidden border shadow-2xl bg-gray-900 cursor-pointer transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60 ${isActive
                        ? 'border-gray-700/50 opacity-100 scale-100'
                        : 'border-gray-800/50 opacity-50 scale-90'
                      }`}
                  >
                    <img
                      src={promoter.image}
                      alt={`Promoter ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Desktop: single poster that fills the remaining column height so the
            poster and the cards column end up the same height */}
        <div className="hidden lg:block relative w-full h-full rounded-xl overflow-hidden border border-gray-700/50 shadow-2xl bg-gray-900">
          <AnimatePresence initial={false} mode="wait">
            <motion.img
              key={promoters[current].id}
              src={promoters[current].image}
              alt={`Promoter ${current + 1}`}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
        </div>
      </div>

      {/* Image navigation dots (controls the posters only) */}
      {total > 1 && (
        <div className="shrink-0 flex items-center justify-center gap-2 mt-5">
          {promoters.map((promoter, index) => {
            const isActive = index === current;
            return (
              <button
                key={promoter.id}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Show promoter image ${index + 1}`}
                aria-current={isActive}
                className={`h-2.5 rounded-full cursor-pointer transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60 ${isActive ? 'w-6 bg-white' : 'w-2.5 bg-gray-600 hover:bg-gray-400'
                  }`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

const AboutSummary: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-black/70 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">A Bond That Never Graduates</h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">More than graduates from the same campus, we are a vibrant community that keeps friendships alive, celebrates achievements, and creates new stories together across the UAE.</p>
        </div>

        <div className="grid lg:grid-cols-[1.7fr_1fr] gap-12 lg:gap-16 items-stretch max-w-5xl mx-auto">
          {/* Left: swipeable cards on mobile, stacked cards on desktop */}
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-pl-6 scroll-pr-6 pb-2 -mx-6 px-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:flex-col lg:overflow-visible lg:snap-none lg:scroll-p-0 lg:mx-0 lg:px-0 lg:pb-0">
            <InfoCard title="A Shared Legacy">
              Bound by our HICAS roots, we carry forward the friendships, memories, and experiences that shaped us, no matter where life takes us.
            </InfoCard>
            <InfoCard title="One Community">
              From fresh graduates to seasoned professionals, Hicasians UAE brings together alumni from different generations through meaningful connections and shared experiences.
            </InfoCard>
            <InfoCard title="Moments That Matter">
              Whether it's reunions, celebrations, sports, family gatherings, or cultural events, we create opportunities to reconnect, laugh, and make lasting memories together.
            </InfoCard>
          </div>

          {/* Right: promoters poster carousel with a vertical divider on desktop */}
          <div className="flex justify-center -mx-6 px-0 lg:mx-0 lg:pl-12 lg:border-l lg:border-gray-700/50">
            <PromotersCarousel />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSummary;
