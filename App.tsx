import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesBento } from './components/ServicesBento';
import { Portfolio } from './components/Portfolio';
import { RoiCalculator } from './components/RoiCalculator';
import { Timeline } from './components/Timeline';
import { Team } from './components/Team';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="bg-zinc-950 min-h-screen text-stone-50 selection:bg-orange-500 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <ServicesBento />
        <Portfolio />
        <RoiCalculator />
        <Timeline />
        <Team />
      </main>
      <Footer />
    </div>
  );
}

export default App;
