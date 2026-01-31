"use client";
import Header from "@/components/ui/Header";
import Image from "next/image";
import { useState, useMemo, useEffect, useCallback } from "react";
import clsx from "clsx";
import { ArrowRight, Clock, Loader2 } from "lucide-react";
import Link from "next/link";
import { useBookingStore } from "@/store/bookingStore";
import { useRouter } from "next/navigation";
import { api, SlotAvailability } from "@/lib/api";

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
            disabled: isWeekend,
            isToday: i === 0,
            dateString: date.toISOString().split('T')[0] // YYYY-MM-DD for API
        });
    }
    return days;
}

// All available 30-min slots
const ALL_TIME_SLOTS = [
    "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
    "20:00", "20:30", "21:00"
];

// Check if time slot has passed for today
function isTimeSlotPast(timeSlot: string, isToday: boolean): boolean {
    if (!isToday) return false;

    const now = new Date();
    const [hours, minutes] = timeSlot.split(':').map(Number);
    const slotTime = new Date();
    slotTime.setHours(hours, minutes, 0, 0);

    // 30-min buffer
    const bufferMs = 30 * 60 * 1000;
    return now.getTime() + bufferMs > slotTime.getTime();
}

export default function DatePage() {
    const router = useRouter();
    const {
        selectedBarber,
        selectedServices,
        selectedDate,
        selectedTime,
        setDate,
        setTime,
        hasHydrated,
        getTotalPrice,
        getTotalDuration
    } = useBookingStore();

    const days = useMemo(() => generateDays(), []);

    const firstAvailableIndex = useMemo(() => {
        return days.findIndex(d => !d.disabled);
    }, [days]);

    const [selectedDayIndex, setSelectedDayIndex] = useState(firstAvailableIndex >= 0 ? firstAvailableIndex : 0);
    const [slotAvailability, setSlotAvailability] = useState<SlotAvailability[]>([]);
    const [isLoadingSlots, setIsLoadingSlots] = useState(false);

    const isSelectedDayToday = days[selectedDayIndex]?.isToday ?? false;

    // Fetch availability when barber or date changes
    useEffect(() => {
        if (!selectedBarber?.id || !days[selectedDayIndex]) return;

        const fetchAvailability = async () => {
            setIsLoadingSlots(true);
            try {
                const dateStr = days[selectedDayIndex].dateString;
                const data = await api.getBarberAvailability(selectedBarber.id, dateStr);
                setSlotAvailability(data.slots);
            } catch (error) {
                console.error('Failed to fetch availability:', error);
                // Fallback to all slots available
                setSlotAvailability(ALL_TIME_SLOTS.map(time => ({ time, available: true })));
            } finally {
                setIsLoadingSlots(false);
            }
        };

        fetchAvailability();
    }, [selectedBarber?.id, selectedDayIndex, days]);

    // Combine API availability with past-time check
    const availableTimeSlots = useMemo(() => {
        if (slotAvailability.length === 0) {
            // Before API loads, use default slots
            return ALL_TIME_SLOTS.map(slot => ({
                time: slot,
                disabled: isTimeSlotPast(slot, isSelectedDayToday)
            }));
        }

        return slotAvailability.map(slot => ({
            time: slot.time,
            disabled: !slot.available || isTimeSlotPast(slot.time, isSelectedDayToday)
        }));
    }, [slotAvailability, isSelectedDayToday]);

    // Reset time when switching days
    useEffect(() => {
        if (selectedTime) {
            const currentSlot = availableTimeSlots.find(s => s.time === selectedTime);
            if (currentSlot?.disabled) {
                setTime(null as unknown as string);
            }
        }
    }, [selectedDayIndex, availableTimeSlots, selectedTime, setTime]);

    useEffect(() => {
        if (!selectedDate) return;
        const matchIndex = days.findIndex((d) => {
            const dDate = d.fullDate;
            return (
                dDate.getFullYear() === selectedDate.getFullYear() &&
                dDate.getMonth() === selectedDate.getMonth() &&
                dDate.getDate() === selectedDate.getDate()
            );
        });
        if (matchIndex >= 0 && !days[matchIndex].disabled) {
            setSelectedDayIndex(matchIndex);
        }
    }, [selectedDate, days]);

    const total = getTotalPrice();
    const duration = getTotalDuration();

    useEffect(() => {
        if (days[selectedDayIndex] && !days[selectedDayIndex].disabled) {
            setDate(days[selectedDayIndex].fullDate);
        }
    }, [days, selectedDayIndex, setDate]);

    useEffect(() => {
        if (!hasHydrated) return;
        if (!selectedBarber || selectedServices.length === 0) {
            router.push('/services');
        }
    }, [hasHydrated, selectedBarber, selectedServices, router]);

    const handleDaySelect = useCallback((index: number) => {
        if (!days[index].disabled) {
            setSelectedDayIndex(index);
            setDate(days[index].fullDate);
            setTime(null as unknown as string);
        }
    }, [days, setDate, setTime]);

    const handleTimeSelect = useCallback((time: string, disabled: boolean) => {
        if (disabled) return;
        setTime(time);
        if (!days[selectedDayIndex].disabled) {
            setDate(days[selectedDayIndex].fullDate);
        }
    }, [days, selectedDayIndex, setDate, setTime]);

    const canProceed = selectedTime !== null;
    const hasAvailableSlots = availableTimeSlots.some(slot => !slot.disabled);

    return (
        <main className="min-h-screen-dynamic bg-bg">
            <Header title="Дата и время" />

            <div className="p-4 pb-48 space-y-6">
                {/* Selected info */}
                {selectedBarber && (
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 p-3 bg-bg-card rounded-xl border border-border">
                            <div className="relative w-10 h-10 flex-shrink-0">
                                <Image
                                    src={selectedBarber.image || '/placeholder.svg'}
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
                        <div className="flex items-center gap-3 text-xs">
                            <button
                                type="button"
                                onClick={() => router.push('/book/barber')}
                                className="text-text-secondary hover:text-white transition-colors"
                            >
                                Сменить мастера
                            </button>
                            <span className="text-text-muted">•</span>
                            <button
                                type="button"
                                onClick={() => router.push('/services')}
                                className="text-text-secondary hover:text-white transition-colors"
                            >
                                Изменить услуги
                            </button>
                        </div>
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
                                    "flex flex-col items-center justify-center w-16 h-20 rounded-xl flex-shrink-0 transition-all touch-feedback",
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
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-text-secondary text-sm">Выберите время</p>
                        {isLoadingSlots && (
                            <Loader2 className="w-4 h-4 animate-spin text-text-muted" />
                        )}
                        {!isLoadingSlots && isSelectedDayToday && !hasAvailableSlots && (
                            <p className="text-warning text-xs">Нет свободных слотов</p>
                        )}
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {availableTimeSlots.map(({ time, disabled }) => (
                            <button
                                key={time}
                                onClick={() => handleTimeSelect(time, disabled)}
                                disabled={disabled || isLoadingSlots}
                                className={clsx(
                                    "py-3 rounded-xl text-sm font-medium transition-all",
                                    (disabled || isLoadingSlots) && "opacity-40 cursor-not-allowed",
                                    selectedTime === time
                                        ? "bg-white text-black"
                                        : disabled
                                            ? "bg-bg-card border border-border text-text-muted line-through"
                                            : "bg-bg-card border border-border text-white touch-feedback"
                                )}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="fixed-bottom-panel p-4 glass border-t border-border">
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
                            ? "bg-white text-black btn-press"
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
