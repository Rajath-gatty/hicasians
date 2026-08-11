import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Calendar, MapPin, Clock, Ticket, Phone, ArrowRight, X, Sparkles, Check, Download, Film } from 'lucide-react';
import aarattuPoster from '../src/assets/images/aarattu_poster.jpg';
import eventVideo from '../src/assets/videos/event-video.mp4';

const Events: React.FC = () => {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingStep, setBookingStep] = useState<'form' | 'success'>('form');

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    ticketsCount: 1,
    batch: '',
  });

  const [ticketCode, setTicketCode] = useState('');

  const videoRef = useRef<HTMLVideoElement>(null);

  const handleOpenVideoModal = () => {
    setShowVideoModal(true);
  };

  const handleCloseVideoModal = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setShowVideoModal(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showVideoModal) {
        handleCloseVideoModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showVideoModal]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'ticketsCount' ? parseInt(value) || 1 : value,
    }));
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate a random ticket code
    const randomCode = 'HICA-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    setTicketCode(randomCode);
    setBookingStep('success');
  };

  const resetBookingForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      ticketsCount: 1,
      batch: '',
    });
    setBookingStep('form');
    setShowBookingModal(false);
  };

  return (
    <section id="events" className="py-24 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-yellow-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Highlighted Event
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Upcoming Celebrations
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 mt-4 max-w-2xl mx-auto text-base md:text-lg"
          >
            Join your fellow alumni in celebrating the spirit, unity, and culture that binds us together.
          </motion.p>
        </div>

        {/* Layout Box */}
        <div className="max-w-6xl mx-auto bg-gray-900/40 backdrop-blur-md rounded-3xl border border-gray-800/80 overflow-hidden shadow-2xl shadow-orange-500/5 grid grid-cols-1 lg:grid-cols-12 gap-0">

          {/* LEFT SIDE: Media Banner with Play Button */}
          <div className="lg:col-span-5 relative bg-black flex flex-col justify-center overflow-hidden min-h-[380px] md:min-h-[480px] group">
            {/* Poster Image Background with Zoom on Hover */}
            <img
              src={aarattuPoster}
              alt="Aarattu 2026 Promo"
              className="w-full h-full object-cover absolute inset-0 z-0 transform group-hover:scale-105 transition-transform duration-700 brightness-90"
            />

            {/* Overlay Gradient & Content */}
            <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 bg-gradient-to-t from-black/90 via-black/40 to-black/60">
              <div className="self-start px-3 py-1 bg-red-600/90 text-white font-extrabold text-xs uppercase tracking-widest rounded-md shadow-md shadow-red-900/30">
                DON'T MISS IT
              </div>
              <div className="self-center flex flex-col items-center text-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpenVideoModal}
                  className="relative pointer-events-auto w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 text-black shadow-xl shadow-orange-500/40 hover:shadow-orange-500/60 hover:from-orange-400 hover:to-yellow-400 transition-all duration-300 cursor-pointer group/btn"
                  aria-label="Play Event Video"
                >
                  <span className="absolute inset-0 rounded-full bg-orange-500/30 animate-ping duration-1000"></span>
                  <Play className="w-8 h-8 fill-black ml-1 text-black relative z-10" />
                </motion.button>
                <button
                  onClick={handleOpenVideoModal}
                  className="mt-4 text-white font-bold text-sm tracking-wider uppercase bg-black/60 hover:bg-orange-500 hover:text-black px-5 py-2 rounded-full backdrop-blur-sm border border-white/10 hover:border-orange-400/50 shadow-lg transition-all duration-300 cursor-pointer flex items-center gap-2"
                >
                  <Film className="w-4 h-4" />
                  Watch Promo Reel
                </button>
              </div>
              <div className="text-gray-300 text-xs text-center tracking-wide font-medium bg-black/40 py-1.5 px-4 rounded-full backdrop-blur-xs w-fit mx-auto border border-white/5">
                Glendale International School • Dubai
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Event Details & Content */}
          <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between">
            <div>
              {/* Event Header Banner */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold tracking-wider uppercase">
                  Onam Celebration 2026
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Booking Open
                </span>
              </div>

              {/* Title & Slogan */}
              <h3 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
                Aarattu 2026
              </h3>
              <p className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500 mb-6">
                Our own Onam celebration with our folks.
              </p>

              {/* Event Detailed Description */}
              <p className="text-gray-300 leading-relaxed text-base mb-8">
                Hicasians UAE proudly presents <strong>Aarattu 2026</strong>, our grand Onam celebration! Get ready to experience the nostalgia of Kerala right here in Dubai. Bring your family and friends for a spectacular day of traditional feast (Grand Onasadhya), thrilling Vadamvali (tug of war), cultural performances, the royal entry of Mahabali, Singari Melam, and a nostalgic musical evening with fellow alumni. Let's make memories together!
              </p>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 bg-gray-950/60 rounded-2xl border border-gray-800/80 mb-8">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Date</p>
                    <p className="text-sm font-bold text-gray-200">Oct 18, 2026</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Time</p>
                    <p className="text-sm font-bold text-gray-200">10:00 AM - 6:00 PM</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Venue</p>
                    <p className="text-sm font-bold text-gray-200 text-wrap" title="Glendale International School, Dubai">
                      Glendale School, DXB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 border-t border-gray-800/50">
              <button
                onClick={() => setShowBookingModal(true)}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-bold py-4 px-8 rounded-xl shadow-lg shadow-orange-500/10 hover:shadow-orange-500/25 hover:from-orange-400 hover:to-yellow-400 transform hover:-translate-y-0.5 transition-all duration-300"
              >
                <Ticket className="w-5 h-5 text-black fill-black/10" />
                Book your spot
                <ArrowRight className="w-4 h-4 text-black" />
              </button>

              <a
                href="#contact"
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-transparent text-white font-semibold py-4 px-8 rounded-xl border border-gray-700 hover:border-gray-500 hover:bg-white/5 transition-all duration-300"
              >
                <Phone className="w-4 h-4 text-gray-400" />
                Contact Us
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* TICKET BOOKING MODAL */}
      <AnimatePresence>
        {showBookingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetBookingForm}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            ></motion.div>

            {/* Modal Content container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-gray-950 border border-gray-800/80 rounded-2xl overflow-hidden shadow-2xl shadow-orange-500/10 z-10 max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-800/80 flex items-center justify-between bg-gray-900/40">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400">
                    <Ticket className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">Event Booking</h4>
                    <p className="text-xs text-gray-400">Aarattu 2026 • Oct 18</p>
                  </div>
                </div>
                <button
                  onClick={resetBookingForm}
                  className="w-8 h-8 rounded-lg border border-gray-800 hover:border-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="p-6 overflow-y-auto flex-1">
                {bookingStep === 'form' ? (
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                          Email Address <span className="text-orange-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="john@example.com"
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                          Number of Tickets
                        </label>
                        <select
                          name="ticketsCount"
                          value={formData.ticketsCount}
                          onChange={handleInputChange}
                          className="w-full bg-gray-900 border border-gray-800 focus:border-orange-500/50 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors appearance-none cursor-pointer"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <option key={num} value={num} className="bg-gray-950">
                              {num} {num === 1 ? 'Ticket' : 'Tickets'}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                          HCAS Alumni Batch
                        </label>
                        <input
                          type="text"
                          name="batch"
                          placeholder="e.g. 2015 - 2018"
                          value={formData.batch}
                          onChange={handleInputChange}
                          className="w-full bg-gray-900 border border-gray-800 focus:border-orange-500/50 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Pricing Calculator box */}
                    {/* <div className="p-4 bg-orange-500/5 border border-orange-500/10 rounded-xl flex items-center justify-between">
                      <div>
                        <span className="text-xs text-gray-400">Price per ticket</span>
                        <p className="text-sm font-bold text-gray-200">50 AED</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-orange-400 font-semibold uppercase tracking-wider">Total Amount</span>
                        <p className="text-2xl font-black text-orange-400">{formData.ticketsCount * 50} AED</p>
                      </div>
                    </div> */}

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-extrabold py-4 px-6 rounded-xl hover:from-orange-400 hover:to-yellow-400 shadow-lg shadow-orange-500/10 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      Confirm and Book Tickets
                    </button>
                  </form>
                ) : (
                  /* Success step - Virtual Ticket Display */
                  <div className="space-y-6 text-center">
                    <div className="w-16 h-16 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
                      <Check className="w-8 h-8" />
                    </div>
                    <div>
                      <h5 className="text-2xl font-black text-white">Booking Confirmed!</h5>
                      <p className="text-sm text-gray-400 mt-1">Get ready to celebrate Onam with the folks.</p>
                    </div>

                    {/* Ticket Visual */}
                    <div className="relative mx-auto max-w-sm bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800 rounded-2xl overflow-hidden shadow-xl p-6 text-left">
                      {/* Ticket header */}
                      <div className="flex items-center justify-between pb-4 border-b border-dashed border-gray-800">
                        <div>
                          <p className="text-[10px] text-orange-400 font-extrabold uppercase tracking-widest">Hicasians UAE</p>
                          <p className="text-base font-extrabold text-white">Aarattu 2026 Ticket</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[9px] text-gray-500 uppercase font-semibold">TICKET ID</p>
                          <p className="text-xs font-mono font-bold text-gray-300">{ticketCode}</p>
                        </div>
                      </div>

                      {/* Ticket details */}
                      <div className="py-4 space-y-3.5 text-sm">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-[10px] text-gray-500 uppercase block font-semibold">Holder Name</span>
                            <span className="font-bold text-gray-200 truncate block">{formData.name}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-gray-500 uppercase block font-semibold">Alumni Batch</span>
                            <span className="font-bold text-gray-200 block">{formData.batch || 'General'}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-[10px] text-gray-500 uppercase block font-semibold">Tickets Booked</span>
                            <span className="font-bold text-orange-400 block">{formData.ticketsCount} x Standard Entry</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-gray-500 uppercase block font-semibold">Total Paid</span>
                            <span className="font-bold text-gray-200 block">{formData.ticketsCount * 50} AED</span>
                          </div>
                        </div>

                        <div className="pt-2">
                          <span className="text-[10px] text-gray-500 uppercase block font-semibold mb-1">Venue</span>
                          <span className="text-xs font-semibold text-gray-300 block flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-orange-400" /> Glendale International School, Dubai
                          </span>
                        </div>
                      </div>

                      {/* QR Code section */}
                      <div className="pt-4 border-t border-dashed border-gray-800 flex items-center justify-between gap-4">
                        <div className="text-left">
                          <p className="text-[10px] text-gray-500 uppercase font-semibold">Verification</p>
                          <p className="text-[11px] text-emerald-400 font-bold">● Valid Entry Pass</p>
                        </div>
                        {/* Mock QR Code container */}
                        <div className="w-14 h-14 bg-white p-1 rounded flex items-center justify-center shrink-0">
                          <svg viewBox="0 0 100 100" className="w-full h-full text-black">
                            {/* Standard pixelated QR visual using SVG lines */}
                            <path fill="currentColor" d="M0,0h30v30h-30z M70,0h30v30h-30z M0,70h30v30h-30z M10,10h10v10h-10z M80,10h10v10h-10z M10,80h10v10h-10z M40,10h10v20h-10z M40,40h20v20h-20z M10,40h20v10h-20z M80,40h10v10h-10z M70,80h20v10h-20z M40,70h10v10h-10z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-stretch gap-3 pt-2">
                      <button
                        onClick={() => alert('Virtual Ticket Download started! A PDF has been mock-saved.')}
                        className="flex-1 flex items-center justify-center gap-2 bg-gray-900 border border-gray-800 hover:border-gray-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-300"
                      >
                        <Download className="w-4 h-4 text-orange-400" />
                        Download PDF
                      </button>
                      <button
                        onClick={resetBookingForm}
                        className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-extrabold py-3.5 px-4 rounded-xl hover:from-orange-400 hover:to-yellow-400 transition-all duration-300"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* VIDEO PLAYER MODAL */}
      <AnimatePresence>
        {showVideoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseVideoModal}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            ></motion.div>

            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-gray-950 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl shadow-orange-500/20 z-10 flex flex-col"
            >
              {/* Header */}
              <div className="p-4 md:p-5 border-b border-gray-800/80 flex items-center justify-between bg-gray-900/60 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                    <Film className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base md:text-lg flex items-center gap-2">
                      Aarattu 2026 Promo Reel
                      <span className="px-2 py-0.5 text-[10px] uppercase font-semibold bg-orange-500/20 text-orange-400 rounded-full border border-orange-500/30">
                        Official Video
                      </span>
                    </h4>
                    <p className="text-xs text-gray-400">Hicasians UAE Alumni Celebration</p>
                  </div>
                </div>
                <button
                  onClick={handleCloseVideoModal}
                  className="w-9 h-9 rounded-xl border border-gray-800 hover:border-gray-700 bg-gray-900/80 hover:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer"
                  aria-label="Close Video"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Player */}
              <div className="relative bg-black aspect-video w-full overflow-hidden flex items-center justify-center">
                <video
                  ref={videoRef}
                  src={eventVideo}
                  poster={aarattuPoster}
                  autoPlay
                  controls
                  playsInline
                  className="w-full h-full object-contain max-h-[75vh]"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Events;
