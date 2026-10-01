export interface DiaryPage {
  pageNumber: number;
  date: string;
  title: string;
  content: string[];
  marginNote?: string;
}

export interface RoomObject {
  id: string;
  name: string;
  description: string;
  clueText: string;
  iconName: string;
  position: { top: string; left: string };
}

export interface TimelineNode {
  id: string;
  date: string;
  title: string;
  snippet: string;
  fullMemory: string;
  isUnlockedDefault: boolean;
}

export interface JourneyChapterData {
  id: string;
  title: string;
  subtitle: string;
  nextRoute: string;
  prevRoute?: string;
}

export const JOURNEY_CHAPTERS: Record<string, JourneyChapterData> = {
  intro: {
    id: 'intro',
    title: 'The Threshold of Silence',
    subtitle: 'Step beyond the visible. What lies here was written slowly, over distant evenings.',
    nextRoute: '/secret/clue-1',
  },
  'clue-1': {
    id: 'clue-1',
    title: 'Fragment I: The Hidden Word',
    subtitle: 'Words carry weight, but only one carries the key to what follows.',
    nextRoute: '/secret/clue-2',
    prevRoute: '/secret/intro',
  },
  'clue-2': {
    id: 'clue-2',
    title: 'Fragment II: The Shadow Locket',
    subtitle: 'Look closely into the reflection to decipher the unspoken combination.',
    nextRoute: '/secret/diary',
    prevRoute: '/secret/clue-1',
  },
  diary: {
    id: 'diary',
    title: 'Fragment III: The Forgotten Journal',
    subtitle: 'Pages preserved from quiet hours. Pull the red ribbon bookmark to continue.',
    nextRoute: '/secret/room',
    prevRoute: '/secret/clue-2',
  },
  room: {
    id: 'room',
    title: 'Fragment IV: The Candlelit Desk',
    subtitle: 'Inspect the objects resting upon the dark mahogany desk.',
    nextRoute: '/secret/archive',
    prevRoute: '/secret/diary',
  },
  archive: {
    id: 'archive',
    title: 'Fragment V: The Timeline of Moments',
    subtitle: 'A chronological tapestry of memories recorded in darkness.',
    nextRoute: '/secret/locked-door',
    prevRoute: '/secret/room',
  },
  'locked-door': {
    id: 'locked-door',
    title: 'The Final Threshold',
    subtitle: 'Enter the four-digit cipher discovered along your journey.',
    nextRoute: '/secret/letter',
    prevRoute: '/secret/archive',
  },
  letter: {
    id: 'letter',
    title: 'The Unspoken Letter',
    subtitle: 'Written on parchment, preserved for eternity.',
    nextRoute: '/',
    prevRoute: '/secret/locked-door',
  },
};

export const DIARY_PAGES: DiaryPage[] = [
  {
    pageNumber: 1,
    date: '14th October, Twilight',
    title: 'On Beginnings',
    content: [
      'Some stories do not start with a grand gesture or loud words.',
      'They begin in the quiet pauses between conversations, in memories that linger long after the night has passed.',
      'If you are reading this page, you have paid attention to details most people overlook.',
    ],
    marginNote: 'The first key is awareness.',
  },
  {
    pageNumber: 2,
    date: '28th November, Midnight',
    title: 'The Unsent Thoughts',
    content: [
      'I kept a ledger of moments I never spoke aloud.',
      'Every time a realization struck, I folded it neatly and stored it away in this sanctuary.',
      'We often hide our deepest emotions not because we fear them, but because they are too precious for careless eyes.',
    ],
    marginNote: 'Cipher digit #1: 7',
  },
  {
    pageNumber: 3,
    date: '3rd January, Cold Dawn',
    title: 'The Turning of Time',
    content: [
      'A year turns, yet certain feelings remain unbothered by calendar dates.',
      'Look toward the desk ahead. The brass key rests inside the envelope sealed in burgundy wax.',
      'The journey is almost complete. Proceed with quiet intent.',
    ],
    marginNote: 'Cipher digit #2: 3',
  },
];

export const ROOM_OBJECTS: RoomObject[] = [
  {
    id: 'watch',
    name: 'Antique Pocket Watch',
    description: 'A heavy brass watch frozen at precisely 03:15 AM.',
    clueText: 'Cipher digit #3: 9',
    iconName: 'Clock',
    position: { top: '35%', left: '25%' },
  },
  {
    id: 'envelope',
    name: 'Sealed Envelope',
    description: 'A thick linen envelope stamped with dark burgundy wax.',
    clueText: 'Inside rests a note: "Not all secrets remain locked forever."',
    iconName: 'Mail',
    position: { top: '55%', left: '50%' },
  },
  {
    id: 'key',
    name: 'Brass Cabinet Key',
    description: 'An ornate key cold to the touch, bearing subtle golden engravings.',
    clueText: 'Cipher digit #4: 2',
    iconName: 'Key',
    position: { top: '40%', left: '75%' },
  },
];

