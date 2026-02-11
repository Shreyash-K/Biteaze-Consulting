import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesBento } from './components/ServicesBento';
import { Portfolio } from './components/Portfolio';
import { Timeline } from './components/Timeline';
import { Team } from './components/Team';
import { Footer } from './components/Footer';

// The main consulting page component containing the original layout
const ConsultingPage = () => {
  return (
    <div className="bg-zinc-950 min-h-screen text-stone-50 selection:bg-orange-500 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <ServicesBento />
        <Portfolio />
        <Timeline />
        <Team />
      </main>
      <Footer />
    </div>
  );
};

// A minimalist landing page for the root domain
const HomePage = () => {
  return (
    <div className="bg-zinc-950 min-h-screen flex flex-col items-center pt-24 pb-32 text-center px-4 relative overflow-hidden">
       {/* Decorative Background */}
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,88,12,0.1)_0%,rgba(9,9,11,1)_70%)] pointer-events-none"></div>
       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/5 blur-[120px] rounded-full pointer-events-none animate-pulse"></div>

       <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center">
         <h1 className="font-['Archivo_Black'] text-7xl md:text-9xl text-white mb-6 tracking-tighter hover:scale-105 transition-transform duration-500 cursor-default">
           BITEAZE
         </h1>
         
         <div className="h-1.5 w-24 bg-orange-600 mb-10"></div>
         
         <div className="max-w-2xl mb-12">
            <p className="font-mono text-zinc-400 text-sm md:text-lg leading-relaxed">
              Our main website is under development. Meanwhile check out our Consulting & Management Service Below
            </p>
         </div>
         
         <Link 
           to="/consulting-management" 
           className="group relative inline-flex items-center justify-center bg-white text-black font-archivo uppercase text-lg md:text-xl px-12 py-5 overflow-hidden transition-all duration-300 hover:bg-orange-600 hover:text-white shadow-[8px_8px_0px_0px_rgba(234,88,12,1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
         >
           <span className="relative z-10 flex items-center gap-3">
             <span className="w-2.5 h-2.5 bg-black group-hover:bg-white rounded-full animate-pulse"></span>
             Enter Consulting & Management
           </span>
         </Link>

         {/* Upcoming Offerings Section */}
         <div className="mt-32 w-full text-left">
            <div className="flex items-center gap-4 mb-10">
                <div className="h-[2px] w-12 bg-orange-600"></div>
                <h2 className="font-archivo text-2xl md:text-4xl text-white uppercase tracking-tight">Upcoming Offerings</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 border-2 border-zinc-800 overflow-hidden">
                {/* 01 Operational Modules */}
                <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-zinc-800 bg-zinc-900/40 backdrop-blur-sm group hover:bg-zinc-900/60 transition-colors">
                    <span className="font-archivo text-7xl md:text-8xl text-orange-600 block mb-8 leading-none transition-transform group-hover:scale-110 origin-left duration-500">01</span>
                    <h3 className="font-archivo text-3xl md:text-4xl text-white mb-10 uppercase leading-[0.9]">Operational<br/>Modules</h3>
                    <ul className="space-y-5 font-mono text-sm md:text-base text-zinc-400">
                        <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-orange-600 mt-2 shrink-0"></span> Smart POS & Captain System</li>
                        <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-orange-600 mt-2 shrink-0"></span> Auto Inventory Management</li>
                        <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-orange-600 mt-2 shrink-0"></span> Staff & Attendance Hub</li>
                        <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-orange-600 mt-2 shrink-0"></span> AI-powered Customer Ordering</li>
                        <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-orange-600 mt-2 shrink-0"></span> Reservation & Queue Mgmt</li>
                    </ul>
                </div>

                {/* 02 Growth Modules */}
                <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-zinc-800 bg-orange-600 group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <div className="w-32 h-32 border-4 border-black rotate-45"></div>
                    </div>
                    <span className="font-archivo text-7xl md:text-8xl text-black block mb-8 leading-none transition-transform group-hover:scale-110 origin-left duration-500">02</span>
                    <h3 className="font-archivo text-3xl md:text-4xl text-black mb-10 uppercase leading-[0.9]">Growth<br/>Modules</h3>
                    <ul className="space-y-5 font-mono text-sm md:text-base text-white font-bold">
                        <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-black mt-2 shrink-0"></span> Loyalty & Partnership Programs</li>
                        <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-black mt-2 shrink-0"></span> CRM & Marketing Automation</li>
                        <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-black mt-2 shrink-0"></span> Actionable Analytics & AI-sights</li>
                        <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-black mt-2 shrink-0"></span> Dynamic Pricing Engine</li>
                    </ul>
                </div>

                {/* 03 Integrated Services */}
                <div className="p-8 md:p-12 bg-zinc-900/40 backdrop-blur-sm group hover:bg-zinc-900/60 transition-colors">
                    <span className="font-archivo text-7xl md:text-8xl text-orange-600 block mb-8 leading-none transition-transform group-hover:scale-110 origin-left duration-500">03</span>
                    <h3 className="font-archivo text-3xl md:text-4xl text-white mb-10 uppercase leading-[0.9]">Integrated<br/>Services</h3>
                    <ul className="space-y-5 font-mono text-sm md:text-base text-zinc-400">
                        <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-orange-600 mt-2 shrink-0"></span> Strategic Staff Hiring Hub</li>
                        <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-orange-600 mt-2 shrink-0"></span> F&B Marketplaces – Real Estate</li>
                        <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-orange-600 mt-2 shrink-0"></span> Self-Delivery Solutions</li>
                        <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-orange-600 mt-2 shrink-0"></span> Pocketly - 'Waste down, profits up'</li>
                    </ul>
                </div>
            </div>
         </div>
       </div>
    </div>
  );
};

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Updated clean URL path */}
        <Route path="/consulting-management" element={<ConsultingPage />} />
        {/* Fallback for legacy URL with ampersand */}
        <Route path="/consulting&management" element={<ConsultingPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;