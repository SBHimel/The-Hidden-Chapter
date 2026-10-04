'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight, ChevronLeft, ChevronRight, Bookmark, CheckCircle2 } from 'lucide-react';
import { useSecretJourney } from '@/context/SecretJourneyContext';
import { DIARY_PAGES } from '@/data/journeyData';

export default function DiaryPage() {
  const router = useRouter();
  const { unlockClue, markStepComplete, setStep, discoveredClues } = useSecretJourney();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const isBookmarkPulled = discoveredClues['diary'];

  const currentPage = DIARY_PAGES[currentPageIndex];

  const handlePullBookmark = () => {
    unlockClue('diary');
  };

  const handleNext = () => {
    markStepComplete('unsent-letter');
    setStep('unsent-letter');
    router.push('/secret/unsent-letter');
  };

  return (
    <div className="min-h-[calc(100vh-60px)] flex flex-col items-center justify-center px-4 sm:px-6 py-12">
      <div className="max-w-3xl w-full space-y-8 text-center">
        {/* Header */}
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C9A45C]">
            অধ্যায় ৩ / ১১
          </span>
          <h1 className="text-3xl font-serif text-[#F3E7CC]">
            পুরোনো ডায়েরি
          </h1>
          <p className="text-xs text-[#A99A7C] font-light">
            সংরক্ষিত পাতাগুলো পড়ে দেখো। ভেতরের চিহ্নটি পাওয়ার জন্য লাল ফিতাটি একটু টেনে দেখো।
          </p>
        </div>

        {/* Book Container */}
        <div 
          className="relative rounded-2xl bg-[#1C1710] border border-[#A9824A]/30 shadow-2xl p-6 sm:p-10 min-h-[420px] flex flex-col justify-between text-left space-y-6 overflow-hidden"
          style={{
            boxShadow: 'inset 0 0 40px rgba(0,0,0,0.6), 0 10px 30px rgba(0,0,0,0.5)',
          }}
        >
          {/* Subtle paper texture using repeating gradient */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, #C9A45C 0px, transparent 1px, transparent 24px)',
            }}
          />

          {/* Red Bookmark Ribbon */}
          <button
            onClick={handlePullBookmark}
            title={isBookmarkPulled ? "চিহ্নটি পাওয়া গেছে" : "একটু টেনে দেখো"}
            className={`absolute top-0 right-8 w-6 transition-all duration-500 rounded-b-md shadow-[0_4px_12px_rgba(0,0,0,0.5)] flex items-end justify-center pb-2 z-20 ${
              isBookmarkPulled
                ? 'bg-gradient-to-b from-[#A9824A] to-[#8A6A3B] text-[#12110E] h-28'
                : 'bg-gradient-to-b from-red-900/90 to-red-800/90 hover:from-red-800 hover:to-red-700 text-red-200 h-16 hover:h-24'
            }`}
          >
            <Bookmark className="w-4 h-4 fill-current drop-shadow-md" />
          </button>

          {/* Page Content */}
          <div className="relative z-10 flex-grow">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPageIndex}
                initial={{ opacity: 0, rotateY: 5, x: 20, transformOrigin: 'left center' }}
                animate={{ opacity: 1, rotateY: 0, x: 0 }}
                exit={{ opacity: 0, rotateY: -5, x: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="space-y-5 pr-8"
              >
                <div className="flex items-center justify-between border-b border-[#A9824A]/20 pb-3">
                  <span className="text-xs font-mono text-[#C9A45C]">
                    পাতা {currentPage.pageNumber} / {DIARY_PAGES.length}
                  </span>
                  <span className="text-xs font-serif text-[#A99A7C]">
                    {currentPage.date}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif text-[#F3E7CC] tracking-wide">
                  {currentPage.title}
                </h3>

                <div className="space-y-4 font-serif text-sm sm:text-base text-[#F3E7CC]/90 leading-relaxed drop-shadow-sm">
                  {currentPage.content.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>

                {currentPage.marginNote && (
                  <div className="pt-4 mt-4 border-t border-dashed border-[#A9824A]/20">
                    <span 
                      className="text-sm italic font-serif text-[#C9A45C]/80"
                      style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
                    >
                      {currentPage.marginNote}
                    </span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Controls */}
          <div className="relative z-10 flex items-center justify-between pt-4 border-t border-[#A9824A]/20 text-xs">
            <button
              onClick={() => setCurrentPageIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentPageIndex === 0}
              className="flex items-center gap-1 px-4 py-2 rounded bg-[#12110E] border border-[#A9824A]/20 text-[#A99A7C] hover:text-[#F3E7CC] hover:bg-[#2A2118] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>আগের পাতা</span>
            </button>

            <button
              onClick={() =>
                setCurrentPageIndex((prev) => Math.min(DIARY_PAGES.length - 1, prev + 1))
              }
              disabled={currentPageIndex === DIARY_PAGES.length - 1}
              className="flex items-center gap-1 px-4 py-2 rounded bg-[#12110E] border border-[#A9824A]/20 text-[#A99A7C] hover:text-[#F3E7CC] hover:bg-[#2A2118] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <span>পরের পাতা</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Secret Unlocked Banner */}
        <AnimatePresence>
          {isBookmarkPulled && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-xl bg-[#3A2A1D]/60 border border-[#C9A45C]/40 text-left space-y-3 shadow-lg"
            >
              <div className="flex items-center gap-2 text-[#C9A45C]">
                <CheckCircle2 className="w-5 h-5" />
                <h3 className="font-serif text-sm font-semibold">
                  পাতার ভাঁজে রাখা একটি সংকেত
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#F3E7CC] leading-relaxed">
                কিছু কথা পাতায় লেখা থাকে না। কখনো কখনো তারা শুধু একটি ছোট্ট চিহ্ন হয়ে থেকে যায়—যেন পরে ফিরে এসে কেউ বুঝতে পারে, এই জায়গাটায় কিছু একটা ছিল।
              </p>
              <div className="p-2 bg-[#12110E] rounded border border-[#A9824A]/30 text-center font-mono text-xs text-[#C9A45C]">
                তৃতীয় সংকেতের সংখ্যা: <span className="font-bold text-sm text-[#F3E7CC]">9</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next Action */}
        <div className="pt-2">
          <button
            onClick={handleNext}
            disabled={!isBookmarkPulled}
            className={`px-8 py-3.5 rounded-full font-medium text-sm border transition-all duration-300 flex items-center gap-3 mx-auto shadow-xl ${
              isBookmarkPulled
                ? 'bg-[#3A2A1D] hover:bg-[#A9824A] text-[#F3E7CC] hover:text-[#12110E] border-[#A9824A]/50 hover:scale-105 cursor-pointer'
                : 'bg-[#12110E]/40 border-[#A9824A]/20 text-[#A99A7C]/40 cursor-not-allowed'
            }`}
          >
            <span>পরের অধ্যায়ে এগিয়ে যাও</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          {!isBookmarkPulled && (
            <p className="text-xs text-[#A99A7C]/60 mt-4 italic font-mono">
              (পাতার ভাঁজে রাখা সংকেতটি এখনও পাওয়া যায়নি)
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
