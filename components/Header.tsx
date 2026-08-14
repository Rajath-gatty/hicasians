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
      {/* Bar is desktop-only. On mobile the logo floats free over the content, so the
          header stays transparent and collapses to zero height — a full-width fixed
          box here would otherwise swallow taps across the top of the hero. */}
      <header className="fixed top-0 left-0 w-full z-40 transition-all duration-300 bg-transparent md:bg-black/90 md:backdrop-blur-md md:shadow-lg">
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

      {/*
        Mobile logo: starts inside the hero and travels up to the top-left on scroll.
        Deliberately a sibling of <header>, not a child — the header carries a
        backdrop-filter, which makes it the containing block for any fixed descendant,
        and iOS Safari then rasterises that descendant into the filtered layer and
        mispositions it on scroll. Motion is transform-only so it stays on the
        compositor; animating top/left instead only repaints at scroll-end on iOS.
        svh, not vh: vh on iOS is the toolbar-collapsed height, so it drifts as the
        toolbar expands on scroll-up. svh is stable for the whole gesture.
      */}
      <a
        href="#home"
        aria-label="HICASIANS UAE - Home"
        className="md:hidden fixed top-3 left-1/2 z-50 will-change-transform"
        style={{
          transform: isScrolled
            ? 'translate3d(calc(1.5rem - 50vw), 0px, 0px)'
            : 'translate3d(-50%, calc(27svh - 0.75rem), 0px)',
          transition: 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <img
          src={logoImg}
          alt="HICASIANS UAE"
          className={`h-12 w-auto object-contain origin-top ${isScrolled ? '' : 'drop-shadow-[0_6px_20px_rgba(0,0,0,0.65)]'
            }`}
          style={{
            transform: isScrolled ? 'scale(1)' : 'scale(2.3333)',
            transition: 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </a>

      {/* Mobile: floating bottom navigation */}
      <nav
        aria-label="Main navigation"
        className="md:hidden fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-[max(0.75rem,env(safe-area-inset-left))] right-[max(0.75rem,env(safe-area-inset-right))] z-50 rounded-3xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50"
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
