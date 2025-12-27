
import React, { useState, useEffect, useRef } from 'react';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';

export const Footer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 } 
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    brandName: '',
    email: '',
    phone: '',
    serviceInterest: 'Full Brand Development'
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      // Send data to Supabase 'leads' table
      const { error } = await supabase
        .from('leads')
        .insert([
          { 
            name: formData.name,
            email: formData.email,
            brand_name: formData.brandName,
            service_interest: formData.serviceInterest,
            phone: `+91 ${formData.phone}`
          }
        ]);

      if (error) throw error;

      setStatus('success');
      setFormData({ name: '', brandName: '', email: '', phone: '', serviceInterest: 'Full Brand Development' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);

    } catch (error: any) {
      console.error('Error submitting form:', error);
      setStatus('error');
      
      // Extract error message safely to handle objects or strings
      let message = 'Something went wrong. Please try again.';
      
      if (typeof error === 'string') {
        message = error;
      } else if (error?.message) {
        message = typeof error.message === 'string' ? error.message : JSON.stringify(error.message);
      } else if (error?.error_description) {
        message = error.error_description;
      } else {
        message = JSON.stringify(error);
      }
      
      setErrorMessage(message);
    }
  };

  return (
    <footer ref={sectionRef} id="contact" className="bg-white pt-24 pb-12 px-4 relative overflow-hidden">
      {/* Animated Background Overlay */}
      <div 
        className={`absolute inset-0 bg-orange-600 z-0 transform origin-left transition-transform duration-[1500ms] ease-out ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 mb-24">
          
          {/* Left: Headline */}
          <div className="lg:w-1/2">
            <h2 className="font-archivo text-6xl md:text-8xl text-zinc-950 leading-[0.9] mb-8">
              HUNGRY <br/> FOR <br/> <span className="text-white">SUCCESS?</span>
            </h2>
            <p className="font-mono text-zinc-950 text-lg max-w-md font-bold">
              Stop guessing. Start optimizing. Let's build your culinary empire together.
            </p>
          </div>

          {/* Right: Form */}
          <div className="lg:w-1/2 bg-zinc-950 p-8 border-4 border-zinc-900 shadow-[10px_10px_0px_0px_rgba(24,24,27,1)]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-zinc-500 font-mono text-xs uppercase mb-2">Name</label>
                  <input 
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text" 
                    className="w-full bg-zinc-900 border-b-2 border-zinc-800 focus:border-orange-500 text-white p-2 outline-none transition-colors" 
                  />
                </div>
                <div>
                  <label className="block text-zinc-500 font-mono text-xs uppercase mb-2">Brand Name</label>
                  <input 
                    required
                    name="brandName"
                    value={formData.brandName}
                    onChange={handleChange}
                    type="text" 
                    className="w-full bg-zinc-900 border-b-2 border-zinc-800 focus:border-orange-500 text-white p-2 outline-none transition-colors" 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-zinc-500 font-mono text-xs uppercase mb-2">Email</label>
                  <input 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email" 
                    className="w-full bg-zinc-900 border-b-2 border-zinc-800 focus:border-orange-500 text-white p-2 outline-none transition-colors" 
                  />
                </div>
                <div>
                  <label className="block text-zinc-500 font-mono text-xs uppercase mb-2">Phone</label>
                  <div className="flex w-full bg-zinc-900 border-b-2 border-zinc-800 focus-within:border-orange-500 transition-colors">
                    <span className="p-2 text-zinc-500 font-mono flex items-center select-none">+91</span>
                    <input 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      type="tel"
                      className="w-full bg-transparent text-white p-2 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-zinc-500 font-mono text-xs uppercase mb-2">Service Interest</label>
                <select 
                  name="serviceInterest"
                  value={formData.serviceInterest}
                  onChange={handleChange}
                  className="w-full bg-zinc-900 border-b-2 border-zinc-800 focus:border-orange-500 text-white p-2 outline-none transition-colors"
                >
                  <option>Full Brand Development</option>
                  <option>Recipe & Menu Engineering</option>
                  <option>Operations & Staffing</option>
                  <option>Digital Strategy & AI</option>
                  <option>Franchise Management</option>
                </select>
              </div>

              {/* Status Messages */}
              {status === 'error' && (
                 <div className="flex items-center gap-2 text-red-500 font-mono text-xs bg-red-500/10 p-2 border border-red-500/20">
                    <AlertCircle size={16} />
                    <span className="break-all">{errorMessage}</span>
                 </div>
              )}
               {status === 'success' && (
                 <div className="flex items-center gap-2 text-green-500 font-mono text-xs bg-green-500/10 p-2 border border-green-500/20">
                    <CheckCircle size={16} />
                    Request sent successfully! We'll be in touch.
                 </div>
              )}

              <button 
                type="submit" 
                disabled={status === 'loading' || status === 'success'}
                className="group relative w-full bg-white text-black font-archivo uppercase text-xl py-4 mt-8 overflow-hidden hover:text-white transition-colors duration-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                    {status === 'loading' ? (
                        <>SENDING <Loader2 className="animate-spin" /></>
                    ) : 'Send Request'}
                </span>
                <div className="absolute inset-0 bg-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700 ease-out"></div>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-2 border-zinc-950 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-2">
            <span className="font-['Archivo_Black'] text-xl text-zinc-950">BITEAZE © 2025</span>
          </div>
          
          <div className="flex gap-4 font-mono text-xs font-bold text-zinc-950 uppercase">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
