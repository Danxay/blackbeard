"use client";
import Header from "@/components/ui/Header";
import Image from "next/image";
import { Calendar, Clock, MapPin, ArrowRight, User, Scissors, Loader2, Tag, X, Check } from "lucide-react";
import Link from "next/link";
import { useBookingStore } from "@/store/bookingStore";
import { shopInfo } from "@/data/shop";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useTelegram } from "@/hooks/useTelegram";
import clsx from "clsx";

export default function ConfirmPage() {
    const router = useRouter();
    const { user } = useTelegram();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [promoInput, setPromoInput] = useState("");
    const [isPromoOpen, setIsPromoOpen] = useState(false);

    const {
        selectedBarber,
        selectedServices,
        selectedDate,
        selectedTime,
        hasHydrated,
        promoCode,
        promoDiscount,
        promoDescription,
        promoError,
        applyPromoCode,
        clearPromoCode,
        getTotalPrice,
        getFinalPrice,
        getTotalDuration
    } = useBookingStore();

    const total = getTotalPrice();
    const finalPrice = getFinalPrice();
    const duration = getTotalDuration();

    // Редирект если нет данных
    useEffect(() => {
        if (!hasHydrated) return;
        if (!selectedBarber || selectedServices.length === 0 || !selectedTime) {
            router.push('/services');
        }
    }, [hasHydrated, selectedBarber, selectedServices.length, selectedTime, router]);

    const handleApplyPromo = () => {
        if (promoInput.trim()) {
            const success = applyPromoCode(promoInput);
            if (success) {
                setPromoInput("");
                setIsPromoOpen(false);
            }
        }
    };

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
                chat_id: user.id,
                first_name: user.first_name,
                username: user.username,
                barber_id: selectedBarber.id,
                service_ids: selectedServices.map(s => s.id),
                date: formatLocalDate(selectedDate),
                time: selectedTime,
                total_price: finalPrice,
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
        <main className="min-h-screen-dynamic bg-bg">
            <Header title="Подтверждение" />

            <div className="p-4 pb-52 space-y-3 stagger">
                {/* Barber */}
                <div className="bg-bg-card rounded-2xl border border-border p-4 touch-feedback">
                    <div className="flex items-center gap-1.5 text-text-muted text-xs mb-3">
                        <User className="w-3.5 h-3.5" />
                        <span>Мастер</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative w-14 h-14 flex-shrink-0">
                            <Image
                                src={selectedBarber.image || '/placeholder.svg'}
                                alt={selectedBarber.name}
                                fill
                                className="object-cover rounded-xl"
                                unoptimized
                            />
                        </div>
                        <div>
                            <p className="text-white font-medium text-base">{selectedBarber.name}</p>
                            <p className="text-text-muted text-sm">{selectedBarber.role}</p>
                        </div>
                    </div>
                </div>

                {/* Services */}
                <div className="bg-bg-card rounded-2xl border border-border p-4">
                    <div className="flex items-center gap-1.5 text-text-muted text-xs mb-3">
                        <Scissors className="w-3.5 h-3.5" />
                        <span>Услуги</span>
                    </div>
                    <div className="space-y-3">
                        {selectedServices.map(service => (
                            <div key={service.id} className="flex items-center justify-between">
                                <div>
                                    <p className="text-white text-sm font-medium">{service.name}</p>
                                    <p className="text-text-muted text-xs">{service.duration} мин</p>
                                </div>
                                <p className="text-white font-semibold">{service.price} ₽</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Date & Time */}
                <div className="bg-bg-card rounded-2xl border border-border p-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="flex items-center gap-1.5 text-text-muted text-xs mb-2">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>Дата</span>
                            </div>
                            <p className="text-white font-medium text-base">{dateStr}</p>
                        </div>
                        <div>
                            <div className="flex items-center gap-1.5 text-text-muted text-xs mb-2">
                                <Clock className="w-3.5 h-3.5" />
                                <span>Время</span>
                            </div>
                            <p className="text-white font-medium text-base">{selectedTime}</p>
                        </div>
                    </div>
                </div>

                {/* Promo Code */}
                <div className="bg-bg-card rounded-2xl border border-border p-4">
                    <div className="flex items-center gap-1.5 text-text-muted text-xs mb-3">
                        <Tag className="w-3.5 h-3.5" />
                        <span>Промокод</span>
                    </div>

                    {promoCode ? (
                        <div className="flex items-center justify-between bg-success/10 rounded-xl p-3">
                            <div>
                                <div className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-success" />
                                    <span className="text-success font-semibold">{promoCode}</span>
                                </div>
                                <p className="text-text-muted text-xs mt-0.5">{promoDescription}</p>
                            </div>
                            <button
                                onClick={clearPromoCode}
                                className="p-2 text-text-muted hover:text-white transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ) : isPromoOpen ? (
                        <div className="space-y-2">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={promoInput}
                                    onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                                    placeholder="Введите код"
                                    className="flex-1 bg-bg-elevated border border-border rounded-xl px-4 py-3 text-white placeholder:text-text-muted focus:outline-none focus:border-white/30 transition-colors font-mono tracking-wide"
                                    autoFocus
                                />
                                <button
                                    onClick={handleApplyPromo}
                                    disabled={!promoInput.trim()}
                                    className="px-4 py-3 bg-white text-black rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed btn-press"
                                >
                                    ОК
                                </button>
                            </div>
                            {promoError && (
                                <p className="text-error text-xs">{promoError}</p>
                            )}
                            <button
                                onClick={() => setIsPromoOpen(false)}
                                className="text-text-muted text-xs"
                            >
                                Отмена
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsPromoOpen(true)}
                            className="w-full py-3 border border-dashed border-border rounded-xl text-text-secondary text-sm hover:border-white/30 transition-colors"
                        >
                            + Добавить промокод
                        </button>
                    )}
                </div>

                {/* Location */}
                <Link href="/location" className="block bg-bg-card rounded-2xl border border-border p-4 touch-feedback">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl bg-bg-elevated flex items-center justify-center">
                                <MapPin className="w-5 h-5 text-text-secondary" />
                            </div>
                            <div>
                                <p className="text-white font-medium">{shopInfo.name}</p>
                                <p className="text-text-muted text-sm">{shopInfo.address.short}</p>
                            </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-text-muted" />
                    </div>
                </Link>

                {/* Error */}
                {error && (
                    <div className="bg-error/10 border border-error/30 rounded-xl p-4 text-error text-sm text-center animate-scale-in">
                        {error}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="fixed-bottom-panel p-4 glass border-t border-border">
                <div className="flex items-center justify-between mb-3 px-1">
                    <div>
                        <p className="text-text-muted text-xs">Итого</p>
                        <p className="text-text-secondary text-sm flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {duration} мин
                        </p>
                    </div>
                    <div className="text-right">
                        {promoDiscount > 0 && (
                            <p className="text-text-muted text-sm line-through">{total} ₽</p>
                        )}
                        <p className={clsx(
                            "text-2xl font-bold",
                            promoDiscount > 0 ? "text-success" : "text-white"
                        )}>
                            {finalPrice} ₽
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleConfirm}
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 w-full bg-white text-black py-4 px-6 rounded-2xl font-semibold btn-press disabled:opacity-50 disabled:cursor-not-allowed"
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
