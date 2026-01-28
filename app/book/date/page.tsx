"use client";
import Header from "@/components/ui/Header";
import { useState } from "react";
import clsx from "clsx";
import { Sun, ArrowRight } from "lucide-react";
import Link from "next/link";

const days = [
    { day: "Ср", date: "18", active: true },
    { day: "Чт", date: "19" },
    { day: "Пт", date: "20" },
    { day: "Сб", date: "21", disabled: true },
    { day: "Вс", date: "22", disabled: true },
    { day: "Пн", date: "23" },
]

const morningSlots = ["10:00", "10:30", "11:00", "11:30"];
const afternoonSlots = ["13:00", "13:30", "14:00", "14:30", "15:00"];

export default function DatePage() {
    const [selectedTime, setSelectedTime] = useState("13:00");

    return (
        <main className="min-h-screen bg-background-dark pb-32 flex flex-col relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                 <img alt="Abstract texture" className="w-full h-full object-cover blur-xl grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZDPM0PFYuJZ5fd-Xvfulr8M9QoJy7DMyieGlwD_a41SuRqmMau9BEBUa-qvFmQNS_WpBaWRzDUXX275VhMThc9kzEjzIHQig-KQwS5NxwWQ0hbHSftJ0wQ4yve1Zauc7jcnVm4PKvFoc5MPk4cPjWcN1uR21dITRzi88VP2mqAjFaBm5OkYWUOgGsA3PWkJEVRqI1MSdOQ5yL2OS_sruY2MLdNeRDtPA4x2k2xwQBRqnAaxumjKaJHaYQ0p6nBZxH6zoc62rL70Cj" />
            </div>

            <Header title="Black Beard" />

            <div className="relative z-10 px-4 pt-2">
                <div className="mb-6 mt-2">
                    <h2 className="text-3xl font-display font-bold text-white mb-1">Запись</h2>
                    <p className="text-gray-400 text-sm">Выберите дату и время визита</p>
                </div>

                {/* Calendar */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4 px-1">
                        <span className="text-sm font-semibold uppercase tracking-wider text-gray-400">Октябрь 2023</span>
                    </div>
                    <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4">
                        {days.map((d, i) => (
                            <div key={i} className={clsx(
                                "flex-shrink-0 flex flex-col items-center justify-center w-16 h-20 rounded-2xl border transition-all cursor-pointer",
                                d.active ? "bg-primary border-primary text-background-dark shadow-[0_0_15px_rgba(200,161,101,0.2)] scale-105" :
                                d.disabled ? "bg-surface-dark border-white/5 opacity-50 cursor-not-allowed" : "bg-surface-dark border-white/5 hover:border-primary/50 text-gray-300"
                            )}>
                                <span className={clsx("text-xs font-medium uppercase mb-1", d.active ? "text-background-dark/80" : "text-gray-400")}>{d.day}</span>
                                <span className="text-2xl font-bold font-display">{d.date}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Slots */}
                <div className="mb-4">
                    <h3 className="text-xs text-gray-400 mb-3 ml-1 flex items-center gap-2">
                        <Sun className="w-4 h-4" /> Утро
                    </h3>
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        {morningSlots.map(time => (
                            <button key={time} onClick={() => setSelectedTime(time)} className={clsx(
                                "py-3 px-2 rounded-xl border font-medium text-sm transition-colors",
                                selectedTime === time ? "bg-primary/20 border-primary text-primary" : "bg-surface-dark border-white/5 text-gray-300 hover:bg-white/5"
                            )}>
                                {time}
                            </button>
                        ))}
                    </div>

                    <h3 className="text-xs text-gray-400 mb-3 ml-1 flex items-center gap-2">
                        <Sun className="w-4 h-4" /> День
                    </h3>
                     <div className="grid grid-cols-3 gap-3">
                        {afternoonSlots.map(time => (
                            <button key={time} onClick={() => setSelectedTime(time)} className={clsx(
                                "py-3 px-2 rounded-xl border font-medium text-sm transition-colors relative overflow-hidden",
                                selectedTime === time ? "bg-primary/20 border-primary text-primary" : "bg-surface-dark border-white/5 text-gray-300 hover:bg-white/5"
                            )}>
                                {time}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Selected Barber Preview */}
                <div className="mt-6 p-4 rounded-2xl bg-surface-dark border border-white/5 flex items-center gap-4">
                    <img alt="Barber" className="w-12 h-12 rounded-full object-cover border-2 border-primary" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfzYgpP9gI84S1Ro5D2-nk2ehM3xIrMIKRWwamG31qDp2ekFdHxPFzowUB-ZbjTeJ7lOb1qFdLg8pGA-d2sn1Xm4Q3GaMm-Eb00xCcVdFdyVvs6QayceAvejlxtTUCaH0kZd8NZVjOBpkq6t3iWj_j788p2iiuSkl7oxcX2KPVb2b3WRoprPJEHvVQozN6cOY4OuxzXZbgHmkJqXfxAShrm2mSoZp7wZlXYmfkQvXxqyP82JRMPthLPlh4t2AJb0HmGslwTXOdDq7n" />
                    <div className="flex-1">
                        <p className="text-xs text-gray-400 uppercase tracking-wide">Мастер</p>
                        <p className="font-display font-bold text-white">Алексей "The Fade"</p>
                    </div>
                    <Link href="/book/barber" className="text-primary text-sm font-medium hover:text-white transition-colors">Изменить</Link>
                </div>
            </div>

            {/* Footer */}
            <div className="fixed bottom-0 left-0 right-0 z-20 bg-background-dark/90 border-t border-white/5 p-4 pb-8 backdrop-blur-md">
                <div className="flex items-center justify-between mb-4 px-2">
                    <div>
                        <p className="text-xs text-gray-400">Итого</p>
                        <p className="text-xl font-bold text-white font-display">2500 ₽</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-400">Длительность</p>
                        <p className="text-sm font-medium text-white">45 мин</p>
                    </div>
                </div>
                <Link href="/book/confirm" className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:bg-opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                    <span>Подтвердить запись</span>
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </main>
    )
}
