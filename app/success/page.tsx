"use client";
import { CheckCircle, Calendar, Clock, Scissors, Check } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
    return (
        <main className="min-h-screen bg-background-dark flex flex-col relative overflow-hidden">
             {/* Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542838686-37da5a9fd500?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-background-dark/95 to-background-dark"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
            </div>

            <div className="relative z-10 flex flex-col flex-1 px-6 py-8">
                 {/* Success Indicator */}
                 <div className="flex flex-col items-center justify-center pt-8 pb-8 text-center animate-bounce">
                     <div className="relative mb-6">
                         <div className="flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 border border-primary/20 shadow-[0_0_15px_rgba(244,192,37,0.4)]">
                             <Check className="text-primary w-12 h-12" />
                         </div>
                     </div>
                     <h1 className="text-white text-[32px] font-bold leading-tight mb-2 tracking-tight">Запись подтверждена!</h1>
                     <p className="text-white/60 text-base font-medium leading-relaxed max-w-[280px]">
                        Ваша запись успешно создана. Ждем вас!
                     </p>
                 </div>

                 {/* Receipt */}
                 <div className="w-full bg-[#2d281a]/60 backdrop-blur-md border border-white/5 rounded-2xl p-5 mb-auto shadow-2xl">
                     <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                         <span className="text-xs uppercase tracking-widest text-primary/80 font-bold">Квитанция #8832</span>
                         <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded">ОПЛАЧЕНО</span>
                     </div>

                     <div className="flex items-center gap-4 mb-4">
                         <div className="flex items-center justify-center rounded-xl bg-gradient-to-br from-[#493f22] to-[#3a321b] shrink-0 w-14 h-14 shadow-inner border border-white/5">
                             <Scissors className="text-white w-7 h-7" />
                         </div>
                         <div className="flex flex-col flex-1">
                             <p className="text-white text-lg font-bold leading-tight">Королевское бритье</p>
                             <p className="text-[#cbbc90] text-sm font-normal">Стрижка и Борода</p>
                         </div>
                         <div className="text-right">
                             <p className="text-white font-bold text-lg">4500 ₽</p>
                         </div>
                     </div>

                     <div className="flex items-center gap-4 mb-4">
                         <div className="relative shrink-0 w-14 h-14">
                             <div className="w-full h-full rounded-xl bg-center bg-cover border border-white/10" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBISQ0TfeJRuJAC9toNyzyIGlU1BUgzELlyaDkOnK1t9e1wlFdVXcXTZxdNsZLkexHEalFr5fsfmN5j_AppBEG5fbjOq2RqQqh4w1nFgxTxSDZuQ1CTXEaNo2lipI0RZ70ZoQr2Ez8GYmWvBSxNHhGQvO-xjdT_fYjshIyGmI2WHNRTLmHYR8-m3eRL5ucRkdPR8vRTD3f2fpIT9NpQxJbFNDoQ0rGHynJTO4QsA29MnvHo9QdM5RIa9AELoxKEJYL2E6ZGeFZCUI8d')" }}></div>
                             <div className="absolute -bottom-1 -right-1 bg-primary text-background-dark rounded-full p-0.5 border-2 border-background-dark">
                                 <CheckCircle className="w-3 h-3 fill-primary text-background-dark" />
                             </div>
                         </div>
                         <div className="flex flex-col flex-1">
                             <p className="text-white text-base font-bold leading-tight">Алексей "The Blade"</p>
                             <p className="text-[#cbbc90] text-sm font-normal">Топ-мастер</p>
                         </div>
                     </div>

                     <div className="bg-background-dark/50 rounded-xl p-4 flex items-center justify-between border border-white/5">
                         <div className="flex items-center gap-3">
                             <Calendar className="text-primary w-5 h-5" />
                             <div className="flex flex-col">
                                 <span className="text-white/60 text-xs">Дата</span>
                                 <span className="text-white font-semibold text-sm">Пт, 24 Окт</span>
                             </div>
                         </div>
                         <div className="w-px h-8 bg-white/10"></div>
                         <div className="flex items-center gap-3">
                             <Clock className="text-primary w-5 h-5" />
                             <div className="flex flex-col text-right">
                                 <span className="text-white/60 text-xs">Время</span>
                                 <span className="text-white font-semibold text-sm">14:00</span>
                             </div>
                         </div>
                     </div>
                 </div>

                 <div className="flex flex-col gap-3 mt-6">
                     <button className="group relative w-full flex items-center justify-center gap-2 bg-primary active:bg-[#d9aa20] text-background-dark font-bold text-lg py-4 rounded-xl shadow-[0_4px_20px_rgba(244,192,37,0.25)] transition-all transform active:scale-[0.98]">
                         <Calendar className="w-5 h-5" />
                         <span>Добавить в календарь</span>
                     </button>
                     <Link href="/" className="w-full flex items-center justify-center gap-2 text-white/50 hover:text-white font-semibold text-base py-3 transition-colors">
                        На главную
                     </Link>
                 </div>
            </div>
        </main>
    )
}
