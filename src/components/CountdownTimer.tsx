import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(weddingConfig.weddingDetails.countdownTarget).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number): string => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  const timeUnits = [
    { label: 'DAYS', value: formatNumber(timeLeft.days) },
    { label: 'HOURS', value: formatNumber(timeLeft.hours) },
    { label: 'MINS', value: formatNumber(timeLeft.minutes) },
    { label: 'SECS', value: formatNumber(timeLeft.seconds) },
  ];

  return (
    <section className="py-8 px-4 sm:px-6 max-w-lg mx-auto relative z-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="royal-maroon-card rounded-3xl p-6 sm:p-8 text-center text-[#fffdfa] border-2 border-[#d4af37]/70 shadow-2xl relative overflow-hidden"
      >
        {/* Subtle Background Rings */}
        <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full border border-[#d4af37]/20 pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full border border-[#d4af37]/20 pointer-events-none" />

        {/* Header Tag */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <Clock className="w-4 h-4 text-[#fef08a]" />
          <span className="text-[11px] sm:text-[12px] font-cinzel font-bold tracking-[0.25em] text-[#fef08a] uppercase">
            Counting Down To The Muhurtham
          </span>
        </div>

        {/* 4-Box Countdown Grid */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 my-3">
          {timeUnits.map((unit, idx) => (
            <div
              key={idx}
              className="bg-black/30 backdrop-blur-sm rounded-2xl p-2.5 sm:p-3.5 border border-[#d4af37]/40 flex flex-col items-center justify-center shadow-inner"
            >
              <span className="text-2xl sm:text-3xl md:text-4xl font-cinzel font-bold text-[#fef5b7] tracking-wider leading-none">
                {unit.value}
              </span>
              <span className="text-[9px] sm:text-[10px] font-cinzel tracking-[0.2em] font-semibold text-[#fef08a]/80 mt-1.5 uppercase">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        {/* Auspicious Blessing Footnote */}
        <p className="text-[12px] sm:text-[13px] text-[#fdfaf3]/90 italic font-serif mt-4">
          Every second brings us closer to a lifetime of togetherness.
        </p>
      </motion.div>
    </section>
  );
};
