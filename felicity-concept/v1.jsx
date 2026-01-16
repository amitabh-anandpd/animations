import React, { useEffect, useState } from "react";
import { Sparkles, Calendar, Music } from "lucide-react";

export default function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Load the Monoton font dynamically
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Monoton&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    // Target date from your code
    const targetDate = new Date('2026-02-13T00:00:00');
    
    const updateTimer = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-sans text-gray-900 bg-black min-h-screen">
      <div className="relative min-h-screen w-full overflow-hidden">
        {/* Background Image Placeholder */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop"
            alt="Felicity Background"
            className="object-cover w-full h-full opacity-60"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Countdown Timer - Top Right */}
        <div className="absolute top-10 left-4 md:left-14 z-20 scale-75 md:scale-100 origin-top-left">
          <div className="flex gap-3 items-end">
            <div className="text-center">
              <div className="font-bold drop-shadow-[0_0_20px_rgba(252,236,137,0.8)] tracking-wider" style={{ fontFamily: "'Monoton', cursive", fontSize: '44px', color: 'rgb(252, 236, 137)' }}>
                {String(timeLeft.days).padStart(2, '0')}
              </div>
              <div className="text-white font-bold tracking-widest drop-shadow-lg" style={{ fontFamily: "'Monoton', cursive", fontSize: '14px', color: 'rgba(255, 247, 197, 1)'}}>DAYS</div>
            </div>
            <div className="font-bold drop-shadow-[0_0_20px_rgba(252,236,137,0.8)] mb-5" style={{ fontFamily: "'Monoton', cursive", fontSize: '44px', color: 'rgb(252, 236, 137)' }}>:</div>
            <div className="text-center">
              <div className="font-bold drop-shadow-[0_0_20px_rgba(252,236,137,0.8)] tracking-wider" style={{ fontFamily: "'Monoton', cursive", fontSize: '44px', color: 'rgb(252, 236, 137)' }}>
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <div className="text-white font-bold tracking-widest drop-shadow-lg" style={{ fontFamily: "'Monoton', cursive", fontSize: '14px', color: 'rgba(255, 247, 197, 1)'}}>HOURS</div>
            </div>
            <div className="font-bold drop-shadow-[0_0_20px_rgba(252,236,137,0.8)] mb-5" style={{ fontFamily: "'Monoton', cursive", fontSize: '44px', color: 'rgb(252, 236, 137)' }}>:</div>
            <div className="text-center">
              <div className="font-bold drop-shadow-[0_0_20px_rgba(252,236,137,0.8)] tracking-wider" style={{ fontFamily: "'Monoton', cursive", fontSize: '44px', color: 'rgb(252, 236, 137)' }}>
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <div className="text-white font-bold tracking-widest drop-shadow-lg" style={{ fontFamily: "'Monoton', cursive", fontSize: '14px', color: 'rgba(255, 247, 197, 1)' }}>MINUTES</div>
            </div>
            <div className="font-bold drop-shadow-[0_0_20px_rgba(252,236,137,0.8)] mb-5" style={{ fontFamily: "'Monoton', cursive", fontSize: '44px', color: 'rgb(252, 236, 137)' }}>:</div>
            <div className="text-center">
              <div className="font-bold drop-shadow-[0_0_20px_rgba(252,236,137,0.8)] tracking-wider" style={{ fontFamily: "'Monoton', cursive", fontSize: '44px', color: 'rgb(252, 236, 137)' }}>
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <div className="text-white font-bold tracking-widest drop-shadow-lg" style={{ fontFamily: "'Monoton', cursive", fontSize: '14px', color: 'rgba(255, 247, 197, 1)'}}>SECONDS</div>
            </div>
          </div>
        </div>

        {/* Centered Logo Placeholder */}
        <div className="relative z-10 flex items-center justify-center min-h-screen pointer-events-none">
          <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center">
             {/* Creating a CSS Logo placeholder since we don't have the PNG */}
             <div className="text-center">
                <Sparkles className="w-24 h-24 mx-auto mb-4 text-[#fcec89] drop-shadow-[0_0_15px_rgba(252,236,137,0.8)] animate-pulse" />
                <h1 className="text-7xl md:text-9xl font-bold text-[#fcec89] drop-shadow-[0_0_30px_rgba(252,236,137,0.4)]" style={{ fontFamily: "'Monoton', cursive" }}>
                  FELICITY
                </h1>
                <p className="text-white text-xl mt-4 tracking-[0.5em] font-light">THE COLLEGE FEST</p>
             </div>
          </div>
        </div>
      </div>

      {/* About Felicity Section */}
      <div className="relative w-full py-20 px-8" style={{ background: 'linear-gradient(to right, rgb(0, 0, 0), rgb(52, 46, 17))' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12" style={{ fontFamily: "'Monoton', cursive", color: 'rgb(252, 236, 137)' }}>
            ABOUT FELICITY
          </h2>
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <div className="relative w-full h-[300px] md:h-[550px] overflow-hidden rounded-lg shadow-2xl border border-[#fcec89]/30">
                <img
                  src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop"
                  alt="About Felicity"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-white text-lg leading-relaxed mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-white text-lg leading-relaxed mb-4">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p className="text-white text-lg leading-relaxed">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
              
              <div className="mt-8 flex gap-4">
                 <button className="px-6 py-3 bg-[#fcec89] text-black font-bold rounded hover:bg-white transition-colors">
                    Register Now
                 </button>
                 <button className="px-6 py-3 border border-[#fcec89] text-[#fcec89] font-bold rounded hover:bg-[#fcec89]/10 transition-colors">
                    View Events
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}