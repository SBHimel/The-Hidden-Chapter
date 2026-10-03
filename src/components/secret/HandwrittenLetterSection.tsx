'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, X, BookOpen } from 'lucide-react';

export default function HandwrittenLetterSection() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent background scrolling and handle escape key when lightbox is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="w-full max-w-3xl mx-auto mt-12 space-y-8 text-center">
      {/* Archival Section Divider & Header */}
      <div className="flex items-center gap-4 py-2">
        <div className="h-[1px] flex-1 bg-[#A9824A]/25" />
        <span className="text-xs font-mono uppercase tracking-widest text-[#C9A45C] flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5 text-[#A9824A]" />
          <span>— আসল পাতাটি —</span>
        </span>
        <div className="h-[1px] flex-1 bg-[#A9824A]/25" />
      </div>

      {/* Storytelling / Context */}
      <div className="space-y-2.5 max-w-xl mx-auto px-4">
        <h2 className="text-xl sm:text-2xl font-serif text-[#F3E7CC] tracking-wide leading-relaxed">
          শব্দের বাইরে, আরেকটি পৃষ্ঠা
        </h2>
        <p className="text-xs sm:text-sm text-[#A99A7C] font-light leading-relaxed">
          কিছু কথা শুধু পড়ার জন্য নয়—কখনো কখনো তাদের অন্য একটি রূপও রেখে দিতে ইচ্ছে করে।
        </p>
      </div>

      {/* Centered Antique Image Preview Card */}
      <div className="flex flex-col items-center justify-center pt-2">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => setIsOpen(true)}
          className="group relative cursor-pointer max-w-xs sm:max-w-sm w-full p-2.5 sm:p-3 rounded-2xl bg-[#211C16] border border-[#A9824A]/35 hover:border-[#C9A45C]/60 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_0_30px_rgba(201,164,92,0.25)] transition-all duration-300 overflow-hidden"
          style={{
            background:
              'radial-gradient(ellipse at 50% 20%, #2b1f15 0%, #1a130d 70%, #12110E 100%)',
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsOpen(true);
            }
          }}
          aria-label="হাতে লেখা চিঠির মূল পাতাটি বড় করে দেখুন"
        >
          {/* Subtle Brass Corner Accents */}
          <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-[#A9824A]/50 border border-[#C9A45C]/60 pointer-events-none" />
          <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#A9824A]/50 border border-[#C9A45C]/60 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-[#A9824A]/50 border border-[#C9A45C]/60 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-[#A9824A]/50 border border-[#C9A45C]/60 pointer-events-none" />

          {/* Antique Image Matting Frame */}
          <div className="relative rounded-xl overflow-hidden border border-[#A9824A]/20 bg-[#12110E]">
            <img
              src="/assets/letter.jpg"
              alt="হাতে লেখা চিঠির মূল পৃষ্ঠা"
              className="w-full h-auto object-contain block select-none transition-transform duration-500 group-hover:brightness-105"
            />

            {/* Subtle Hover Overlay with Magnify Indicator */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#12110E]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
              <span className="flex items-center gap-1.5 text-xs font-serif text-[#F3E7CC] bg-[#211C16]/90 px-3 py-1 rounded-full border border-[#C9A45C]/40 shadow-lg">
                <ZoomIn className="w-3.5 h-3.5 text-[#C9A45C]" />
                <span>বড় করে দেখুন</span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* Small Hint Below Image */}
        <p className="mt-3 text-xs font-serif text-[#A99A7C] flex items-center gap-1.5 tracking-wide">
          <ZoomIn className="w-3 h-3 text-[#C9A45C]/70" />
          <span>ছবিটিতে ক্লিক করলে বড় করে দেখা যাবে</span>
        </p>
      </div>

      {/* Archival Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="হাতে লেখা চিঠি"
          >
            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[92vh] max-w-[94vw] flex flex-col items-center p-2 sm:p-4 rounded-2xl bg-[#12110E] border border-[#A9824A]/50 shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
            >
              {/* Top Archival Bar with Close Button */}
              <div className="w-full flex items-center justify-between pb-2 sm:pb-3 px-2 border-b border-[#A9824A]/25 mb-2">
                <div className="flex items-center gap-2 text-xs font-serif text-[#C9A45C]">
                  <BookOpen className="w-3.5 h-3.5 text-[#A9824A]" />
                  <span>মূল হাতে লেখা পাতা</span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full bg-[#211C16] hover:bg-[#3A2A1D] border border-[#A9824A]/40 text-[#A99A7C] hover:text-[#F3E7CC] transition-colors cursor-pointer"
                  aria-label="বন্ধ করুন"
                  title="বন্ধ করুন (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* High-Resolution Unconstrained Image */}
              <div className="relative flex items-center justify-center overflow-auto max-h-[82vh] rounded-lg border border-[#A9824A]/20 bg-[#12110E]">
                <img
                  src="/assets/letter.jpg"
                  alt="মূল হাতে লেখা চিঠি"
                  className="max-h-[80vh] max-w-[90vw] w-auto h-auto object-contain block select-none shadow-2xl"
                />
              </div>

              {/* Bottom Subtle Note */}
              <div className="pt-2 text-center">
                <p className="text-[11px] font-serif text-[#A99A7C]/80">
                  বাইরে ক্লিক করুন অথবা Esc চাপুন
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
