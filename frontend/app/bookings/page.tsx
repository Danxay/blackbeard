"use client";
import BottomNav from "@/components/ui/BottomNav";
import { useState } from "react";
import clsx from "clsx";
import { Calendar, Plus, X, AlertCircle, Clock } from "lucide-react";
import Link from "next/link";
import { getFutureDate } from "@/data/shop";
import { barbers } from "@/data/barbers";
import { services } from "@/data/services";

const upcomingBooking = {
    date: getFutureDate(3),
    time: '14:00',
    barber: barbers[0],
    services: [services.find(s => s.id === 'haircut-beard-combo')!],
};

const historyBookings = [
    { date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), barber: barbers[1], service: services[0] },
    { date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), barber: barbers[0], service: services[2] },
];

export default function BookingsPage() {
    const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>('upcoming');
    const [showCancelModal, setShowCancelModal] = useState(false);

    const total = upcomingBooking.services.reduce((sum, s) => sum + s.price, 0);
    const duration = upcomingBooking.services.reduce((sum, s) => sum + s.duration, 0);

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
                    <div className="bg-bg-card rounded-2xl border border-border overflow-hidden">
                        {/* Date header */}
                        <div className="p-4 border-b border-border">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-text-muted text-xs uppercase tracking-wide">
                                        {upcomingBooking.date.toLocaleDateString('ru-RU', { weekday: 'long' })}
                                    </p>
                                    <p className="text-white text-xl font-semibold mt-0.5">
                                        {upcomingBooking.date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}, {upcomingBooking.time}
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
                                    src={upcomingBooking.barber.image}
                                    alt={upcomingBooking.barber.name}
                                    className="w-12 h-12 rounded-xl object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="text-white font-medium truncate">{upcomingBooking.barber.name}</p>
                                    <p className="text-text-secondary text-sm truncate">
                                        {upcomingBooking.services.map(s => s.name).join(', ')}
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
                                onClick={() => setShowCancelModal(true)}
                                className="flex-1 py-4 text-error text-sm font-medium border-r border-border active:bg-error/5"
                            >
                                Отменить
                            </button>
                            <Link href="/book/date" className="flex-1 py-4 text-white text-sm font-medium text-center active:bg-white/5">
                                Перенести
                            </Link>
                        </div>
                    </div>
                )}

                {activeTab === 'history' && (
                    <div className="space-y-2">
                        {historyBookings.map((booking, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 bg-bg-card rounded-2xl border border-border">
                                <div className="w-12 h-12 rounded-xl bg-bg-elevated flex flex-col items-center justify-center">
                                    <span className="text-[10px] text-text-muted uppercase">
                                        {booking.date.toLocaleDateString('ru-RU', { month: 'short' })}
                                    </span>
                                    <span className="text-white font-semibold">{booking.date.getDate()}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-white font-medium truncate">{booking.service.name}</p>
                                    <p className="text-text-muted text-sm">{booking.barber.name}</p>
                                </div>
                                <Link href="/services" className="text-accent text-sm font-medium">
                                    Повторить
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Cancel Modal */}
            {showCancelModal && (
                <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60" onClick={() => setShowCancelModal(false)}>
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
                            >
                                Назад
                            </button>
                            <button
                                onClick={() => setShowCancelModal(false)}
                                className="flex-1 py-4 bg-error text-white font-medium rounded-2xl"
                            >
                                Отменить
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <BottomNav />
        </main>
    );
}
