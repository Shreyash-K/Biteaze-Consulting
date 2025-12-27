
import React, { useState, useEffect, useRef } from 'react';
import { 
  Utensils, Users, FileSpreadsheet, 
  TrendingUp, Smartphone, 
  Briefcase, RefreshCw, Camera, Share2, Monitor, FileText,
  ScanLine, ArrowUpRight, Layers
} from 'lucide-react';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  { id: 'rebrand', title: 'RE-BRANDING', description: 'Modernizing identity aesthetics.', icon: RefreshCw, category: 'Creative', tags: ['Refresh', 'Identity'] },
  { id: 'recipe', title: 'RECIPE DEVELOPMENT', description: 'Signature dish creation & balance.', icon: Utensils, category: 'Foundation', tags: ['R&D', 'Menu'] },
  { id: 'staff', title: 'STAFF HIRING AND TRAINING', description: 'Recruitment & training modules.', icon: Users, category: 'Foundation', tags: ['HR', 'Training'] },
  { id: 'cost', title: 'PRECISE FOOD COSTING', description: 'Margin control & yield sheets.', icon: FileSpreadsheet, category: 'Foundation', tags: ['Finance', 'Audit'] },
  { id: 'docs', title: 'THOROUGH BACKEND DOCUMENTATION', description: 'SOPs & legal frameworks.', icon: FileText, category: 'Foundation', tags: ['Systems', 'Legal'] },
  { id: 'online', title: 'ONLINE ORDER STRATEGY SUPPORT', description: 'Zomato/Swiggy growth hacking.', icon: Smartphone, category: 'Growth', tags: ['Sales', 'Delivery'] },
  { id: 'ops', title: 'OVERALL OPERATIONAL MANAGEMENT', description: 'Day-to-day oversight & audits.', icon: Briefcase, category: 'Engine', tags: ['Mgmt', 'SOPs'] },
  { id: 'social', title: 'SOCIAL MEDIA HANDLING', description: 'Community growth & handling.', icon: Share2, category: 'Creative', tags: ['Growth', 'Community'] },
  { id: 'content', title: 'DIGITAL CONTENT CREATION (BOTH AGC & UGC)', description: 'High-end AGC & UGC assets.', icon: Camera, category: 'Creative', tags: ['Video', 'Photo'] },
  { id: 'web', title: 'WEBSITE AND APP DEVELOPMENT', description: 'Custom ordering platforms.', icon: Monitor, category: 'Growth', tags: ['Tech', 'UX/UI'] },
];

const CATEGORY_COLORS: Record<string, string> = {
  'Creative': 'text-purple-400 border-purple-500/30 bg-purple-500/10',
  'Foundation': 'text-orange-400 border-orange-500/30 bg-orange-500/10',
  'Growth': 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  'Engine': 'text-blue-400 border-blue-500/30 bg-blue-500/10',
};

