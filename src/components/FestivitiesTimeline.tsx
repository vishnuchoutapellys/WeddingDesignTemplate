import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarPlus, Sparkles } from 'lucide-react';
import { weddingConfig, EventDetail } from '../config/weddingConfig';
import { generateGoogleCalendarUrl } from '../utils/calendar';
import { InteractiveHaldiModal } from './InteractiveHaldiModal';
import { InteractiveMehndiModal } from './InteractiveMehndiModal';
import { InteractiveSangeetModal } from './InteractiveSangeetModal';
import { InteractiveWeddingModal } from './InteractiveWeddingModal';

export const FestivitiesTimeline: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'haldi' | 'mehndi' | 'sangeet' | 'wedding' | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const handleAddToCalendar = (event: EventDetail) => {
    const calendarUrl = generateGoogleCalendarUrl(
      `${event.title} - ${weddingConfig.groom.name} & ${weddingConfig.bride.name}'s Wedding`,
      `${event.subTitle}\n${event.quote}\nVenue: ${event.venue}`,
      event.venue,
      event.calendarDate.start,
      event.calendarDate.end
    );
    window.open(calendarUrl, '_blank');
  };

  const renderThumbnailArtwork = (type: 'haldi' | 'mehndi' | 'sangeet' | 'wedding') => {
    switch (type) {
      case 'haldi':
        return (
          <div className="w-12 h-12 relative flex items-center justify-center">
            <svg viewBox="0 0 60 60" className="w-full h-full">
              <ellipse cx="30" cy="38" rx="22" ry="10" fill="#ca8a04" stroke="#854d0e" strokeWidth="1" />
              <ellipse cx="30" cy="36" rx="18" ry="7" fill="#f59e0b" />
              <circle cx="24" cy="36" r="3" fill="#dc2626" />
              <circle cx="30" cy="35" r="3.5" fill="#fef08a" />
              <circle cx="36" cy="36" r="3" fill="#ea580c" />
              <circle cx="30" cy="20" r="10" fill="#fef08a" opacity="0.8" />
              <circle cx="30" cy="20" r="4" fill="#f59e0b" />
            </svg>
          </div>
        );
      case 'mehndi':
        return (
          <div className="w-12 h-12 relative flex items-center justify-center">
            <svg viewBox="0 0 60 60" className="w-full h-full">
              {/* Dotted Heart & Henna Cone */}
              <path d="M30 46 C16 34 10 24 16 16 C22 10 28 14 30 18 C32 14 38 10 44 16 C50 24 44 34 30 46 Z" fill="#fdf2f8" stroke="#be185d" strokeWidth="1.5" strokeDasharray="2 2" />
              <path d="M26 34 L38 14 L42 16 L30 36 Z" fill="#831843" />
              <circle cx="26" cy="34" r="1.5" fill="#ca8a04" />
            </svg>
          </div>
        );
      case 'sangeet':
        return (
          <div className="w-12 h-12 relative flex items-center justify-center">
            <svg viewBox="0 0 60 60" className="w-full h-full">
              {/* Dhol Drum */}
              <ellipse cx="30" cy="30" rx="22" ry="12" fill="#78350f" stroke="#d4af37" strokeWidth="1.5" />
              <ellipse cx="10" cy="30" rx="4" ry="10" fill="#fef3c7" />
              <ellipse cx="50" cy="30" rx="4" ry="10" fill="#fef3c7" />
              <line x1="10" y1="22" x2="50" y2="38" stroke="#fef08a" strokeWidth="1" />
              <line x1="10" y1="38" x2="50" y2="22" stroke="#fef08a" strokeWidth="1" />
              <circle cx="30" cy="40" r="2" fill="#ef4444" />
              <circle cx="34" cy="40" r="2" fill="#10b981" />
            </svg>
          </div>
        );
      case 'wedding':
        return (
          <div className="w-12 h-12 relative flex items-center justify-center">
            <svg viewBox="0 0 60 60" className="w-full h-full">
              {/* Sacred Fire Kundam */}
              <polygon points="12,42 48,42 42,50 18,50" fill="#78350f" stroke="#ca8a04" strokeWidth="1" />
              <polygon points="16,36 44,36 40,42 20,42" fill="#a16207" />
              <path d="M30 14 C34 22 40 28 36 36 C30 34 27 28 30 14 Z" fill="#ef4444" />
              <path d="M28 20 C32 26 36 30 33 36 C29 34 26 30 28 20 Z" fill="#f59e0b" />
              <circle cx="30" cy="27" r="3" fill="#fef08a" />
            </svg>
          </div>
        );
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 max-w-xl mx-auto relative z-20">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <p className="text-[11px] sm:text-[12px] tracking-[0.25em] text-[#997b19] uppercase font-cinzel font-bold">
          Four Days of Celebration
        </p>
        <div className="flex items-center justify-center gap-3 my-1">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#d4af37]" />
          <h2 className="text-3xl sm:text-4xl font-script text-[#5c0617]">
            The Festivities
          </h2>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#d4af37]" />
        </div>
        <p className="text-[12px] sm:text-[13px] text-[#78543e] italic font-serif">
          Tap on each ceremony card on the right to interact & reveal surprises!
        </p>
      </motion.div>

      {/* Vertical Timeline */}
      <div className="relative pl-6 sm:pl-8 space-y-10">
        {/* Continuous Vertical Golden Line */}
        <div className="absolute left-[11px] sm:left-[15px] top-4 bottom-6 w-[2px] bg-gradient-to-b from-[#d4af37] via-[#b38728] to-[#d4af37]" />

        {weddingConfig.events.map((event, idx) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="relative flex items-start justify-between gap-3 sm:gap-4"
          >
            {/* Timeline Golden Circular Dot */}
            <div className="absolute -left-6 sm:-left-8 top-1 w-6 h-6 rounded-full bg-[#fdfaf3] border-2 border-[#b38728] flex items-center justify-center shadow-sm">
              <div className="w-2.5 h-2.5 rounded-full bg-[#b38728]" />
            </div>

            {/* Event Text Info */}
            <div className="flex-1 pr-2">
              {/* Date Tag */}
              <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-[#997b19] font-cinzel uppercase block">
                {event.day}
              </span>

              {/* Title & Subtitle */}
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#5c0617] mt-0.5">
                {event.title}
              </h3>
              <p className="text-[12px] sm:text-[13px] text-[#78543e] font-medium italic -mt-0.5">
                {event.subTitle}
              </p>

              {/* Time & Venue */}
              <p className="text-[11px] sm:text-[12px] text-[#4a3528] mt-1 font-sans font-medium">
                {event.time} · <span className="font-semibold text-[#800a22]">{event.venue}</span>
              </p>

              {/* Dress code removed per update (display intentionally omitted) */}

              {/* Poetic Quote */}
              <p className="text-[11px] sm:text-[12px] italic text-[#6b4e3d] font-serif mt-1">
                {event.quote}
              </p>

              {/* Add to Calendar Button */}
              <button
                type="button"
                onClick={() => handleAddToCalendar(event)}
                className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#800a22]/40 text-[#800a22] hover:bg-[#800a22] hover:text-[#fbf5b7] text-[10px] sm:text-[11px] font-cinzel font-bold tracking-wider uppercase transition-all duration-300 shadow-sm cursor-pointer"
              >
                <CalendarPlus className="w-3 h-3" /> + Add to Calendar
              </button>
            </div>

            {/* Interactive Mini-Card Thumbnail on Right */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.06, rotate: 1 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => {
                setSelectedEventId(event.id);
                setActiveModal(event.interactionType);
              }}
              className="w-20 sm:w-24 flex-shrink-0 flex flex-col items-center justify-center p-2 rounded-2xl bg-gradient-to-b from-[#fffcf2] via-[#fff9e6] to-[#fef5d8] border-2 border-[#d4af37] shadow-lg group cursor-pointer text-center relative overflow-hidden"
            >
              {/* Shimmer overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              {/* Mini Illustration Artwork */}
              <div className="mb-1">
                {renderThumbnailArtwork(event.interactionType)}
              </div>

              {/* Interactive Badge */}
              <div className="bg-[#5c0617] text-[#fbf5b7] px-2 py-0.5 rounded-full flex items-center justify-center gap-0.5 shadow-sm">
                <Sparkles className="w-2.5 h-2.5" />
                <span className="text-[9px] sm:text-[10px] font-bold tracking-wider uppercase leading-tight">
                  Reveal
                </span>
              </div>
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Modals for Interactive Experiences */}
      <InteractiveHaldiModal
        isOpen={activeModal === 'haldi'}
        selectedEventId={selectedEventId || undefined}
        onClose={() => {
          setActiveModal(null);
          setSelectedEventId(null);
        }}
      />
      <InteractiveMehndiModal
        isOpen={activeModal === 'mehndi'}
        selectedEventId={selectedEventId || undefined}
        onClose={() => {
          setActiveModal(null);
          setSelectedEventId(null);
        }}
      />
      <InteractiveSangeetModal
        isOpen={activeModal === 'sangeet'}
        selectedEventId={selectedEventId || undefined}
        onClose={() => {
          setActiveModal(null);
          setSelectedEventId(null);
        }}
      />
      <InteractiveWeddingModal
        isOpen={activeModal === 'wedding'}
        selectedEventId={selectedEventId || undefined}
        onClose={() => {
          setActiveModal(null);
          setSelectedEventId(null);
        }}
      />
    </section>
  );
};
