import React, { useState, useEffect } from 'react';
import { House, Users, Sparkles, Images, Contact } from 'lucide-react';
import logoImg from '../src/assets/images/Logo.png';

const navLinks = [
  { name: 'Home', short: 'Home', href: '#home', id: 'home', Icon: House },
  { name: 'Upcoming Events', short: 'Events', href: '#events', id: 'events', Icon: Sparkles },
  { name: 'About', short: 'About', href: '#unity', id: 'unity', Icon: Users },
  { name: 'Event Gallery', short: 'Gallery', href: '#gallery', id: 'gallery', Icon: Images },
  { name: 'Contact', short: 'Contact', href: '#contact', id: 'contact', Icon: Contact },
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Highlight the bottom nav item for the section crossing the middle of the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] }
    );

    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 md:bg-black/90 md:backdrop-blur-md md:shadow-lg ${isScrolled ? 'bg-black/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
          }`}
      >
        {/* Mobile logo: starts inside the hero and travels up into the bar on scroll */}
        <a
          href="#home"
          aria-label="HICASIANS UAE - Home"
          className={`md:hidden fixed z-50 transition-all duration-700 ease-out ${isScrolled ? 'top-3 left-6' : 'top-[27vh] left-1/2 -translate-x-1/2'
            }`}
        >
          <img
            src={logoImg}
            alt="HICASIANS UAE"
            className={`w-auto object-contain transition-all duration-700 ease-out ${isScrolled ? 'h-12' : 'h-28 drop-shadow-[0_6px_20px_rgba(0,0,0,0.65)]'
              }`}
          />
        </a>

        <div
          className={`container mx-auto px-6 hidden md:flex justify-between items-center transition-all duration-300 ${isScrolled ? 'py-2 lg:py-2' : 'py-3 lg:py-4'
            }`}
        >
          <a href="#home" className="flex items-center">
            <img
              src={logoImg}
              alt="HICASIANS UAE"
              className={`w-auto object-contain transition-all duration-300 ${isScrolled ? 'h-14 lg:h-16' : 'h-16 lg:h-20'
                }`}
            />
          </a>

          {/* Desktop Nav */}
          <nav className={`flex space-x-8 transition-all duration-300 ${isScrolled ? 'text-sm' : 'text-base'}`}>
            {navLinks.map((link) => (
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
        </div>
      </header>

      {/* Mobile: floating bottom navigation */}
      <nav
        aria-label="Main navigation"
        className="md:hidden fixed bottom-3 left-3 right-3 z-50 rounded-3xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 pb-[env(safe-area-inset-bottom)]"
      >
        <ul className="flex items-stretch justify-between px-2 py-2">
          {navLinks.map(({ short, href, id, Icon }) => {
            const isActive = activeSection === id;
            return (
              <li key={id} className="flex-1">
                <a
                  href={href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex flex-col items-center gap-1 py-2 rounded-2xl transition-colors duration-300 ${isActive ? 'text-orange-400 bg-orange-500/10' : 'text-gray-400 hover:text-white'
                    }`}
                >
                  <Icon className="w-5 h-5" strokeWidth={1.75} />
                  <span className="text-[11px] font-medium leading-none">{short}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Header;
