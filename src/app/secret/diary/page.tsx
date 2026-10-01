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
    markStepComplete('room');
    setStep('room');
    router.push('/secret/room');
  };

  return (
    <div className="min-h-[calc(100vh-60px)] flex flex-col items-center justify-center px-4 sm:px-6 py-12">
      <div className="max-w-3xl w-full space-y-6 text-center">
        {/* Header */}
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C9A45C]">
            Fragment III / VIII
          </span>
          <h1 className="text-3xl font-serif text-[#F3E7CC]">
            The Forgotten Journal
          </h1>
          <p className="text-xs text-[#A99A7C] font-light">
            Flip through the preserved pages. Pull the red ribbon bookmark on page 3 to reveal the cipher.
          </p>
        </div>

        {/* Book Container */}
        <div className="relative rounded-2xl bg-[#211C16] border border-[#A9824A]/40 shadow-2xl p-6 sm:p-10 min-h-[380px] flex flex-col justify-between text-left space-y-6">
          {/* Red Bookmark Ribbon */}
          <button
            onClick={handlePullBookmark}
            title="Pull Ribbon Bookmark"
            className={`absolute top-0 right-8 w-6 h-20 transition-all duration-300 rounded-b-md shadow-md flex items-end justify-center pb-2 ${
              isBookmarkPulled
                ? 'bg-[#A9824A] text-[#12110E] h-24'
                : 'bg-red-900/80 hover:bg-red-800 text-red-200 hover:h-24'
            }`}
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>

          {/* Page Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPageIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 pr-8"
            >
              <div className="flex items-center justify-between border-b border-[#A9824A]/20 pb-3">
                <span className="text-xs font-mono text-[#C9A45C]">
                  Page {currentPage.pageNumber} of {DIARY_PAGES.length}
                </span>
                <span className="text-xs font-serif text-[#A99A7C]">
                  {currentPage.date}
                </span>
              </div>

              <h3 className="text-xl font-serif text-[#F3E7CC]">
                {currentPage.title}
              </h3>

              <div className="space-y-3 font-serif text-sm sm:text-base text-[#F3E7CC]/90 leading-relaxed">
                {currentPage.content.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {currentPage.marginNote && (
                <div className="pt-2 border-t border-dashed border-[#A9824A]/20">
                  <span className="text-xs italic font-serif text-[#C9A45C]">
                    Margin note: "{currentPage.marginNote}"
                  </span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-[#A9824A]/20 text-xs">
            <button
              onClick={() => setCurrentPageIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentPageIndex === 0}
              className="flex items-center gap-1 px-3 py-1.5 rounded bg-[#12110E] border border-[#A9824A]/20 text-[#A99A7C] hover:text-[#F3E7CC] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Page</span>
            </button>

            <button
              onClick={() =>
                setCurrentPageIndex((prev) => Math.min(DIARY_PAGES.length - 1, prev + 1))
              }
              disabled={currentPageIndex === DIARY_PAGES.length - 1}
              className="flex items-center gap-1 px-3 py-1.5 rounded bg-[#12110E] border border-[#A9824A]/20 text-[#A99A7C] hover:text-[#F3E7CC] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <span>Next Page</span>
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
              className="p-6 rounded-xl bg-[#3A2A1D]/60 border border-[#C9A45C]/40 text-left space-y-2 shadow-lg"
            >
              <div className="flex items-center gap-2 text-[#C9A45C]">
                <CheckCircle2 className="w-5 h-5" />
                <h3 className="font-serif text-sm font-semibold">
                  Bookmark Cipher Discovered
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#F3E7CC]">
                Inside the ribbon thread is woven a hidden number.
              </p>
              <div className="p-2 bg-[#12110E] rounded border border-[#A9824A]/30 text-center font-mono text-xs text-[#C9A45C]">
                Key Digit #3: <span className="font-bold text-sm text-[#F3E7CC]">9</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next Action */}
        <div>
          <button
            onClick={handleNext}
            disabled={!isBookmarkPulled}
            className={`px-8 py-3.5 rounded-full font-medium text-sm border transition-all duration-300 flex items-center gap-3 mx-auto shadow-xl ${
              isBookmarkPulled
                ? 'bg-[#3A2A1D] hover:bg-[#A9824A] text-[#F3E7CC] hover:text-[#12110E] border-[#A9824A]/50 hover:scale-105 cursor-pointer'
                : 'bg-[#12110E]/40 border-[#A9824A]/20 text-[#A99A7C]/40 cursor-not-allowed'
            }`}
          >
            <span>Proceed to Fragment IV (Candlelit Desk)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          {!isBookmarkPulled && (
            <p className="text-xs text-[#A99A7C]/60 mt-3 italic font-mono">
              (Pull the red bookmark ribbon on top right of the diary to proceed)
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
