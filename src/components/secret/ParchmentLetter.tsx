'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Feather, Edit3, Check, RotateCcw } from 'lucide-react';
import { DEFAULT_BENGALI_LETTER } from '@/data/journeyData';

interface ParchmentLetterProps {
  customLetterText?: string;
}

export default function ParchmentLetter({ customLetterText }: ParchmentLetterProps) {
  const [letterText, setLetterText] = useState(customLetterText || DEFAULT_BENGALI_LETTER);
  const [isEditing, setIsEditing] = useState(false);
  const [draftText, setDraftText] = useState(letterText);

  const handleSaveText = () => {
    setLetterText(draftText);
    setIsEditing(false);
  };

  const handleResetText = () => {
    setDraftText(DEFAULT_BENGALI_LETTER);
    setLetterText(DEFAULT_BENGALI_LETTER);
    setIsEditing(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between px-2 text-xs font-mono text-[#A99A7C]">
        <div className="flex items-center gap-2 text-[#C9A45C]">
          <Feather className="w-4 h-4" />
          <span className="font-serif">The Final Parchment</span>
        </div>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSaveText}
                className="flex items-center gap-1 px-3 py-1 rounded bg-[#A9824A] text-[#12110E] font-medium hover:bg-[#C9A45C] transition-colors"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Text</span>
              </button>
              <button
                onClick={handleResetText}
                className="flex items-center gap-1 px-3 py-1 rounded bg-[#211C16] text-[#A99A7C] hover:text-[#F3E7CC] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Default</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1 px-3 py-1 rounded border border-[#A9824A]/30 bg-[#211C16]/60 text-[#A99A7C] hover:text-[#C9A45C] transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Paste Custom Bengali Text</span>
            </button>
          )}
        </div>
      </div>

      {/* Editor Box mode */}
      {isEditing ? (
        <div className="p-6 rounded-2xl bg-[#211C16] border border-[#A9824A]/40 space-y-4">
          <label className="text-xs font-mono text-[#C9A45C] block">
            Paste your exact Bengali letter content below:
          </label>
          <textarea
            rows={12}
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
            className="w-full p-4 rounded-xl bg-[#12110E] border border-[#A9824A]/30 text-[#F3E7CC] font-serif text-sm sm:text-base leading-relaxed focus:outline-none focus:border-[#C9A45C]"
          />
        </div>
      ) : (
        /* Parchment Display Container */
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-xl p-8 sm:p-14 md:p-16 shadow-2xl overflow-hidden border border-[#A9824A]/40"
          style={{
            backgroundColor: '#D8BD88',
            backgroundImage: `
              radial-gradient(ellipse at center, rgba(243, 231, 204, 0.95) 0%, rgba(216, 189, 136, 0.9) 70%, rgba(169, 130, 74, 0.85) 100%),
              radial-gradient(circle at 20% 30%, rgba(58, 42, 29, 0.04) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(58, 42, 29, 0.04) 0%, transparent 50%)
            `,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9), inset 0 0 80px rgba(58, 42, 29, 0.35)',
          }}
        >
          {/* Subtle Old Paper Texture Lines */}
          <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none" />

          {/* Vignette & Inner Edge Shadows */}
          <div
            className="absolute inset-0 pointer-events-none rounded-xl"
            style={{
              boxShadow: 'inset 0 0 50px rgba(33, 28, 22, 0.4), inset 0 0 10px rgba(58, 42, 29, 0.5)',
            }}
          />

          {/* Real HTML Rendered Bengali Text Layer */}
          <div className="relative z-10 space-y-6 text-[#211C16] font-serif selection:bg-[#3A2A1D] selection:text-[#F3E7CC]">
            {/* Header Stamp / Decorative Seal */}
            <div className="text-center pb-6 border-b border-[#3A2A1D]/20 space-y-2">
              <span className="text-xs font-mono tracking-widest uppercase text-[#3A2A1D]/70">
                — শেষ চিঠি —
              </span>
            </div>

            {/* Paragraphs */}
            <div className="space-y-5 text-base sm:text-lg md:text-xl leading-relaxed sm:leading-loose text-justify font-serif tracking-wide">
              {letterText.split('\n\n').map((paragraph, index) => (
                <p key={index} className="whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Footer Signature line */}
            {/* Footer Signature line */}
<div className="pt-8 border-t border-[#3A2A1D]/20 text-right space-y-1">
  <div className="w-16 h-[1px] bg-[#3A2A1D]/30 ml-auto" />
  
  <p className="text-sm font-serif text-[#3A2A1D]/90 pt-1">
    একটি স্বপ্নে বন্দি অনুভূতি
  </p>
  
  <p className="text-xs font-mono text-[#3A2A1D]/60 tracking-widest">
    ১১ • ০৮ • ২০২৪ থেকে
  </p>
</div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
