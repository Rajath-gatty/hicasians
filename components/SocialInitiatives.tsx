import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// Import all images from the charity-initiatives event folder
const charityModules = (import.meta as any).glob(
  '../src/assets/images/events/charity-initiatives/*.{png,jpg,jpeg,webp,avif,svg}',
  { eager: true, import: 'default' }
) as Record<string, string>;

// Separate thumbnail and gallery images
let thumbnailSrc = '';
const galleryImages: string[] = [];

Object.entries(charityModules)
  .sort(([pathA], [pathB]) => {
    const numA = parseInt(pathA.match(/image-(\d+)/)?.[1] || '0', 10);
    const numB = parseInt(pathB.match(/image-(\d+)/)?.[1] || '0', 10);
    return numA - numB;
  })
  .forEach(([path, src]) => {
    if (path.includes('thumbnail')) {
      thumbnailSrc = src;
    } else {
      galleryImages.push(src);
    }
  });

const SocialInitiatives: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const goNext = useCallback(() => {
    setPhotoIndex((prev) => (prev + 1) % galleryImages.length);
  }, []);

  const goPrev = useCallback(() => {
    setPhotoIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, []);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowRight') goNext();
      if (event.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, closeLightbox, goNext, goPrev]);

  if (!thumbnailSrc && galleryImages.length === 0) return null;

  return (
    <section id="social-initiatives" className="py-20 bg-black">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: single image card */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="relative w-full aspect-[10/9] rounded-2xl overflow-hidden shadow-2xl bg-gray-900">
              <img
                src={thumbnailSrc || galleryImages[0]}
                alt="Social Initiatives"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Caption overlay */}
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/85 via-black/50 to-transparent pointer-events-none">
                <h3 className="text-white font-bold text-base">Charity Initiatives</h3>
                <p className="text-gray-200 text-sm mt-1">Giving back to the community together.</p>
                {galleryImages.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setPhotoIndex(0);
                      setLightboxOpen(true);
                    }}
                    className="pointer-events-auto mt-4 inline-flex items-center px-5 py-2 rounded-lg border border-white/70 text-white text-sm font-semibold hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60"
                  >
                    View Images
                  </button>
                )}
              </div>
            </div>
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

      {/* Lightbox modal with next/prev */}
      <AnimatePresence>
        {lightboxOpen && galleryImages.length > 0 && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Social Initiatives Gallery"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 w-full max-w-4xl"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-white font-bold text-lg">Social Initiatives</h3>
                  <p className="text-gray-400 text-xs">
                    {photoIndex + 1} / {galleryImages.length}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeLightbox}
                  aria-label="Close"
                  className="w-9 h-9 rounded-lg border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="relative">
                <img
                  src={galleryImages[photoIndex]}
                  alt={`Social Initiatives photo ${photoIndex + 1}`}
                  className="w-full max-h-[75vh] object-contain rounded-2xl border border-gray-800 bg-black"
                />

                {galleryImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={goPrev}
                      aria-label="Previous photo"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 border border-white/20 text-white hover:bg-black/80 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      aria-label="Next photo"
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 border border-white/20 text-white hover:bg-black/80 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SocialInitiatives;
