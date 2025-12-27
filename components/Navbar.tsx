import React, { useState, useEffect } from 'react';
import { Menu, X, ChefHat } from 'lucide-react';

// Construct the public URL for the logo in the 'biteaze-assets' bucket
const SUPABASE_PROJECT_URL = 'https://rhxxzvhemrzxvndolajg.supabase.co';
const REMOTE_LOGO_URL = `${SUPABASE_PROJECT_URL}/storage/v1/object/public/biteaze-assets/logo.png`;

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Expertise', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'ROI', href: '#roi' },
    { name: 'Team', href: '#team' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {/* Logo Container - Square format, white background, NO BORDER */}
            <div className="bg-white group-hover:rotate-12 transition-transform w-10 h-10 flex items-center justify-center overflow-hidden">
              <img 
                src={REMOTE_LOGO_URL}
                onError={(e) => { e.currentTarget.src = '/logo.png'; }}
                alt="BITEAZE Logo" 
                className="w-full h-full object-cover scale-125" 
              />
            </div>
            
            {/* Brand Name - All Orange #ea580c (orange-600), using Archivo Black explicitly */}
            <span className="font-['Archivo_Black'] text-2xl tracking-tighter text-orange-600">
              BITEAZE
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-mono text-sm uppercase tracking-widest hover:text-orange-500 transition-colors relative group"
                >
                  <span className="relative z-10">{link.name}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
              <a 
                href="#contact" 
                onClick={(e) => handleNavClick(e, '#contact')}
                className="bg-white text-black px-6 py-2 font-bold font-mono text-sm border-2 border-transparent hover:bg-orange-600 hover:text-white hover:border-orange-500 transition-all shadow-[4px_4px_0px_0px_rgba(234,88,12,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none cursor-pointer"
              >
                START PROJECT
              </a>
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-orange-500">
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-zinc-950 border-b border-zinc-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block px-3 py-4 text-center font-['Archivo_Black'] text-xl hover:bg-zinc-900 hover:text-orange-500"
              >
                {link.name}
              </a>
            ))}
             <a 
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="block w-full mt-4 bg-orange-600 text-white text-center py-4 font-bold font-archivo"
             >
                LET'S COOK
             </a>
          </div>
        </div>
      )}
    </nav>
  );
};