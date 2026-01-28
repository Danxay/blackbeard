import { Calendar, Gift } from 'lucide-react';
import Link from "next/link";

export default function QuickActions() {
    return (
        <div className="grid grid-cols-2 gap-4 mb-8">
            <Link href="/bookings" className="flex flex-col items-center justify-center p-4 bg-surface-dark rounded-xl shadow-sm border border-white/5 active:scale-95 transition-transform duration-200">
                <div className="bg-primary/10 p-3 rounded-full mb-2">
                    <Calendar className="text-primary w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-gray-300">Мои записи</span>
            </Link>
            <button className="flex flex-col items-center justify-center p-4 bg-surface-dark rounded-xl shadow-sm border border-white/5 active:scale-95 transition-transform duration-200">
                <div className="bg-primary/10 p-3 rounded-full mb-2">
                    <Gift className="text-primary w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-gray-300">Акции</span>
            </button>
        </div>
    )
}
