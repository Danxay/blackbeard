"use client";
import BottomNav from "@/components/ui/BottomNav";
import { useState } from "react";
import clsx from "clsx";

import { Calendar, Plus, AlertCircle, Clock, Loader2 } from "lucide-react";
import Link from "next/link";
import { useBookings } from "@/hooks/useBookings";

export default function BookingsPage() {
    const { bookings, isLoading, cancelBooking } = useBookings();
    const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>('upcoming');
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);
    const [isCancelling, setIsCancelling] = useState(false);

    // Разделяем на предстоящие и историю
    const now = new Date();
    const upcomingBookings = bookings.filter(b => {
        const bookingDate = new Date(b.date);
        return bookingDate >= now && b.status !== 'cancelled';
    });
    const historyBookings = bookings.filter(b => {
        const bookingDate = new Date(b.date);
        return bookingDate < now || b.status === 'cancelled';
    });

    const handleCancelClick = (bookingId: number) => {
        setSelectedBookingId(bookingId);
        setShowCancelModal(true);
    };

    const handleConfirmCancel = async () => {
        if (!selectedBookingId) return;
        setIsCancelling(true);
        const success = await cancelBooking(selectedBookingId);
        setIsCancelling(false);
        setShowCancelModal(false);
        if (success) {
            // Booking cancelled successfully
        }
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return {
            weekday: date.toLocaleDateString('ru-RU', { weekday: 'long' }),
            dayMonth: date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }),
            month: date.toLocaleDateString('ru-RU', { month: 'short' }),
            day: date.getDate(),
        };
    };

    if (isLoading) {
        return (
            <main className="min-h-screen bg-bg pb-24">
                <div className="sticky top-0 z-40 glass border-b border-border">
                    <div className="flex items-center justify-between h-14 px-4">
                        <h1 className="text-base font-semibold text-white">Записи</h1>
                    </div>
                </div>
                <div className="flex items-center justify-center h-[60vh]">
                    <Loader2 className="w-8 h-8 text-text-muted animate-spin" />
                </div>
                <BottomNav />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-bg pb-24">
            {/* Header */}
            <div className="sticky top-0 z-40 glass border-b border-border">
                <div className="flex items-center justify-between h-14 px-4">
                    <h1 className="text-base font-semibold text-white">Записи</h1>
                    <Link href="/services" className="flex items-center gap-1 text-text-secondary text-sm">
                        <Plus className="w-4 h-4" />
                        Новая
                    </Link>
                </div>

                {/* Tabs */}
                <div className="flex p-1 mx-4 mb-4 bg-bg-card rounded-xl">
                    <button
                        onClick={() => setActiveTab('upcoming')}
                        className={clsx(
                            "flex-1 py-2 text-sm font-medium rounded-lg transition-colors",
                            activeTab === 'upcoming' ? "bg-white text-black" : "text-text-secondary"
                        )}
                    >
                        Предстоящие
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={clsx(
                            "flex-1 py-2 text-sm font-medium rounded-lg transition-colors",
                            activeTab === 'history' ? "bg-white text-black" : "text-text-secondary"
                        )}
                    >
                        История
                    </button>
                </div>
            </div>

            <div className="p-4 space-y-4">
                {activeTab === 'upcoming' && (
                    <>
                        {upcomingBookings.length === 0 ? (
                            <div className="text-center py-12">
                                <Calendar className="w-12 h-12 text-text-muted mx-auto mb-4" />
                                <p className="text-text-secondary mb-4">Нет предстоящих записей</p>
                                <Link
                                    href="/services"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl"
                                >
                                    <Plus className="w-4 h-4" />
                                    Записаться
                                </Link>
                            </div>
                        ) : (
                            upcomingBookings.map((booking) => {
                                const dateInfo = formatDate(booking.date);
                                const total = booking.total_price;
                                const duration = booking.total_duration;

                                return (
                                    <div key={booking.id} className="bg-bg-card rounded-2xl border border-border overflow-hidden">
                                        {/* Date header */}
                                        <div className="p-4 border-b border-border">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-text-muted text-xs uppercase tracking-wide">
                                                        {dateInfo.weekday}
                                                    </p>
                                                    <p className="text-white text-xl font-semibold mt-0.5">
                                                        {dateInfo.dayMonth}, {booking.time}
                                                    </p>
                                                </div>
                                                <div className="px-2 py-1 bg-success/10 text-success text-xs font-medium rounded">
                                                    Подтверждено
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={booking.barber.image || '/placeholder.jpg'}
                                                    alt={booking.barber.name}
                                                    className="w-12 h-12 rounded-xl object-cover"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-white font-medium truncate">{booking.barber.name}</p>
                                                    <p className="text-text-secondary text-sm truncate">
                                                        {booking.services.map(s => s.name).join(', ')}
                                                    </p>
                                                    <p className="text-text-muted text-xs flex items-center gap-1 mt-1">
                                                        <Clock className="w-3 h-3" />
                                                        {duration} мин
                                                    </p>
                                                </div>
                                                <p className="text-white font-semibold">{total} ₽</p>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex border-t border-border">
                                            <button
                                                onClick={() => handleCancelClick(booking.id)}
                                                className="flex-1 py-4 text-error text-sm font-medium border-r border-border active:bg-error/5"
                                            >
                                                Отменить
                                            </button>
                                            <Link href="/book/date" className="flex-1 py-4 text-white text-sm font-medium text-center active:bg-white/5">
                                                Перенести
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </>
                )}

                {activeTab === 'history' && (
                    <div className="space-y-2">
                        {historyBookings.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-text-secondary">История пуста</p>
                            </div>
                        ) : (
                            historyBookings.map((booking) => {
                                const dateInfo = formatDate(booking.date);
                                return (
                                    <div key={booking.id} className="flex items-center gap-4 p-4 bg-bg-card rounded-2xl border border-border">
                                        <div className="w-12 h-12 rounded-xl bg-bg-elevated flex flex-col items-center justify-center">
                                            <span className="text-[10px] text-text-muted uppercase">
                                                {dateInfo.month}
                                            </span>
                                            <span className="text-white font-semibold">{dateInfo.day}</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white font-medium truncate">
                                                {booking.services.map(s => s.name).join(', ')}
                                            </p>
                                            <p className="text-text-muted text-sm">{booking.barber.name}</p>
                                        </div>
                                        <Link href="/services" className="text-accent text-sm font-medium">
                                            Повторить
                                        </Link>
                                    </div>
                                );
                            })
                        )}
                    </div>
                )}
            </div>

            {/* Cancel Modal */}
            {showCancelModal && (
                <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60" onClick={() => setShowCancelModal(false)}>
                    <div
                        className="bg-bg-card rounded-t-3xl w-full max-w-lg border-t border-border animate-slide-up p-6"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="text-center mb-6">
                            <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center mx-auto mb-4">
                                <AlertCircle className="w-6 h-6 text-error" />
                            </div>
                            <h3 className="text-white font-semibold text-lg mb-2">Отменить запись?</h3>
                            <p className="text-text-secondary text-sm">Это действие нельзя отменить</p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowCancelModal(false)}
                                className="flex-1 py-4 bg-bg-elevated text-white font-medium rounded-2xl"
                                disabled={isCancelling}
                            >
                                Назад
                            </button>
                            <button
                                onClick={handleConfirmCancel}
                                className="flex-1 py-4 bg-error text-white font-medium rounded-2xl flex items-center justify-center gap-2"
                                disabled={isCancelling}
                            >
                                {isCancelling ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    'Отменить'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <BottomNav />
        </main>
    );
}
