"use client";
import { MapPin, Phone, Clock, Navigation, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { shopInfo, getTodaySchedule, isOpenNow } from "@/data/shop";
import clsx from "clsx";

export default function LocationPage() {
    const router = useRouter();
    const todaySchedule = getTodaySchedule();
    const isOpen = isOpenNow();

    return (
        <main className="min-h-screen bg-bg pb-8">
            {/* Map */}
            <div className="relative h-64">
                <img
                    src={shopInfo.mapImage}
                    alt="Карта"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-bg/50 to-transparent" />

                {/* Back button */}
                <button
                    onClick={() => router.back()}
                    className="absolute top-4 left-4 w-10 h-10 rounded-full bg-bg/80 backdrop-blur-sm flex items-center justify-center"
                >
                    <ChevronLeft className="w-5 h-5 text-white" />
                </button>

                {/* Pin marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg">
                        <MapPin className="w-4 h-4 text-black" />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 -mt-8 relative space-y-4">
                {/* Address Card */}
                <div className="bg-bg-card rounded-2xl border border-border p-4">
                    <h1 className="text-white font-semibold text-lg mb-1">{shopInfo.name}</h1>
                    <p className="text-text-secondary text-sm mb-4">{shopInfo.address.full}</p>

                    <div className="flex items-center gap-2 text-sm">
                        <span className={clsx(
                            "px-2 py-0.5 rounded text-xs font-medium",
                            isOpen ? "bg-success/10 text-success" : "bg-error/10 text-error"
                        )}>
                            {isOpen ? "Открыто" : "Закрыто"}
                        </span>
                        <span className="text-text-muted">
                            Сегодня: {todaySchedule.open} – {todaySchedule.close}
                        </span>
                    </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                    <a
                        href={`tel:${shopInfo.phoneClean}`}
                        className="flex items-center justify-center gap-2 p-4 bg-bg-card rounded-2xl border border-border active:scale-[0.98] transition-transform"
                    >
                        <Phone className="w-5 h-5 text-white" />
                        <span className="text-white font-medium">Позвонить</span>
                    </a>
                    <a
                        href={shopInfo.mapsUrl}
                        target="_blank"
                        className="flex items-center justify-center gap-2 p-4 bg-white rounded-2xl text-black active:scale-[0.98] transition-transform"
                    >
                        <Navigation className="w-5 h-5" />
                        <span className="font-medium">Маршрут</span>
                    </a>
                </div>

                {/* Schedule */}
                <div className="bg-bg-card rounded-2xl border border-border p-4">
                    <div className="flex items-center gap-2 mb-4">
                        <Clock className="w-4 h-4 text-text-secondary" />
                        <span className="text-white font-medium">Часы работы</span>
                    </div>
                    <div className="space-y-2">
                        {shopInfo.schedule.map((day, i) => {
                            const todayIndex = new Date().getDay();
                            const scheduleIndex = todayIndex === 0 ? 6 : todayIndex - 1;
                            const isToday = i === scheduleIndex;

                            return (
                                <div key={i} className="flex justify-between text-sm">
                                    <span className={clsx(
                                        isToday ? "text-white font-medium" : "text-text-secondary"
                                    )}>
                                        {day.day}
                                    </span>
                                    <span className={clsx(
                                        isToday ? "text-white" : "text-text-muted"
                                    )}>
                                        {day.hours}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </main>
    );
}
