"use client";
import BottomNav from "@/components/ui/BottomNav";
import { useState } from "react";
import clsx from "clsx";
import { Calendar, Clock, History } from "lucide-react";

export default function BookingsPage() {
    const [activeTab, setActiveTab] = useState("upcoming");

    return (
        <main className="min-h-screen bg-background-dark pb-24 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-20 left-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

            <header className="flex items-center justify-center p-4 pt-6 pb-2 z-20 bg-background-dark/95 backdrop-blur-md sticky top-0">
                <h2 className="text-white text-lg font-bold leading-tight tracking-tight">Мои записи</h2>
            </header>

            <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-6">
                <div className="flex p-1 rounded-xl bg-[#342d18] relative">
                    <button onClick={() => setActiveTab("upcoming")} className={clsx("flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-200", activeTab === "upcoming" ? "bg-[#493f22] text-primary shadow-sm" : "text-[#cbbc90]")}>
                        Предстоящие
                    </button>
                    <button onClick={() => setActiveTab("history")} className={clsx("flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-200", activeTab === "history" ? "bg-[#493f22] text-primary shadow-sm" : "text-[#cbbc90]")}>
                        История
                    </button>
                </div>

                {activeTab === "upcoming" && (
                    <section className="animate-fade-in">
                        <div className="flex items-center justify-between mb-4 px-1">
                            <h3 className="text-white text-xl font-bold">Ближайшая запись</h3>
                            <span className="text-xs font-semibold px-2 py-1 rounded bg-green-500/10 text-green-400 border border-green-500/20">Подтверждено</span>
                        </div>

                        <div className="group relative w-full overflow-hidden rounded-2xl bg-surface-dark shadow-lg border border-white/5 transition-transform active:scale-[0.99]">
                             <div className="relative h-28 bg-[#231e10] overflow-hidden">
                                 <div className="absolute inset-0 bg-gradient-to-t from-surface-dark to-transparent"></div>
                                 <div className="absolute bottom-4 left-5">
                                     <p className="text-primary text-sm font-bold tracking-wider uppercase opacity-80 mb-1">Четверг</p>
                                     <h2 className="text-white text-3xl font-bold tracking-tight">24 Окт, 14:00</h2>
                                 </div>
                                 <div className="absolute top-4 right-4">
                                     <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg border border-white/10">
                                         <Calendar className="text-white w-6 h-6" />
                                     </div>
                                 </div>
                             </div>

                             <div className="p-5 pt-4">
                                 <div className="flex items-start gap-4">
                                     <div className="relative shrink-0">
                                         <div className="h-16 w-16 rounded-xl bg-[#3d3624] overflow-hidden border-2 border-[#3d3624] shadow-md">
                                             <img alt="Barber" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZL3PSMBWS93ZEncBwyl4TH8OP0_-gj3EPo-_GN4mAryhecwNLC_YgHsKT__90xK4bnIUDFuy-rr6XG9qIcCGBGHKG18TObLf2Ec_HwwV9qJATl_x7D2Huk7aGTrEpMjQ_OX1ifu7t8gY09LoC-_GchAlkdVJ4NQaF04032-2ZU3z5FqCRVScv66ZJ5F3vuXRUKJqbhHNT8C-jWuWH2-F1m_YD7NXKKHVA68npRZoTbaX6muNv-FQCJpCGr4qxOExmBeruBCNIQEuy" />
                                         </div>
                                         <div className="absolute -bottom-1 -right-1 bg-primary text-background-dark text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-sm">4.9 ★</div>
                                     </div>
                                     <div className="flex-1 min-w-0">
                                         <h4 className="text-lg font-bold text-white truncate">Барбер Алексей</h4>
                                         <p className="text-sm text-[#cbbc90] mt-0.5">Стрижка + Борода</p>
                                         <div className="flex items-center gap-2 mt-2">
                                             <Clock className="w-4 h-4 text-gray-400" />
                                             <span className="text-xs text-gray-400">45 мин</span>
                                             <span className="text-gray-600">•</span>
                                             <span className="text-xs text-gray-400">2500 ₽</span>
                                         </div>
                                     </div>
                                 </div>

                                 <div className="h-px w-full bg-white/10 my-4"></div>

                                 <div className="flex gap-3">
                                     <button className="flex-1 flex items-center justify-center gap-2 h-10 px-4 rounded-lg border border-red-900/30 text-red-400 font-semibold text-sm hover:bg-red-900/10 transition-colors">
                                         Отменить
                                     </button>
                                     <button className="flex-[2] flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-primary text-background-dark font-bold text-sm hover:brightness-110 transition-all shadow-[0_0_15px_rgba(244,192,37,0.2)]">
                                         <Calendar className="w-4 h-4" />
                                         Перенести
                                     </button>
                                 </div>
                             </div>
                        </div>
                    </section>
                )}

                {activeTab === "history" && (
                    <section className="animate-fade-in">
                        <h3 className="text-white text-lg font-bold mb-3 px-1">Прошедшие</h3>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-dark border border-white/5 shadow-sm active:scale-[0.99] transition-transform">
                                <div className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-[#3d3624] text-center shrink-0">
                                    <span className="text-[10px] uppercase font-bold text-[#cbbc90] leading-none mb-0.5">Сен</span>
                                    <span className="text-lg font-bold text-white leading-none">10</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <h4 className="text-base font-bold text-white truncate">Барбер Михаил</h4>
                                        <span className="text-sm font-semibold text-primary">2500 ₽</span>
                                    </div>
                                    <div className="flex justify-between items-center mt-0.5">
                                        <p className="text-sm text-gray-400 truncate">Фейд</p>
                                        <button className="text-xs font-medium text-primary hover:text-white flex items-center gap-1">
                                            <History className="w-3 h-3" /> Повторить
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </div>

            <BottomNav />
        </main>
    )
}
