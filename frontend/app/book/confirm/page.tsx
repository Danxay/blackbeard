"use client";
import Header from "@/components/ui/Header";
import Image from "next/image";
import { Calendar, Clock, MapPin, ArrowRight, User, Scissors, Loader2 } from "lucide-react";
import Link from "next/link";
import { useBookingStore } from "@/store/bookingStore";
import { shopInfo } from "@/data/shop";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useTelegram } from "@/hooks/useTelegram";

export default function ConfirmPage() {
    const router = useRouter();
    const { user } = useTelegram();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
    }, [selectedBarber, selectedServices.length, selectedTime, router]);

    const handleConfirm = async () => {
        if (!selectedBarber || !selectedDate || !selectedTime || !user) {
            setError('Не все данные заполнены');
            return;
        }

        const formatLocalDate = (date: Date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        setIsSubmitting(true);
        setError(null);

        try {
            await api.createBooking({
                telegram_id: user.id,
                chat_id: user.id, // В Telegram Mini Apps chat_id = user_id
                first_name: user.first_name,
                username: user.username,
                barber_id: selectedBarber.id,
                service_ids: selectedServices.map(s => s.id),
                date: formatLocalDate(selectedDate),
                time: selectedTime,
                total_price: total,
                total_duration: duration
            });

            router.push('/success');
        } catch (err) {
            console.error('Booking error:', err);
            const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
            setError(`Не удалось создать запись: ${errorMessage}`);
        } finally {
            setIsSubmitting(false);
        }
    };


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
                        <div className="relative w-12 h-12 flex-shrink-0">
                            <Image
                                src={selectedBarber.image || '/placeholder.svg'}
                                alt={selectedBarber.name}
                                fill
                                className="object-cover rounded-xl"
                                unoptimized
                            />
                        </div>
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

                {/* Error */}
                {error && (
                    <div className="bg-error/10 border border-error/30 rounded-xl p-3 text-error text-sm text-center">
                        {error}
                    </div>
                )}
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
                <button
                    onClick={handleConfirm}
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 w-full bg-white text-black py-4 px-6 rounded-2xl font-semibold active:scale-[0.98] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Бронирование...</span>
                        </>
                    ) : (
                        <>
                            <span>Подтвердить</span>
                            <ArrowRight className="w-5 h-5" />
                        </>
                    )}
                </button>
                <p className="text-text-muted text-xs text-center mt-3">
                    Оплата на месте · Отмена за 2 часа бесплатно
                </p>
            </div>
        </main>
    );
}
