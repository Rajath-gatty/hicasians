import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// Import all images from event subfolders
const eventImageModules = (import.meta as any).glob(
  '../src/assets/images/events/**/*.{png,jpg,jpeg,webp,avif,svg}',
  { eager: true, import: 'default' }
) as Record<string, string>;

const EVENTS_ROOT = '../src/assets/images/events/';

// Extract number from image filename for sorting
const getImageNumber = (path: string): number => {
  const match = path.match(/image-(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
};

// Album configuration in the required order
const albumConfig = [
  { title: 'Aarattu 2025', folder: 'aarattu-2025' },
  { title: 'Aarattu 2024', folder: 'aarattu-2024' },
  { title: 'Kalikkalam', folder: 'kalikkalam' },
  { title: 'Social Initiatives', folder: 'charity-initiatives' },
  { title: 'Aarattu 2023', folder: 'aarattu-2023' },
  { title: 'Ifthar', folder: 'ifthar' },
];

// Build albums from folder contents
const albums = albumConfig
  .map((config) => {
    const prefix = `${EVENTS_ROOT}${config.folder}/`;
    let thumbnail = '';
    const images: string[] = [];

    Object.entries(eventImageModules)
      .filter(([path]) => path.startsWith(prefix))
      .forEach(([path, src]) => {
        if (path.includes('thumbnail')) {
          thumbnail = src;
        } else {
          images.push(src);
        }
      });

    // Sort images by number
    const sortedImages: string[] = [];
    const pathToSrc = new Map<string, string>();
    const imagePaths: string[] = [];

    Object.entries(eventImageModules)
      .filter(([path]) => path.startsWith(prefix) && !path.includes('thumbnail'))
      .forEach(([path, src]) => {
        pathToSrc.set(path, src);
        imagePaths.push(path);
      });

    imagePaths
      .sort((a, b) => getImageNumber(a) - getImageNumber(b))
      .forEach((path) => sortedImages.push(pathToSrc.get(path)!));

    return {
      ...config,
      thumbnail,
      images: sortedImages,
    };
  })
  .filter((album) => album.images.length > 0 && album.thumbnail);

// Flat list of all images with their album index for unified navigation
interface FlatImage {
  src: string;
  albumIndex: number;
}

const flatImages: FlatImage[] = [];
albums.forEach((album, albumIndex) => {
  album.images.forEach((src) => {
    flatImages.push({ src, albumIndex });
  });
});

const Gallery: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentFlatIndex, setCurrentFlatIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const currentImage = flatImages[currentFlatIndex];
  const currentAlbum = currentImage ? albums[currentImage.albumIndex] : null;

  // Get image position within its album
  const imagePositionInAlbum = useMemo(() => {
    if (!currentImage) return { current: 0, total: 0 };
    const album = albums[currentImage.albumIndex];
    const indexInAlbum = album.images.indexOf(currentImage.src);
    return { current: indexInAlbum + 1, total: album.images.length };
  }, [currentFlatIndex]);

  // Reset loading state when image changes
  useEffect(() => {
    setIsImageLoading(true);
  }, [currentFlatIndex]);

  const closeLightbox = useCallback(() => setIsOpen(false), []);

  const goNext = useCallback(() => {
    setCurrentFlatIndex((prev) => (prev + 1) % flatImages.length);
  }, []);

  const goPrev = useCallback(() => {
    setCurrentFlatIndex((prev) => (prev - 1 + flatImages.length) % flatImages.length);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowRight') goNext();
      if (event.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, closeLightbox, goNext, goPrev]);

  const openLightbox = (albumIndex: number) => {
    // Find the first flat index for this album
    const startIndex = flatImages.findIndex((img) => img.albumIndex === albumIndex);
    if (startIndex !== -1) {
      setCurrentFlatIndex(startIndex);
      setIsOpen(true);
    }
  };

  return (
    <section id="gallery" className="py-20 relative z-10 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Event Gallery</h2>
          <p className="text-gray-700 mt-4 max-w-2xl mx-auto font-medium text-sm md:text-base">
            A glimpse into the memorable moments we've shared together.
          </p>
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
                src={album.thumbnail}
                alt={album.title}
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              {/* Caption overlay */}
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/85 via-black/45 to-transparent">
                <h3 className="text-white font-bold text-base md:text-lg">{album.title}</h3>
                <p className="text-gray-200 text-sm mt-1">{album.images.length} photos</p>
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

      {/* Unified lightbox modal — portalled to body to escape stacking contexts */}
      {createPortal(
        <AnimatePresence>
          {isOpen && currentImage && currentAlbum && (
            <div
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
              role="dialog"
              aria-modal="true"
              aria-label={currentAlbum.title}
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
                    <h3 className="text-white font-bold text-lg">{currentAlbum.title}</h3>
                    <p className="text-gray-400 text-xs">
                      {imagePositionInAlbum.current} / {imagePositionInAlbum.total}
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
                  {/* Skeleton loader */}
                  {isImageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-2xl border border-gray-800 bg-gray-900 overflow-hidden">
                      <div className="w-full h-full min-h-[50vh] animate-pulse">
                        <div className="w-full h-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
                      </div>
                    </div>
                  )}

                  <img
                    src={currentImage.src}
                    alt={`${currentAlbum.title} photo ${imagePositionInAlbum.current}`}
                    onLoad={() => setIsImageLoading(false)}
                    className={`w-full max-h-[75vh] object-contain rounded-2xl border border-gray-800 bg-black transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
                  />

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
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};

export default Gallery;