export const TIMELINE_MEMORIES: TimelineNode[] = [
  {
    id: 'm1',
    date: 'Chapter I',
    title: 'The First Encounter',
    snippet: 'A glance that lasted a fraction longer than necessary...',
    fullMemory: 'It was a simple evening. Nothing signaled that the world had subtly shifted on its axis, yet looking back, everything changed right there.',
    isUnlockedDefault: true,
  },
  {
    id: 'm2',
    date: 'Chapter II',
    title: 'Conversations in the Dark',
    snippet: 'When hours felt like minutes and silence felt effortless...',
    fullMemory: 'We spoke of ordinary things, yet beneath the words lay a deep, undeniable understanding that needed no explanation.',
    isUnlockedDefault: true,
  },
  {
    id: 'm3',
    date: 'Chapter III',
    title: 'The Quiet Realization',
    snippet: 'Understanding what was held in secret all along...',
    fullMemory: 'Realizing that some bonds are forged silently, enduring beyond distance and time. This sanctuary was created to preserve that exact feeling.',
    isUnlockedDefault: false,
  },
];

export const DEFAULT_BENGALI_LETTER = `আলমে আলবা—রুহের যে জগৎ, সেখানে হয়তো আমি তোমার তেমন কাছের বা ভালোবাসার কেউ ছিলাম না। কিন্তু আমার পরম বিশ্বাস, সেই রুহানি জগতেই তুমি আমার বড্ড পছন্দের, খুব ভালোবাসার এবং অলক্ষ্যে কাছে থাকা একজন ছিলে।

মাঝেমধ্যে আমি নিজেই স্তব্ধ হয়ে ভাবি—যে হিমেল ছোটবেলা থেকে নিজের ওপর কড়া শাসন চালাত, অন্যকে বোঝাত অনুভূতির বাঁধন সামলে রাখার কথা আর বলত, 'ভালোবাসা যা কিছু, তা কেবল শুভ পরিণয়ের পরেই হবে'—সেই হিমেলই কীভাবে নিজের অজান্তে ভালোবাসার এমন এক বিশাল সমুদ্র বানিয়ে ফেলল! যে সমুদ্রের তলে আমি দিন দিন এত গভীরে তলিয়ে যাচ্ছি যে, যত চেষ্টাই করি নিজেকে টেনে তোলার, ততটাই গভীরে হারিয়ে যাই।

সবার সামনে আমি এক শান্ত, গম্ভীর ও নির্ঝঞ্ঝাট মানুষ। অহেতুক আড্ডায় আমাকে পাওয়া যায় না, অথচ অন্যের বিপদে ঠিকই নিজের কাঁধ বাড়িয়ে দিই। কিন্তু অদ্ভুত বিষয় হলো, তোমার সামনে এলেই আমার সেই শক্ত ও শান্ত খোলসটা কেমন যেন ভেঙে পড়ে! আমার ভেতরে জমে থাকা সমস্ত নীরবতা একমুহূর্তে বাচাল হয়ে উঠতে চায়, মনটা অবাধ্য শিশুর মতো রূপ নেয়। তবু ধন্য আমার আত্মসংযম—যা সেই সুপ্ত চপলতা আর ব্যাকুলতাকেও পলকে নিয়ন্ত্রণে ফিরিয়ে আনে।

বিজ্ঞানের দুনিয়ায় বস্তুগুলোকে আটকে রাখতে পৃথিবীর মাধ্যাকর্ষণ বল কাজ করে; কিন্তু আমার ভেতরের এই যে অচিন টান, যে টানে আমি নিভৃতে ক্ষয়ে যাচ্ছি—আমি জানি না আমার হৃদয়ের এই বলের নাম কী!

তোমাকে কোনো দ্বিধায় ফেলার কিংবা কোনো অধিকার দাবি করার উদ্দেশ্যে আজ এই কথাগুলো বলা নয়। কেবল বুকের ভেতর বছর ধরে পাথর হয়ে বসে থাকা এক নীরব ভার লাঘব করার শেষ চেষ্টা। কোনো প্রতিদান না চেয়ে, কোনো প্রত্যাশা না রেখে এতদিন ধরে তোমাকে ভালোবেসেছি—যে ভালোবাসার একমাত্র সাক্ষী আমার রব। এমনকি কখনো যদি তোমার জন্য নিজের সবচেয়ে বড় ত্যাগও স্বীকার করতে হয়, তবে এই হিমেল হাসিমুখে তা সহ্য করে অলক্ষ্যে দূরে সরে যাবে।

আর হ্যাঁ, আমার এই অনুভূতি আমার কাছে বড্ড মূল্যবান। আমি একে শুধুই 'ভালোবাসা' বলে ছোট করব না—আমার দৃষ্টিতে সাধারণ ভালোবাসা আর এই 'মহব্বত' কখনোই এক নয়। এটা সেই মহব্বত, যা প্রতিদান শেখে না, কেবল বিলিয়ে দিতে শেখে।

শুধু জেনে রেখো, এই পৃথিবীতে এমন এক জোড়া চোখ ছিল—যা কোনো শর্ত ছাড়া, কোনো অধিকার ছাড়া, চিরকাল তোমার মঙ্গল চেয়ে গেছে।`;

