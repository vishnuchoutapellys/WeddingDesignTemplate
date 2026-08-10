import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { weddingConfig } from '../config/weddingConfig';
const ramImg = '/assets/Ram.png';
import { soundManager } from '../utils/sounds';
import { lockBodyScroll, unlockBodyScroll } from '../utils/scrollLock';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedEventId?: string;
}

export const InteractiveHaldiModal: React.FC<Props> = ({ isOpen, onClose, selectedEventId }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isScratching, setIsScratching] = useState<boolean>(false);
  const [scratchedPercent, setScratchedPercent] = useState<number>(0);
  const [isFullyRevealed, setIsFullyRevealed] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      setScratchedPercent(0);
      setIsFullyRevealed(false);
      return;
    }

    // Lock background scroll (desktop + mobile)
    lockBodyScroll();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize Turmeric Paste Scratch Layer
    const width = (canvas.width = canvas.offsetWidth);
    const height = (canvas.height = canvas.offsetHeight);

    // Warm Turmeric Golden Paste Gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#f59e0b');
    gradient.addColorStop(0.5, '#d97706');
    gradient.addColorStop(1, '#b45309');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add Turmeric Texture Specks & Ornate Pattern
    ctx.fillStyle = 'rgba(254, 240, 138, 0.4)';
    for (let i = 0; i < 400; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 3 + 1, 0, Math.PI * 2);
      ctx.fill();
    }

    // Overlay text on turmeric (generic scratch prompt)
    ctx.font = 'bold 16px "Inter", sans-serif';
    ctx.fillStyle = '#fffbeb';
    ctx.textAlign = 'center';
    ctx.fillText('Scratch to reveal details', width / 2, height / 2 - 10);

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

  const revealAll = () => {
    setIsFullyRevealed(true);
    setScratchedPercent(100);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    soundManager.playTempleBell();
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#fbbf24', '#fef08a', '#dc2626']
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-sm rounded-3xl bg-gradient-to-b from-[#fef3c7] via-[#fffbeb] to-[#fef08a] p-6 shadow-2xl border-4 border-[#f59e0b] overflow-hidden"
          >
            {/* Header Controls */}
            <div className="flex items-center justify-between mb-3 z-20 relative">
              <button
                onClick={revealAll}
                className="px-3 py-1 bg-[#d97706] text-white text-[11px] font-bold rounded-full uppercase tracking-wider flex items-center gap-1 shadow hover:bg-[#b45309] transition-colors"
              >
                <Sparkles className="w-3 h-3" /> Reveal ▶
              </button>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#78350f]/10 hover:bg-[#78350f]/20 text-[#78350f] flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Main Interactive Scratch Card Area */}
            <div className="relative w-full h-[380px] rounded-2xl overflow-hidden shadow-inner border border-[#f59e0b]/40">
              
              {/* Card Revealed Content Underneath */}
              <div className="absolute inset-0 bg-[#fffdf5] p-5 flex flex-col items-center justify-between text-center select-none">
                
                {/* Traditional Border Motif */}
                <div className="w-full border-b border-[#f59e0b]/30 pb-2">
                  <p className="text-[11px] tracking-[0.2em] uppercase font-cinzel text-[#b45309] font-bold">
                    Join us to celebrate our
                  </p>
                  <h3 className="text-3xl font-script text-[#b45309] mt-0.5">
                    Haldi Ceremony
                  </h3>
                  <p className="text-[12px] font-cormorant italic text-[#92400e] font-semibold">
                    Manjal Neerattu Vizha
                  </p>
                </div>

                {/* Cute Haldi Couple Vector Artwork */}
                <div className="w-36 h-36 my-1 relative">
                  <img src={ramImg} alt="Ganesha" className="w-full h-full object-contain" />
                </div>

                {/* Event Timing & Venue (use config data) */}
                <div className="border-t border-[#f59e0b]/30 pt-2 w-full">
                  {(() => {
                      const id = selectedEventId || 'haldi';
                      const haldi = weddingConfig.events.find((e) => e.id === id);
                      return haldi ? (
                      <>
                        <p className="text-[12px] font-bold text-[#b45309]">
                          {haldi.day}
                        </p>
                        <p className="text-[12px] text-[#78350f]">{haldi.time}</p>
                        <p className="text-[11px] font-semibold text-[#b45309]">
                          {haldi.venue}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-[12px] font-bold text-[#b45309]">Haldi Details</p>
                        <p className="text-[12px] text-[#78350f]">TBA</p>
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* Scratchable Turmeric Canvas Layer */}
              <canvas
                ref={canvasRef}
                onMouseDown={() => setIsScratching(true)}
                onMouseUp={() => setIsScratching(false)}
                onMouseLeave={() => setIsScratching(false)}
                onMouseMove={(e) => isScratching && scratch(e.clientX, e.clientY)}
                onTouchStart={() => setIsScratching(true)}
                onTouchEnd={() => setIsScratching(false)}
                onTouchMove={(e) => {
                  if (e.touches.length > 0) {
                    scratch(e.touches[0].clientX, e.touches[0].clientY);
                  }
                }}
                className={`absolute inset-0 w-full h-full scratch-cursor z-10 transition-opacity duration-500 ${
                  isFullyRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
              />
            </div>

            {/* Bottom Status / Rub Prompt */}
            <div className="mt-3 text-center">
              {isFullyRevealed ? (
                <div className="flex items-center justify-center gap-1 text-[#b45309] font-bold text-[12px] animate-bounce">
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a]" /> Details Revealed
                </div>
              ) : (
                <p className="text-[11px] tracking-[0.2em] font-bold text-[#b45309] uppercase">
                  Scratch to reveal ({scratchedPercent}%)
                </p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
