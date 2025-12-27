import React, { useEffect, useState, useRef } from 'react';
import { Crosshair, Terminal, Zap } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';

interface Operator {
  id: string;
  name: string;
  role: string;
  exp: string;
  image: string;
  code: string;
  skills: string[];
}

const fallbackTeamMembers: Operator[] = [
  { 
    id: '01', 
    name: 'Shreyash', 
    role: 'CEO', 
    exp: '5+ YRS EXP',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop', 
    code: 'OP_PRIME',
    skills: ['Team Handling', 'P&L Optimization', 'Web & App Development', 'MIS System']
  },
  { 
    id: '02', 
    name: 'Govind', 
    role: 'Strategy Officer', 
    exp: '7+ YRS EXP',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=800&auto=format&fit=crop', 
    code: 'OP_STRAT',
    skills: ['Backend Operation', 'Documentation', 'Cost & Franchise Eng.', 'Zomato & Swiggy Strategy']
  },
  { 
    id: '03', 
    name: 'Rajat', 
    role: 'Operation Head', 
    exp: '7+ YRS EXP',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop', 
    code: 'OP_G_OPS',
    skills: ['On Store Operation', 'Manpower Hiring', 'Supply Chain Mgmt', 'Staff Handling']
  },
  { 
    id: '04', 
    name: 'Rushikesh', 
    role: 'Marketing Head', 
    exp: '5+ YRS EXP',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800&auto=format&fit=crop', 
    code: 'OP_MEDIA',
    skills: ['Brand Creator', 'Cinematography', 'Social Media Handling', 'UGC & AGC Creation']
  },
  { 
    id: '05', 
    name: 'Himanshu', 
    role: 'Head Chef', 
    exp: '10+ YRS EXP',
    image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=800&auto=format&fit=crop', 
    code: 'OP_CULINARY',
    skills: ['New Recipe Dev', 'Manpower Training', 'Kitchen Development', 'Vendor Development']
  },
];

