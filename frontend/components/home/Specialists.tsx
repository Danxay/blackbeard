"use client";

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { barbers } from '@/data/barbers';
import { useBookingStore } from '@/store/bookingStore';

export default function Specialists() {
    const { setBarber, setEntryPoint, reset } = useBookingStore();
    const availableBarbers = barbers.filter(b => b.isAvailable).slice(0, 4);

    const handleBarberClick = (barber: typeof barbers[0]) => {
        reset(); // Сброс предыдущего выбора
        setBarber(barber);
        setEntryPoint('barber');
    };

    return (
        <section>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-white">Мастера</h2>
                <Link
                    href="/book/barber"
                    className="flex items-center gap-1 text-text-secondary text-sm active:text-white"
                >
                    Все
                    <ChevronRight className="w-4 h-4" />
                </Link>
            </div>

            <div className="flex gap-3 overflow-x-auto -mx-4 px-4 pb-2 no-scrollbar">
                {availableBarbers.map((barber) => (
                    <Link
                        href="/services"
                        key={barber.id}
                        onClick={() => handleBarberClick(barber)}
                        className="flex-shrink-0 w-28 group"
                    >
                        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-bg-card mb-2">
                            <img
                                alt={barber.name}
                                className="w-full h-full object-cover transition-transform duration-300 group-active:scale-105"
                                src={barber.image}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                            {/* Info */}
                            <div className="absolute bottom-2 left-2 right-2">
                                <p className="text-white text-sm font-medium truncate">{barber.name.split(' ')[0]}</p>
                                <p className="text-text-muted text-[11px]">{barber.rating} ★</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
