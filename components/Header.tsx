import React, { useState, useEffect } from 'react';
import MenuIcon from './icons/MenuIcon';
import CloseIcon from './icons/CloseIcon';
import logoImg from '../src/assets/images/Logo.png';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Upcoming Events', href: '#events' },
    { name: 'Event Gallery', href: '#gallery' },
    { name: 'Contacts', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-black/90 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <a href="#home" className="flex items-center">
          <img src={logoImg} alt="HICASIANS UAE" className="h-12 md:h-16 lg:h-20 w-auto object-contain transition-all duration-300" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <nav className="flex flex-col items-center py-4 bg-black/90 backdrop-blur-md">
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="py-3 text-lg text-gray-200 hover:text-orange-400 transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;