import Hero from "@/components/home/Hero";
import QuickActions from "@/components/home/QuickActions";
import Specialists from "@/components/home/Specialists";
import Services from "@/components/home/Services";
import BottomNav from "@/components/ui/BottomNav";
import BookButton from "@/components/home/BookButton";

export default function Home() {
  return (
    <main className="min-h-screen-dynamic bg-bg pb-48">
      <Hero />

      <div className="px-4 -mt-6 relative z-10 space-y-6 stagger">
        <QuickActions />
        <Specialists />
        <Services />
      </div>

      <BookButton />
      <BottomNav />
    </main>
  );
}