export const Team: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<Operator[]>(fallbackTeamMembers);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const { data, error } = await supabase
          .from('team')
          .select('*')
          .order('id', { ascending: true });

        if (error) {
          console.error('Error fetching team data from Supabase:', error);
          return;
        }

        if (data && data.length > 0) {
          const cacheBuster = Date.now();
          const updatedMembers = data.map((member: any) => ({
            ...member,
            image: member.image.includes('?') 
              ? `${member.image}&v=${cacheBuster}` 
              : `${member.image}?v=${cacheBuster}`
          }));
          setTeamMembers(updatedMembers);
        }
      } catch (err) {
        console.error('Unexpected error in fetchTeam:', err);
      }
    };
    fetchTeam();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || teamMembers.length === 0) return;

    setActiveIndex(0);
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % teamMembers.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isVisible, teamMembers.length]);

  return (
    <section id="team" ref={sectionRef} className="py-32 px-4 bg-zinc-950 border-t border-zinc-800 relative overflow-hidden">
      {/* Background Decorative Tech */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/5 blur-3xl rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
            <div>
                <div className="flex items-center gap-2 text-orange-600 mb-4">
                    <Crosshair size={20} className="animate-[spin_4s_linear_infinite]" />
                    <span className="font-mono text-sm tracking-widest uppercase">Target Acquisition</span>
                </div>
                <h2 className="font-archivo text-6xl md:text-8xl text-white uppercase leading-[0.85]">
                    The <br/><span className="text-zinc-900 text-stroke-white text-transparent">Brigade</span>
                </h2>
            </div>
            <div className="font-mono text-zinc-500 text-left md:text-right text-xs md:text-sm max-w-sm">
                <p>/// ELITE UNIT ASSEMBLED FOR HIGH-STAKES HOSPITALITY OPERATIONS.</p>
                <p className="mt-2 text-orange-500 flex items-center gap-2 md:justify-end">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></span>
                    STATUS: SEQUENTIAL MONITORING ACTIVE
                </p>
            </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            {teamMembers.map((member, index) => {
                const isActive = index === activeIndex;
                
                return (
                    <div 
                        key={member.id} 
                        className={`group relative bg-zinc-900 border transition-all duration-500 flex flex-col overflow-hidden ${isActive ? 'border-orange-600 scale-[1.03] z-10 shadow-[0_0_30px_rgba(234,88,12,0.2)]' : 'border-zinc-800'}`}
                    >
                        {/* Header Bar */}
                        <div className={`relative z-10 flex justify-between items-center p-3 border-b transition-colors ${isActive ? 'bg-orange-600/10 border-orange-600/30' : 'bg-zinc-950 border-zinc-800'}`}>
                            <span className={`font-mono text-[10px] tracking-wider transition-colors ${isActive ? 'text-orange-500' : 'text-zinc-500'}`}>
                                {member.code || `OP_${member.name.toUpperCase().substring(0,3)}`}
                            </span>
                            <div className="flex items-center gap-2">
                                <span className={`font-mono text-[9px] px-1 border transition-all ${isActive ? 'bg-orange-600 text-white border-orange-600' : 'bg-orange-500/10 text-orange-500 border-orange-500/20'}`}>
                                    {isActive ? 'SCANNING_BIO' : member.exp}
                                </span>
                                <div className="flex gap-1">
                                    <div className={`w-1.5 h-1.5 rounded-full transition-colors ${isActive ? 'bg-orange-500 animate-pulse' : 'bg-zinc-800'}`}></div>
                                    <div className={`w-1.5 h-1.5 rounded-full transition-colors ${isActive ? 'bg-orange-500/40' : 'bg-zinc-800'}`}></div>
                                </div>
                            </div>
                        </div>

                        {/* Image Container */}
                        <div className="relative aspect-[4/3] overflow-hidden bg-zinc-800 z-10">
                            <img 
                                src={member.image} 
                                alt={member.name} 
                                className={`w-full h-full object-cover contrast-125 transition-all duration-700 ${isActive ? 'grayscale-0 scale-110' : 'grayscale brightness-75'}`}
                            />
                            
                            {/* Subtle & Properly Animated Scanning Line */}
                            <div 
                              className={`absolute left-0 w-full h-[1px] bg-orange-500/20 pointer-events-none z-20 
                                ${isActive ? 'animate-[subtle-scan_3s_linear_infinite] shadow-[0_0_10px_rgba(234,88,12,0.3)]' : 'opacity-0'}
                              `}
                            ></div>

                            {/* Name Overlay (Bottom) */}
                            <div className="absolute bottom-0 left-0 w-full p-4 z-20 bg-gradient-to-t from-black via-black/80 to-transparent pt-12">
                                <h3 className={`font-archivo text-2xl uppercase transition-colors leading-none mb-1 ${isActive ? 'text-orange-500' : 'text-white'}`}>
                                    {member.name}
                                </h3>
                                <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                                    {member.role}
                                </p>
                            </div>
                        </div>

                        {/* Skills Panel */}
                        <div className={`relative z-10 p-5 flex-grow flex flex-col border-t transition-colors ${isActive ? 'bg-zinc-900 border-orange-600/30' : 'bg-zinc-950 border-zinc-800'}`}>
                            <div className="mb-3 flex items-center gap-2">
                                 <Terminal size={12} className={isActive ? 'text-orange-500' : 'text-zinc-600'} />
                                 <span className={`font-mono text-xs uppercase tracking-widest transition-colors ${isActive ? 'text-zinc-300' : 'text-zinc-600'}`}>
                                    Capabilities_Log
                                 </span>
                            </div>
                            <ul className="space-y-2 mt-1">
                                {member.skills && Array.isArray(member.skills) && member.skills.map((skill, i) => (
                                    <li key={i} className={`flex items-start gap-2 text-xs font-mono transition-colors ${isActive ? 'text-zinc-200' : 'text-zinc-500'}`}>
                                        <span className={`mt-0.5 transition-colors ${isActive ? 'text-orange-500' : 'text-orange-900'}`}>›</span>
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                            
                            {/* Corner Graphic for active card */}
                            {isActive && (
                                <div className="absolute bottom-2 right-2 opacity-50">
                                    <Zap size={14} className="text-orange-500 animate-pulse" />
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
      </div>
      
      <style>{`
        .text-stroke-white {
            -webkit-text-stroke: 1px white;
            color: transparent;
        }
        @keyframes subtle-scan {
            0% { top: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
};