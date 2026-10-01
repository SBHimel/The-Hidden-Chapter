'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Flame, Compass } from 'lucide-react';
import { useSecretJourney } from '@/context/SecretJourneyContext';

export default function SecretIntroPage() {
  const router = useRouter();
  const { markStepComplete, setStep } = useSecretJourney();

  const handleBegin = () => {
    markStepComplete('intro');
    markStepComplete('clue-1');
    setStep('clue-1');
    router.push('/secret/clue-1');
  };

  return (
    <div className="min-h-[calc(100vh-60px)] flex flex-col items-center justify-center px-6 py-12 text-center relative overflow-hidden">
      {/* Central Flame Lighting */}
      <div className="w-24 h-24 rounded-full bg-[#A9824A]/20 blur-2xl animate-candlelight absolute" />

      <div className="max-w-2xl mx-auto space-y-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mx-auto w-16 h-16 rounded-full bg-[#211C16] border border-[#A9824A]/40 flex items-center justify-center text-[#C9A45C] shadow-lg shadow-black/80"
        >
          <Flame className="w-8 h-8 animate-candlelight" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="space-y-4"
        >
          <h1 className="text-3xl sm:text-5xl font-serif text-[#F3E7CC] tracking-tight">
            যে কথাগুলো সময়ের কাছে রেখে দেওয়া হয়েছিল
          </h1>
          <p className="text-sm font-mono uppercase tracking-widest text-[#C9A45C]/80">
            — একটি অচেনা অধ্যায়ের শুরু —
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="p-8 rounded-2xl bg-[#211C16]/60 border border-[#A9824A]/20 backdrop-blur-sm shadow-2xl space-y-4"
        >
          <p className="text-base sm:text-lg text-[#F3E7CC]/90 font-serif italic leading-relaxed">
            "প্রতিদিনের ব্যস্ততার আড়ালে কিছু কথা নীরবে থেকে যায়। কিছু মুহূর্ত পেরিয়ে যায়, অথচ তাদের রেখে যাওয়া অনুভূতিগুলো কোথাও হারিয়ে যায় না।{' '}
            তুমি এখন যে জায়গাটায় এসে পৌঁছেছো, সেটি কোনো তাড়াহুড়ো করে পার হয়ে যাওয়ার পথ নয়। এখানে কিছু জিনিস হয়তো বুঝতে সময় লাগবে—কিছু হয়তো শুধু অনুভব করতে হবে।{' '}
            তাই আজ সবকিছুর অর্থ খুঁজে বের করার চেষ্টা কোরো না। শুধু একটু ধীরে এগিয়ে চলো।"
          </p>
          <div className="w-16 h-[1px] bg-[#A9824A]/40 mx-auto" />
          <p className="text-xs text-[#A99A7C] font-light">
            "কিছু ইঙ্গিত হয়তো চোখ এড়িয়ে যাবে। কিছু হয়তো সামনে থেকেও অচেনা মনে হবে। সময় নিয়ে দেখো—সবকিছুর অর্থ একবারে প্রকাশ পায় না।"
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <button
            onClick={handleBegin}
            className="group px-8 py-3.5 rounded-full bg-[#3A2A1D] hover:bg-[#A9824A] text-[#F3E7CC] hover:text-[#12110E] font-medium text-sm border border-[#A9824A]/40 transition-all duration-300 flex items-center gap-3 mx-auto shadow-xl hover:shadow-[#A9824A]/20 hover:scale-105"
          >
            <span>এগিয়ে চলো</span>
            <Compass className="w-4 h-4 text-[#C9A45C] group-hover:text-[#12110E] transition-colors" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
