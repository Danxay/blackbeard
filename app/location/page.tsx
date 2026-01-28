"use client";
import { ArrowLeft, Scissors, MapPin, Phone, Map } from "lucide-react";
import Link from "next/link";

const hours = [
    { day: "Понедельник", time: "10:00 - 22:00" },
    { day: "Вторник", time: "10:00 - 22:00" },
    { day: "Среда", time: "10:00 - 22:00" },
    { day: "Четверг", time: "10:00 - 22:00" },
    { day: "Пятница", time: "10:00 - 22:00", active: true },
    { day: "Суббота", time: "09:00 - 20:00" },
    { day: "Воскресенье", time: "Закрыто", closed: true },
]

export default function LocationPage() {
    return (
        <main className="min-h-screen bg-background-dark flex flex-col pb-24 relative">
             {/* Header Overlay */}
             <div className="fixed top-0 left-0 right-0 z-20 p-4 flex items-center justify-between pointer-events-none">
                 <Link href="/" className="flex items-center justify-center size-10 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/10 transition active:scale-95 pointer-events-auto">
                     <ArrowLeft className="w-5 h-5" />
                 </Link>
                 <div className="px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                     <h2 className="text-white text-sm font-bold tracking-wide uppercase">Контакты</h2>
                 </div>
                 <div className="size-10"></div>
             </div>

             {/* Map */}
             <div className="relative w-full h-[45vh] shrink-0 bg-[#1a1a1a]">
                 <div className="w-full h-full bg-cover bg-center object-cover opacity-90" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB2Cx71mdwHSHyznoXHOcYwmbdrYiyl2oSMQunn6nzPuQvwvRN7lEG8uZ-wcbvW7j52H0N1gL83SYe7JYtRLLmKI9MmAlOMLpMblklyxEjYIqOYNIfyYbQ_IzPexrPA4X6w5L1_5kUDcdsBfiwaiyEYDXOOlIZuTk3cqo2nY-cA5Gx_DBMINcucrUxiUWiTV20Z0mtmQ5uC4lwIWOyr0AyKBCZON6dqqYLPESqJrudgncneR9ulNKYG-2NBAe55Y-1k3qLqf7hwl20T")' }}></div>
                 <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background-dark"></div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 group cursor-pointer animate-bounce">
                     <div className="relative flex items-center justify-center size-12 bg-primary rounded-full shadow-[0_0_20px_rgba(244,192,37,0.4)]">
                         <Scissors className="text-background-dark w-6 h-6" />
                     </div>
                     <div className="px-2 py-1 bg-background-dark rounded border border-white/10 shadow-xl">
                         <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Black Beard</span>
                     </div>
                 </div>
             </div>

             {/* Sheet */}
             <div className="relative -mt-8 z-10 flex flex-col gap-1 rounded-t-3xl bg-background-dark border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] overflow-hidden flex-1">
                 <div className="w-full flex justify-center pt-3 pb-1">
                     <div className="w-12 h-1.5 rounded-full bg-neutral-700"></div>
                 </div>

                 <div className="px-6 pt-4 pb-2">
                     <h3 className="text-white text-lg font-bold uppercase tracking-wide">Наш адрес</h3>
                 </div>

                 <div className="flex items-start gap-4 px-6 py-4 border-b border-white/5 active:bg-white/5 transition-colors cursor-pointer">
                     <div className="flex items-center justify-center rounded-xl bg-surface-dark shrink-0 size-12 text-primary border border-white/5">
                         <MapPin className="w-6 h-6" />
                     </div>
                     <div className="flex flex-col justify-center pt-0.5">
                         <p className="text-white text-base font-bold leading-tight">Барбершоп Центр</p>
                         <p className="text-[#cbbc90] text-sm font-medium leading-normal mt-1">ул. Ленина, 128, Москва</p>
                     </div>
                 </div>

                 <div className="flex items-center gap-4 px-6 py-4 border-b border-white/5 justify-between">
                     <div className="flex items-center gap-4">
                         <div className="flex items-center justify-center rounded-xl bg-surface-dark shrink-0 size-12 text-primary border border-white/5">
                             <Phone className="w-6 h-6" />
                         </div>
                         <div className="flex flex-col justify-center">
                             <p className="text-white text-base font-bold leading-tight">Телефон</p>
                             <p className="text-[#cbbc90] text-sm font-medium leading-normal mt-1">+7 (999) 012-34-56</p>
                         </div>
                     </div>
                     <button className="shrink-0 h-9 px-4 bg-primary hover:bg-primary-dim text-background-dark text-sm font-bold rounded-lg flex items-center justify-center transition-colors">
                         Позвонить
                     </button>
                 </div>

                 <div className="h-6"></div>

                 <div className="px-6 pb-4">
                     <h3 className="text-white text-lg font-bold uppercase tracking-wide mb-4">Часы работы</h3>
                     <div className="flex flex-col gap-3 rounded-2xl bg-surface-dark p-5 border border-white/5">
                         {hours.map((h, i) => (
                             <div key={i} className="flex justify-between items-center text-sm border-b border-white/5 last:border-0 pb-3 last:pb-0 relative">
                                 {h.active && <div className="absolute -left-7 top-1 bottom-3 w-1 bg-primary rounded-r-full"></div>}
                                 <span className={h.active ? "text-primary font-bold flex items-center gap-2" : "text-neutral-400 font-medium"}>
                                     {h.day} {h.active && <span className="bg-primary/20 text-primary text-[10px] px-1.5 py-0.5 rounded uppercase">Сегодня</span>}
                                 </span>
                                 <span className={h.closed ? "text-red-500/80 font-bold uppercase text-xs tracking-wider" : h.active ? "text-primary font-bold" : "text-white font-semibold"}>
                                     {h.time}
                                 </span>
                             </div>
                         ))}
                     </div>
                 </div>

                 <div className="h-8"></div>
             </div>

             <div className="fixed bottom-0 left-0 right-0 p-4 z-30 bg-background-dark/80 backdrop-blur-md border-t border-white/5">
                <button className="w-full h-14 bg-primary hover:bg-primary-dim text-background-dark rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-[0.98]">
                    <Map className="w-6 h-6" />
                    Открыть карты
                </button>
            </div>
        </main>
    )
}
