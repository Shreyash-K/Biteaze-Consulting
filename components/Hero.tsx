
import React from 'react';
import { ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section 
      className="relative min-h-[75vh] md:min-h-[90vh] flex flex-col justify-center items-center overflow-hidden bg-zinc-950 pt-[100px] md:pt-[120px]"
    >
      {/* BACKGROUND ELEMENTS (AUTO-ANIMATED) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Moving Grid - Continuous Flow 
            Expanded container to cover rotation edges and increased opacity for visibility 
        */}
        <div 
          className="absolute -inset-[100%] bg-grid-pattern opacity-[0.2] animate-grid-flow origin-center will-change-transform"
          style={{ 
            transform: 'perspective(1000px) rotateX(60deg) scale(2)',
            backgroundSize: '80px 80px'
          }}
        ></div>

        {/* Ambient Blobs - Independent Floating 
            Increased opacity and size for distinct visibility
        */}
        <div className="absolute top-[-10%] left-[-10%] w-[700px] h-[700px] bg-orange-600/30 blur-[100px] rounded-full mix-blend-screen animate-blob opacity-80"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-red-600/20 blur-[80px] rounded-full mix-blend-screen animate-blob animation-delay-2000 opacity-80"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-orange-500/10 blur-[120px] rounded-full animate-pulse-slow"></div>
        
        {/* Vignette & Grain Overlay for Texture and Depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(9,9,11,0.95)_80%)]"></div>
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

        {/* Hero Headline with Staggered Reveals & Glitch */}
        <div className="mb-8 md:mb-12 w-full select-none">
          <h1 className="font-archivo text-[10vw] md:text-[8vw] lg:text-[8.5vw] tracking-tight leading-[0.85] text-white">
            <div className="overflow-hidden">
              <span className="block animate-reveal-up" style={{ animationDelay: '0.2s' }}>
                TRANSFORMING
              </span>
            </div>
            
            <div className="overflow-hidden">
              <span className="block animate-reveal-up" style={{ animationDelay: '0.5s' }}>
                <span className="text-orange-500 inline-block hover:scale-105 transition-transform duration-500">FLAVORS</span>
                <span className="ml-2 md:ml-4 opacity-50 text-outline text-[6vw]">INTO</span>
              </span>
            </div>
            
            <div className="overflow-hidden mt-2 relative perspective-text">
              <span className="block italic text-orange-600 animate-reveal-up" style={{ animationDelay: '0.8s' }}>
                 <span className="relative inline-block glitch-container" data-text="EMPIRES">
                    EMPIRES
                 </span>
              </span>
            </div>
          </h1>
        </div>

        {/* Subtitle */}
        <div className="max-w-3xl overflow-hidden">
          <p className="text-zinc-400 font-mono text-[11px] sm:text-base md:text-lg mb-8 md:mb-12 leading-relaxed px-4 animate-reveal-up" style={{ animationDelay: '1.2s' }}>
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
        /* --- Grid Flow Animation --- */
        @keyframes grid-flow {
          0% { background-position: 0 0; }
          100% { background-position: 0 80px; } /* Matches backgroundSize y-value */
        }
        .animate-grid-flow {
          animation: grid-flow 3s linear infinite;
        }

        /* --- Blob Floating Animation --- */
        @keyframes blob-float {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(60px, -100px) scale(1.15); }
          66% { transform: translate(-50px, 50px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob-float 12s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }

        /* --- Slow Pulse --- */
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.4; transform: translate(-50%, -50%) scale(1.1); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s infinite ease-in-out;
        }

        /* --- Glitch Effect for 'EMPIRES' --- */
        .glitch-container {
            position: relative;
        }
        .glitch-container::before,
        .glitch-container::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0.8;
        }
        .glitch-container::before {
            color: #fff;
            z-index: -1;
            clip-path: inset(0 0 0 0);
            animation: glitch-anim-1 4s infinite linear alternate-reverse;
        }
        .glitch-container::after {
            color: #ea580c; /* accent color */
            z-index: -2;
            clip-path: inset(0 0 0 0);
            animation: glitch-anim-2 4s infinite linear alternate-reverse;
        }
        
        @keyframes glitch-anim-1 {
          0% { clip-path: inset(80% 0 0 0); transform: translate(-2px, 2px); }
          5% { clip-path: inset(10% 0 85% 0); transform: translate(2px, -2px); }
          10% { clip-path: inset(40% 0 40% 0); transform: translate(-2px, 0); }
          15% { clip-path: inset(80% 0 5% 0); transform: translate(2px, 2px); }
          20%, 100% { clip-path: inset(100% 0 0 0); transform: translate(0, 0); }
        }
        @keyframes glitch-anim-2 {
          0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -2px); }
          5% { clip-path: inset(80% 0 5% 0); transform: translate(-2px, 2px); }
          10% { clip-path: inset(30% 0 20% 0); transform: translate(2px, 0); }
          15% { clip-path: inset(10% 0 80% 0); transform: translate(-2px, -2px); }
          20%, 100% { clip-path: inset(100% 0 0 0); transform: translate(0, 0); }
        }

        /* --- Standard Reveals (Slowed Down) --- */
        @keyframes reveal-up {
          0% { transform: translateY(110%); }
          100% { transform: translateY(0); }
        }
        .animate-reveal-up {
          animation: reveal-up 2s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes hero-fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-hero-fade-in {
          animation: hero-fade-in 1.5s ease-out forwards;
        }
        @keyframes scale-in {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .scale-in {
          animation: scale-in 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        /* --- Marquee --- */
        @keyframes scroll-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-marquee {
          animation: scroll-marquee 50s linear infinite;
        }

        /* --- Utility --- */
        .text-outline {
          -webkit-text-stroke: 1px rgba(255,255,255,0.2);
          color: transparent;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translate(-50%, 0); }
          50% { transform: translate(-50%, 10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};
