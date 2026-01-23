
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
    <div className="bg-zinc-950 min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
       {/* Decorative Background */}
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,88,12,0.1)_0%,rgba(9,9,11,1)_70%)] pointer-events-none"></div>
       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/5 blur-[120px] rounded-full pointer-events-none animate-pulse"></div>

       <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
         <h1 className="font-['Archivo_Black'] text-6xl md:text-9xl text-white mb-8 tracking-tighter hover:scale-105 transition-transform duration-500 cursor-default">
           BITEAZE
         </h1>
         
         <div className="h-1 w-24 bg-orange-600 mb-10"></div>
         
         <p className="font-mono text-zinc-400 text-sm md:text-lg mb-12 max-w-xl mx-auto leading-relaxed">
           /// SYSTEM STATUS: ONLINE <br/>
           SELECT MODULE TO PROCEED
         </p>
         
         <Link 
           to="/consulting-management" 
           className="group relative inline-flex items-center justify-center bg-transparent border-2 border-zinc-800 text-white font-archivo uppercase text-lg md:text-xl px-10 py-5 overflow-hidden transition-all duration-300 hover:border-orange-600 hover:shadow-[0_0_30px_rgba(234,88,12,0.3)]"
         >
           <span className="relative z-10 flex items-center gap-3">
             <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
             Enter Consulting & Management
           </span>
           <div className="absolute inset-0 bg-zinc-900 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
         </Link>

         <div className="mt-16 flex gap-8">
            <span className="text-zinc-700 font-mono text-xs uppercase">Dev: Active</span>
            <span className="text-zinc-700 font-mono text-xs uppercase">Design: Brutalist</span>
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
