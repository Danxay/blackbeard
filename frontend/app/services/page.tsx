"use client";
import Header from "@/components/ui/Header";
import { useMemo, useState, useEffect } from "react";
import clsx from "clsx";
import { Check, Clock, ArrowRight, Loader2, Scissors, Sparkles, Crown, Star, Droplets, Wind, Blend, Eraser } from "lucide-react";
import Link from "next/link";
import { useServices } from "@/hooks/useServices";
import { useBookingStore } from "@/store/bookingStore";
import { LucideIcon } from "lucide-react";


// Map icon names from backend to components
const iconComponents: Record<string, LucideIcon> = {
    Scissors, Sparkles, Crown, Star, Droplets, Wind, Blend, Eraser,
};

function getIconComponent(iconName: string): LucideIcon {
    return iconComponents[iconName] || Scissors;
}

type CategoryFilter = string | 'all';

const filters: { key: CategoryFilter; label: string }[] = [
    { key: 'all', label: 'Все' },
    { key: 'haircut', label: 'Стрижки' },
    { key: 'beard', label: 'Борода' },
    { key: 'complex', label: 'Комплексы' },
];

export default function ServicesPage() {
    const { services, isLoading } = useServices();
    const {
        selectedServices,
        toggleService,
        isServiceSelected,
        getTotalPrice,
        getTotalDuration,
        setEntryPoint,
        selectedBarber
    } = useBookingStore();

    const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');

    const filteredServices = useMemo(() => {
        if (activeFilter === 'all') return services;
        return services.filter(s => s.category === activeFilter);
    }, [activeFilter, services]);

    const total = getTotalPrice();
    const duration = getTotalDuration();

    const nextStep = selectedBarber ? '/book/date' : '/book/barber';

    useEffect(() => {
        if (!selectedBarber) {
            setEntryPoint('services');
        }
    }, [selectedBarber, setEntryPoint]);

    if (isLoading) {
        return (
            <main className="min-h-screen bg-bg">
                <Header title="Услуги" />
                <div className="flex items-center justify-center h-[60vh]">
                    <Loader2 className="w-8 h-8 text-text-muted animate-spin" />
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-bg">
            <Header title="Услуги" />

            {/* Filters */}
            <div className="sticky top-14 z-30 bg-bg/95 backdrop-blur-sm border-b border-border">
                <div className="flex gap-2 p-4 overflow-x-auto no-scrollbar">
                    {filters.map(f => (
                        <button
                            key={f.key}
                            onClick={() => setActiveFilter(f.key)}
                            className={clsx(
                                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                                activeFilter === f.key
                                    ? "bg-white text-black"
                                    : "bg-bg-card text-text-secondary border border-border"
                            )}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Services */}
            <div className="p-4 pb-40 space-y-2">
                {filteredServices.map(service => {
                    const isSelected = isServiceSelected(service.id);
                    const Icon = getIconComponent(service.icon);

                    return (
                        <div
                            key={service.id}
                            onClick={() => toggleService(service)}
                            className={clsx(
                                "flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all active:scale-[0.99]",
                                isSelected
                                    ? "bg-white/5 border-white/30"
                                    : "bg-bg-card border-border"
                            )}
                        >
                            {/* Icon */}
                            <div className={clsx(
                                "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors",
                                isSelected ? "bg-white/10" : "bg-bg-elevated"
                            )}>
                                <Icon className={clsx(
                                    "w-5 h-5 transition-colors",
                                    isSelected ? "text-white" : "text-text-secondary"
                                )} />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-white font-medium">{service.name}</h3>
                                    {service.popular && (
                                        <span className="text-[10px] bg-accent/20 text-accent px-1.5 py-0.5 rounded">
                                            Хит
                                        </span>
                                    )}
                                </div>
                                <p className="text-text-muted text-sm mt-0.5 line-clamp-1">{service.description}</p>
                                <div className="flex items-center gap-3 mt-2">
                                    <span className="text-text-muted text-xs flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {service.duration} мин
                                    </span>
                                    <span className="text-white font-semibold text-sm">{service.price} ₽</span>
                                </div>
                            </div>

                            {/* Checkbox */}
                            <div className={clsx(
                                "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0",
                                isSelected ? "bg-white border-white" : "border-text-muted"
                            )}>
                                {isSelected && <Check className="w-4 h-4 text-black" strokeWidth={3} />}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="fixed bottom-0 left-0 right-0 p-4 pb-6 glass border-t border-border">
                <div className="flex items-center justify-between mb-3 px-1">
                    <div>
                        <p className="text-text-muted text-xs">
                            {selectedServices.length === 0
                                ? 'Выберите услуги'
                                : `Выбрано: ${selectedServices.length}`
                            }
                        </p>
                        {duration > 0 && (
                            <p className="text-text-secondary text-sm flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {duration < 60 ? `${duration} мин` : `${Math.floor(duration / 60)} ч ${duration % 60} мин`}
                            </p>
                        )}
                    </div>
                    {total > 0 && (
                        <p className="text-white text-2xl font-semibold">{total} ₽</p>
                    )}
                </div>
                <Link
                    href={selectedServices.length > 0 ? nextStep : "#"}
                    className={clsx(
                        "flex items-center justify-between w-full py-4 px-6 rounded-2xl font-semibold transition-all",
                        selectedServices.length > 0
                            ? "bg-white text-black active:scale-[0.98]"
                            : "bg-bg-card text-text-muted cursor-not-allowed"
                    )}
                    onClick={(e) => selectedServices.length === 0 && e.preventDefault()}
                >
                    <span>{selectedBarber ? 'Выбрать время' : 'Выбрать мастера'}</span>
                    <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </main>
    );
}
