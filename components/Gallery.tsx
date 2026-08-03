import React from 'react';

// Automatically import all event images from src/assets/images/events
const eventImageModules = (import.meta as any).glob('../src/assets/images/events/*.{png,jpg,jpeg,webp,avif,svg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const galleryImages: string[] = Object.entries(eventImageModules)
  .sort(([pathA], [pathB]) => {
    const numA = parseInt(pathA.match(/image-(\d+)/)?.[1] || '0', 10);
    const numB = parseInt(pathB.match(/image-(\d+)/)?.[1] || '0', 10);
    return numA - numB;
  })
  .map(([_, src]) => src);

const Gallery: React.FC = () => {
  return (
    <section id="gallery" className="py-20 relative z-10 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Event Gallery</h2>
          <p className="text-gray-700 mt-3 max-w-2xl mx-auto font-medium text-sm md:text-base">A glimpse into the memorable moments we've shared together.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((src, index) => (
            <div key={index} className="group relative overflow-hidden rounded-xl border border-gray-200/80 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-white aspect-[4/3]">
              <img src={src} alt={`Gallery image ${index + 1}`} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;