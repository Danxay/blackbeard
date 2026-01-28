"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useBookingStore } from "@/store/bookingStore";

export default function BookButton() {
    const { reset } = useBookingStore();

    const handleClick = () => {
        reset();
    };

    return (
        <div className="fixed bottom-24 left-4 right-4 z-40 max-w-lg mx-auto">
            <Link
                href="/services"
                onClick={handleClick}
                className="flex items-center justify-between w-full bg-white text-black font-semibold py-4 px-6 rounded-2xl shadow-2xl shadow-white/10 active:scale-[0.98] transition-transform"
            >
                <span className="text-[15px]">Записаться</span>
                <ArrowRight className="w-5 h-5" />
            </Link>
        </div>
    );
}
