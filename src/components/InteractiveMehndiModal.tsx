import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { weddingConfig } from '../config/weddingConfig';
import { soundManager } from '../utils/sounds';
import { lockBodyScroll, unlockBodyScroll } from '../utils/scrollLock';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedEventId?: string;
}

export const InteractiveMehndiModal: React.FC<Props> = ({ isOpen, onClose, selectedEventId }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isScratching, setIsScratching] = useState<boolean>(false);
  const [scratchedPercent, setScratchedPercent] = useState<number>(0);
  const [isFullyRevealed, setIsFullyRevealed] = useState<boolean>(false);

  const revealAll = useCallback(() => {
    setIsFullyRevealed(true);
    setScratchedPercent(100);
    soundManager.playTempleBell();
    confetti({ particleCount: 60, spread: 60, colors: ['#15803d', '#166534', '#86efac', '#ca8a04'], origin: { y: 0.6 } });
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setScratchedPercent(0);
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

    // Mehndi green veil
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#164e63');
    gradient.addColorStop(0.6, '#115e59');
    gradient.addColorStop(1, '#0f766e');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    for (let i = 0; i < 200; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 2 + 0.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.font = 'bold 16px "Inter", sans-serif';
    ctx.fillStyle = '#fff4e6';
    ctx.textAlign = 'center';
    ctx.fillText('Scratch to reveal the mehndi details', width / 2, height / 2 - 10);

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
    setScratchedPercent(percent);

    if (percent > 45 && !isFullyRevealed) {
      revealAll();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-sm rounded-3xl bg-gradient-to-b from-[#f0fdf4] via-[#fbfbf8] to-[#fefcf8] p-6 shadow-2xl border-4 border-[#2d6a4f] overflow-hidden"
          >
            {/* Header Controls */}
            <div className="flex items-center justify-between mb-3 z-20 relative">
              <button
                onClick={revealAll}
                className="px-3 py-1 bg-[#2d6a4f] text-white text-[11px] font-bold rounded-full uppercase tracking-wider flex items-center gap-1 shadow hover:bg-[#1b4332] transition-colors"
              >
                <Sparkles className="w-3 h-3" /> Reveal ▶
              </button>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#1b4332]/10 hover:bg-[#1b4332]/20 text-[#1b4332] flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Main Henna Heart Tracing Container */}
            <div className="relative w-full h-[380px] rounded-2xl bg-[#fffdfa] p-4 flex flex-col items-center justify-between text-center border border-[#2d6a4f]/30 shadow-inner overflow-hidden">
              
              {/* Event Title Header */}
              <div className="w-full border-b border-[#2d6a4f]/20 pb-2 z-10">
                <span className="text-[10px] tracking-[0.2em] uppercase font-cinzel text-[#2d6a4f] font-bold">
                  Ceremony of Henna & Love
                </span>
                <h3 className="text-3xl font-script text-[#5c0617] mt-0.5">
                  Mehndi Soiree
                </h3>
              </div>

              {/* Heart Center Card (Revealed) */}
              <div className="relative w-full my-auto flex flex-col items-center justify-center px-4 py-2">
                <div className={`transition-all duration-700 ${isFullyRevealed ? 'scale-105 opacity-100' : 'opacity-85'}`}>
                  {(() => {
                    const id = selectedEventId || 'mehndi';
                    const evt = weddingConfig.events.find(e => e.id === id);
                    if (evt) {
                      return (
                        <>
                          <p className="text-[12px] font-semibold text-[#2d6a4f] font-cinzel">{evt.day}</p>
                          <p className="text-[12px] text-[#78350f] font-medium mt-0.5">{evt.time}</p>
                          <p className="text-[12px] font-bold text-[#5c0617] mt-2 font-serif">{evt.venue || weddingConfig.weddingDetails.place}</p>
                        </>
                      );
                    }
                    return (
                      <>
                        <p className="text-[12px] font-semibold text-[#2d6a4f] font-cinzel">Details Coming Soon</p>
                      </>
                    );
                  })()}

                  <div className="mt-3 text-[12px] italic font-serif text-[#5c0617]">
                    “The deeper the mehndi, the deeper the love.”
                  </div>
                </div>

                {/* Scratch Canvas Layer */}
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
                  className={`absolute inset-0 w-full h-full henna-cursor z-20 transition-opacity duration-500 ${isFullyRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                />
              </div>

              {/* Bottom Henna Cone Illustration */}
              <div className="w-full flex items-center justify-center gap-2 pt-2 border-t border-[#2d6a4f]/20 z-10">
                <Heart className="w-4 h-4 text-[#5c0617] fill-current animate-pulse" />
                <span className="text-[11px] font-cinzel font-bold text-[#2d6a4f] uppercase tracking-wider">
                  {isFullyRevealed ? 'Details Revealed' : `Scratch to reveal (${scratchedPercent}%)`}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
