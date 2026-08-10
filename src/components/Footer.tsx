import React from 'react';
import { Heart, ArrowUp, Sparkles } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#3b020c] text-[#fdfaf3] pt-14 pb-10 px-4 sm:px-6 text-center overflow-hidden border-t-4 border-[#d4af37]">
      {/* Decorative Golden Arch / Pattern at Top */}
      <div className="max-w-md mx-auto relative z-10 flex flex-col items-center">
        
        {/* Royal Couple Monogram */}
        <div className="w-20 h-20 rounded-full border-2 border-[#d4af37] bg-[#5c0617] flex items-center justify-center mb-4 shadow-xl p-1">
          <div className="w-full h-full rounded-full border border-[#d4af37]/50 flex items-center justify-center bg-[#450a0a]">
            <span className="text-3xl font-cinzel-dec font-bold text-[#fbf5b7] tracking-wider">
              R<span className="text-[#d4af37] text-xl font-serif">&</span>S
            </span>
          </div>
        </div>

        {/* Couple Names */}
        <h3 className="text-3xl sm:text-4xl font-script text-[#fef5b7] mt-1">
          {weddingConfig.groom.name} & {weddingConfig.bride.name}
        </h3>

        {/* Wedding Date & Place */}
        <p className="text-[12px] sm:text-[13px] font-cinzel tracking-[0.2em] text-[#d4af37] font-semibold uppercase mt-2">
          {weddingConfig.weddingDetails.mainDate} · {weddingConfig.weddingDetails.place}
        </p>

        {/* Family Blessings Note */}
        <p className="text-[13px] font-serif italic text-white/80 max-w-sm mt-4 leading-relaxed">
          With love, gratitude, and heartfelt blessings from both families.
        </p>

        {/* Hashtag */}
        <div className="mt-4 px-4 py-1 rounded-full bg-[#5c0617] border border-[#d4af37]/40 text-[#fbf5b7] text-[11px] font-cinzel font-bold tracking-widest uppercase">
          {weddingConfig.weddingDetails.hashtag}
        </div>

        {/* Scroll to Top */}
        <button
          onClick={scrollToTop}
          className="mt-8 flex items-center gap-1.5 text-[11px] font-cinzel font-bold text-[#d4af37] hover:text-[#fef08a] uppercase tracking-widest transition-colors cursor-pointer group"
        >
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          Back to Top
        </button>

        {/* Credits */}
        <div className="mt-8 pt-6 border-t border-white/10 w-full flex items-center justify-center">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-[#2b0b07]/80 via-[#3b0f10]/60 to-[#5c0617]/70 px-4 py-2 rounded-full border-2 border-[#d4af37] shadow-lg whitespace-nowrap">
            <Sparkles className="w-5 h-5 text-[#f3e0c8] animate-spin-slow" />
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-semibold text-[#fdf7e8]">Developed By</span>
              <span className="text-[16px] font-bold gold-gradient-text">Choutapelly Vishnu</span>
            </div>

            <div className="h-8 w-px bg-white/10 mx-2" />

            <a href="tel:+919014249898" className="inline-flex items-center gap-2 bg-[#b91c1c] px-3 py-1 rounded-md text-sm font-cinzel font-bold text-[#fff6e0] shadow-md border border-[#f3d58a] hover:scale-105 transform transition whitespace-nowrap">
              <span className="text-[12px]">Contact for orders</span>
              <span className="text-sm font-mono">+91 9014249898</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
