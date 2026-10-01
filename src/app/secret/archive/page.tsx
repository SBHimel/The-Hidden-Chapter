'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight, Calendar, Lock, Unlock, CheckCircle2 } from 'lucide-react';
import { useSecretJourney } from '@/context/SecretJourneyContext';
import { TIMELINE_MEMORIES, TimelineNode } from '@/data/journeyData';

export default function ArchivePage() {
  const router = useRouter();
  const { unlockClue, markStepComplete, setStep, discoveredClues } = useSecretJourney();
  const [activeMemory, setActiveMemory] = useState<TimelineNode | null>(TIMELINE_MEMORIES[0]);
  const [unlockedNodes, setUnlockedNodes] = useState<Record<string, boolean>>({
    m1: true,
    m2: true,
    m3: discoveredClues['archive'] || false,
  });

  const handleUnlockNode = (node: TimelineNode) => {
    setUnlockedNodes((prev) => ({ ...prev, [node.id]: true }));
    setActiveMemory(node);
    if (node.id === 'm3') {
      unlockClue('archive');
    }
  };

  const isAllUnlocked = unlockedNodes['m1'] && unlockedNodes['m2'] && unlockedNodes['m3'];

  const handleNext = () => {
    markStepComplete('locked-door');
    setStep('locked-door');
    router.push('/secret/locked-door');
  };

  return (
    <div className="min-h-[calc(100vh-60px)] flex flex-col items-center justify-center px-4 sm:px-6 py-12">
      <div className="max-w-3xl w-full space-y-8 text-center">
        {/* Header */}
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C9A45C]">
            Fragment V / VIII
          </span>
          <h1 className="text-3xl font-serif text-[#F3E7CC]">
            The Timeline of Unspoken Moments
          </h1>
          <p className="text-xs text-[#A99A7C] font-light">
            Each milestone represents a silent chapter. Click each memory node to reveal its history.
          </p>
        </div>

        {/* Timeline Grid & Inspector */}
        <div className="space-y-6">
          {/* Node List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TIMELINE_MEMORIES.map((node) => {
              const isUnlocked = unlockedNodes[node.id];
              const isActive = activeMemory?.id === node.id;

              return (
                <motion.div
                  key={node.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleUnlockNode(node)}
                  className={`cursor-pointer p-5 rounded-xl border text-left transition-all duration-300 space-y-2 shadow-lg ${
                    isActive
                      ? 'bg-[#3A2A1D] border-[#C9A45C]'
                      : isUnlocked
                      ? 'bg-[#211C16] border-[#A9824A]/30 hover:border-[#A9824A]/60'
                      : 'bg-[#12110E] border-[#A9824A]/20 opacity-70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#C9A45C] flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {node.date}
                    </span>
                    {isUnlocked ? (
                      <Unlock className="w-3.5 h-3.5 text-[#C9A45C]" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-[#A99A7C]" />
                    )}
                  </div>
                  <h3 className="font-serif text-sm text-[#F3E7CC]">
                    {node.title}
                  </h3>
                  <p className="text-xs text-[#A99A7C] line-clamp-2">
                    {node.snippet}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Active Memory Detail View */}
          <AnimatePresence mode="wait">
            {activeMemory && (
              <motion.div
                key={activeMemory.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="p-8 rounded-2xl bg-[#211C16] border border-[#A9824A]/40 text-left space-y-4 shadow-2xl relative"
              >
                <div className="flex items-center justify-between border-b border-[#A9824A]/20 pb-3">
                  <div>
                    <span className="text-xs font-mono text-[#C9A45C]">
                      {activeMemory.date}
                    </span>
                    <h3 className="text-xl font-serif text-[#F3E7CC]">
                      {activeMemory.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#F3E7CC]/90 font-serif leading-relaxed italic">
                  "{activeMemory.fullMemory}"
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* All Unlocked Confirmation */}
        <AnimatePresence>
          {isAllUnlocked && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-xl bg-[#3A2A1D]/60 border border-[#C9A45C]/40 text-left space-y-2 shadow-lg"
            >
              <div className="flex items-center gap-2 text-[#C9A45C]">
                <CheckCircle2 className="w-5 h-5" />
                <h3 className="font-serif text-sm font-semibold">
                  Memory Timeline Complete
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#F3E7CC]">
                The path to the final door is now clear. Prepare your cipher digits (`7392`).
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next Action */}
        <div>
          <button
            onClick={handleNext}
            disabled={!isAllUnlocked}
            className={`px-8 py-3.5 rounded-full font-medium text-sm border transition-all duration-300 flex items-center gap-3 mx-auto shadow-xl ${
              isAllUnlocked
                ? 'bg-[#3A2A1D] hover:bg-[#A9824A] text-[#F3E7CC] hover:text-[#12110E] border-[#A9824A]/50 hover:scale-105 cursor-pointer'
                : 'bg-[#12110E]/40 border-[#A9824A]/20 text-[#A99A7C]/40 cursor-not-allowed'
            }`}
          >
            <span>Proceed to the Final Locked Door</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
