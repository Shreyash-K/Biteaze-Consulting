
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
    transform: `translate3d(${mousePos.x * 30}px, ${mousePos.y * 30}px, 0)`,
    transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
  };

  const slowParallaxStyle = {
    transform: `translate3d(${mousePos.x * -15}px, ${mousePos.y * -15}px, 0)`,
    transition: 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
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
            transform: `${slowParallaxStyle.transform} rotateX(15deg) scale(1.15)`
          }}
        ></div>

        <div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-600/10 blur-[150px] rounded-full animate-pulse"
          style={parallaxStyle}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-red-600/5 blur-[120px] rounded-full animate-pulse"
          style={slowParallaxStyle}
        ></div>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center pb-24 md:pb-32">
        
        {/* Floating Status Badge */}
        <div className="mb-8 sm:mb-12 flex items-center gap-3 border border-zinc-700 bg-zinc-900/80 backdrop-blur-xl px-5 py-2 rounded-full animate-hero-fade-in shadow-2xl scale-in">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
          </span>
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-zinc-300 font-bold">
            ACCEPTING NEW PROJECTS
          </span>
        </div>

        {/* Hero Headline with Staggered Reveals */}
        <div className="mb-8 md:mb-12 w-full select-none">
          <h1 className="font-archivo text-[10vw] md:text-[8vw] lg:text-[8.5vw] tracking-tight leading-[0.85] text-white">
            <div className="overflow-hidden">
              <span className="block animate-reveal-up" style={{ animationDelay: '0.1s' }}>
                TRANSFORMING
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="block animate-reveal-up" style={{ animationDelay: '0.3s' }}>
                <span className="text-orange-500">FLAVORS</span>
                <span className="ml-2 md:ml-4 opacity-50 text-outline text-[6vw]">INTO</span>
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="block italic text-orange-600 animate-reveal-up" style={{ animationDelay: '0.5s' }}>
                EMPIRES
              </span>
            </div>
          </h1>
        </div>

        {/* Subtitle */}
        <div className="max-w-3xl overflow-hidden">
          <p className="text-zinc-400 font-mono text-[11px] sm:text-base md:text-lg mb-8 md:mb-12 leading-relaxed px-4 animate-reveal-up" style={{ animationDelay: '0.7s' }}>
            WE ARE THE ARCHITECTS OF TASTE AND THE ENGINEERS OF PROFIT. 
            <span className="hidden sm:inline"> INTEGRATING NEUTRAL DESIGN WITH RADICAL OPERATIONAL OPTIMIZATION.</span>
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 animate-bounce-slow opacity-40 cursor-pointer hidden md:block" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
          <ChevronDown size={28} className="text-orange-500" />
        </div>
      </div>

      {/* SCROLLING MARQUEE */}
      <div className="absolute bottom-0 w-full py-5 bg-zinc-950/80 border-y border-zinc-800 backdrop-blur-md overflow-hidden z-20">
        <div className="flex whitespace-nowrap animate-scroll-marquee">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="flex items-center px-12">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.3em] flex items-center gap-6">
                <span className="w-1.5 h-1.5 bg-orange-600 rotate-45"></span>
                MENU_ENGINEERING
                <span className="w-1.5 h-1.5 bg-zinc-800"></span>
                P&L_RECOVERY
                <span className="w-1.5 h-1.5 bg-orange-600 rotate-45"></span>
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
        @keyframes reveal-up {
          0% { transform: translateY(110%); }
          100% { transform: translateY(0); }
        }
        @keyframes hero-fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translate(-50%, 0); }
          50% { transform: translate(-50%, 10px); }
        }
        
        .animate-scroll-marquee {
          animation: scroll-marquee 50s linear infinite;
        }
        .animate-reveal-up {
          animation: reveal-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .animate-hero-fade-in {
          animation: hero-fade-in 1s ease-out forwards;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .scale-in {
          animation: scale-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .text-outline {
          -webkit-text-stroke: 1px rgba(255,255,255,0.2);
          color: transparent;
        }
      `}</style>
    </section>
  );
};
