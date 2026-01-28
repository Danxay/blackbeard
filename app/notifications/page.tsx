"use client";
import Header from "@/components/ui/Header";
import { Bell, Calendar, Gift } from "lucide-react";

const notifications = [
    {
        type: "reminder",
        title: "Напоминание о записи",
        message: "Завтра в 14:00 у вас запись на стрижку",
        time: "2 часа назад",
        read: false,
    },
    {
        type: "promo",
        title: "Новая акция",
        message: "Скидка 20% на первый визит",
        time: "Вчера",
        read: false,
    },
    {
        type: "system",
        title: "Запись успешно создана",
        message: "Ждём вас 15 февраля в 14:00",
        time: "2 дня назад",
        read: true,
    },
];

const icons = {
    reminder: Calendar,
    promo: Gift,
    system: Bell,
};

export default function NotificationsPage() {
    return (
        <main className="min-h-screen bg-bg pb-8">
            <Header title="Уведомления" />

            <div className="p-4 space-y-3">
                {notifications.map((notif, i) => {
                    const Icon = icons[notif.type as keyof typeof icons] || Bell;
                    return (
                        <div
                            key={i}
                            className={`flex gap-4 p-4 rounded-2xl border ${notif.read
                                    ? 'bg-bg-card border-border'
                                    : 'bg-bg-card border-accent/20'
                                }`}
                        >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${notif.read ? 'bg-bg-elevated' : 'bg-accent/10'
                                }`}>
                                <Icon className={`w-5 h-5 ${notif.read ? 'text-text-secondary' : 'text-accent'}`} />
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
                })}
            </div>
        </main>
    );
}
