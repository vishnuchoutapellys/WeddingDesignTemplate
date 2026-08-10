import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Heart } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

export const InvitationCard: React.FC = () => {
  return (
    <section id="invitation-card" className="py-12 px-4 sm:px-6 relative z-20 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-lg"
      >
        {/* Parchment Invitation Card */}
        <div className="relative rounded-3xl bg-[#fefcf8] p-8 sm:p-10 shadow-2xl border-2 border-[#e6ca65]/80 ornate-frame text-center">
          
          {/* Top Tagline */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-[1px] w-8 bg-[#d4af37]" />
            <span className="text-[11px] sm:text-[12px] tracking-[0.25em] text-[#997b19] uppercase font-cinzel font-bold">
              You Are Warmly Invited
            </span>
            <div className="h-[1px] w-8 bg-[#d4af37]" />
          </div>

          {/* Couple Names */}
          <div className="my-4">
            <h2 className="text-4xl sm:text-5xl font-script text-[#5c0617] leading-none mb-2">
              {weddingConfig.groom.name}
            </h2>
            <div className="flex items-center justify-center my-1">
              <span className="text-xl font-cormorant text-[#b38728] italic font-semibold">Weds</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-script text-[#5c0617] leading-none mt-1">
              {weddingConfig.bride.name}
            </h2>
          </div>

          {/* Parents Display */}
          <div className="grid grid-cols-2 gap-4 my-6 text-[12px] sm:text-[13px] text-[#78543e] font-serif border-y border-[#d4af37]/30 py-3">
            <div className="border-r border-[#d4af37]/30 pr-2">
              <p className="font-semibold text-[#5c0617]">{weddingConfig.groom.parentsDisplay}</p>
            </div>
            <div className="pl-2">
              <p className="font-semibold text-[#5c0617]">{weddingConfig.bride.parentsDisplay}</p>
            </div>
          </div>

          {/* When & Where Blocks */}
          <div className="grid grid-cols-2 gap-4 my-6">
              <div className="bg-[#fff9ed] rounded-xl p-4 border border-[#e6ca65]/60 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#fdf2d0] text-[#997b19] flex items-center justify-center mb-1.5 shadow-sm">
                <Calendar className="w-4 h-4" />
              </div>
              <span className="text-[10px] tracking-[0.2em] font-cinzel text-[#800a22] font-bold uppercase">WHEN</span>
              <p className="text-[13px] font-bold text-[#5c0617] mt-1 font-serif">{weddingConfig.weddingDetails.mainDate}</p>
              <p className="text-[11px] text-[#78543e]">{weddingConfig.weddingDetails.mainTime}</p>
            </div>

            <div className="bg-[#fff9ed] rounded-xl p-4 border border-[#e6ca65]/60 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#fdf2d0] text-[#997b19] flex items-center justify-center mb-1.5 shadow-sm">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-[10px] tracking-[0.2em] font-cinzel text-[#800a22] font-bold uppercase">WHERE</span>
              <p className="text-[13px] font-bold text-[#5c0617] mt-1 font-serif">{weddingConfig.weddingDetails.venueName}</p>
              <p className="text-[11px] text-[#78543e]">{weddingConfig.weddingDetails.place}</p>
            </div>
          </div>

          {/* Wedding Hashtag Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#5c0617] to-[#800a22] text-[#fbf5b7] px-5 py-2 rounded-full shadow-lg border border-[#d4af37]/60">
            <Heart className="w-3.5 h-3.5 fill-current text-[#fbf5b7]" />
            <Heart className="w-3.5 h-3.5 fill-current text-[#fbf5b7]" />
            <span className="text-[12px] sm:text-[13px] font-bold tracking-widest font-cinzel">
              {weddingConfig.weddingDetails.hashtag}
            </span>
            <Heart className="w-3.5 h-3.5 fill-current text-[#fbf5b7]" />
            <Heart className="w-3.5 h-3.5 fill-current text-[#fbf5b7]" />
          </div>

          {/* Flourish Divider */}
          <div className="mt-8 pt-4 flex flex-col items-center">
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#d4af37]" />
              <div className="w-2.5 h-2.5 rotate-45 border border-[#997b19] bg-[#fbf5b7]" />
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#d4af37]" />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
