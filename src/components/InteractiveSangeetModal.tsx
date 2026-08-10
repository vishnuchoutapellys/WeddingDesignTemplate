import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Music2, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';
import { weddingConfig } from '../config/weddingConfig';
const ramImg = '/src/assets/Ram.png';
import { soundManager } from '../utils/sounds';
import { lockBodyScroll, unlockBodyScroll } from '../utils/scrollLock';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedEventId?: string;
}

export const InteractiveSangeetModal: React.FC<Props> = ({ isOpen, onClose, selectedEventId }) => {
  const [tapCount, setTapCount] = useState<number>(0);
  const [isBeating, setIsBeating] = useState<boolean>(false);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);

  React.useEffect(() => {
    if (!isOpen) return;
    lockBodyScroll();
    return () => unlockBodyScroll();
  }, [isOpen]);

  const handleDholTap = () => {
    // Play Dhol sound
    soundManager.playDholBeat(tapCount % 2 === 0 ? 'both' : 'bass');
    setIsBeating(true);
    setTimeout(() => setIsBeating(false), 120);

    const nextCount = tapCount + 1;
    setTapCount(nextCount);

    if (nextCount >= 5 && !isUnlocked) {
      setIsUnlocked(true);
      soundManager.playTempleBell();
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ef4444', '#f59e0b', '#8b5cf6', '#ec4899', '#fef08a']
      });
    }
  };

  const revealAll = () => {
    setIsUnlocked(true);
    setTapCount(5);
    soundManager.playDholBeat('both');
    soundManager.playTempleBell();
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-sm rounded-3xl bg-gradient-to-b from-[#7f1d1d] via-[#991b1b] to-[#450a0a] p-6 shadow-2xl border-4 border-[#d4af37] text-center text-[#fffbeb] overflow-hidden"
          >
            {/* Header Controls */}
            <div className="flex items-center justify-between mb-3 z-20 relative">
              <button
                onClick={revealAll}
                className="px-3 py-1 bg-[#d4af37] text-[#5c0617] text-[11px] font-bold rounded-full uppercase tracking-wider flex items-center gap-1 shadow hover:bg-[#fef08a] transition-colors"
              >
                <Sparkles className="w-3 h-3" /> Reveal ▶
              </button>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sangeet Night Card */}
              <div className="w-full border-b border-[#d4af37]/40 pb-2">
              <span className="text-[10px] tracking-[0.2em] uppercase font-cinzel text-[#fef08a] font-bold">
                An Evening of Music & Dance
              </span>
              <h3 className="text-3xl font-script text-[#fef5b7] mt-0.5">
                Sangeet Celebration
              </h3>
            </div>

            {/* Interactive Dhol Drum */}
            <div className="my-4 flex flex-col items-center">
              <motion.button
                onClick={handleDholTap}
                animate={isBeating ? { scale: [1, 1.15, 0.95, 1], rotate: [0, -4, 4, 0] } : {}}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                className="relative w-48 h-36 flex items-center justify-center cursor-pointer outline-none group"
              >
                <img src={ramImg} alt="Ganesha" className="w-full h-full object-contain filter drop-shadow-xl" />

                {/* Floating Music Notes on Tap */}
                {isBeating && (
                  <motion.div
                    initial={{ opacity: 1, y: 0, scale: 0.8 }}
                    animate={{ opacity: 0, y: -40, scale: 1.4 }}
                    transition={{ duration: 0.4 }}
                    className="absolute -top-3 text-[#fef08a]"
                  >
                    <Music2 className="w-8 h-8" />
                  </motion.div>
                )}
              </motion.button>

              <p className="text-[12px] font-cinzel font-semibold text-[#fef08a] mt-1">
                Tap the dhol to play the beat!
              </p>

              {/* 5-Beat Rhythm Dots */}
              <div className="flex items-center gap-2 mt-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full border border-[#d4af37] transition-all duration-300 ${
                      i < tapCount
                        ? 'bg-[#fef08a] scale-125 shadow-md shadow-[#fef08a]/50'
                        : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Unlocked Sangeet Invitation Info */}
            <div className={`transition-all duration-500 rounded-2xl bg-black/30 p-3 border border-[#d4af37]/30 ${isUnlocked ? 'opacity-100' : 'opacity-70'}`}>
              {(() => {
                const id = selectedEventId || 'sangeet';
                const evt = weddingConfig.events.find(e => e.id === id);
                if (evt) {
                  return (
                    <>
                      <p className="text-[12px] font-bold text-[#fef5b7] font-cinzel">{evt.day}</p>
                      <p className="text-[12px] text-white/90 font-medium">{evt.time}</p>
                      <p className="text-[11px] text-[#fef08a] mt-1">{evt.venue || weddingConfig.weddingDetails.place}</p>
                    </>
                  );
                }
                return (
                  <>
                    <p className="text-[12px] font-bold text-[#fef5b7] font-cinzel">Details Coming Soon</p>
                  </>
                );
              })()}
              <p className="text-[11px] italic font-serif text-white/80 mt-1">
                “Music, dance and the whole family on its feet.”
              </p>
            </div>

            {/* Bottom Status */}
            <div className="mt-3">
              {isUnlocked ? (
                <div className="flex items-center justify-center gap-1 text-[#fef08a] font-bold text-[12px] font-cinzel animate-pulse">
                  <PartyPopper className="w-4 h-4" /> Ready to Dance!
                </div>
              ) : (
                <p className="text-[11px] font-cinzel tracking-[0.2em] font-bold text-[#fef08a] uppercase">
                  TAP THE DHOL TO THE BEAT ({Math.min(5, tapCount)}/5)
                </p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
