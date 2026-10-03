'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Home, Sparkles } from 'lucide-react';
import ParchmentLetter from '@/components/secret/ParchmentLetter';
import HandwrittenLetterSection from '@/components/secret/HandwrittenLetterSection';
import LetterReplySection from '@/components/secret/LetterReplySection';

export default function FinalLetterPage() {
  return (
    <div className="min-h-[calc(100vh-60px)] flex flex-col items-center justify-center px-4 sm:px-6 py-12">
      <div className="max-w-4xl w-full space-y-8 text-center">
        {/* Header */}
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C9A45C] flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
            <span>Destination of the Journey</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#F3E7CC]">
            The Unspoken Letter
          </h1>
          <p className="text-xs text-[#A99A7C] font-light">
            Preserved on antique parchment for eternity.
          </p>
        </div>

        {/* Handwritten Original Letter Section */}
        <HandwrittenLetterSection />
        {/* Parchment Letter Component */}
        <ParchmentLetter />


        {/* Reply Section */}
        <LetterReplySection />

        {/* Closing Action */}
        <div className="pt-6 flex justify-center">
          <Link
            href="/"
            className="px-6 py-2.5 rounded-full bg-[#211C16] hover:bg-[#3A2A1D] border border-[#A9824A]/30 text-xs text-[#A99A7C] hover:text-[#F3E7CC] transition-colors flex items-center gap-2"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Public Site</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

