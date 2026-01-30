"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Loader2 } from 'lucide-react';
import { useBarbers } from '@/hooks/useBarbers';
import { useBookingStore } from '@/store/bookingStore';
import { Barber } from '@/lib/api';

export default function Specialists() {
    const { barbers, isLoading } = useBarbers();
    const { setBarber, setEntryPoint, reset } = useBookingStore();
    const availableBarbers = barbers.filter(b => b.is_available).slice(0, 4);

    const handleBarberClick = (barber: Barber) => {
        reset();
        setBarber(barber);
        setEntryPoint('barber');
    };

    if (isLoading) {
        return (
            <section>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-white">Мастера</h2>
                </div>
                <div className="flex justify-center py-8">
                    <Loader2 className="w-6 h-6 text-text-muted animate-spin" />
                </div>
            </section>
        );
    }

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
                            <Image
                                alt={barber.name}
                                className="object-cover transition-transform duration-300 group-active:scale-105"
                                src={barber.image}
                                fill
                                sizes="112px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

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
