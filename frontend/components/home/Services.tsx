"use client";

import Link from "next/link";
import { Clock, ChevronRight, Loader2, Scissors, Sparkles, Crown, Star, Droplets, Wind } from "lucide-react";
import { useServices } from "@/hooks/useServices";
import { useBookingStore } from "@/store/bookingStore";
import { Service } from "@/lib/api";
import { LucideIcon } from "lucide-react";

// Map icon names from backend to components
const iconComponents: Record<string, LucideIcon> = {
    Scissors,
    Sparkles,
    Crown,
    Star,
    Droplets,
    Wind,
};

function getIconComponent(iconName: string): LucideIcon {
    return iconComponents[iconName] || Scissors;
}

export default function Services() {
    const { services, isLoading } = useServices();
    const { reset, addService, setEntryPoint } = useBookingStore();
    const popularServices = services.filter(s => s.popular).slice(0, 3);

    const handleServiceClick = (service: Service) => {
        reset();
        addService(service);
        setEntryPoint('services');
    };

    if (isLoading) {
        return (
            <section>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-white">Популярные услуги</h2>
                </div>
                <div className="flex justify-center py-8">
                    <Loader2 className="w-6 h-6 text-text-muted animate-spin" />
                </div>
            </section>
        );
    }

    return (
        <section>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-white">Популярные услуги</h2>
                <Link
                    href="/services"
                    className="flex items-center gap-1 text-text-secondary text-sm touch-feedback"
                >
                    Все
                    <ChevronRight className="w-4 h-4" />
                </Link>
            </div>

            <div className="space-y-2">
                {popularServices.map((service, index) => {
                    const Icon = getIconComponent(service.icon);
                    return (
                        <Link
                            key={service.id}
                            href="/book/barber"
                            onClick={() => handleServiceClick(service)}
                            className="flex items-center justify-between p-4 bg-bg-card rounded-2xl border border-border transition-colors group touch-feedback"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div className="flex items-center gap-4 min-w-0">
                                <div className="w-14 h-14 rounded-xl bg-bg-elevated flex items-center justify-center flex-shrink-0">
                                    <Icon className="w-6 h-6 text-text-secondary" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-white font-medium text-base truncate">{service.name}</h3>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <Clock className="w-3.5 h-3.5 text-text-muted" />
                                        <span className="text-text-muted text-sm">{service.duration} мин</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-white font-bold text-base">{service.price} ₽</span>
                                <ChevronRight className="w-5 h-5 text-text-muted" />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
