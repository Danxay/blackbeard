"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Loader2 } from 'lucide-react';
import clsx from 'clsx';
import { useBarbers } from '@/hooks/useBarbers';
import { useBookingStore } from '@/store/bookingStore';
import { Barber } from '@/lib/api';

export default function Specialists() {
    const { barbers, isLoading } = useBarbers();
    const { setBarber, setEntryPoint, reset } = useBookingStore();
    const visibleBarbers = barbers.slice(0, 4);

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
                    className="flex items-center gap-1 text-text-secondary text-sm touch-feedback"
                >
                    Все
                    <ChevronRight className="w-4 h-4" />
                </Link>
            </div>

            <div className="flex gap-3 overflow-x-auto -mx-4 px-4 pb-2 no-scrollbar">
                {visibleBarbers.map((barber, index) => {
                    const isAvailable = barber.is_available;
                    return (
                        <Link
                            href={isAvailable ? "/services" : "#"}
                            key={barber.id}
                            onClick={(e) => {
                                if (!isAvailable) {
                                    e.preventDefault();
                                    return;
                                }
                                handleBarberClick(barber);
                            }}
                            className={clsx(
                                "flex-shrink-0 w-32 group touch-feedback",
                                !isAvailable && "opacity-70"
                            )}
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-bg-card mb-2">
                                <Image
                                    alt={barber.name}
                                    className="object-cover transition-transform duration-300 group-active:scale-105"
                                    src={barber.image || '/placeholder.svg'}
                                    fill
                                    sizes="128px"
                                />
                                {!barber.is_available && (
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                        <span className="text-xs text-white font-medium bg-black/50 px-2 py-1 rounded-full">Выходной</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                                <div className="absolute bottom-2.5 left-2.5 right-2.5">
                                    <p className="text-white text-sm font-semibold truncate">{barber.name.split(' ')[0]}</p>
                                    <div className="flex items-center gap-1 mt-0.5">
                                        <span className="text-yellow-400 text-xs">★</span>
                                        <span className="text-text-muted text-xs">{barber.rating}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </section>
    );
}
