import Hero from "@/components/home/Hero";
import QuickActions from "@/components/home/QuickActions";
import Specialists from "@/components/home/Specialists";
import Services from "@/components/home/Services";
import Link from "next/link";
import { Calendar } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background-dark pb-24 relative overflow-x-hidden">
      <Hero />
      <div className="px-6 pt-4 pb-24 relative z-10 -mt-8 bg-gradient-to-b from-transparent to-background-dark">
         <QuickActions />
         <Specialists />
         <Services />
      </div>

      <div className="fixed bottom-0 left-0 w-full p-6 z-50 bg-gradient-to-t from-background-dark via-background-dark to-transparent pointer-events-none flex justify-center max-w-md mx-auto right-0">
        <Link href="/services" className="w-full bg-primary hover:bg-primary-dim text-background-dark font-bold py-4 px-6 rounded-xl shadow-lg shadow-primary/20 transform transition-all active:scale-95 flex items-center justify-center gap-2 pointer-events-auto">
            <Calendar className="w-5 h-5" />
            Записаться онлайн
        </Link>
      </div>
    </main>
  );
}
