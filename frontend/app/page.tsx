import Hero from "@/components/home/Hero";
import QuickActions from "@/components/home/QuickActions";
import Specialists from "@/components/home/Specialists";
import Services from "@/components/home/Services";
import BottomNav from "@/components/ui/BottomNav";
import BookButton from "@/components/home/BookButton";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg pb-44">
      <Hero />

      <div className="px-4 -mt-6 relative z-10 space-y-6">
        <QuickActions />
        <Specialists />
        <Services />
      </div>

      <BookButton />
      <BottomNav />
    </main>
  );
}
