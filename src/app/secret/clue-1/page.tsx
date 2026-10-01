'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useSecretJourney } from '@/context/SecretJourneyContext';

export default function Clue1Page() {
  const router = useRouter();
  const { unlockClue, markStepComplete, setStep, discoveredClues } = useSecretJourney();
  const isUnlocked = discoveredClues['clue-1'];
  const [clickedWord, setClickedWord] = useState(isUnlocked);

  const handleWordClick = () => {
    setClickedWord(true);
    unlockClue('clue-1');
  };

  const handleNext = () => {
    markStepComplete('clue-2');
    setStep('clue-2');
    router.push('/secret/clue-2');
  };

  return (
    <div className="min-h-[calc(100vh-60px)] flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-2xl mx-auto space-y-8 text-center">
        {/* Header */}
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C9A45C]">
            অধ্যায় ১ / ৮
          </span>
          <h1 className="text-3xl font-serif text-[#F3E7CC]">
            নীরবতার ভেতর যে শব্দ থাকে
          </h1>
          <p className="text-xs text-[#A99A7C] font-light">
            মন দিয়ে পড়ো। কিছু শব্দ শুধু পড়ার জন্য থাকে না।
          </p>
        </div>

        {/* Interactive Text Card */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#211C16] border border-[#A9824A]/25 shadow-2xl relative space-y-6 text-left leading-relaxed">
          <p className="text-base sm:text-lg text-[#F3E7CC]/90 font-serif">
            “কখনো কখনো চারপাশের সব শব্দ থেমে গেলেও মনের ভেতর কিছু একটা থেকে যায়। তাকে দেখা যায় না, স্পষ্ট করে শোনাও যায় না—তবু তার উপস্থিতি অস্বীকার করা যায় না।{' '}
            মানুষ সাধারণত উচ্চারণ করা কথাগুলোই মনে রাখে। অথচ কিছু অনুভূতি শব্দের চেয়েও দীর্ঘস্থায়ী হয়। তারা থেকে যায় একটুখানি{' '}
            <span
              onClick={handleWordClick}
              className={`cursor-pointer transition-all duration-300 font-medium px-1 rounded inline-block ${
                clickedWord
                  ? 'text-[#C9A45C] bg-[#A9824A]/20 underline decoration-[#C9A45C]'
                  : 'hover:text-[#C9A45C] hover:bg-[#3A2A1D]/80 border-b border-dashed border-[#A9824A]/40'
              }`}
            >
              নীরবতায়
            </span>
            , ঠিক এমনভাবে—যেন সময় পেরিয়ে গেলেও তাদের অস্তিত্ব মুছে যায় না।”
          </p>

          <p className="text-sm text-[#A99A7C] font-light italic">
            “যা সবচেয়ে সহজে চোখ এড়িয়ে যায়, কখনো কখনো তার মধ্যেই সবচেয়ে বেশি কিছু থেকে যায়।”
          </p>
        </div>

        {/* Revealed Secret Box */}
        <AnimatePresence>
          {clickedWord && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-xl bg-[#3A2A1D]/60 border border-[#C9A45C]/40 text-left space-y-3 shadow-lg"
            >
              <div className="flex items-center gap-2 text-[#C9A45C]">
                <CheckCircle2 className="w-5 h-5" />
                <h3 className="font-serif text-sm font-semibold">
                  প্রথম ইঙ্গিতটি পাওয়া গেছে
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#F3E7CC] leading-relaxed">
                “কিছু শব্দ উচ্চারণ না করেও নিজের চিহ্ন রেখে যায়। তুমি প্রথম ইঙ্গিতটি খুঁজে পেয়েছো।”
              </p>
              <div className="p-2 bg-[#12110E] rounded border border-[#A9824A]/30 text-center font-mono text-xs text-[#C9A45C]">
                প্রথম সংকেতের সংখ্যা: <span className="font-bold text-sm text-[#F3E7CC]">7</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next Chapter Action */}
        <div>
          <button
            onClick={handleNext}
            disabled={!clickedWord}
            className={`px-8 py-3.5 rounded-full font-medium text-sm border transition-all duration-300 flex items-center gap-3 mx-auto shadow-xl ${
              clickedWord
                ? 'bg-[#3A2A1D] hover:bg-[#A9824A] text-[#F3E7CC] hover:text-[#12110E] border-[#A9824A]/50 hover:scale-105 cursor-pointer'
                : 'bg-[#12110E]/40 border-[#A9824A]/20 text-[#A99A7C]/40 cursor-not-allowed'
            }`}
          >
            <span>পরের অধ্যায়ে যাও</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          {!clickedWord && (
            <p className="text-xs text-[#A99A7C]/60 mt-3 italic font-mono">
              (উপরের লেখার একটি শব্দ এখনও তোমার অপেক্ষায় আছে)
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
