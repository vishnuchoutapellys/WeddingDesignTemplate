import React from 'react';
import { HeroWelcome } from './HeroWelcome';
import { InvitationCard } from './InvitationCard';

export const CombinedLanding: React.FC = () => {
  return (
    <section className="relative pb-12">
      {/* Top banner with hanging flowers and devotional symbols */}
      <div className="relative w-full overflow-visible">
        <div className="absolute inset-x-0 top-0 pointer-events-none">
          <div className="mx-auto max-w-5xl flex items-start justify-between px-6 py-6">
            {/* Left hanging */}
            <div className="flex flex-col items-center -translate-y-2">
              <svg width="64" height="120" viewBox="0 0 64 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-95">
                <line x1="32" y1="0" x2="32" y2="80" stroke="#b8860b" strokeWidth="2" />
                <circle cx="32" cy="92" r="12" fill="#fbbf24" />
                <circle cx="32" cy="112" r="8" fill="#fb7185" />
              </svg>
            </div>

            {/* Center devotional symbol (Ohm) */}
            <div className="flex items-center justify-center">
              <svg width="84" height="84" viewBox="0 0 24 24" className="text-[#d4af37] drop-shadow" xmlns="http://www.w3.org/2000/svg">
                <path fill="#d4af37" d="M12 2C8 5 14 6 12 10s-6 2-6 6 6 6 6 6 6-2 6-6-6-7-6-14z" />
              </svg>
            </div>

            {/* Right hanging */}
            <div className="flex flex-col items-center -translate-y-2">
              <svg width="64" height="120" viewBox="0 0 64 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-95">
                <line x1="32" y1="0" x2="32" y2="80" stroke="#b8860b" strokeWidth="2" />
                <circle cx="32" cy="92" r="12" fill="#fbbf24" />
                <circle cx="32" cy="112" r="8" fill="#fb7185" />
              </svg>
            </div>
          </div>
        </div>

        {/* Decorative swastik at top-left and top-right */}
        <div className="absolute left-6 top-6">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="#d4af37" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3h4v2H5v2H3V3zm14 0h4v4h-2V5h-2V3zM3 17h2v2h2v2H3v-4zm18 0v4h-4v-2h2v-2h2z" />
          </svg>
        </div>
        <div className="absolute right-6 top-6">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="#d4af37" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2c-1 1-1 2 0 3 1 1 2 1 3 0 1-1 1-2 0-3-1-1-2-1-3 0zm0 20c1-1 1-2 0-3-1-1-2-1-3 0-1 1-1 2 0 3 1 1 2 1 3 0zM2 12c1-1 2-1 3 0 1 1 1 2 0 3-1 1-2 1-3 0-1-1-1-2 0-3zm20 0c-1 1-2 1-3 0-1-1-1-2 0-3 1-1 2-1 3 0 1 1 1 2 0 3z" />
          </svg>
        </div>
      </div>

      {/* Place existing components beneath banner */}
      <div className="pt-20">
        <HeroWelcome />
        <div className="mt-12 flex justify-center">
          <InvitationCard />
        </div>
      </div>
    </section>
  );
};

export default CombinedLanding;
