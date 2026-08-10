import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { weddingConfig, GalleryItem } from '../config/weddingConfig';

export const LoveStoryGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredGallery = activeCategory === 'all'
    ? weddingConfig.gallery
    : weddingConfig.gallery.filter(item => item.category === activeCategory);

  const handleNext = () => {
    if (!selectedImage) return;
    const currentIndex = weddingConfig.gallery.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % weddingConfig.gallery.length;
    setSelectedImage(weddingConfig.gallery[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedImage) return;
    const currentIndex = weddingConfig.gallery.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + weddingConfig.gallery.length) % weddingConfig.gallery.length;
    setSelectedImage(weddingConfig.gallery[prevIndex]);
  };

  return (
    <section className="py-12 px-4 sm:px-6 max-w-2xl mx-auto relative z-20">
      {/* Story Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <p className="text-[11px] sm:text-[12px] tracking-[0.25em] text-[#997b19] uppercase font-cinzel font-bold">
          Our Journey
        </p>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#5c0617] mt-1">
          How Love Began
        </h2>
        <div className="flex items-center justify-center my-2">
          <Heart className="w-4 h-4 text-[#800a22] fill-current" />
        </div>

        {/* Milestones Horizontal / Vertical Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-left">
          {weddingConfig.storyMilestones.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#fffdfa] rounded-2xl p-5 border border-[#d4af37]/40 shadow-sm relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-cinzel font-bold text-[#5c0617]">{item.year}</span>
                <span className="text-[10px] font-cinzel font-bold tracking-wider text-[#997b19] bg-[#fdf2d0] px-2.5 py-0.5 rounded-full uppercase">
                  {item.tag}
                </span>
              </div>
              <h4 className="text-[15px] font-serif font-bold text-[#5c0617]">{item.title}</h4>
              <p className="text-[12px] text-[#6b4e3d] font-sans mt-1 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Photo Gallery */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <p className="text-[11px] sm:text-[12px] tracking-[0.25em] text-[#997b19] uppercase font-cinzel font-bold">
          Captured Moments
        </p>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#5c0617] mt-1">
          Photo Gallery
        </h2>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 mt-5 mb-6 flex-wrap">
          {['all', 'portraits', 'ceremony', 'memories'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-[11px] font-cinzel font-bold uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? 'bg-[#5c0617] text-[#fbf5b7] shadow-md'
                  : 'bg-[#f5eee6] text-[#78543e] hover:bg-[#ebdccf]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {filteredGallery.map((img) => (
            <motion.div
              key={img.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedImage(img)}
              className="relative aspect-square rounded-2xl overflow-hidden shadow-md cursor-pointer group border-2 border-[#d4af37]/40 bg-[#f5eee6]"
            >
              <img
                src={img.url}
                alt={img.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 text-left">
                <span className="text-white text-[11px] font-serif font-medium leading-tight line-clamp-2">
                  {img.caption}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-2xl w-full flex flex-col items-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Lightbox Image */}
              <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-[#d4af37]">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.caption}
                  className="w-full max-h-[70vh] object-contain bg-black/40"
                />
              </div>

              {/* Caption & Controls */}
              <div className="w-full flex items-center justify-between mt-4 px-2 text-white">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <p className="text-[13px] font-serif text-center px-4 italic text-[#fbf5b7]">
                  {selectedImage.caption}
                </p>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
