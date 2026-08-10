import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { soundManager } from '../utils/sounds';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Try to initialize audio
    const audio = new Audio(weddingConfig.music.audioUrl);
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    // Handle user interaction for autoplay policy
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        if (weddingConfig.music.autoPlay) {
          // attempt to play but do NOT fall back to procedural BGM automatically
          playMusic(false);
        }
        window.removeEventListener('click', handleFirstInteraction);
        window.removeEventListener('touchstart', handleFirstInteraction);
        window.removeEventListener('scroll', handleFirstInteraction);
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });
    window.addEventListener('scroll', handleFirstInteraction, { once: true });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      soundManager.stopAmbientBgm();
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
    };
  }, []);

  // `manual` indicates the play was triggered by the user pressing the music button.
  // Only then do we fall back to the procedural ambient BGM. Automatic attempts
  // (like the first interaction handler) will not start the synth on failure.
  const playMusic = (manual: boolean = true) => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Fall back to procedural synth only when user explicitly requested playback
        if (manual) {
          soundManager.startAmbientBgm();
          setIsPlaying(true);
        } else {
          setIsPlaying(false);
        }
      });
    } else {
      if (manual) {
        soundManager.startAmbientBgm();
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    }
  };

  const pauseMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    soundManager.stopAmbientBgm();
    setIsPlaying(false);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      // user-initiated -> allow synth fallback on failure
      playMusic(true);
    }
  };

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-3">
      {/* Floating Animated Music Disk */}
      <button
        onClick={toggleMusic}
        aria-label={isPlaying ? "Pause Wedding Music" : "Play Wedding Music"}
        className="group relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-tr from-[#5c0617] via-[#800a22] to-[#5c0617] p-[2px] shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 border border-[#d4af37]/60"
      >
        {/* Golden Vinyl Grooves */}
        <div className={`w-full h-full rounded-full bg-[#3b020c] flex items-center justify-center relative overflow-hidden ${isPlaying ? 'animate-spin-slow' : ''}`}>
          {/* Concentric Gold Vinyl Rings */}
          <div className="absolute inset-2 rounded-full border border-[#d4af37]/20" />
          <div className="absolute inset-3.5 rounded-full border border-[#d4af37]/30" />
          
          {/* Center Golden Core */}
          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#f5e49e] flex items-center justify-center shadow-inner">
            <Music className={`w-2.5 h-2.5 text-[#5c0617] ${isPlaying ? 'animate-pulse' : ''}`} />
          </div>
        </div>

        {/* Floating Sound Waves & Status Badge */}
        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#d4af37] text-[#5c0617] flex items-center justify-center shadow-md border border-white/50">
          {isPlaying ? (
            <Volume2 className="w-3.5 h-3.5 animate-bounce" />
          ) : (
            <VolumeX className="w-3.5 h-3.5" />
          )}
        </div>
      </button>

      {/* Audio Wave Bars Display */}
      {isPlaying && (
        <div className="hidden sm:flex items-center gap-1 bg-[#5c0617]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#d4af37]/40 shadow-lg animate-fade-in">
          <div className="flex items-end gap-[3px] h-3">
            <span className="w-1 bg-[#d4af37] rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-2.5" />
            <span className="w-1 bg-[#f3de8a] rounded-full animate-[pulse_0.8s_ease-in-out_infinite_0.2s] h-3.5" />
            <span className="w-1 bg-[#d4af37] rounded-full animate-[pulse_0.5s_ease-in-out_infinite_0.4s] h-2" />
            <span className="w-1 bg-[#f3de8a] rounded-full animate-[pulse_0.7s_ease-in-out_infinite_0.1s] h-3" />
          </div>
          <span className="text-[11px] font-medium text-[#fbf8f2] tracking-wide ml-1 font-serif">
            Shehnai & Flute
          </span>
        </div>
      )}
    </div>
  );
};
