import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarPlus, Navigation, Send, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { weddingConfig } from '../config/weddingConfig';
import { generateGoogleCalendarUrl } from '../utils/calendar';
import { soundManager } from '../utils/sounds';

interface Props {
  selectedTeam: 'bride' | 'groom' | null;
}

export const RSVPSection: React.FC<Props> = ({ selectedTeam }) => {
  const [guestName, setGuestName] = useState<string>('');
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [guestCount, setGuestCount] = useState<number>(2);
  const eventTitles = weddingConfig.events.map(e => e.title);
  const [selectedEvents, setSelectedEvents] = useState<string[]>(eventTitles.slice(0, 2));
  const [message, setMessage] = useState<string>('');

  const toggleEvent = (eventTitle: string) => {
    if (selectedEvents.includes(eventTitle)) {
      if (selectedEvents.length > 1) {
        setSelectedEvents(selectedEvents.filter(e => e !== eventTitle));
      }
    } else {
      setSelectedEvents([...selectedEvents, eventTitle]);
    }
  };

  const handleMainAddToCalendar = () => {
    const weddingEvent = weddingConfig.events.find(e => e.id === 'wedding');
    const start = weddingEvent ? weddingEvent.calendarDate.start : weddingConfig.weddingDetails.countdownTarget.replace(/[-:]/g, '').split('+')[0];
    const end = weddingEvent ? weddingEvent.calendarDate.end : start;
    const calendarUrl = generateGoogleCalendarUrl(
      `Wedding: ${weddingConfig.groom.name} & ${weddingConfig.bride.name}`,
      `${weddingConfig.weddingDetails.title}\nVenue: ${weddingConfig.weddingDetails.venueName}, ${weddingConfig.weddingDetails.place}`,
      weddingConfig.weddingDetails.fullAddress,
      start,
      end
    );
    window.open(calendarUrl, '_blank');
  };

  const handleGetDirections = () => {
    window.open(weddingConfig.weddingDetails.googleMapsDirectionUrl, '_blank');
  };

  const handleSendWhatsAppRSVP = (e: React.FormEvent) => {
    e.preventDefault();

    if (!guestName.trim()) {
      alert('Please enter your name to confirm your RSVP.');
      return;
    }

    soundManager.playTempleBell();
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#22c55e', '#d4af37', '#ec4899', '#5c0617']
    });

    const attendingText = attending === 'yes' ? 'Joyfully Yes! 🎉' : 'Regretfully No 🙏';
    const teamText = selectedTeam ? (selectedTeam === 'bride' ? `Team Bride (${weddingConfig.bride.name}) 💐` : `Team Groom (${weddingConfig.groom.name}) 👑`) : 'Both Groom & Bride 💖';
    const celebrationsText = attending === 'yes' ? selectedEvents.join(', ') : 'None';

    const textPayload = `*Namaste! 🙏 RSVP Confirmation for ${weddingConfig.groom.name} & ${weddingConfig.bride.name}'s Wedding*\n\n` +
      `👤 *Guest Name:* ${guestName}\n` +
      `✨ *Attending:* ${attendingText}\n` +
      (attending === 'yes' ? `👥 *Number of Guests:* ${guestCount}\n` : '') +
      (attending === 'yes' ? `🎊 *Attending Events:* ${celebrationsText}\n` : '') +
      `🏅 *Cheering For:* ${teamText}\n` +
            (message.trim() ? `💌 *Blessings/Message:* "${message.trim()}"\n\n` : '\n') +
          `_Looking forward to celebrating at ${weddingConfig.weddingDetails.venueName}, ${weddingConfig.weddingDetails.place}!_`;

    const encodedText = encodeURIComponent(textPayload);
    const whatsappUrl = `https://wa.me/${weddingConfig.weddingDetails.whatsappNumber}?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="rsvp-section" className="py-12 px-4 sm:px-6 max-w-lg mx-auto relative z-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="rounded-3xl bg-[#fffdfa] p-6 sm:p-8 shadow-2xl border-2 border-[#d4af37]/70 ornate-frame"
      >
        {/* Title & Subtitle */}
        <div className="text-center mb-6">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#5c0617]">
            Will you join us?
          </h2>
          <p className="text-[12px] sm:text-[13px] text-[#78543e] font-serif mt-1">
            Kindly reply by <span className="font-semibold text-[#800a22]">{weddingConfig.weddingDetails.rsvpDeadline}</span>.
          </p>
          <p className="text-[11px] text-[#997b19] font-medium mt-0.5">
            Your response opens straight in WhatsApp.
          </p>

          {/* Quick Action Pill Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-4">
            <button
              type="button"
              onClick={handleMainAddToCalendar}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border-2 border-[#800a22] text-[#800a22] hover:bg-[#800a22] hover:text-[#fbf5b7] text-[11px] font-cinzel font-bold tracking-wider uppercase transition-all shadow-sm"
            >
              <CalendarPlus className="w-3.5 h-3.5" /> + Add Wedding To Calendar
            </button>
            <button
              type="button"
              onClick={handleGetDirections}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border-2 border-[#800a22] text-[#800a22] hover:bg-[#800a22] hover:text-[#fbf5b7] text-[11px] font-cinzel font-bold tracking-wider uppercase transition-all shadow-sm"
            >
              <Navigation className="w-3.5 h-3.5" /> Directions
            </button>
          </div>
        </div>

        {/* RSVP Form */}
        <form onSubmit={handleSendWhatsAppRSVP} className="space-y-5">
          {/* Guest Name */}
          <div>
            <label className="block text-[11px] font-cinzel font-bold text-[#800a22] tracking-wider uppercase mb-1.5">
              Your Name
            </label>
            <input
              type="text"
              required
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="e.g. Lakshmi Iyer"
              className="w-full px-4 py-2.5 rounded-xl border border-[#d4af37]/60 bg-[#fdfbf7] text-[#4a3528] placeholder-[#9c8273] focus:outline-none focus:ring-2 focus:ring-[#800a22]/50 font-sans text-[13px]"
            />
          </div>

          {/* Attendance Toggle */}
          <div>
            <label className="block text-[11px] font-cinzel font-bold text-[#800a22] tracking-wider uppercase mb-1.5">
              Will You Attend?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAttending('yes')}
                className={`py-2.5 px-3 rounded-xl font-cinzel font-bold text-[12px] uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  attending === 'yes'
                    ? 'bg-[#15803d] text-white shadow-md ring-2 ring-[#15803d]/30'
                    : 'bg-[#f5eee6] text-[#78543e] hover:bg-[#ebdccf]'
                }`}
              >
                <Check className="w-4 h-4" /> Joyfully yes
              </button>
              <button
                type="button"
                onClick={() => setAttending('no')}
                className={`py-2.5 px-3 rounded-xl font-cinzel font-bold text-[12px] uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  attending === 'no'
                    ? 'bg-[#78350f] text-white shadow-md'
                    : 'bg-[#f5eee6] text-[#78543e] hover:bg-[#ebdccf]'
                }`}
              >
                Regretfully no
              </button>
            </div>
          </div>

          {/* If Attending: Guest Count & Celebrations */}
          {attending === 'yes' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-4 pt-1"
            >
              {/* Number of Guests */}
              <div>
                <label className="block text-[11px] font-cinzel font-bold text-[#800a22] tracking-wider uppercase mb-1.5">
                  Number of Guests
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setGuestCount(count)}
                      className={`flex-1 py-2 rounded-lg font-cinzel font-bold text-[12px] transition-all ${
                        guestCount === count
                          ? 'bg-[#5c0617] text-[#fbf5b7] shadow-md'
                          : 'bg-[#f5eee6] text-[#4a3528] hover:bg-[#ebdccf]'
                      }`}
                    >
                      {count === 5 ? '5+' : count}
                    </button>
                  ))}
                </div>
              </div>

              {/* Celebrations Chips */}
              <div>
                <label className="block text-[11px] font-cinzel font-bold text-[#800a22] tracking-wider uppercase mb-1.5">
                  Which Celebrations? (tap all that apply)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {weddingConfig.events.map((evt) => {
                    const item = evt.title;
                    const isSelected = selectedEvents.includes(item);
                    return (
                      <button
                        key={evt.id}
                        type="button"
                        onClick={() => toggleEvent(item)}
                        className={`py-2 px-3 rounded-xl text-[12px] font-cinzel font-bold transition-all flex items-center justify-center gap-1.5 ${
                          isSelected
                            ? 'bg-[#f59e0b] text-[#451a03] shadow-sm font-extrabold border border-[#d97706]'
                            : 'bg-[#f5eee6] text-[#6b4e3d] opacity-75'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* Blessings / Warm Message */}
          <div>
            <label className="block text-[11px] font-cinzel font-bold text-[#800a22] tracking-wider uppercase mb-1.5">
              Blessings / Message for the Couple
            </label>
            <textarea
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Write a warm wish for ${weddingConfig.groom.name} & ${weddingConfig.bride.name}...`}
              className="w-full px-4 py-2 rounded-xl border border-[#d4af37]/60 bg-[#fdfbf7] text-[#4a3528] placeholder-[#9c8273] focus:outline-none focus:ring-2 focus:ring-[#800a22]/50 font-sans text-[13px]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#15803d] via-[#16a34a] to-[#15803d] text-white font-cinzel font-bold text-[13px] tracking-widest uppercase shadow-xl hover:shadow-2xl hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 border border-green-400"
          >
            <Send className="w-4 h-4" /> Send via WhatsApp
          </button>
        </form>
      </motion.div>
    </section>
  );
};
