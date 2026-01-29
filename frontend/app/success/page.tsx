"use client";
import { Check, Calendar, Clock, Home } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useBookingStore } from "@/store/bookingStore";
import { shopInfo } from "@/data/shop";
import { useEffect } from "react";

export default function SuccessPage() {
    const {
        selectedBarber,
        selectedServices,
        selectedDate,
        selectedTime,
        getTotalPrice,
        getTotalDuration,
        reset
    } = useBookingStore();

    const total = getTotalPrice();
    const duration = getTotalDuration();

    const dateStr = selectedDate
        ? selectedDate.toLocaleDateString('ru', { day: 'numeric', month: 'short' })
        : '';

    const handleAddToCalendar = () => {
        if (!selectedDate || !selectedTime) return;

        const [hours, minutes] = selectedTime.split(':').map(Number);
        const startDate = new Date(selectedDate);
        startDate.setHours(hours, minutes, 0, 0);
        const endDate = new Date(startDate);
        endDate.setMinutes(endDate.getMinutes() + duration);

        const title = `${selectedServices.map(s => s.name).join(', ')} — ${shopInfo.name}`;
        const details = selectedBarber
            ? `Мастер: ${selectedBarber.name}\n${shopInfo.address.full}`
            : shopInfo.address.full;

        const formatDate = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

        const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(shopInfo.address.full)}`;
        window.open(calendarUrl, '_blank');
    };

    const handleGoHome = () => {
        reset();
    };

    return (
        <main className="min-h-screen bg-bg flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                {/* Success icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-6"
                >
                    <Check className="w-10 h-10 text-success" strokeWidth={3} />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-semibold text-white mb-2"
                >
                    Записано!
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-text-secondary mb-8"
                >
                    Ждём вас в {shopInfo.name}
                </motion.p>

                {/* Details */}
                {selectedBarber && selectedServices.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="w-full bg-bg-card rounded-2xl border border-border p-4 text-left"
                    >
                        <div className="flex items-center gap-3 pb-4 border-b border-border">
                            <img
                                src={selectedBarber.image}
                                alt={selectedBarber.name}
                                className="w-12 h-12 rounded-xl object-cover"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-white font-medium truncate">
                                    {selectedServices.map(s => s.name).join(', ')}
                                </p>
                                <p className="text-text-muted text-sm">{selectedBarber.name}</p>
                            </div>
                            <p className="text-white font-semibold">{total} ₽</p>
                        </div>

                        <div className="flex pt-4 gap-4">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-text-secondary" />
                                <span className="text-white text-sm">{dateStr}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-text-secondary" />
                                <span className="text-white text-sm">{selectedTime}</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Actions */}
            <div className="p-4 pb-6 space-y-3">
                <button
                    onClick={handleAddToCalendar}
                    className="flex items-center justify-center gap-2 w-full bg-white text-black py-4 rounded-2xl font-semibold active:scale-[0.98] transition-transform"
                >
                    <Calendar className="w-5 h-5" />
                    Добавить в календарь
                </button>

                <Link
                    href="/"
                    onClick={handleGoHome}
                    className="flex items-center justify-center gap-2 w-full bg-bg-card text-white py-4 rounded-2xl font-medium border border-border"
                >
                    <Home className="w-5 h-5" />
                    На главную
                </Link>
            </div>
        </main>
    );
}
