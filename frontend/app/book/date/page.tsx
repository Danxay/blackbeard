"use client";
import Header from "@/components/ui/Header";
import Image from "next/image";
import { useState, useMemo, useEffect, useCallback } from "react";
import clsx from "clsx";
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { useBookingStore } from "@/store/bookingStore";
import { useRouter } from "next/navigation";

function generateDays() {
    const days = [];
    const dayNames = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    const today = new Date();

    for (let i = 0; i < 14; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dayOfWeek = date.getDay();
        const isWeekend = dayOfWeek === 0;

        days.push({
            name: dayNames[dayOfWeek],
            date: date.getDate(),
            month: date.toLocaleDateString('ru', { month: 'short' }),
            fullDate: date,
            disabled: isWeekend
        });
    }
    return days;
}

const timeSlots = ["10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];

export default function DatePage() {
    const router = useRouter();
    const {
        selectedBarber,
        selectedServices,
        selectedTime,
        setDate,
        setTime,
        getTotalPrice,
        getTotalDuration
    } = useBookingStore();

    const days = useMemo(() => generateDays(), []);

    // Находим первый доступный день (не воскресенье)
    const firstAvailableIndex = useMemo(() => {
        return days.findIndex(d => !d.disabled);
    }, [days]);

    const [selectedDayIndex, setSelectedDayIndex] = useState(firstAvailableIndex >= 0 ? firstAvailableIndex : 0);

    const total = getTotalPrice();
    const duration = getTotalDuration();

    // Устанавливаем дату по умолчанию при загрузке
    useEffect(() => {
        if (days[selectedDayIndex] && !days[selectedDayIndex].disabled) {
            setDate(days[selectedDayIndex].fullDate);
        }
    }, [days, selectedDayIndex, setDate]);

    // Редирект если нет данных
    useEffect(() => {
        if (!selectedBarber || selectedServices.length === 0) {
            router.push('/services');
        }
    }, [selectedBarber, selectedServices, router]);

    const handleDaySelect = useCallback((index: number) => {
        if (!days[index].disabled) {
            setSelectedDayIndex(index);
            setDate(days[index].fullDate);
        }
    }, [days, setDate]);

    const handleTimeSelect = useCallback((time: string) => {
        setTime(time);
        // Убеждаемся что дата установлена
        if (!days[selectedDayIndex].disabled) {
            setDate(days[selectedDayIndex].fullDate);
        }
    }, [days, selectedDayIndex, setDate, setTime]);

    const canProceed = selectedTime !== null;

    return (
        <main className="min-h-screen bg-bg">
            <Header title="Дата и время" />

            <div className="p-4 pb-48 space-y-6">
                {/* Selected info */}
                {selectedBarber && (
                    <div className="flex items-center gap-3 p-3 bg-bg-card rounded-xl border border-border">
                        <div className="relative w-10 h-10 flex-shrink-0">
                            <Image
                                src={selectedBarber.image || '/placeholder.jpg'}
                                alt={selectedBarber.name}
                                fill
                                className="object-cover rounded-lg"
                                unoptimized
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-medium truncate">{selectedBarber.name}</p>
                            <p className="text-text-muted text-xs">
                                {selectedServices.length} услуг · {duration} мин
                            </p>
                        </div>
                        <p className="text-white font-semibold">{total} ₽</p>
                    </div>
                )}

                {/* Calendar */}
                <div>
                    <p className="text-text-secondary text-sm mb-3">Выберите день</p>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 pb-2">
                        {days.map((d, i) => (
                            <button
                                key={i}
                                onClick={() => handleDaySelect(i)}
                                disabled={d.disabled}
                                className={clsx(
                                    "flex flex-col items-center justify-center w-16 h-20 rounded-xl flex-shrink-0 transition-all",
                                    d.disabled && "opacity-40 cursor-not-allowed",
                                    selectedDayIndex === i
                                        ? "bg-white text-black"
                                        : "bg-bg-card border border-border"
                                )}
                            >
                                <span className={clsx(
                                    "text-[10px] uppercase font-medium",
                                    selectedDayIndex === i ? "text-black/60" : "text-text-muted"
                                )}>
                                    {d.name}
                                </span>
                                <span className="text-xl font-semibold">{d.date}</span>
                                <span className={clsx(
                                    "text-[10px]",
                                    selectedDayIndex === i ? "text-black/60" : "text-text-muted"
                                )}>
                                    {d.month}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Time slots */}
                <div>
                    <p className="text-text-secondary text-sm mb-3">Выберите время</p>
                    <div className="grid grid-cols-4 gap-2">
                        {timeSlots.map(time => (
                            <button
                                key={time}
                                onClick={() => handleTimeSelect(time)}
                                className={clsx(
                                    "py-3 rounded-xl text-sm font-medium transition-all",
                                    selectedTime === time
                                        ? "bg-white text-black"
                                        : "bg-bg-card border border-border text-white"
                                )}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="fixed bottom-0 left-0 right-0 p-4 pb-8 glass border-t border-border">
                <div className="flex items-center justify-between mb-3 px-1">
                    <div>
                        <p className="text-white text-sm">
                            {days[selectedDayIndex]?.date} {days[selectedDayIndex]?.month}{selectedTime ? `, ${selectedTime}` : ''}
                        </p>
                        <p className="text-text-muted text-xs flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {duration} мин
                        </p>
                    </div>
                    <p className="text-white text-2xl font-semibold">{total} ₽</p>
                </div>
                <Link
                    href={canProceed ? "/book/confirm" : "#"}
                    className={clsx(
                        "flex items-center justify-between w-full py-4 px-6 rounded-2xl font-semibold transition-all",
                        canProceed
                            ? "bg-white text-black active:scale-[0.98]"
                            : "bg-bg-card text-text-muted cursor-not-allowed"
                    )}
                    onClick={(e) => !canProceed && e.preventDefault()}
                >
                    <span>{canProceed ? 'Подтвердить' : 'Выберите время'}</span>
                    <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </main>
    );
}
