import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Crown, Flower2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { weddingConfig } from '../config/weddingConfig';
import { soundManager } from '../utils/sounds';

interface Props {
  selectedTeam: 'bride' | 'groom' | null;
  onSelectTeam: (team: 'bride' | 'groom') => void;
}

export const PickYourSide: React.FC<Props> = ({ selectedTeam, onSelectTeam }) => {
  const handleSelect = (team: 'bride' | 'groom') => {
    onSelectTeam(team);
    soundManager.playTempleBell();
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.7 },
      colors: team === 'bride' ? ['#ec4899', '#f43f5e', '#fbcfe8', '#d4af37'] : ['#3b82f6', '#1d4ed8', '#93c5fd', '#d4af37']
    });
  };

  return (
    <section className="py-10 px-4 sm:px-6 max-w-lg mx-auto relative z-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Section Tag & Heading */}
        <p className="text-[11px] sm:text-[12px] tracking-[0.25em] text-[#997b19] uppercase font-cinzel font-bold">
          A Little Friendly Rivalry
        </p>
        <h2 className="text-3xl sm:text-4xl font-cinzel text-[#5c0617] font-bold mt-1">
          Pick your side
        </h2>
        <p className="text-[12px] sm:text-[13px] text-[#6b4e3d] font-serif max-w-xs mx-auto mt-2 leading-relaxed">
          Whose side are you cheering for? Tap to join — your pick rides along with your RSVP.
        </p>

        {/* Side-by-Side Team Cards */}
        <div className="mt-8 flex items-center justify-center gap-3 sm:gap-4 relative">
          
          {/* Team Groom Card */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSelect('groom')}
            className={`flex-1 relative rounded-2xl p-5 sm:p-6 transition-all duration-300 flex flex-col items-center text-center cursor-pointer ${
              selectedTeam === 'groom'
                ? 'bg-gradient-to-b from-[#f0f9ff] to-[#e0f2fe] border-2 border-[#0284c7] shadow-xl ring-2 ring-[#0284c7]/30'
                : 'bg-[#fffdfa] border-2 border-[#e5d5c5] hover:border-[#0284c7]/60 shadow-md'
            }`}
          >
            {/* Selection Badge */}
            {selectedTeam === 'groom' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-3 bg-[#0284c7] text-white text-[10px] font-cinzel font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-md uppercase tracking-wider"
              >
                <Check className="w-3 h-3 stroke-[3]" /> You're In
              </motion.div>
            )}

            {/* Groom Icon */}
            <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-colors ${
              selectedTeam === 'groom'
                ? 'bg-[#0284c7] text-white shadow-lg'
                : 'bg-[#f0f9ff] text-[#0284c7] border border-[#bae6fd]'
            }`}>
              <Crown className="w-7 h-7" />
            </div>

            <span className="text-[11px] font-cinzel font-bold tracking-wider text-[#800a22] uppercase">
              Team Groom
            </span>
            <h3 className="text-xl sm:text-2xl font-script text-[#5c0617] mt-1 font-bold">
              Ram Teja
            </h3>
          </motion.button>

          {/* Golden "VS" Emblem */}
          <div className="flex-shrink-0 z-10 w-9 h-9 rounded-full bg-gradient-to-tr from-[#b38728] to-[#fef08a] text-[#5c0617] flex items-center justify-center shadow-lg border-2 border-[#fff] font-cinzel font-bold text-[12px]">
            Vs
          </div>

          {/* Team Bride Card */}
         
           <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSelect('bride')}
            className={`flex-1 relative rounded-2xl p-5 sm:p-6 transition-all duration-300 flex flex-col items-center text-center cursor-pointer ${
              selectedTeam === 'bride'
                ? 'bg-gradient-to-b from-[#fdf2f8] to-[#fce7f3] border-2 border-[#ec4899] shadow-xl ring-2 ring-[#ec4899]/30'
                : 'bg-[#fffdfa] border-2 border-[#e5d5c5] hover:border-[#ec4899]/60 shadow-md'
            }`}
          >
            {/* Selection Badge */}
            {selectedTeam === 'bride' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-3 bg-[#ec4899] text-white text-[10px] font-cinzel font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-md uppercase tracking-wider"
              >
                <Check className="w-3 h-3 stroke-[3]" /> You're In
              </motion.div>
            )}

            {/* Bride Icon */}
            <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-colors ${
              selectedTeam === 'bride'
                ? 'bg-[#ec4899] text-white shadow-lg'
                : 'bg-[#fdf2f8] text-[#ec4899] border border-[#fbcfe8]'
            }`}>
              <Flower2 className="w-7 h-7" />
            </div>

            <span className="text-[11px] font-cinzel font-bold tracking-wider text-[#800a22] uppercase">
              Team Bride
            </span>
            <h3 className="text-xl sm:text-2xl font-script text-[#5c0617] mt-1 font-bold">
              {weddingConfig.bride.name}
            </h3>
          </motion.button>
        </div>

        {/* Selected Cheering Feedback Status */}
        {selectedTeam && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 inline-flex items-center gap-2 bg-[#fdfaf3] px-4 py-2 rounded-full border border-[#d4af37]/60 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <span className="text-[12px] sm:text-[13px] font-serif italic text-[#5c0617] font-semibold">
              You're cheering for {selectedTeam === 'bride' ? `Team Bride — ${weddingConfig.bride.name}! 💐` : `Team Groom — ${weddingConfig.groom.name}! 👑`}
            </span>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};
