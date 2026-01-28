"use client";

import Link from "next/link";
import { Clock, ChevronRight } from "lucide-react";
import { services } from "@/data/services";
import { useBookingStore } from "@/store/bookingStore";

export default function Services() {
    const { reset, addService, setEntryPoint } = useBookingStore();
    const popularServices = services.filter(s => s.popular).slice(0, 3);

    const handleServiceClick = (service: typeof services[0]) => {
        reset();
        addService(service);
        setEntryPoint('services');
    };

    return (
        <section>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-white">Популярные услуги</h2>
                <Link
                    href="/services"
                    className="flex items-center gap-1 text-text-secondary text-sm active:text-white"
                >
                    Все
                    <ChevronRight className="w-4 h-4" />
                </Link>
            </div>

            <div className="space-y-2">
                {popularServices.map((service) => {
                    const Icon = service.icon;
                    return (
                        <Link
                            key={service.id}
                            href="/book/barber"
                            onClick={() => handleServiceClick(service)}
                            className="flex items-center justify-between p-4 bg-bg-card rounded-2xl border border-border active:border-border-hover transition-colors group"
                        >
                            <div className="flex items-center gap-4 min-w-0">
                                <div className="w-12 h-12 rounded-xl bg-bg-elevated flex items-center justify-center flex-shrink-0">
                                    <Icon className="w-5 h-5 text-text-secondary" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-white font-medium text-[15px] truncate">{service.name}</h3>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <Clock className="w-3 h-3 text-text-muted" />
                                        <span className="text-text-muted text-xs">{service.duration} мин</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-white font-semibold">{service.price} ₽</span>
                                <ChevronRight className="w-4 h-4 text-text-muted" />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
