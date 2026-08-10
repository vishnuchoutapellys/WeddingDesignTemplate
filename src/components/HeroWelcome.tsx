import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

export const HeroWelcome: React.FC = () => {
  const scrollToContent = () => {
    const el = document.getElementById('invitation-card');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const extractProfession = (full: string) => {
    const m = full.match(/\(([^)]+)\)/);
    return m ? m[1] : '';
  };
  const brideProfession = extractProfession(weddingConfig.bride.fullName) || 'Doctor';
  const groomProfession = extractProfession(weddingConfig.groom.fullName) || 'Software';

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-between pt-10 pb-8 px-4 sm:px-6 bg-gradient-to-b from-[#fcf5e5] via-[#fdf9f0] to-[#fbf8f2] overflow-hidden">
      {/* Decorative Golden Floral Top Toran */}
      <div className="absolute top-0 inset-x-0 h-16 pointer-events-none flex justify-around opacity-75">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-1 h-6 bg-gradient-to-b from-[#b38728] to-[#f59e0b]" />
            <div className="w-5 h-5 rounded-full bg-[#f59e0b] shadow-sm flex items-center justify-center border border-[#d97706]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#b91c1c]" />
            </div>
          </div>
        ))}
      </div>

      {/* Auspicious Ganesha Emblem */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center text-center mt-6 z-10"
      >
        <div className="w-28 h-28 mb-2 flex items-center justify-center filter drop-shadow-lg rounded-full p-2 isolate bg-gradient-to-br from-amber-100 via-amber-50 to-rose-50 overflow-hidden">
          <img src="/src/assets/ganesha.png" alt="Ganesha" className="w-full h-full object-contain mix-blend-multiply" />
        </div>
      </motion.div>

      {/* Main Royal Illustration & Family Invitation Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="w-full max-w-md mx-auto my-auto relative z-10"
      >
        <div className="relative rounded-2xl bg-gradient-to-b from-[#fffcf2] via-[#fff9e6] to-[#fef5d8] pt-12 px-6 pb-6 sm:pt-14 sm:px-8 sm:pb-8 shadow-2xl border-2 border-[#d4af37]/60 text-center ornate-frame">
          
          {/* Couple Traditional Illustration & Garlands */}
          <div className="relative w-44 h-44 mx-auto mb-5">
            {/* Golden Radiant Ring */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#d4af37] via-[#fef08a] to-[#d4af37] animate-pulse-subtle p-1 shadow-lg">
              <div className="w-full h-full rounded-full overflow-hidden relative flex items-center justify-center bg-gradient-to-tr from-yellow-50 via-amber-100 to-rose-50 isolate p-1">
                <img src="/src/assets/Ram.png" alt="Ganesha" className="w-full h-full object-contain p-2 mix-blend-multiply filter drop-shadow-sm" />
              </div>
            </div>

            {/* Sparkle badge */}
            <div className="absolute -bottom-2 right-0 bg-[#5c0617] text-[#fbf5b7] p-1.5 rounded-full shadow-md border border-[#d4af37]">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
            </div>
          </div>

          {/* Invitation Intro */}
          <p className="text-[12px] sm:text-[13px] tracking-[0.2em] text-[#800a22] font-cinzel font-bold uppercase mb-1">
            Together with their families
          </p>
          <p className="text-[13px] sm:text-[14px] text-[#6b4e3d] italic font-serif mb-4">
            Request the honor of your presence to celebrate the wedding of
          </p>

          {/* Bride & Groom Creative Typography */}
          <div className="my-2">
            <h1 className="text-[2rem] sm:text-[2.5rem] font-script font-extrabold tracking-tight text-transparent bg-clip-text vibrant-gradient-text leading-snug md:leading-[1.5] whitespace-nowrap sm:whitespace-normal overflow-x-auto">
              {weddingConfig.groom.name}
              <span className="ml-2 text-sm align-middle text-[#7a5c43] font-serif font-medium">({groomProfession})</span>
            </h1>

            <div className="flex items-center justify-center my-2">
              <div className="h-[1px] w-14 bg-gradient-to-r from-transparent to-[#d4af37]" />
              <span className="mx-3 text-3xl font-script text-[#b38728] font-bold">&</span>
              <div className="h-[1px] w-14 bg-gradient-to-l from-transparent to-[#d4af37]" />
            </div>

            <h2 className="text-[2rem] sm:text-[2.5rem] font-script font-extrabold tracking-tight text-transparent bg-clip-text vibrant-gradient-text leading-snug md:leading-[1.5] whitespace-nowrap sm:whitespace-normal overflow-x-auto">
              {weddingConfig.bride.name}
              <span className="ml-2 text-sm align-middle text-[#7a5c43] font-serif font-medium">({brideProfession})</span>
            </h2>
          </div>

          {/* Key Date & Venue Highlight */}
          <div className="mt-5 pt-4 border-t border-[#d4af37]/40 text-center">
            <p className="text-[13px] font-semibold text-[#5c0617] tracking-wider uppercase font-cinzel">
              {weddingConfig.weddingDetails.mainDate}
            </p>
            <p className="text-[12px] text-[#6b4e3d] font-medium mt-0.5">
              {weddingConfig.weddingDetails.mainTime}
            </p>
            <p className="text-[13px] font-bold text-[#800a22] mt-1 font-serif">
              {weddingConfig.weddingDetails.venueName}, {weddingConfig.weddingDetails.place}
            </p>
          </div>
        </div>
      </motion.div>

      {/* (Ganesha image reverted to inline SVG) */}

      {/* Animated Scroll Down Indicator */}
      <motion.button
        onClick={scrollToContent}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="flex flex-col items-center text-[#780016] group cursor-pointer mt-4 z-10"
      >
        <span className="text-[11px] sm:text-[12px] tracking-[0.25em] font-cinzel font-semibold uppercase group-hover:text-[#b38728] transition-colors">
          See All Celebrations
        </span>
        <ChevronDown className="w-5 h-5 text-[#b38728] animate-bounce mt-1" />
      </motion.button>
    </section>
  );
};
