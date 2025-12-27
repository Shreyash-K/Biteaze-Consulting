
import React, { useEffect, useRef, useState } from 'react';
import { ChefHat, PenTool, ClipboardCheck, Smartphone } from 'lucide-react';

const steps = [
  { id: 1, title: 'Concept & Branding', desc: 'Logo, Moodboards, Interior Direction.', tech: 'INITIALIZING_CORE_IDENTITY', icon: PenTool },
  { id: 2, title: 'R&D & Menu', desc: 'Recipe creation, tasting sessions, food costing.', tech: 'COMPILING_FLAVOR_PROFILE', icon: ChefHat },
  { id: 3, title: 'Operations Setup', desc: 'Staff hiring, training manuals, supply chain.', tech: 'CONFIGURING_HUMAN_RESOURCES', icon: ClipboardCheck },
  { id: 4, title: 'Digital Launch', desc: 'Website, App, Social Media, Grand Opening.', tech: 'DEPLOYING_TO_MARKET', icon: Smartphone },
];

export const Timeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalHeight = rect.height;
      
      let progress = (viewportHeight / 2 - rect.top) / (totalHeight * 0.8);
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
      
      const step = Math.floor(progress * (steps.length));
      setActiveStep(Math.min(steps.length - 1, step));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-zinc-950 relative overflow-hidden border-t border-zinc-800">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 border border-orange-500/30 bg-orange-500/10 rounded-full">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
            <span className="font-mono text-orange-500 text-xs tracking-widest uppercase">Our Process</span>
          </div>
          <h2 className="font-archivo text-5xl md:text-7xl text-white uppercase tracking-tight">
            Concept. Created. <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Conquered.</span>
          </h2>
          <p className="text-zinc-500 font-mono mt-4 max-w-xl mx-auto">
            Executing the roadmap. From physical foundation to digital dominance.
          </p>
        </div>

        <div className="relative mt-20">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-zinc-800 transform md:-translate-x-1/2"></div>
          
          <div 
            className="absolute left-8 md:left-1/2 top-0 w-1 bg-gradient-to-b from-orange-500 via-orange-600 to-red-600 transform md:-translate-x-1/2 transition-all duration-100 ease-out shadow-[0_0_15px_rgba(234,88,12,0.6)]"
            style={{ height: `${scrollProgress * 100}%` }}
          ></div>

          <div className="space-y-32">
            {steps.map((step, index) => {
              const isActive = index <= activeStep;
              const isCurrent = index === activeStep;
              
              return (
                <div 
                  key={step.id} 
                  className={`relative flex flex-col md:flex-row gap-12 items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className={`flex-1 w-full ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'} pl-20 md:pl-0`}>
                    <div className={`transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-10'}`}>
                        <div className={`inline-block mb-2 font-mono text-[10px] tracking-widest px-2 py-1 border ${isActive ? 'border-orange-500/50 text-orange-400 bg-orange-500/10' : 'border-zinc-800 text-zinc-600'}`}>
                            {isActive ? 'STATUS: ONLINE' : 'STATUS: PENDING'}
                        </div>
                        <h3 className="font-archivo text-3xl md:text-5xl text-white mb-4">{step.title}</h3>
                        <p className="font-mono text-zinc-400 text-sm md:text-base leading-relaxed mb-4">{step.desc}</p>
                        
                        <div className={`font-mono text-xs p-2 bg-black border-l-2 ${isActive ? 'border-orange-500 text-green-500' : 'border-zinc-800 text-zinc-700'} inline-block`}>
                           {`> ${step.tech}...`}
                        </div>
                    </div>
                  </div>

                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10">
                    <div className={`relative w-20 h-20 flex items-center justify-center transition-all duration-500 ${isActive ? 'scale-110' : 'scale-100'}`}>
                      {isCurrent && (
                        <div className="absolute inset-0 border-2 border-dashed border-orange-500 rounded-lg animate-[spin_10s_linear_infinite]"></div>
                      )}
                      <div className={`w-14 h-14 transform rotate-45 border-2 flex items-center justify-center transition-colors duration-300 z-10 shadow-lg
                        ${isActive 
                            ? 'bg-zinc-950 border-orange-500 text-orange-500 shadow-[0_0_20px_rgba(234,88,12,0.3)]' 
                            : 'bg-zinc-900 border-zinc-700 text-zinc-700'}
                      `}>
                        <div className="-rotate-45">
                             <step.icon size={24} />
                        </div>
                      </div>
                      <div className={`absolute top-1/2 w-12 h-0.5 bg-zinc-800 -z-10 hidden md:block 
                        ${index % 2 === 0 ? 'right-full origin-right' : 'left-full origin-left'}
                        ${isActive ? 'bg-orange-500' : ''}
                      `}></div>
                    </div>
                  </div>
                  <div className="flex-1 hidden md:block"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
