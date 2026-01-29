"use client";
import Header from "@/components/ui/Header";
import Link from "next/link";
import { Star, ChevronRight, Check } from "lucide-react";
import clsx from "clsx";
import { barbers, Barber } from "@/data/barbers";
import { useBookingStore } from "@/store/bookingStore";
import { useEffect } from "react";

export default function SelectBarber() {
    const {
        selectedBarber,
        setBarber,
        setEntryPoint,
        selectedServices,
        entryPoint
    } = useBookingStore();

    // Если пришли сюда напрямую (без выбора услуг) — устанавливаем entry point
    useEffect(() => {
        if (selectedServices.length === 0 && !entryPoint) {
            setEntryPoint('barber');
        }
    }, []);

    // Определяем следующий шаг
    const nextStep = selectedServices.length > 0 ? '/book/date' : '/services';
    const buttonText = selectedServices.length > 0 ? 'Выбрать время' : 'Выбрать услуги';

    return (
        <main className="min-h-screen bg-bg">
            <Header title="Выберите мастера" />

            <div className="p-4 pb-32 space-y-2">
                {barbers.map(barber => {
                    const isSelected = selectedBarber?.id === barber.id;
                    const isAvailable = barber.isAvailable;

                    return (
                        <div
                            key={barber.id}
                            onClick={() => isAvailable && setBarber(barber)}
                            className={clsx(
                                "flex items-center gap-4 p-4 rounded-2xl border transition-all",
                                !isAvailable && "opacity-50 cursor-not-allowed",
                                isAvailable && "cursor-pointer active:scale-[0.99]",
                                isSelected
                                    ? "bg-white/5 border-white/30"
                                    : "bg-bg-card border-border"
                            )}
                        >
                            {/* Avatar */}
                            <div className="relative w-14 h-14 flex-shrink-0">
                                <img
                                    src={barber.image}
                                    alt={barber.name}
                                    className="w-full h-full object-cover rounded-xl"
                                />
                                {!isAvailable && (
                                    <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center">
                                        <span className="text-[9px] text-white font-medium">Выходной</span>
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-white font-medium truncate">{barber.name}</h3>
                                    {barber.isVerified && (
                                        <span className="text-[10px] text-accent bg-accent-soft px-1.5 py-0.5 rounded">PRO</span>
                                    )}
                                </div>
                                <p className="text-text-muted text-sm">{barber.role}</p>
                                <p className="text-text-muted text-xs mt-1">{barber.experience}</p>
                            </div>

                            {/* Rating & Selection */}
                            <div className="flex flex-col items-end gap-2">
                                <div className="flex items-center gap-1 text-sm">
                                    <Star className="w-3.5 h-3.5 text-white fill-white" />
                                    <span className="text-white font-medium">{barber.rating}</span>
                                </div>
                                {isAvailable && (
                                    <div className={clsx(
                                        "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                                        isSelected ? "bg-white border-white" : "border-text-muted"
                                    )}>
                                        {isSelected && <Check className="w-4 h-4 text-black" strokeWidth={3} />}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="fixed bottom-0 left-0 right-0 p-4 pb-6 glass border-t border-border">
                <Link
                    href={selectedBarber ? nextStep : "#"}
                    className={clsx(
                        "flex items-center justify-between w-full py-4 px-6 rounded-2xl font-semibold transition-all",
                        selectedBarber
                            ? "bg-white text-black active:scale-[0.98]"
                            : "bg-bg-card text-text-muted cursor-not-allowed"
                    )}
                    onClick={(e) => !selectedBarber && e.preventDefault()}
                >
                    <span>{selectedBarber ? buttonText : 'Выберите мастера'}</span>
                    <ChevronRight className="w-5 h-5" />
                </Link>
            </div>
        </main>
    );
}
