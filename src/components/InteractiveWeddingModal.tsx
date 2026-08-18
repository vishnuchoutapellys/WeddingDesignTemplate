import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { weddingConfig } from '../config/weddingConfig';
const ramImg = new URL('../assets/Ramcharan.png', import.meta.url).href;
import { soundManager } from '../utils/sounds';
import { lockBodyScroll, unlockBodyScroll } from '../utils/scrollLock';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedEventId?: string;
}

export const InteractiveWeddingModal: React.FC<Props> = ({ isOpen, onClose, selectedEventId }) => {
  const [blessingCount, setBlessingCount] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isScratching, setIsScratching] = useState<boolean>(false);
  const [isFullyRevealed, setIsFullyRevealed] = useState<boolean>(false);

  const showerBlessings = () => {
    soundManager.playTempleBell();
    setBlessingCount(prev => prev + 1);

    // Multi-angle golden rice & rose petal burst
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ['#d4af37', '#fef08a', '#dc2626', '#f97316']
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ['#d4af37', '#fef08a', '#dc2626', '#f97316']
    });
  };

  useEffect(() => {
    if (!isOpen) {
      setIsFullyRevealed(false);
      return;
    }

    lockBodyScroll();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = canvas.offsetWidth);
    const height = (canvas.height = canvas.offsetHeight);

    // Soft golden veil to scratch
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#fef3c7');
    gradient.addColorStop(0.6, '#fef08a');
    gradient.addColorStop(1, '#fefcc0');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Decorative specks
    ctx.fillStyle = 'rgba(212, 138, 4, 0.25)';
    for (let i = 0; i < 250; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 3 + 0.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.font = 'bold 16px "Inter", sans-serif';
    ctx.fillStyle = '#7a2b11';
    ctx.textAlign = 'center';
    ctx.fillText('Scratch to reveal the muhurtham details', width / 2, height / 2 - 10);

    return () => unlockBodyScroll();
  }, [isOpen]);

  const scratch = (clientX: number, clientY: number) => {
    if (isFullyRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();

    soundManager.playScratchSound();
    checkPercentScratched();
  };

  const checkPercentScratched = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentCount = 0;
    const totalPixels = pixels.length / 4;

    for (let i = 3; i < pixels.length; i += 16) {
      if (pixels[i] === 0) transparentCount++;
    }

    const percent = Math.round((transparentCount / (totalPixels / 4)) * 100);
    if (percent > 45 && !isFullyRevealed) {
      revealAll();
    }
  };

  const revealAll = () => {
    setIsFullyRevealed(true);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    soundManager.playTempleBell();
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 }, colors: ['#f59e0b', '#fbbf24', '#fef08a', '#dc2626'] });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-sm rounded-3xl bg-gradient-to-b from-[#fffcf2] via-[#fff9e6] to-[#fef5d8] p-6 shadow-2xl border-4 border-[#b38728] text-center overflow-hidden"
          >
            {/* Header Close */}
            <div className="flex items-center justify-between mb-3 z-20 relative">
              <span className="px-3 py-1 bg-[#5c0617] text-[#fbf5b7] text-[11px] font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> The Holy Muhurtham
              </span>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#5c0617]/10 hover:bg-[#5c0617]/20 text-[#5c0617] flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Header Title (dynamic based on selected event) */}
            <div className="border-b border-[#d4af37]/40 pb-3">
              {(() => {
                const id = selectedEventId || 'wedding';
                const evt = weddingConfig.events.find(e => e.id === id);
                const title = evt ? evt.title : 'The Holy Muhurtham';
                return (
                  <h3 className="text-3xl font-script text-[#5c0617] mt-1">{title}</h3>
                );
              })()}
            </div>

            {/* Holy Fire & Kalash Sacred Artwork */}
            <div className="my-4 flex flex-col items-center">
              <div className="w-28 h-28 relative">
                <img src={ramImg} alt="Ganesha" className="w-full h-full object-contain filter drop-shadow" />
              </div>

                {/* Ceremony Details (use event data) */}
              <div className="mt-1">
                {(() => {
                  const id = selectedEventId || 'wedding';
                  const evt = weddingConfig.events.find(e => e.id === id);
                  if (evt) {
                    return (
                      <>
                        <p className="text-[13px] font-bold text-[#5c0617] font-cinzel">{evt.day}</p>
                        <p className="text-[12px] font-semibold text-[#800a22]">{evt.time}</p>
                        <p className="text-[12px] font-bold text-[#5c0617] mt-2 font-serif">{evt.venue || weddingConfig.weddingDetails.place}</p>
                        <p className="text-[11px] italic font-serif text-[#5c0617] mt-2">{evt.quote}</p>
                      </>
                    );
                  }
                  return <p className="text-[12px] font-semibold">Details Coming Soon</p>;
                })()}
              </div>
            </div>

            {/* Interactive Blessing Button */}
            <div className="mt-4 pt-3 border-t border-[#d4af37]/40">
              <div className="flex gap-2">
                <button
                  onClick={revealAll}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#b38728] text-[#fbf5b7] font-cinzel font-bold text-[12px] tracking-wider uppercase shadow hover:brightness-105 transition-all flex items-center justify-center gap-2 border border-[#d4af37]"
                >
                  <Sparkles className="w-4 h-4" /> Reveal ▶
                </button>

                <button
                  onClick={showerBlessings}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#5c0617] via-[#800a22] to-[#5c0617] text-[#fbf5b7] font-cinzel font-bold text-[12px] tracking-wider uppercase shadow-lg hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 border border-[#d4af37]"
                >
                  <Heart className="w-4 h-4 fill-current text-[#fbf5b7] animate-pulse" />
                  Shower Akshatalu & Blessings ({blessingCount})
                </button>
              </div>
              {/* Scratchable Canvas Overlay */}
              <canvas
                ref={canvasRef}
                onMouseDown={() => setIsScratching(true)}
                onMouseUp={() => setIsScratching(false)}
                onMouseLeave={() => setIsScratching(false)}
                onMouseMove={(e) => isScratching && scratch(e.clientX, e.clientY)}
                onTouchStart={() => setIsScratching(true)}
                onTouchEnd={() => setIsScratching(false)}
                onTouchMove={(e) => {
                  if (e.touches.length > 0) scratch(e.touches[0].clientX, e.touches[0].clientY);
                }}
                className={`absolute inset-0 w-full h-full scratch-cursor z-20 transition-opacity duration-500 ${isFullyRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