export const ServicesBento: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const sectionRef = useRef<HTMLElement>(null);
  const totalItems = services.length + 2;

  useEffect(() => {
    let loopTimer: number;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const startLoop = () => {
            loopTimer = window.setInterval(() => {
              setActiveIndex((prev) => (prev + 1) % totalItems);
            }, 2000);
          };
          startLoop();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      if (loopTimer) clearInterval(loopTimer);
    };
  }, [totalItems]);

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className="py-24 bg-zinc-950 relative border-t border-zinc-800 overflow-hidden"
    >
      
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative">
            <div className="absolute -left-10 -top-10 w-40 h-40 bg-orange-600/5 blur-3xl rounded-full pointer-events-none"></div>
            
            <div>
                <h3 className="font-archivo text-5xl md:text-7xl text-white uppercase leading-none">
                    Service <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-white">Platter</span>
                </h3>
            </div>
            <div className="text-left md:text-right max-w-sm">
                <p className="text-zinc-500 font-mono text-xs md:text-sm leading-relaxed border-l-2 border-orange-500 pl-4 md:border-l-0 md:border-r-2 md:pl-0 md:pr-4">
                    /// Integrated hospitality modules designed for rapid market penetration and long-term profitability.
                </p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 grid-rows-auto gap-4">
          
          {/* MAIN CARD: COMPLETE BRAND DEVELOPMENT */}
          {(() => {
            const isActive = activeIndex === 0;
            return (
              <div className={`col-span-1 md:col-span-2 row-span-2 bg-zinc-950 border-2 border-zinc-800 relative group overflow-hidden flex flex-col justify-between transition-all duration-500 ${isActive ? 'border-white z-20' : ''}`}>
                
                {/* White Fill Transition */}
                <div className={`absolute inset-0 bg-white transition-transform duration-700 cubic-bezier(0.85, 0, 0.15, 1) z-0 ${isActive ? 'translate-y-0' : 'translate-y-full'}`}></div>

                {/* Top Bar */}
                <div className="relative z-10 p-6 flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 transition-all duration-300 flex items-center justify-center ${isActive ? 'bg-zinc-950 text-white' : 'bg-orange-600 text-black'}`}>
                            <Layers size={28} />
                        </div>
                        <div>
                            <h4 className={`font-archivo text-3xl md:text-4xl transition-colors leading-none uppercase tracking-tight ${isActive ? 'text-black' : 'text-white'}`}>
                                COMPLETE BRAND<br/>DEVELOPMENT
                            </h4>
                        </div>
                    </div>
                </div>

                {/* Middle Content */}
                <div className="relative z-10 px-8 py-4 flex-grow">
                     <p className={`font-mono text-sm leading-relaxed max-w-lg transition-all duration-500 ${isActive ? 'text-zinc-700' : 'text-zinc-400'}`}>
                        <span className={`font-bold transition-colors ${isActive ? 'text-black' : 'text-orange-600'}`}>///</span> The complete incubation protocol. We build the soul, the visuals, and the experience from a blank slate. Full system integration from core concept to market entry.
                     </p>
                     
                     <div className="mt-8 flex flex-wrap gap-3">
                        {['CONCEPT', 'IDENTITY', 'EXECUTION'].map((tag) => (
                            <div key={tag} className={`flex items-center gap-2 px-3 py-1.5 border text-[11px] font-mono uppercase transition-all duration-300 ${isActive ? 'border-zinc-300 text-black bg-zinc-100/50' : 'border-zinc-800 text-zinc-500 bg-zinc-900/50'}`}>
                                <span className={`w-1.5 h-1.5 ${isActive ? 'bg-black' : 'bg-orange-500'}`}></span>
                                {tag}
                            </div>
                        ))}
                     </div>
                </div>

                {/* Bottom Footer Area */}
                <div className={`relative z-10 mt-auto border-t p-6 transition-colors ${isActive ? 'bg-zinc-50 border-zinc-200' : 'border-zinc-800 bg-zinc-900/80'}`}>
                    <div className="flex justify-between items-center">
                        <span className={`font-mono text-[11px] uppercase tracking-widest ${isActive ? 'text-black font-bold' : 'text-zinc-500'}`}>Ready for deployment</span>
                        <ScanLine size={18} className={isActive ? 'text-black' : 'text-orange-600'} />
                    </div>
                </div>
              </div>
            );
          })()}

          {/* STANDARD SERVICE CARDS */}
          {services.map((service, idx) => {
             const stationColor = CATEGORY_COLORS[service.category];
             const isActive = idx + 1 === activeIndex;
             
             return (
                <div 
                    key={service.id} 
                    className={`neo-card bg-zinc-900 border border-zinc-800 p-5 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${isActive ? 'translate-y-[-4px] border-zinc-500 z-10 shadow-lg' : ''}`}
                >
                    <div className={`absolute inset-0 bg-white transition-transform duration-500 ease-in-out z-0 ${isActive ? 'translate-y-0' : 'translate-y-full'}`}></div>

                    <div className="relative z-10 flex justify-between items-start mb-4">
                        <div className={`p-2 rounded-sm border transition-colors ${isActive ? 'bg-black text-white border-black' : stationColor}`}>
                            <service.icon size={20} />
                        </div>
                    </div>
                    
                    <div className="relative z-10">
                        <h4 className={`font-archivo text-lg mb-2 transition-colors leading-tight uppercase ${isActive ? 'text-black' : 'text-white'}`}>
                            {service.title}
                        </h4>
                        <p className={`text-xs font-mono leading-relaxed transition-all duration-500 line-clamp-2 ${isActive ? 'text-zinc-600' : 'text-zinc-500'}`}>
                            {service.description}
                        </p>
                    </div>

                    <div className={`relative z-10 mt-4 pt-4 border-t border-dashed transition-colors flex justify-between items-center ${isActive ? 'border-black/20' : 'border-zinc-800'}`}>
                        <span className={`font-mono text-[9px] uppercase px-1.5 py-0.5 border transition-all ${isActive ? 'border-black text-black bg-transparent' : stationColor}`}>
                            {service.category}
                        </span>
                        <ArrowUpRight size={14} className={isActive ? 'text-black' : 'text-zinc-600'} />
                    </div>
                </div>
             );
          })}

          {/* PROFIT CARD: P&L MANAGEMENT */}
          {(() => {
            const isActive = activeIndex === totalItems - 1;
            return (
              <div className={`col-span-1 md:col-span-2 bg-zinc-900 border border-zinc-800 p-0 relative overflow-hidden flex flex-col transition-all duration-300 ${isActive ? 'translate-y-[-4px] border-zinc-500 z-10 shadow-lg' : ''}`}>
                 <div className={`absolute inset-0 bg-white transition-transform duration-500 ease-in-out z-0 ${isActive ? 'translate-y-0' : 'translate-y-full'}`}></div>

                 <div className="p-6 relative z-10 flex flex-col h-full justify-between">
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className={`font-archivo text-2xl transition-colors uppercase ${isActive ? 'text-orange-500' : 'text-white'}`}>P&L MANAGEMENT</h4>
                            <p className={`mt-2 text-xs font-mono transition-all duration-500 ${isActive ? 'text-zinc-700' : 'text-zinc-500'}`}>
                              Data-driven margin control and profitability recovery strategies.
                            </p>
                        </div>
                        <div className={`p-2 rounded-full transition-colors ${isActive ? 'bg-orange-500 text-white' : 'bg-zinc-800 text-zinc-300'}`}>
                            <TrendingUp size={20} />
                        </div>
                    </div>

                    <div className="flex gap-8 mt-6">
                        <div>
                            <span className="block font-mono text-[10px] text-zinc-500 uppercase">Leakage</span>
                            <span className={`font-archivo text-xl transition-colors ${isActive ? 'text-black font-bold' : 'text-white'}`}>-0%</span>
                        </div>
                        <div>
                            <span className="block font-mono text-[10px] text-zinc-500 uppercase">Recovery</span>
                            <span className={`font-archivo text-xl transition-colors ${isActive ? 'text-emerald-600 font-bold' : 'text-green-500'}`}>+18%</span>
                        </div>
                    </div>
                 </div>
              </div>
            );
          })()}

        </div>
      </div>
    </section>
  );
};
