
import React, { useState, useEffect, useRef } from 'react';
import { PortfolioItem } from '../types';
import { supabase, isSupabaseConfigured } from '../utils/supabaseClient';

const COLORS = [
  'bg-red-900/40', 'bg-orange-900/40', 'bg-amber-900/40', 'bg-yellow-900/40',
  'bg-lime-900/40', 'bg-emerald-900/40', 'bg-teal-900/40', 'bg-cyan-900/40',
  'bg-sky-900/40', 'bg-blue-900/40', 'bg-indigo-900/40', 'bg-violet-900/40',
  'bg-purple-900/40', 'bg-fuchsia-900/40', 'bg-pink-900/40', 'bg-rose-900/40'
];

export const Portfolio: React.FC = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Fetch Data
  useEffect(() => {
    const fetchPortfolio = async () => {
      setIsLoading(true);
      if (!isSupabaseConfigured) {
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

  // Handle Mobile Scroll Animation via Intersection Observer
  useEffect(() => {
    // Only run this logic on mobile devices
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    
    if (!isMobile || items.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: '-45% 0px -45% 0px', // Trigger when element is in the middle 10% of screen
      threshold: 0.05
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'));
          if (!isNaN(index)) {
            setActiveIndex(index);
          }
        }
      });
    }, observerOptions);

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, [items]);

  // Interaction handlers for Desktop (Hover)
  const handleMouseEnter = (index: number) => {
    if (window.matchMedia("(min-width: 769px)").matches) {
      setActiveIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (window.matchMedia("(min-width: 769px)").matches) {
      setActiveIndex(-1);
    }
  };

  const activeColor = activeIndex !== -1 && items[activeIndex] ? items[activeIndex].color : 'bg-zinc-950';

  return (
    <section 
      id="portfolio" 
      className={`py-24 px-4 transition-colors duration-1000 ease-in-out ${activeColor} relative border-t border-zinc-800 min-h-[600px] overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-white/10 pb-8">
          <div className="text-left">
            <h3 className="font-archivo text-5xl md:text-7xl text-white uppercase leading-none">
                OUR <br/><span className="text-transparent text-outline-white">PORTFOLIO</span>
            </h3>
          </div>
          <div className="text-left md:text-right mt-6 md:mt-0">
            <p className="font-mono text-white/50 text-xs uppercase tracking-widest leading-loose">
              Current Showcase: <br/> 
              {activeIndex !== -1 ? `Module ${activeIndex + 1}` : 'Select a Project'} of {items.length}
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
                  ref={(el) => { itemRefs.current[index] = el; }}
                  data-index={index}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  className={`relative py-14 transition-all duration-700 ease-in-out border-b cursor-default ${isActive ? 'border-white border-b-2' : 'border-white/10'}`}
                >
                  <div className="flex flex-col md:flex-row items-center justify-center z-10 relative w-full pointer-events-none">
                    <div className={`md:absolute md:left-0 mb-4 md:mb-0 transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
                        <span className="font-mono text-xs text-white uppercase tracking-widest">
                            {index + 1 < 10 ? `0${index + 1}` : index + 1} {item.category ? `— ${item.category}` : ''}
                        </span>
                    </div>
                    
                    <h4 className={`font-archivo text-4xl md:text-6xl text-white text-center transition-all duration-700 uppercase tracking-tighter ${isActive ? 'scale-110' : 'scale-100 opacity-60'}`}>
                      {item.name}
                    </h4>
                  </div>

                  <div 
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[200px] md:w-[450px] md:h-[350px] pointer-events-none transition-all duration-1000 ease-out z-0 flex items-center justify-center ${isActive ? 'opacity-100 scale-100 rotate-2' : 'opacity-0 scale-90 rotate-0'}`}
                  >
                    <div className="relative w-full h-full flex items-center justify-center">
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
          <div className="py-20 text-center">
            <p className="font-mono text-zinc-500 text-sm uppercase tracking-widest">
              {isLoading ? 'Loading Portfolio Data...' : 'Portfolio database currently offline.'}
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
