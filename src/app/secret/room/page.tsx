'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight, Clock, Mail, Key, CheckCircle2, Sparkles } from 'lucide-react';
import { useSecretJourney } from '@/context/SecretJourneyContext';
import { ROOM_OBJECTS, RoomObject } from '@/data/journeyData';

export default function RoomPage() {
  const router = useRouter();
  const { unlockClue, markStepComplete, setStep, discoveredClues } = useSecretJourney();
  const [selectedObject, setSelectedObject] = useState<RoomObject | null>(null);

  const isKeyFound = discoveredClues['room-key'];

  const handleInspect = (obj: RoomObject) => {
    setSelectedObject(obj);
    if (obj.id === 'key') {
      unlockClue('room-key');
      unlockClue('room');
    }
  };

  const handleNext = () => {
    markStepComplete('archive');
    setStep('archive');
    router.push('/secret/archive');
  };

  return (
    <div className="min-h-[calc(100vh-60px)] flex flex-col items-center justify-center px-4 sm:px-6 py-12">
      <div className="max-w-4xl w-full space-y-8 text-center">
        {/* Header */}
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C9A45C]">
            Fragment IV / VIII
          </span>
          <h1 className="text-3xl font-serif text-[#F3E7CC]">
            The Candlelit Desk
          </h1>
          <p className="text-xs text-[#A99A7C] font-light">
            Touch the objects resting upon the dark mahogany desk to discover the final key digit.
          </p>
        </div>

        {/* Desk Workspace Container */}
        <div className="relative rounded-2xl bg-[#211C16] border border-[#A9824A]/30 shadow-2xl p-8 min-h-[360px] sm:min-h-[420px] flex flex-col items-center justify-center overflow-hidden bg-grain">
          {/* Ambient Candlelight Center Glow */}
          <div className="absolute w-72 h-72 rounded-full bg-[#A9824A]/10 blur-3xl animate-candlelight pointer-events-none" />

          {/* Desk Surface Grid of Objects */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full relative z-10">
            {ROOM_OBJECTS.map((obj) => {
              const Icon = obj.id === 'watch' ? Clock : obj.id === 'envelope' ? Mail : Key;
              const isSelected = selectedObject?.id === obj.id;

              return (
                <motion.div
                  key={obj.id}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleInspect(obj)}
                  className={`cursor-pointer p-6 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center space-y-4 shadow-xl ${
                    isSelected
                      ? 'bg-[#3A2A1D] border-[#C9A45C] shadow-[#A9824A]/30'
                      : 'bg-[#12110E]/80 border-[#A9824A]/25 hover:border-[#A9824A]/60'
                  }`}
                >
                  <div className="w-14 h-14 rounded-full bg-[#211C16] border border-[#A9824A]/40 flex items-center justify-center text-[#C9A45C]">
                    <Icon className="w-6 h-6 animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-sm text-[#F3E7CC]">
                      {obj.name}
                    </h3>
                    <p className="text-[11px] text-[#A99A7C] font-light">
                      Click to inspect
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Selected Object Detail Panel */}
          <AnimatePresence mode="wait">
            {selectedObject && (
              <motion.div
                key={selectedObject.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="mt-8 p-6 rounded-xl bg-[#3A2A1D]/80 border border-[#C9A45C]/40 text-left max-w-lg w-full space-y-3 z-10 shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-[#A9824A]/30 pb-2">
                  <h4 className="font-serif text-base text-[#F3E7CC] font-semibold">
                    {selectedObject.name}
                  </h4>
                  <span className="text-[10px] font-mono text-[#C9A45C] uppercase tracking-wider">
                    INSPECTED
                  </span>
                </div>
                <p className="text-xs text-[#A99A7C] italic">
                  "{selectedObject.description}"
                </p>
                <div className="p-3 bg-[#12110E] rounded border border-[#A9824A]/30 text-xs text-[#F3E7CC] space-y-1">
                  <span className="font-serif text-[#C9A45C]">Discovery Note: </span>
                  <span>{selectedObject.clueText}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Final Cipher Key Summary Banner */}
        <AnimatePresence>
          {isKeyFound && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-xl bg-[#3A2A1D]/60 border border-[#C9A45C]/40 text-left space-y-3 shadow-lg"
            >
              <div className="flex items-center gap-2 text-[#C9A45C]">
                <CheckCircle2 className="w-5 h-5" />
                <h3 className="font-serif text-sm font-semibold">
                  All Four Key Digits Discovered!
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#F3E7CC]">
                You have gathered all digits required for the final locked door lock combination.
              </p>
              <div className="p-3 bg-[#12110E] rounded border border-[#A9824A]/40 flex items-center justify-around font-mono text-sm text-[#C9A45C]">
                <div>Digit #1: <span className="text-[#F3E7CC] font-bold">7</span></div>
                <div>Digit #2: <span className="text-[#F3E7CC] font-bold">3</span></div>
                <div>Digit #3: <span className="text-[#F3E7CC] font-bold">9</span></div>
                <div>Digit #4: <span className="text-[#F3E7CC] font-bold">2</span></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action button */}
        <div>
          <button
            onClick={handleNext}
            disabled={!isKeyFound}
            className={`px-8 py-3.5 rounded-full font-medium text-sm border transition-all duration-300 flex items-center gap-3 mx-auto shadow-xl ${
              isKeyFound
                ? 'bg-[#3A2A1D] hover:bg-[#A9824A] text-[#F3E7CC] hover:text-[#12110E] border-[#A9824A]/50 hover:scale-105 cursor-pointer'
                : 'bg-[#12110E]/40 border-[#A9824A]/20 text-[#A99A7C]/40 cursor-not-allowed'
            }`}
          >
            <span>Proceed to Fragment V (Timeline Archive)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          {!isKeyFound && (
            <p className="text-xs text-[#A99A7C]/60 mt-3 italic font-mono">
              (Inspect the Brass Cabinet Key on the desk to proceed)
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
