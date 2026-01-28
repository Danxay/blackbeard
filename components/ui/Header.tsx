"use client";
import { useRouter } from 'next/navigation';
import { ArrowLeft, Bell } from 'lucide-react';

export default function Header({ title, showBack = true }: { title: string, showBack?: boolean }) {
    const router = useRouter();
    return (
        <header className="relative z-20 pt-12 pb-4 px-6 bg-gradient-to-b from-background-dark via-background-dark/80 to-transparent flex items-center justify-between">
            {showBack ? (
                <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-white/10 text-white transition">
                    <ArrowLeft className="w-6 h-6" />
                </button>
            ) : <div className="w-10" />}

            <div className="text-center">
                <h1 className="font-display font-bold text-xl tracking-wider text-white uppercase">{title}</h1>
            </div>

            <button className="p-2 -mr-2 rounded-full hover:bg-white/10 text-white transition relative">
                <Bell className="w-6 h-6" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
            </button>
        </header>
    )
}
