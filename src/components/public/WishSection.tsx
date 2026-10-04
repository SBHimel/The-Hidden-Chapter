'use client';

import { motion } from 'framer-motion';
import { Sun, Compass, Feather, Star as StarIcon, Smile, Shield, Eye, Moon, VolumeX } from 'lucide-react';


const WISHES = [
  {
    icon: Sun,
    title: 'প্রতিটি পদক্ষেপে শান্তি',
    message: 'প্রতিটি সকাল তোমার জন্য নিয়ে আসুক স্বচ্ছতা, আর প্রতিটি সন্ধ্যা রেখে যাক শান্তি ও তৃপ্তির অনুভূতি।',
  },
  {
    icon: Compass,
    title: 'পথচলায় সাহস ও দিশা',
    message: 'জীবনের পথ যেদিকেই নিয়ে যাক, প্রতিটি কঠিন সময়ে তুমি নিজের শক্তি খুঁজে পাও—আর প্রতিটি মোড়ে কল্যাণের পথ দেখতে পাও।',
  },
  {
    icon: StarIcon,
    title: 'নীরব অর্জনগুলোও মূল্যবান',
    message: 'সব অর্জনের সাক্ষী সবাই হয় না। কিছু জয় নীরবে আসে, আর সেই নীরব অধ্যবসায়ই একদিন সুন্দর একটি জীবন গড়ে তোলে।',
  },
  {
    icon: Smile,
    title: 'ছোট ছোট আনন্দ',
    message: 'এক কাপ চা, বৃষ্টির বিকেল, প্রিয় কোনো বই, একটুখানি হাসি—জীবনের সুন্দর মুহূর্তগুলো এমনই ছোট হয়, অথচ মনে থেকে যায় অনেকদিন।',
  },
  {
    icon: Shield,
    title: 'হালালের পথে থাকা',
    message: '"যে মানুষ নিজের ইচ্ছা ও অনুভূতিকেও সংযত রেখে হালাল পথ বেছে নেয়, তার সেই আত্মসংযয়কে সম্মান করা উচিত। কিছু অপেক্ষা দুর্বলতার নয়, বরং বিশ্বাসের পরিচয়।"',
  },
  {
    icon: Eye,
    title: 'সম্মান, বিচার নয়',
    message: '"কারও বিশ্বাস, সংযম কিংবা নিজের জন্য বেছে নেওয়া সীমারেখাকে উপহাস না করে সম্মান করা—এটিও সুন্দর চরিত্রের অংশ।"',
  },
  {
    icon: Moon,
    title: 'আল্লাহর সন্তুষ্টিই আগে',
    message: '"মানুষের প্রশংসার চেয়ে আল্লাহর সন্তুষ্টিকে প্রাধান্য দেওয়া—জীবনের কিছু সিদ্ধান্তকে হয়তো কঠিন করে তোলে, কিন্তু সেই সিদ্ধান্তের মূল্যও আলাদা।"',
  },
  {
    icon: VolumeX,
    title: 'নীরবতারও মূল্য আছে',
    message: '"সব অনুভূতির প্রকাশ প্রয়োজন হয় না। কখনো নীরব থাকা, নিজেকে সংযত রাখা এবং আল্লাহর সন্তুষ্টির জন্য সঠিক পথ বেছে নেওয়াও একজন মানুষের সুন্দর আত্মসংযয়ের পরিচয়।"',
  },
];

export default function WishSection() {
  return (
    <section className="py-20 px-6 max-w-5xl mx-auto space-y-12">
      <div className="text-center space-y-3">
        <h2 className="text-2xl sm:text-3xl font-serif text-[#F3E7CC]">
          আগামী দিনগুলোর জন্য কিছু শুভকামনা
        </h2>
        <p className="text-sm text-[#A99A7C]">
          কিছু সহজ কথা, কিছু আন্তরিক শুভকামনা—আজকের এই ছোট্ট আয়োজনের জন্য।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {WISHES.map((wish, index) => {
          const Icon = wish.icon;
          return (
            <motion.div
              key={wish.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 sm:p-8 rounded-xl bg-[#211C16] border border-[#A9824A]/20 hover:border-[#A9824A]/40 transition-all group space-y-4 shadow-lg shadow-black/40"
            >
              <div className="w-10 h-10 rounded-lg bg-[#3A2A1D]/60 flex items-center justify-center text-[#C9A45C] group-hover:bg-[#A9824A]/20 transition-colors">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif text-[#F3E7CC] group-hover:text-[#C9A45C] transition-colors">
                {wish.title}
              </h3>
              <p className="text-sm text-[#A99A7C] font-light leading-relaxed">
                {wish.message}
              </p>
            </motion.div>
          );
        })}
      </div>

      <div className="p-8 rounded-xl bg-[#1A1612] border border-[#A9824A]/15 text-center space-y-4 max-w-2xl mx-auto mt-12">
        <h3 className="text-xl font-serif text-[#F3E7CC]">শেষে শুধু এটুকু</h3>
        <p className="text-sm text-[#A99A7C] leading-relaxed">
          "মনে হতে পারে হয়তো এখানেই শেষ, কিন্তু এই ওয়েবসাইট এক বিশাল মায়াজাল। এর প্রতিটি কোণে লুকিয়ে আছে বহু অনাবিষ্কৃত পথ... যা সময়ের সাথে একটু একটু করে মেলবে তার আসল রূপ।"
        </p>
        <p className="text-xs text-[#C9A45C] tracking-widest uppercase font-mono">
          — বাকিটুকু হয়তো সময়ই বলবে —
        </p>
      </div>
    </section>
  );
}
