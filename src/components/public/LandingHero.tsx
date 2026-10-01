'use client';

import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

export default function LandingHero() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 px-6 text-center bg-gradient-to-b from-[#12110E] via-[#1A1612] to-[#12110E]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#A9824A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-3xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#A9824A]/30 bg-[#211C16]/50 text-xs tracking-wider uppercase text-[#C9A45C]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
          <span>কিছু কথা, কিছু শুভকামনা</span>
          <span className="text-[#A9824A]/40">•</span>
          <span className="font-mono text-[11px] text-[#A99A7C]">Est. 01/10/2026</span>
        </motion.div>


        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl font-serif tracking-tight text-[#F3E7CC]"
        >
          শুভকামনার একটি <span className="italic text-[#C9A45C]">অধ্যায়</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl text-[#A99A7C] font-light leading-relaxed max-w-2xl mx-auto"
        >
          আজকের এই ছোট্ট আয়োজনটুকু কিছু সুন্দর মুহূর্ত, কিছু আন্তরিক শুভকামনা আর কিছু নীরব কথাকে একসাথে ধরে রাখার একটি ছোট্ট প্রয়াস।{' '}
          <span className="block mt-2 text-base sm:text-lg text-[#A99A7C]/70 italic">তবে সব গল্পের সবটুকু একসাথে দেখা যায় না—কিছু কিছু পৃষ্ঠা হয়তো সময়ের জন্যই রেখে দিতে হয়।</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="pt-4 flex justify-center items-center gap-3 text-sm text-[#A9824A]"
        >
          <Heart className="w-4 h-4 fill-[#A9824A]/30 text-[#A9824A]" />
          <span className="tracking-wide">নিচে এগিয়ে যাও—আরও কিছু কথা অপেক্ষায় আছে</span>
        </motion.div>
      </div>
    </section>
  );
}
