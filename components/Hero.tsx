
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const parallaxStyle = {
    transform: `translate3d(${mousePos.x * 20}px, ${mousePos.y * 20}px, 0)`,
    transition: 'transform 0.2s ease-out'
  };

  const slowParallaxStyle = {
    transform: `translate3d(${mousePos.x * -10}px, ${mousePos.y * -10}px, 0)`,
    transition: 'transform 0.4s ease-out'
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[75vh] md:min-h-[90vh] flex flex-col justify-center items-center overflow-hidden bg-zinc-950 pt-[100px] md:pt-[120px]"
    >
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute inset-0 bg-grid-pattern opacity-10"
          style={{ 
            ...slowParallaxStyle,
            perspective: '1000px',
            transform: `${slowParallaxStyle.transform} rotateX(20deg) scale(1.2)`
          }}
        ></div>

        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/5 blur-[120px] rounded-full animate-pulse"
          style={parallaxStyle}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-600/5 blur-[100px] rounded-full animate-pulse"
          style={slowParallaxStyle}
        ></div>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center pb-24 md:pb-32">
        
        {/* Floating Status Badge */}
        <div className="mb-6 sm:mb-10 flex items-center gap-3 border border-zinc-700 bg-zinc-900/80 backdrop-blur-xl px-5 py-2 rounded-full animate-fade-in-up shadow-2xl">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
          </span>
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-zinc-300 font-bold">
            ACCEPTING NEW PROJECTS
          </span>
        </div>

        {/* Hero Headline */}
        <div className="mb-6 md:mb-10 animate-fade-in-up w-full select-none">
          <h1 className="font-archivo text-[10vw] md:text-[8vw] lg:text-[8.5vw] tracking-tight leading-[0.85] text-white">
            <span className="block mb-1 md:mb-2">TRANSFORMING</span>
            <span className="block">
              <span className="text-orange-500">FLAVORS</span>
              <span className="ml-2 md:ml-4 opacity-50 text-outline text-[6vw]">INTO</span>
            </span>
            <span className="block italic text-orange-600">
              EMPIRES
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className="max-w-3xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <p className="text-zinc-400 font-mono text-[11px] sm:text-base md:text-lg mb-6 md:mb-10 leading-relaxed px-4">
            WE ARE THE ARCHITECTS OF TASTE AND THE ENGINEERS OF PROFIT. 
            <span className="hidden sm:inline"> INTEGRATING NEUTRAL DESIGN WITH RADICAL OPERATIONAL OPTIMIZATION.</span>
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 animate-bounce opacity-40 cursor-pointer hidden md:block" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
          <ChevronDown size={28} className="text-orange-500" />
        </div>
      </div>

      {/* SCROLLING MARQUEE */}
      <div className="absolute bottom-0 w-full py-5 bg-zinc-950/80 border-y border-zinc-800 backdrop-blur-md overflow-hidden z-20">
        <div className="flex whitespace-nowrap animate-scroll-marquee">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="flex items-center px-8">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest flex items-center gap-4">
                <span className="w-1.5 h-1.5 bg-orange-600"></span>
                MENU_ENGINEERING
                <span className="w-1.5 h-1.5 bg-orange-600"></span>
                P&L_RECOVERY
                <span className="w-1.5 h-1.5 bg-orange-600"></span>
                BRAND_INCUBATION
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes scroll-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-marquee {
          animation: scroll-marquee 40s linear infinite;
        }
        .text-outline {
          -webkit-text-stroke: 1px rgba(255,255,255,0.2);
          color: transparent;
        }
      `}</style>
    </section>
  );
};
