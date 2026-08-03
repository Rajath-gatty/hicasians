import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles, Handshake, ArrowRight, X, Check, Send } from 'lucide-react';

// Automatically import all sponsor logo images from src/assets/images/logos
const logoModules = (import.meta as any).glob('../src/assets/images/logos/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

interface SponsorItem {
  id: number;
  name: string;
  logo: string;
}

// Prepare array of sponsor logo objects sorted by logo index
const allSponsors: SponsorItem[] = Object.entries(logoModules)
  .sort(([pathA], [pathB]) => {
    const numA = parseInt(pathA.match(/logo-(\d+)/)?.[1] || '0', 10);
    const numB = parseInt(pathB.match(/logo-(\d+)/)?.[1] || '0', 10);
    return numA - numB;
  })
  .map(([path, src], index) => {
    const fileName = path.split('/').pop() || `logo-${index + 1}`;
    const cleanName = fileName.replace(/\.[^/.]+$/, '').replace('-', ' ').toUpperCase();
    return {
      id: index + 1,
      name: cleanName,
      logo: src,
    };
  });

const ITEMS_PER_SLIDE = 12;

const Sponsors: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(1);
  const [isPaused, setIsPaused] = useState(false);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    designation: '',
    query: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModalStep('success');
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setModalStep('form');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        designation: '',
        query: '',
      });
    }, 300);
  };

  // Group items into slides of 12 items each (4x3 grid)
  const totalSlides = Math.ceil(allSponsors.length / ITEMS_PER_SLIDE);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Autoplay functionality with pause on hover
  useEffect(() => {
    if (isPaused || totalSlides === 0 || showModal) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 4500);

    return () => clearInterval(timer);
  }, [currentIndex, isPaused, totalSlides, showModal]);

  // Current items slice for active slide
  const currentSlideItems = allSponsors.slice(
    currentIndex * ITEMS_PER_SLIDE,
    (currentIndex + 1) * ITEMS_PER_SLIDE
  );

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.35,
        ease: [0.7, 0, 0.84, 0],
      },
    }),
  };

  return (
    <section id="sponsors" className="py-20 relative overflow-hidden bg-transparent">
      {/* Background subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-orange-400/15 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100/80 border border-orange-200 text-orange-700 text-xs font-semibold uppercase tracking-wider mb-3"
          >
            <Sparkles className="w-3.5 h-3.5" /> Generous Supporters
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: -5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight"
          >
            Our Sponsors
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 mt-3 max-w-xl mx-auto text-sm md:text-base font-medium"
          >
            Powered by the generous support of leading brands committed to empowering our community and celebrations.
          </motion.p>
        </div>

        {/* Carousel Container with Navigation Overlay */}
        <div
          className="relative px-2 sm:px-12 py-2"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Button: Previous */}
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-md border border-gray-200 shadow-lg text-gray-700 hover:text-orange-600 hover:border-orange-500 hover:bg-orange-50 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-orange-500/50 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Navigation Button: Next */}
          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-md border border-gray-200 shadow-lg text-gray-700 hover:text-orange-600 hover:border-orange-500 hover:bg-orange-50 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-orange-500/50 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel Slide Area (12 items per slide in 4x3 grid) */}
          <div className="overflow-hidden min-h-[320px] sm:min-h-[360px] px-1 py-2">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-5"
              >
                {currentSlideItems.map((sponsor) => (
                  <motion.div
                    key={sponsor.id}
                    className="bg-white/90 backdrop-blur-sm hover:bg-white border border-gray-200/90 hover:border-orange-400 rounded-2xl p-4 text-center flex justify-center items-center h-28 md:h-32 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-orange-500/10 group relative overflow-hidden"
                  >
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="max-h-16 md:max-h-20 max-w-[85%] object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Orange Indicators & Slide Progress Controls */}
          <div className="mt-8 border-t border-gray-200/60 pt-5 px-2 flex flex-col items-center gap-5">
            {/* Centered Orange Navigation Dots / Indicators */}
            <div className="flex items-center justify-center gap-2">
              {Array.from({ length: totalSlides }).map((_, index) => {
                const isActive = index === currentIndex;
                return (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className="focus:outline-none p-1 group cursor-pointer"
                  >
                    {isActive ? (
                      <motion.div
                        layoutId="activeIndicator"
                        className="w-8 h-2.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 shadow-md shadow-orange-500/30"
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      />
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full bg-orange-200 group-hover:bg-orange-400 transition-all duration-300" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Become a Sponsor Button (opens modal) */}
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold text-sm shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <Handshake className="w-4.5 h-4.5" />
              <span>Become a Sponsor</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* SPONSORSHIP QUERY ENQUIRY MODAL */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Content container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-gray-950 border border-gray-800/80 rounded-2xl overflow-hidden shadow-2xl shadow-orange-500/10 z-10 max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-800/80 flex items-center justify-between bg-gray-900/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                    <Handshake className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">Become a Sponsor</h4>
                    <p className="text-xs text-gray-400">Send query enquiry</p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="w-8 h-8 rounded-lg border border-gray-800 hover:border-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="p-6 overflow-y-auto flex-1">
                {modalStep === 'form' ? (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                        Full Name <span className="text-orange-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-gray-900 border border-gray-800 focus:border-orange-500/50 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                      />
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                          Email Address <span className="text-orange-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="john@company.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-gray-900 border border-gray-800 focus:border-orange-500/50 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                          Phone Number <span className="text-orange-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          placeholder="+971 XX XXX XXXX"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full bg-gray-900 border border-gray-800 focus:border-orange-500/50 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Company & Designation */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                          Company <span className="text-orange-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="company"
                          required
                          placeholder="Acme Corp"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full bg-gray-900 border border-gray-800 focus:border-orange-500/50 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                          Designation <span className="text-orange-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="designation"
                          required
                          placeholder="Marketing Director"
                          value={formData.designation}
                          onChange={handleInputChange}
                          className="w-full bg-gray-900 border border-gray-800 focus:border-orange-500/50 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Send Query Enquiry */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                        Send Query Enquiry
                      </label>
                      <textarea
                        name="query"
                        rows={3}
                        placeholder="Write your sponsorship query or message here..."
                        value={formData.query}
                        onChange={handleInputChange}
                        className="w-full bg-gray-900 border border-gray-800 focus:border-orange-500/50 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-extrabold py-4 px-6 rounded-xl hover:from-orange-400 hover:to-yellow-400 shadow-lg shadow-orange-500/10 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-2"
                    >
                      <Send className="w-4 h-4" />
                      Send Query Enquiry
                    </button>
                  </form>
                ) : (
                  /* Success View */
                  <div className="space-y-6 text-center py-4">
                    <div className="w-16 h-16 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
                      <Check className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white mb-2">Enquiry Sent Successfully!</h3>
                      <p className="text-gray-400 text-sm max-w-sm mx-auto">
                        Thank you <span className="text-white font-semibold">{formData.name}</span>. We have received your query for <span className="text-orange-400 font-semibold">{formData.company}</span> ({formData.designation}) and will contact you shortly.
                      </p>
                    </div>

                    <button
                      onClick={closeModal}
                      className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-xl transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Sponsors;


