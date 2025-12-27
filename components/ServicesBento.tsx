import React, { useState, useEffect, useRef } from 'react';
import { 
  Palette, Utensils, Users, FileSpreadsheet, 
  TrendingUp, Smartphone, 
  Briefcase, RefreshCw, Camera, Share2, Monitor, FileText,
  Barcode, ScanLine, Activity, ArrowUpRight, Hash, Layers
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

const TERMINAL_LOGS = [
    "> INITIALIZING CREATIVE SUITE...",
    "> LOADING ASSET LIBRARIES...",
    "> COMPILING BRAND GUIDELINES...",
    "> RENDERING INTERIOR CONCEPTS...",
    "> FINALIZING MOODBOARDS...",
    "> SYSTEM READY."
];

export const ServicesBento: React.FC = () => {
  const [logIndex, setLogIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);
  const sectionRef = useRef<HTMLElement>(null);
  const totalItems = services.length + 2; // Brand Card + 10 Services + ROI Card

  useEffect(() => {
    const interval = setInterval(() => {
      setLogIndex((prev) => (prev + 1) % TERMINAL_LOGS.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let loopTimer: number;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const startLoop = () => {
            loopTimer = window.setInterval(() => {
              setActiveIndex((prev) => (prev + 1) % totalItems);
            }, 1200); // Duration each box stays "filled"
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
            <div className="absolute -left-10 -top-10 w-40 h-40 bg-orange-600/10 blur-3xl rounded-full pointer-events-none"></div>
            
            <div>
                <div className="inline-flex items-center gap-2 px-2 py-1 border border-zinc-800 bg-zinc-900/50 mb-4">
                    <ScanLine size={14} className="text-orange-500" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">Expertise Ecosystem_v2.5</span>
                </div>
                <h3 className="font-archivo text-5xl md:text-7xl text-white uppercase leading-none">
                    Our Service <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-white">Platter</span>
                </h3>
            </div>
            <div className="text-left md:text-right max-w-sm">
                <p className="text-zinc-500 font-mono text-xs md:text-sm leading-relaxed border-l-2 border-orange-500 pl-4 md:border-l-0 md:border-r-2 md:pl-0 md:pr-4">
                    /// Sequential deployment active. Highlighting operational modules in 1.2s cycles.
                </p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 grid-rows-auto gap-4">
          
          {/* MAIN CARD: COMPLETE BRAND DEVELOPMENT - index 0 */}
          {(() => {
            const isActive = activeIndex === 0;
            return (
              <div className={`col-span-1 md:col-span-2 row-span-2 bg-zinc-950 border-2 border-zinc-800 relative group overflow-hidden flex flex-col justify-between transition-all duration-500 ${isActive ? 'scale-[1.01] border-white z-20 shadow-[0_0_30px_rgba(255,255,255,0.1)]' : ''}`}>
                
                {/* Holographic Schematic Background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(24,24,27,1)_1px,transparent_1px),linear-gradient(90deg,rgba(24,24,27,1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none z-0"></div>
                
                {/* Corner Brackets */}
                <div className={`absolute top-2 left-2 w-4 h-4 border-t border-l transition-colors ${isActive ? 'border-black' : 'border-zinc-700'}`}></div>
                <div className={`absolute top-2 right-2 w-4 h-4 border-t border-r transition-colors ${isActive ? 'border-black' : 'border-zinc-700'}`}></div>
                <div className={`absolute bottom-2 left-2 w-4 h-4 border-b border-l transition-colors ${isActive ? 'border-black' : 'border-zinc-700'}`}></div>
                <div className={`absolute bottom-2 right-2 w-4 h-4 border-b border-r transition-colors ${isActive ? 'border-black' : 'border-zinc-700'}`}></div>

                {/* White Fill Transition */}
                <div className={`absolute inset-0 bg-white transition-transform duration-500 cubic-bezier(0.85, 0, 0.15, 1) z-0 ${isActive ? 'translate-y-0' : 'translate-y-full'}`}></div>

                {/* Vertical Scanning Line */}
                <div className="absolute top-0 left-0 w-full h-0.5 bg-orange-500/20 shadow-[0_0_10px_rgba(234,88,12,0.5)] animate-[scan_3s_linear_infinite] z-10 pointer-events-none"></div>

                {/* Top Bar */}
                <div className="relative z-10 p-6 flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className={`w-14 h-14 transition-all duration-300 shadow-xl flex items-center justify-center ${isActive ? 'bg-zinc-950 text-white' : 'bg-orange-600 text-black'}`}>
                                <Layers size={28} strokeWidth={2} />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                               <span className={`font-mono text-[9px] transition-colors uppercase tracking-[0.2em] font-bold ${isActive ? 'text-zinc-500' : 'text-orange-500'}`}>[ SYSTEM_LOADED ]</span>
                            </div>
                            <h4 className={`font-archivo text-3xl md:text-4xl transition-colors leading-none uppercase tracking-tight ${isActive ? 'text-black' : 'text-white'}`}>
                                COMPLETE BRAND<br/>DEVELOPMENT
                            </h4>
                        </div>
                    </div>
                    <div className="hidden md:block text-right">
                        <div className={`flex items-center gap-2 justify-end mb-1 transition-colors ${isActive ? 'text-black' : 'text-orange-500'}`}>
                            <span className={`w-2 h-2 rounded-full animate-pulse transition-colors ${isActive ? 'bg-black' : 'bg-orange-500'}`}></span>
                            <span className="font-mono text-[10px] tracking-widest uppercase font-bold">Priority One</span>
                        </div>
                        <div className={`font-mono text-[10px] uppercase transition-colors ${isActive ? 'text-zinc-400' : 'text-zinc-600'}`}>DEPLOY_ID: #B_DEV_001</div>
                    </div>
                </div>

                {/* Middle Content */}
                <div className="relative z-10 px-8 py-4 flex-grow">
                     <p className={`font-mono text-sm leading-relaxed max-w-lg transition-all duration-500 transform translate-y-0 ${isActive ? 'text-zinc-700' : 'text-zinc-400'}`}>
                        <span className={`font-bold transition-colors ${isActive ? 'text-black' : 'text-orange-600'}`}>///</span> The complete incubation protocol. We build the soul, the visuals, and the experience from a blank slate. Full system integration from core values to market entry.
                     </p>
                     
                     <div className="mt-8 flex flex-wrap gap-3">
                        {['CONCEPT', 'IDENTITY', 'EXECUTION'].map((tag) => (
                            <div key={tag} className={`flex items-center gap-2 px-3 py-1.5 border text-[11px] font-mono uppercase transition-all duration-300 ${isActive ? 'border-zinc-300 text-black bg-zinc-100/50' : 'border-zinc-800 text-zinc-500 bg-zinc-900/50'}`}>
                                <span className={`w-1.5 h-1.5 transition-colors ${isActive ? 'bg-black' : 'bg-orange-500'}`}></span>
                                {tag}
                            </div>
                        ))}
                     </div>
                </div>

                {/* Bottom Terminal / Dashboard */}
                <div className={`relative z-10 mt-auto border-t p-5 backdrop-blur-md transition-colors overflow-hidden ${isActive ? 'bg-zinc-50 border-zinc-200' : 'border-zinc-800 bg-zinc-900/80'}`}>
                    <div className="flex justify-between items-end gap-6">
                        <div className={`font-mono text-[11px] h-16 flex-grow flex flex-col justify-end transition-colors ${isActive ? 'text-zinc-500' : 'text-green-500'}`}>
                            <div className="opacity-40">{TERMINAL_LOGS[(logIndex + TERMINAL_LOGS.length - 2) % TERMINAL_LOGS.length]}</div>
                            <div className="opacity-70">{TERMINAL_LOGS[(logIndex + TERMINAL_LOGS.length - 1) % TERMINAL_LOGS.length]}</div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold">{'>'}</span>
                                <span className={`typing-effect ${isActive ? 'text-black font-bold' : 'text-white'}`}>{TERMINAL_LOGS[logIndex]}</span>
                                <span className={`w-2 h-4 animate-pulse ${isActive ? 'bg-orange-500' : 'bg-green-500'}`}></span>
                            </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-3 min-w-[120px]">
                            <div className="flex items-end gap-[2px] h-6">
                                {[0.2, 0.5, 0.8, 0.4, 0.9, 0.3, 0.7, 0.5].map((h, i) => (
                                    <div 
                                        key={i} 
                                        className={`w-1 animate-subtle-pulse transition-colors ${isActive ? 'bg-black/20' : 'bg-orange-600/40'}`} 
                                        style={{height: `${h * 100}%`, animationDelay: `${i * 0.1}s`}}
                                    ></div>
                                ))}
                            </div>
                            <div className={`font-mono text-[9px] ${isActive ? 'text-zinc-400' : 'text-zinc-600'}`}>STATUS: ACTIVE_LOOP</div>
                            <Barcode size={32} className={`transition-colors ${isActive ? 'text-zinc-300' : 'text-zinc-800'}`} />
                        </div>
                    </div>
                </div>
              </div>
            );
          })()}

          {/* STANDARD SERVICE CARDS - indices 1 to services.length */}
          {services.map((service, idx) => {
             const stationColor = CATEGORY_COLORS[service.category];
             const myIndex = idx + 1; 
             const isActive = activeIndex === myIndex;
             
             return (
                <div 
                    key={service.id} 
                    className={`neo-card bg-zinc-900 border border-zinc-800 p-5 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${isActive ? 'translate-y-[-4px] border-zinc-500 z-10 shadow-lg' : ''}`}
                >
                    {/* Background White Fill */}
                    <div className={`absolute inset-0 bg-white transition-transform duration-500 ease-in-out z-0 ${isActive ? 'translate-y-0' : 'translate-y-full'}`}></div>

                    {/* Header */}
                    <div className="relative z-10 flex justify-between items-start mb-4">
                        <div className={`p-2 rounded-sm border transition-colors ${isActive ? 'bg-black text-white border-black' : stationColor}`}>
                            <service.icon size={20} />
                        </div>
                        <span className={`font-mono text-[9px] uppercase tracking-widest transition-colors ${isActive ? 'text-black/50' : 'text-zinc-600'}`}>
                            {idx < 9 ? `0${idx + 1}` : idx + 1}
                        </span>
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                        <h4 className={`font-archivo text-lg mb-2 transition-colors leading-tight uppercase ${isActive ? 'text-black' : 'text-white'}`}>
                            {service.title}
                        </h4>
                        <p className={`text-xs font-mono leading-relaxed transition-all duration-500 line-clamp-2 ${isActive ? 'text-zinc-600' : 'text-zinc-500'}`}>
                            {service.description}
                        </p>
                    </div>

                    {/* Footer / Tags */}
                    <div className={`relative z-10 mt-4 pt-4 border-t border-dashed transition-colors flex justify-between items-center ${isActive ? 'border-black/20' : 'border-zinc-800'}`}>
                        <span className={`font-mono text-[9px] uppercase px-1.5 py-0.5 border transition-all ${isActive ? 'border-black text-black bg-transparent' : stationColor}`}>
                            {service.category}
                        </span>
                        <ArrowUpRight size={14} className={`transition-all ${isActive ? 'text-black opacity-100 translate-x-0' : 'text-zinc-600 opacity-100'}`} />
                    </div>

                    <div className={`absolute bottom-0 left-0 w-full h-1 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSI0Ij48cGF0aCBkPSJNMCAwaDVINXY0SDVWMHoiIGZpbGw9InRyYW5zcGFyZW50Ii8+PHBhdGggZD0iTTAgNGg1TDIDI.1g1IDJ6IiBmaWxsPSIjMTgxODFiIi8+PC9zdmc+')] bg-repeat-x transition-opacity z-20 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>
                </div>
             );
          })}

          {/* PROFIT CARD: ANALYTICS DASHBOARD - index totalItems - 1 */}
          {(() => {
            const myIndex = totalItems - 1;
            const isActive = activeIndex === myIndex;
            return (
              <div className={`col-span-1 md:col-span-2 bg-zinc-900 border border-zinc-800 p-0 relative overflow-hidden flex flex-col transition-all duration-300 ${isActive ? 'translate-y-[-4px] border-zinc-500 z-10 shadow-lg' : ''}`}>
                 <div className={`absolute inset-0 bg-white transition-transform duration-500 ease-in-out z-0 ${isActive ? 'translate-y-0' : 'translate-y-full'}`}></div>

                 <div className="p-6 relative z-10 flex flex-col h-full justify-between">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                 <div className={`w-2 h-2 rounded-full transition-colors ${isActive ? 'bg-black animate-none' : 'bg-green-500 animate-pulse'}`}></div>
                                 <span className={`font-mono text-[10px] uppercase tracking-widest transition-colors ${isActive ? 'text-black' : 'text-green-500'}`}>System Optimization</span>
                            </div>
                            <h4 className={`font-archivo text-2xl transition-colors uppercase ${isActive ? 'text-orange-500' : 'text-white'}`}>P&L MANAGEMENT</h4>
                            <p className={`mt-2 text-xs font-mono transition-all duration-500 ${isActive ? 'text-zinc-700' : 'text-zinc-500'}`}>
                              Data-driven margin control and profitability recovery strategies.
                            </p>
                        </div>
                        <div className={`p-2 rounded-full transition-colors ${isActive ? 'bg-orange-500 text-white shadow-md' : 'bg-zinc-800 text-zinc-300'}`}>
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

                 <div className={`absolute bottom-0 left-0 right-0 h-24 flex items-end gap-1 px-6 pb-0 transition-opacity ${isActive ? 'opacity-30' : 'opacity-50'}`}>
                    {[40, 65, 45, 70, 50, 80, 60, 90, 75, 100].map((height, i) => (
                        <div 
                            key={i}
                            className={`flex-1 transition-colors duration-500 ease-out relative overflow-hidden ${isActive ? 'bg-orange-600' : 'bg-zinc-800'}`}
                            style={{ height: `${height}%` }}
                        >
                            <div 
                                className="absolute top-0 left-0 w-full h-full bg-white/20 animate-[scan_2s_linear_infinite]" 
                                style={{ animationDelay: `${i * 0.1}s` }}
                            ></div>
                        </div>
                    ))}
                 </div>
              </div>
            );
          })()}

        </div>
      </div>
      
      <style>{`
        @keyframes scan {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
};