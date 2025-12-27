
import React, { useState, useEffect, useRef } from 'react';
import { PortfolioItem } from '../types';
import { supabase, isSupabaseConfigured } from '../utils/supabaseClient';

const COLORS = [
  'bg-red-900/40',
  'bg-orange-900/40',
  'bg-amber-900/40',
  'bg-yellow-900/40',
  'bg-lime-900/40',
  'bg-emerald-900/40',
  'bg-teal-900/40',
  'bg-cyan-900/40',
  'bg-sky-900/40',
  'bg-blue-900/40',
  'bg-indigo-900/40',
  'bg-violet-900/40',
  'bg-purple-900/40',
  'bg-fuchsia-900/40',
  'bg-pink-900/40',
  'bg-rose-900/40'
];

export const Portfolio: React.FC = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Fetch Portfolio Data
  useEffect(() => {
    const fetchPortfolio = async () => {
      setIsLoading(true);
      if (!isSupabaseConfigured) {
        console.warn('Supabase is not configured. Portfolio data will not be fetched.');
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Portfolio Fetch Error:', error.message);
        setIsLoading(false);
        return;
      }

      if (data) {
        const mappedItems: PortfolioItem[] = data.map((item: any, index: number) => ({
          id: item.id,
          name: item.name,
          image: item.image,
          category: item.category || '', 
          color: COLORS[index % COLORS.length]
        }));
        setItems(mappedItems);
      }
      setIsLoading(false);
    };
    fetchPortfolio();
  }, []);

  // Intersection Observer to start animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Sequential Animation Loop
  useEffect(() => {
    if (!isVisible || items.length === 0) return;

    // Set initial index
    setActiveIndex(0);

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 1500); // Updated to 1.5 seconds as requested

    return () => clearInterval(interval);
  }, [isVisible, items.length]);

  const activeColor = activeIndex !== -1 && items[activeIndex] ? items[activeIndex].color : 'bg-zinc-950';

  return (
    <section 
      id="portfolio" 
      ref={sectionRef}
      className={`py-24 px-4 transition-colors duration-1000 ease-in-out ${activeColor} relative border-t border-zinc-800 min-h-[600px] overflow-hidden`}
    >
      {/* Scanning Line UI Detail */}
      <div className="absolute top-0 left-0 w-full h-1 bg-white/5 animate-pulse pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-white/10 pb-8">
          <div className="text-left">
            <div className="flex items-center gap-2 mb-4">
               <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
               <h2 className="text-white/60 font-mono text-xs uppercase tracking-[0.3em]">Operational Success_v4.0</h2>
            </div>
            <h3 className="font-archivo text-5xl md:text-7xl text-white uppercase leading-none">
                PROVEN <br/><span className="text-transparent text-outline-white">RECORDS</span>
            </h3>
          </div>
          <div className="text-left md:text-right mt-6 md:mt-0">
            <p className="font-mono text-white/50 text-xs uppercase tracking-widest leading-loose">
              Autoscroll sequence <br/> active: module {activeIndex + 1}/{items.length}
            </p>
          </div>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 gap-0">
            {items.map((item, index) => {
              const isActive = index === activeIndex;
              
              return (
                <div 
                  key={item.id}
                  className={`relative py-14 transition-all duration-700 ease-in-out border-b ${isActive ? 'border-white border-b-2' : 'border-white/10'}`}
                >
                  <div className="flex flex-col md:flex-row items-center justify-center z-10 relative w-full">
                    {/* Number & Category */}
                    <div className={`md:absolute md:left-0 mb-4 md:mb-0 transition-all duration-500 ${isActive ? 'translate-x-4 opacity-100' : 'opacity-40'}`}>
                        <span className="font-mono text-xs text-white uppercase tracking-widest">
                            {index + 1 < 10 ? `0${index + 1}` : index + 1} {item.category ? `— ${item.category}` : ''}
                        </span>
                    </div>
                    
                    {/* Brand Name */}
                    <h4 className={`font-archivo text-4xl md:text-6xl text-white text-center transition-all duration-700 uppercase tracking-tighter ${isActive ? 'scale-110 tracking-normal drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'scale-100 opacity-60'}`}>
                      {item.name}
                    </h4>

                    {/* Active Status Indicator */}
                    <div className={`md:absolute md:right-0 mt-4 md:mt-0 font-mono text-[10px] uppercase transition-all duration-500 ${isActive ? 'opacity-100 translate-x-[-10px]' : 'opacity-0 translate-x-10'}`}>
                        <span className="px-2 py-1 bg-white text-black font-bold">Deployed_ID: #{item.id.substring(0,4)}</span>
                    </div>
                  </div>

                  {/* Sequential Image Reveal */}
                  <div 
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[200px] md:w-[450px] md:h-[350px] pointer-events-none transition-all duration-1000 ease-out z-0 flex items-center justify-center ${isActive ? 'opacity-100 scale-100 rotate-2' : 'opacity-0 scale-90 rotate-0'}`}
                  >
                    <div className="relative w-full h-full flex items-center justify-center">
                        {/* Decorative Frame */}
                        {isActive && (
                            <div className="absolute inset-0 border border-white/20 animate-pulse scale-105"></div>
                        )}
                        <img 
                            src={item.image} 
                            alt={item.name} 
                            className={`max-w-full max-h-full w-auto h-auto object-contain transition-all duration-1000 shadow-2xl ${isActive ? 'grayscale-0' : 'grayscale'}`} 
                        />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center border border-dashed border-white/10 bg-zinc-900/50">
            <p className="font-mono text-zinc-500 text-sm uppercase tracking-widest">
              {isLoading ? 'Synchronizing Success Data...' : 'Success database currently offline.'}
            </p>
          </div>
        )}
      </div>

      <style>{`
        .text-outline-white {
            -webkit-text-stroke: 1px rgba(255,255,255,0.4);
        }
      `}</style>
    </section>
  );
};
