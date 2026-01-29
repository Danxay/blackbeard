"use client";
import Header from "@/components/ui/Header";
import { Calendar, Clock, MapPin, ArrowRight, User, Scissors } from "lucide-react";
import Link from "next/link";
import { useBookingStore } from "@/store/bookingStore";
import { shopInfo } from "@/data/shop";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ConfirmPage() {
    const router = useRouter();
    const {
        selectedBarber,
        selectedServices,
        selectedDate,
        selectedTime,
        getTotalPrice,
        getTotalDuration
    } = useBookingStore();

    const total = getTotalPrice();
    const duration = getTotalDuration();

    // Редирект если нет данных
    useEffect(() => {
        if (!selectedBarber || selectedServices.length === 0 || !selectedTime) {
            router.push('/services');
        }
    }, []);

    if (!selectedBarber || selectedServices.length === 0) {
        return null;
    }

    const dateStr = selectedDate
        ? selectedDate.toLocaleDateString('ru', { day: 'numeric', month: 'short', weekday: 'short' })
        : '';

    return (
        <main className="min-h-screen bg-bg">
            <Header title="Подтверждение" />

            <div className="p-4 pb-44 space-y-4">
                {/* Barber */}
                <div className="bg-bg-card rounded-2xl border border-border p-4">
                    <div className="flex items-center gap-1 text-text-muted text-xs mb-3">
                        <User className="w-3 h-3" />
                        <span>Мастер</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <img
                            src={selectedBarber.image}
                            alt={selectedBarber.name}
                            className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div>
                            <p className="text-white font-medium">{selectedBarber.name}</p>
                            <p className="text-text-muted text-sm">{selectedBarber.role}</p>
                        </div>
                    </div>
                </div>

                {/* Services */}
                <div className="bg-bg-card rounded-2xl border border-border p-4">
                    <div className="flex items-center gap-1 text-text-muted text-xs mb-3">
                        <Scissors className="w-3 h-3" />
                        <span>Услуги</span>
                    </div>
                    <div className="space-y-3">
                        {selectedServices.map(service => (
                            <div key={service.id} className="flex items-center justify-between">
                                <div>
                                    <p className="text-white text-sm">{service.name}</p>
                                    <p className="text-text-muted text-xs">{service.duration} мин</p>
                                </div>
                                <p className="text-white font-medium">{service.price} ₽</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Date & Time */}
                <div className="bg-bg-card rounded-2xl border border-border p-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="flex items-center gap-1 text-text-muted text-xs mb-2">
                                <Calendar className="w-3 h-3" />
                                <span>Дата</span>
                            </div>
                            <p className="text-white font-medium">{dateStr}</p>
                        </div>
                        <div>
                            <div className="flex items-center gap-1 text-text-muted text-xs mb-2">
                                <Clock className="w-3 h-3" />
                                <span>Время</span>
                            </div>
                            <p className="text-white font-medium">{selectedTime}</p>
                        </div>
                    </div>
                </div>

                {/* Location */}
                <Link href="/location" className="block bg-bg-card rounded-2xl border border-border p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-bg-elevated flex items-center justify-center">
                                <MapPin className="w-5 h-5 text-text-secondary" />
                            </div>
                            <div>
                                <p className="text-white font-medium">{shopInfo.name}</p>
                                <p className="text-text-muted text-sm">{shopInfo.address.short}</p>
                            </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-text-muted" />
                    </div>
                </Link>
            </div>

            {/* Footer */}
            <div className="fixed bottom-0 left-0 right-0 p-4 pb-6 glass border-t border-border">
                <div className="flex items-center justify-between mb-3 px-1">
                    <div>
                        <p className="text-text-muted text-xs">Итого</p>
                        <p className="text-text-secondary text-sm flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {duration} мин
                        </p>
                    </div>
                    <p className="text-white text-2xl font-semibold">{total} ₽</p>
                </div>
                <Link
                    href="/success"
                    className="flex items-center justify-between w-full bg-white text-black py-4 px-6 rounded-2xl font-semibold active:scale-[0.98] transition-transform"
                >
                    <span>Подтвердить</span>
                    <ArrowRight className="w-5 h-5" />
                </Link>
                <p className="text-text-muted text-xs text-center mt-3">
                    Оплата на месте · Отмена за 2 часа бесплатно
                </p>
            </div>
        </main>
    );
}
