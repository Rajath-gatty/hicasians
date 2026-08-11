import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// Every image under src/assets/images/events, including subfolders
const eventImageModules = (import.meta as any).glob(
  '../src/assets/images/events/**/*.{png,jpg,jpeg,webp,avif,svg}',
  { eager: true, import: 'default' }
) as Record<string, string>;

const byImageNumber = (pathA: string, pathB: string) => {
  const numA = parseInt(pathA.match(/image-(\d+)/)?.[1] || '0', 10);
  const numB = parseInt(pathB.match(/image-(\d+)/)?.[1] || '0', 10);
  return numA - numB;
};

const EVENTS_ROOT = '../src/assets/images/events/';

// Images grouped by the subfolder directly under events/, plus the loose ones at the root
const grouped: Record<string, string[]> = {};
const rootImages: string[] = [];

Object.entries(eventImageModules)
  .sort(([pathA], [pathB]) => byImageNumber(pathA, pathB))
  .forEach(([path, src]) => {
    const relative = path.replace(EVENTS_ROOT, '');
    const separatorIndex = relative.indexOf('/');
    if (separatorIndex === -1) {
      rootImages.push(src);
    } else {
      const folder = relative.slice(0, separatorIndex);
      grouped[folder] = grouped[folder] || [];
      grouped[folder].push(src);
    }
  });

// Album definitions. `folder` is a subfolder name under src/assets/images/events -
// create one per event and every photo inside it is picked up automatically, and the
// lightbox will page through them. Until a folder exists, the album falls back to a
// single cover photo taken from the loose images at the root of events/, in order.
// Titles and subtitles are edited here.
const albumConfig = [
  { title: 'Sports Day 2026', subtitle: 'Cheering on our teams together.', folder: 'sports-day-2026' },
  { title: 'Aarattu 2025', subtitle: 'Music, dance and a full house.', folder: 'aarattu-2025' },
  { title: 'Aarattu 2024', subtitle: 'Where the celebration began.', folder: 'aarattu-2024' },
];

const albumsWithoutFolder = albumConfig.filter((album) => !grouped[album.folder]?.length);

const albums = albumConfig
  .map((album) => {
    const fromFolder = grouped[album.folder];
    if (fromFolder?.length) return { ...album, images: fromFolder };

    // One cover image per album while the photos are not organised into folders
    const fallbackIndex = albumsWithoutFolder.indexOf(album);
    const cover = rootImages[fallbackIndex];
    return { ...album, images: cover ? [cover] : [] };
  })
  .filter((album) => album.images.length > 0);

const Gallery: React.FC = () => {
  const [openAlbum, setOpenAlbum] = useState<number | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  const activeAlbum = openAlbum === null ? null : albums[openAlbum];

  const closeLightbox = useCallback(() => setOpenAlbum(null), []);

  const step = useCallback(
    (delta: number) => {
      if (!activeAlbum) return;
      const count = activeAlbum.images.length;
      setPhotoIndex((prev) => (prev + delta + count) % count);
    },
    [activeAlbum]
  );

  useEffect(() => {
    if (!activeAlbum) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowRight') step(1);
      if (event.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeAlbum, closeLightbox, step]);

  const openLightbox = (index: number) => {
    setOpenAlbum(index);
    setPhotoIndex(0);
  };

  return (
    <section id="gallery" className="py-20 relative z-10 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Event Gallery</h2>
          <p className="text-gray-700 mt-4 max-w-2xl mx-auto font-medium text-sm md:text-base">A glimpse into the memorable moments we've shared together.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map((album, index) => (
            <motion.div
              key={album.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 aspect-[4/3] bg-gray-900"
            >
              <img
                src={album.images[0]}
                alt={album.title}
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              {/* Caption overlay */}
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/85 via-black/45 to-transparent">
                <h3 className="text-white font-bold text-base md:text-lg">{album.title}</h3>
                {album.subtitle && <p className="text-gray-200 text-sm mt-1">{album.subtitle}</p>}
                <button
                  type="button"
                  onClick={() => openLightbox(index)}
                  className="mt-4 inline-flex items-center px-5 py-2 rounded-lg border border-white/70 text-white text-sm font-semibold hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60"
                >
                  View Images
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Album lightbox */}
      <AnimatePresence>
        {activeAlbum && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label={activeAlbum.title}
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
                  <h3 className="text-white font-bold">{activeAlbum.title}</h3>
                  <p className="text-gray-400 text-xs">
                    {photoIndex + 1} / {activeAlbum.images.length}
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
                  src={activeAlbum.images[photoIndex]}
                  alt={`${activeAlbum.title} photo ${photoIndex + 1}`}
                  className="w-full max-h-[75vh] object-contain rounded-2xl border border-gray-800 bg-black"
                />

                {activeAlbum.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => step(-1)}
                      aria-label="Previous photo"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 border border-white/20 text-white hover:bg-black/80 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      type="button"
                      onClick={() => step(1)}
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

export default Gallery;
