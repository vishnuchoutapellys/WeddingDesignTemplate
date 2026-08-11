import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Phone, Copy, Check } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

export const VenueMap: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(weddingConfig.weddingDetails.fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-12 px-4 sm:px-6 max-w-lg mx-auto relative z-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="rounded-3xl bg-[#fffdfa] p-6 sm:p-8 shadow-2xl border-2 border-[#d4af37]/70 ornate-frame text-center"
      >
        {/* Title */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <MapPin className="w-5 h-5 text-[#800a22]" />
          <span className="text-[11px] sm:text-[12px] tracking-[0.25em] text-[#997b19] uppercase font-cinzel font-bold">
            The Wedding Venue
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#5c0617]">
          {weddingConfig.weddingDetails.venueName}
        </h2>
        <p className="text-[13px] text-[#78543e] font-serif mt-1">
          {weddingConfig.weddingDetails.place}
        </p>

        {/* Address Card */}
        <div className="mt-4 p-3.5 bg-[#fdfaf3] rounded-2xl border border-[#d4af37]/40 text-center">
          <p className="text-[12px] sm:text-[13px] text-[#4a3528] font-sans">
            {weddingConfig.weddingDetails.fullAddress}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 my-5">
          <a
            href={weddingConfig.weddingDetails.googleMapsDirectionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-[140px] py-2.5 px-4 rounded-xl bg-[#5c0617] text-[#fbf5b7] font-cinzel font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 shadow hover:bg-[#800a22] transition-colors"
          >
            <Navigation className="w-4 h-4" /> Get Directions
          </a>

          {/* Group Copy + Call so they remain side-by-side on small screens */}
          <div className="flex w-full sm:w-auto gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="flex-1 min-w-[140px] py-2.5 px-4 rounded-xl bg-[#f5eee6] text-[#5c0617] font-cinzel font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#ebdccf] transition-colors border border-[#d4af37]/40 whitespace-nowrap"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Address'}
            </button>

            <a
              href={`tel:${weddingConfig.weddingDetails.contactNumber}`}
              className="flex-1 min-w-[140px] py-2.5 px-4 rounded-xl bg-[#f5eee6] text-[#5c0617] font-cinzel font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#ebdccf] transition-colors border border-[#d4af37]/40 whitespace-nowrap"
            >
              <Phone className="w-4 h-4" /> Call: {weddingConfig.weddingDetails.contactNumber}
            </a>
          </div>
        </div>

        {/* Google Maps Iframe */}
        {/* <div className="relative w-full h-56 rounded-2xl overflow-hidden shadow-inner border border-[#d4af37]/40">
          <iframe
            title="Rama Function Hall Bhadrachalam Location Map"
            src={weddingConfig.weddingDetails.googleMapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div> */}
      </motion.div>
    </section>
  );
};
