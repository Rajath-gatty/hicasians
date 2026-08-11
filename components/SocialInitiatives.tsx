import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

// Automatically import every photo in src/assets/images/social-initiatives
const initiativeModules = (import.meta as any).glob(
  '../src/assets/images/social-initiatives/*.{png,jpg,jpeg,webp,avif}',
  { eager: true, import: 'default' }
) as Record<string, string>;

const sourceImages: string[] = Object.entries(initiativeModules)
  .sort(([pathA], [pathB]) => {
    const numA = parseInt(pathA.match(/image-(\d+)/)?.[1] || '0', 10);
    const numB = parseInt(pathB.match(/image-(\d+)/)?.[1] || '0', 10);
    return numA - numB;
  })
  .map(([, src]) => src);

// Captions for each slide - edit these as the real initiatives are confirmed.
// The list also sets how many slides the carousel shows; photos are taken from the
// folder in order and reused when there are fewer photos than slides.
const initiatives = [
  { title: 'Iftar Kit Distribution', subtitle: 'Sharing meals with families during Ramadan.' },
  { title: 'Iftar Kit Distribution', subtitle: 'Sharing meals with families during Ramadan.' },
  { title: 'Iftar Kit Distribution', subtitle: 'Sharing meals with families during Ramadan.' },
];

const slides =
  sourceImages.length === 0
    ? []
    : initiatives.map((initiative, index) => ({
        id: index + 1,
        image: sourceImages[index % sourceImages.length],
        ...initiative,
      }));

const SocialInitiatives: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const total = slides.length;

  useEffect(() => {
    if (isPaused || lightboxOpen || total <= 1) return;
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % total), 5000);
    return () => clearInterval(timer);
  }, [isPaused, lightboxOpen, total]);

  // Close the lightbox with Escape
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen]);

  if (total === 0) return null;

  const goTo = (index: number) => setCurrent(((index % total) + total) % total);
  const activeSlide = slides[current];

  return (
    <section id="social-initiatives" className="py-20 bg-black">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: image carousel card */}
          <div
            className="w-full max-w-md mx-auto lg:mx-0"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative w-full aspect-[10/9] rounded-2xl overflow-hidden shadow-2xl bg-gray-900">
              <AnimatePresence initial={false} mode="wait">
                <motion.img
                  key={activeSlide.id}
                  src={activeSlide.image}
                  alt={activeSlide.title}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  drag={total > 1 ? 'x' : false}
                  dragDirectionLock
                  dragElastic={0.15}
                  dragMomentum={false}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -40) goTo(current + 1);
                    else if (info.offset.x > 40) goTo(current - 1);
                  }}
                  className="absolute inset-0 w-full h-full object-cover cursor-grab active:cursor-grabbing lg:cursor-default"
                />
              </AnimatePresence>

              {/* Caption overlay */}
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/85 via-black/50 to-transparent pointer-events-none">
                <h3 className="text-white font-bold text-base">{activeSlide.title}</h3>
                <p className="text-gray-200 text-sm mt-1">{activeSlide.subtitle}</p>
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="pointer-events-auto mt-4 inline-flex items-center px-5 py-2 rounded-lg border border-white/70 text-white text-sm font-semibold hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60"
                >
                  View Images
                </button>
              </div>
            </div>

            {/* Image navigation dots */}
            {total > 1 && (
              <div className="flex items-center justify-center gap-2 mt-4">
                {slides.map((slide, index) => {
                  const isActive = index === current;
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => goTo(index)}
                      aria-label={`Show initiative ${index + 1}`}
                      aria-current={isActive}
                      className={`h-2.5 rounded-full cursor-pointer transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60 ${
                        isActive ? 'w-6 bg-white' : 'w-2.5 bg-gray-600 hover:bg-gray-400'
                      }`}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* Right: heading and copy */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Social Initiatives
            </h2>
            <p className="text-gray-400 mt-4 text-sm md:text-base leading-relaxed max-w-lg">
              Beyond reunions and celebrations, Hicasians UAE comes together to give back - from
              Iftar kit distributions to relief drives and community support across the Emirates.
              Every initiative is powered by alumni volunteering their time and resources.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label={activeSlide.title}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 w-full max-w-3xl"
            >
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                aria-label="Close"
                className="absolute -top-12 right-0 w-9 h-9 rounded-lg border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <img
                src={activeSlide.image}
                alt={activeSlide.title}
                className="w-full max-h-[80vh] object-contain rounded-2xl border border-gray-800"
              />
              <div className="mt-3 text-center">
                <h3 className="text-white font-bold">{activeSlide.title}</h3>
                <p className="text-gray-400 text-sm">{activeSlide.subtitle}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SocialInitiatives;
