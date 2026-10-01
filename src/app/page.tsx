import LandingHero from '@/components/public/LandingHero';
import WishSection from '@/components/public/WishSection';
import PublicFooter from '@/components/public/PublicFooter';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col justify-between bg-[#12110E] text-[#F3E7CC]">
      <div>
        <LandingHero />
        <WishSection />
      </div>
      <PublicFooter />
    </main>
  );
}
