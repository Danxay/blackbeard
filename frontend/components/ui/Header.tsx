"use client";
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';


interface HeaderProps {
    title: string;
    showBack?: boolean;
    showNotifications?: boolean;
}

export default function Header({ title, showBack = true }: HeaderProps) {
    const router = useRouter();

    return (
        <header className="sticky top-0 z-40 glass border-b border-border">
            <div className="flex items-center justify-between h-14 px-4">
                {showBack ? (
                    <button
                        onClick={() => router.back()}
                        aria-label="Назад"
                        className="flex items-center justify-center w-10 h-10 -ml-2 rounded-full hover:bg-bg-hover text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                ) : (
                    <div className="w-10" />
                )}

                <h1 className="text-base font-semibold text-white tracking-tight">
                    {title}
                </h1>

                <div className="w-10" />
            </div>
        </header>
    );
}
