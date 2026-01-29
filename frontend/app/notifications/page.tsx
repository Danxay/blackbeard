"use client";
import Header from "@/components/ui/Header";
import { Bell, Calendar, CheckCircle, XCircle } from "lucide-react";
import { useBookings } from "@/hooks/useBookings";

export default function NotificationsPage() {
    const { bookings } = useBookings();

    // Генерируем уведомления из реальных записей
    const notifications = bookings.flatMap(booking => {
        const items = [];
        const bookingDate = new Date(booking.date);
        const createdDate = new Date(booking.created_at);

        // Уведомление о создании записи
        items.push({
            type: booking.status === 'cancelled' ? 'cancelled' : 'confirmed',
            title: booking.status === 'cancelled' ? 'Запись отменена' : 'Запись подтверждена',
            message: `${booking.barber?.name || 'Мастер'} · ${bookingDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })} в ${booking.time}`,
            time: formatTimeAgo(createdDate),
            read: booking.status === 'cancelled',
        });

        return items;
    });

    function formatTimeAgo(date: Date): string {
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) return `${diffMins} мин. назад`;
        if (diffHours < 24) return `${diffHours} ч. назад`;
        if (diffDays === 1) return 'Вчера';
        if (diffDays < 7) return `${diffDays} дн. назад`;
        return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
    }

    const icons = {
        confirmed: CheckCircle,
        cancelled: XCircle,
        reminder: Calendar,
        system: Bell,
    };

    return (
        <main className="min-h-screen bg-bg pb-8">
            <Header title="Уведомления" />

            <div className="p-4 space-y-3">
                {notifications.length === 0 ? (
                    <div className="text-center py-12">
                        <Bell className="w-12 h-12 text-text-muted mx-auto mb-4" />
                        <p className="text-text-secondary">Нет уведомлений</p>
                        <p className="text-text-muted text-sm mt-1">
                            Уведомления появятся после записи
                        </p>
                    </div>
                ) : (
                    notifications.map((notif, i) => {
                        const Icon = icons[notif.type as keyof typeof icons] || Bell;
                        const isPositive = notif.type === 'confirmed';
                        return (
                            <div
                                key={i}
                                className={`flex gap-4 p-4 rounded-2xl border ${notif.read
                                    ? 'bg-bg-card border-border'
                                    : 'bg-bg-card border-accent/20'
                                    }`}
                            >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${notif.read ? 'bg-bg-elevated' : isPositive ? 'bg-success/10' : 'bg-error/10'
                                    }`}>
                                    <Icon className={`w-5 h-5 ${notif.read ? 'text-text-secondary' : isPositive ? 'text-success' : 'text-error'
                                        }`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <h3 className="text-white font-medium">{notif.title}</h3>
                                        {!notif.read && (
                                            <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0 mt-2" />
                                        )}
                                    </div>
                                    <p className="text-text-secondary text-sm mt-0.5">{notif.message}</p>
                                    <p className="text-text-muted text-xs mt-2">{notif.time}</p>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </main>
    );
}
