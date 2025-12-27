
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown, Activity, Target, ShieldCheck, Cpu } from 'lucide-react';

export const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
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
      className="relative min-h-[70vh] md:min-h-[90vh] flex flex-col justify-center items-center overflow-hidden bg-zinc-950 pt-[100px] md:pt-[80px]"
    >
      {/* 1. LAYERED BACKGROUND SYSTEM */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Animated Perspective Grid */}
        <div 
          className="absolute inset-0 bg-grid-pattern opacity-10"
          style={{ 
            ...slowParallaxStyle,
            perspective: '1000px',
            transform: `${slowParallaxStyle.transform} rotateX(20deg) scale(1.2)`
          }}
        ></div>

        {/* Dynamic Scanning Laser */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent shadow-[0_0_20px_rgba(234,88,12,0.4)] animate-scan-slow"></div>
        <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-transparent via-orange-500/20 to-transparent animate-scan-x"></div>

        {/* Glowing Orbs */}
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/10 blur-[120px] rounded-full animate-pulse"
          style={parallaxStyle}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-600/5 blur-[100px] rounded-full animate-pulse"
          style={slowParallaxStyle}
        ></div>

        {/* Tech UI Elements (Decorative) */}
        <div className="absolute top-20 right-10 hidden lg:block opacity-20">
          <div className="flex flex-col gap-2 font-mono text-[10px] text-orange-500">
            <div className="flex items-center gap-2">
              <Activity size={12} />
              <span>LATENCY: 0.002ms</span>
            </div>
            <div className="flex items-center gap-2">
              <Target size={12} />
              <span>MARKET_CAPTURE: ACTIVE</span>
            </div>
            <div className="h-px w-24 bg-zinc-800 my-2"></div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={12} />
              <span>PROFIT_LOCK: SECURED</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-40 left-10 hidden lg:block opacity-20">
           <Cpu size={120} className="text-zinc-800 rotate-12" />
           <div className="mt-4 font-mono text-[9px] text-zinc-600 space-y-1">
             <p>CORE_TEMP: OPTIMAL</p>
             <p>THREAD_COUNT: 24_STATIONS</p>
             <p>FS_SYSTEM: DEPLOYED</p>
           </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT CONTAINER */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full flex flex-col items-center text-center pb-12 md:pb-0">
        
        {/* Floating Status Badge */}
        <div className="mb-4 sm:mb-8 flex items-center gap-3 border border-zinc-700 bg-zinc-900/80 backdrop-blur-xl px-5 py-2 rounded-full animate-fade-in-up shadow-2xl">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
          </span>
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-zinc-300 font-bold">
            Protocol: 01_EMPIRE_BUILDING
          </span>
        </div>

        {/* Hero Headline */}
        <div className="mb-4 sm:mb-6 animate-fade-in-up w-full select-none" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <h1 className="font-archivo text-[11vw] md:text-[8vw] lg:text-[10vw] tracking-tighter leading-[0.85] text-white">
            <span className="block relative group">
              <span className="inline-block transition-transform duration-500 group-hover:skew-x-12">TRANSFORMING</span>
            </span>
            <span className="block">
              <span className="relative inline-block">
                <span className="absolute -inset-1 bg-orange-600 -skew-x-12 opacity-10 group-hover:opacity-100 transition-opacity blur-lg"></span>
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-white animate-glitch-text">FLAVORS</span>
              </span>
              <span className="ml-4 opacity-50 text-outline text-[6vw]">INTO</span>
            </span>
            <span className="block italic text-orange-600 transition-all duration-700 hover:tracking-[0.05em]">
              EMPIRES
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className="max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <p className="text-zinc-400 font-mono text-[10px] sm:text-base md:text-lg mb-6 md:mb-10 leading-relaxed px-4 border-l-2 border-orange-600/30">
            WE ARE THE ARCHITECTS OF TASTE AND THE ENGINEERS OF PROFIT. 
            <span className="hidden sm:inline"> INTEGRATING NEUTRAL DESIGN WITH RADICAL OPERATIONAL OPTIMIZATION.</span>
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50 hover:opacity-100 transition-opacity cursor-pointer hidden md:block" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
          <ChevronDown size={24} className="text-orange-500" />
        </div>
      </div>

      {/* 3. SCROLLING MARQUEE (MODERNIZED) */}
      <div className="absolute bottom-0 w-full py-4 bg-white/5 border-y border-zinc-900 backdrop-blur-sm overflow-hidden z-20">
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
        @keyframes scan-slow {
          0% { top: -10%; opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { top: 110%; opacity: 0; }
        }
        @keyframes scan-x {
          0% { left: -10%; opacity: 0; }
          50% { opacity: 0.4; }
          100% { left: 110%; opacity: 0; }
        }
        .animate-scan-slow {
          animation: scan-slow 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .animate-scan-x {
          animation: scan-x 12s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes scroll-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-marquee {
          animation: scroll-marquee 40s linear infinite;
        }
        @keyframes glitch-text {
          0%, 100% { transform: translate(0); }
          33% { transform: translate(-2px, 2px); }
          66% { transform: translate(2px, -2px); }
        }
        .animate-glitch-text:hover {
          animation: glitch-text 0.2s ease infinite;
        }
        .text-outline {
          -webkit-text-stroke: 1px rgba(255,255,255,0.2);
          color: transparent;
        }
      `}</style>
    </section>
  );
};
