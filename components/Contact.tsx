import React from 'react';
import MailIcon from './icons/MailIcon';
import PhoneIcon from './icons/PhoneIcon';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 relative bg-black text-white">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">Get In Touch</h2>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto text-sm md:text-base">
            Have a question, a suggestion, or want to get involved? We'd love to hear from you.
          </p>
        </div>
        <div className="grid md:grid-cols-5 gap-10">
          {/* Form Section */}
          <div className="md:col-span-3 bg-gray-900/90 backdrop-blur-md p-8 rounded-2xl border border-gray-800 shadow-2xl">
            <h3 className="text-2xl font-semibold text-white mb-6">Send us a Message</h3>
            <form action="#" method="POST">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  <input type="text" name="name" id="name" placeholder="John Doe" className="w-full bg-gray-800/80 border border-gray-700 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                  <input type="email" name="email" id="email" placeholder="you@example.com" className="w-full bg-gray-800/80 border border-gray-700 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300" />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea name="message" id="message" rows={5} placeholder="Your message..." className="w-full bg-gray-800/80 border border-gray-700 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300"></textarea>
              </div>
              <div>
                <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold py-3.5 px-8 rounded-full shadow-lg hover:shadow-orange-500/30 transform hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Info Section */}
          <div className="md:col-span-2 space-y-8 flex flex-col justify-center">
            <div className="flex items-start bg-gray-900/90 backdrop-blur-md p-6 rounded-2xl border border-gray-800 shadow-xl">
              <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400">
                <MailIcon />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-white">Email Us</h3>
                <p className="text-gray-400 text-sm mt-1">For all inquiries, please email our committee.</p>
                <a href="mailto:info@hicasiansuae.com" className="text-orange-400 hover:text-orange-300 font-medium transition-colors duration-300 inline-block mt-2">hello@hicasians.com</a>
              </div>
            </div>
            <div className="flex items-start bg-gray-900/90 backdrop-blur-md p-6 rounded-2xl border border-gray-800 shadow-xl">
              <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400">
                <PhoneIcon />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-white">Call Us</h3>
                <p className="text-gray-400 text-sm mt-1">For urgent matters and support.</p>
                <a href="tel:+971000000000" className="text-orange-400 hover:text-orange-300 font-medium transition-colors duration-300 inline-block mt-2">+971 00 000 0000</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;