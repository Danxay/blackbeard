"use client";

import Link from "next/link";
import { Calendar, Gift } from "lucide-react";

export default function QuickActions() {
    return (
        <div className="grid grid-cols-2 gap-3">
            <Link
                href="/bookings"
                className="flex items-center gap-3 p-4 bg-bg-card rounded-2xl border border-border hover:border-border-hover transition-colors"
            >
                <div className="w-10 h-10 rounded-xl bg-bg-elevated flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-text-secondary" />
                </div>
                <span className="text-white text-sm font-medium">Мои записи</span>
            </Link>

            <Link
                href="/promotions"
                className="flex items-center gap-3 p-4 bg-bg-card rounded-2xl border border-border hover:border-border-hover transition-colors"
            >
                <div className="w-10 h-10 rounded-xl bg-bg-elevated flex items-center justify-center">
                    <Gift className="w-5 h-5 text-text-secondary" />
                </div>
                <span className="text-white text-sm font-medium">Акции</span>
            </Link>
        </div>
    );
}
