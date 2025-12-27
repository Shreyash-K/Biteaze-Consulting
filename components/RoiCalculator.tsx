import React, { useState } from 'react';
import { TrendingUp, IndianRupee, Calculator } from 'lucide-react';

export const RoiCalculator: React.FC = () => {
  const [monthlyCost, setMonthlyCost] = useState(50000);
  const savings = Math.floor(monthlyCost * 0.18);
  const annualSavings = savings * 12;
  const fiveYear = annualSavings * 5;

  return (
    <section id="roi" className="py-24 px-4 bg-zinc-950 border-t border-zinc-800 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-600/5 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-16">
                <h2 className="font-archivo text-5xl md:text-7xl text-white mb-6 uppercase leading-none">
                    Do The <span className="text-transparent text-outline">Math</span>.
                    <br />
                    See The <span className="text-orange-500">Profit</span>.
                </h2>
                <div className="h-1 w-24 bg-orange-600 mt-8"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-zinc-800 pt-12">
                {/* Controls (Col 5) */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                    <div className="bg-zinc-900 border border-zinc-800 p-8 relative group hover:border-zinc-700 transition-colors">
                        <div className="flex justify-between items-center mb-6">
                            <label className="font-mono text-xs text-zinc-500 uppercase tracking-widest block">
                                Input: Monthly Spend
                            </label>
                            <Calculator size={16} className="text-zinc-600" />
                        </div>
                        
                        <div className="text-4xl font-archivo text-white mb-10 flex items-start gap-1">
                            <span className="text-2xl text-zinc-600 mt-1">₹</span>
                            {monthlyCost.toLocaleString('en-IN')}
                        </div>
                        
                        <input 
                            type="range" 
                            min="25000" 
                            max="500000" 
                            step="5000"
                            value={monthlyCost}
                            onChange={(e) => setMonthlyCost(parseInt(e.target.value))}
                            className="w-full h-1 bg-zinc-800 rounded-none appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-orange-600 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-black hover:[&::-webkit-slider-thumb]:bg-white transition-all outline-none"
                        />
                        
                        <div className="flex justify-between mt-4 font-mono text-xs text-zinc-600">
                            <span>₹25k</span>
                            <span>₹5L</span>
                        </div>
                    </div>
                    
                    <div className="mt-8 border-l-2 border-zinc-800 pl-6 py-2">
                            <p className="font-mono text-zinc-400 text-sm leading-relaxed">
                            By optimizing supply chains, reducing kitchen waste and aligning correct menu pricing, our "Food Costing & P&L Management" modules typically recovers upto <span className="text-white bg-orange-600/20 px-1 border-b border-orange-600/50">18% of lost revenue</span> within the first 90 days.
                            </p>
                    </div>
                </div>

                {/* Results (Col 7) */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                    {/* Monthly Card */}
                    <div className="bg-zinc-900/30 border border-zinc-800 p-8 flex items-center justify-between hover:bg-zinc-900/50 transition-all group">
                        <div>
                            <span className="block font-mono text-xs text-zinc-500 uppercase mb-2 group-hover:text-orange-500 transition-colors">Est. Monthly Recovery</span>
                            <span className="font-archivo text-3xl md:text-5xl text-zinc-300 group-hover:text-white transition-colors">₹{savings.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="h-12 w-12 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-600 group-hover:border-orange-500 group-hover:text-orange-500 transition-all">
                            <IndianRupee size={20} />
                        </div>
                    </div>

                    {/* Annual Card - Highlight */}
                    <div className="bg-white text-black p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between relative overflow-hidden group shadow-[0_0_50px_-20px_rgba(255,255,255,0.1)]">
                            {/* Decorative Background */}
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500 blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                            
                            <div className="relative z-10">
                            <span className="block font-mono text-xs font-bold uppercase mb-2 tracking-widest text-zinc-500">Annual Projected Savings</span>
                            <span className="font-archivo text-5xl md:text-7xl tracking-tighter block mt-2">₹{annualSavings.toLocaleString('en-IN')}</span>
                            </div>

                            <div className="mt-8 md:mt-0 relative z-10">
                            <div className="bg-black text-white px-4 py-2 font-mono text-xs uppercase flex items-center gap-2 border border-zinc-800">
                                <TrendingUp size={14} className="text-green-400" />
                                +18% Margin
                            </div>
                            </div>
                    </div>
                    
                        {/* 5 Year Projection */}
                    <div className="bg-zinc-900/30 border border-zinc-800 p-6 flex items-center gap-6 opacity-60 hover:opacity-100 transition-opacity">
                            <div className="w-0.5 h-12 bg-zinc-800"></div>
                            <div>
                            <span className="block font-mono text-xs text-zinc-600 uppercase mb-1">5-Year Runway Impact</span>
                            <span className="font-archivo text-xl text-zinc-300">Total Capital Reclaimed: <span className="text-white border-b border-zinc-700">₹{fiveYear.toLocaleString('en-IN')}</span></span>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};