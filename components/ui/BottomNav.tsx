"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Grid, Calendar, User } from "lucide-react";
import clsx from "clsx";

export default function BottomNav() {
    const pathname = usePathname();

    const tabs = [
        { name: "Главная", icon: Grid, href: "/" },
        { name: "Записи", icon: Calendar, href: "/bookings" },
        { name: "Профиль", icon: User, href: "/profile" },
    ];

    return (
        <nav className="fixed bottom-0 w-full bg-background-dark border-t border-white/5 px-6 pb-6 pt-3 z-30 flex justify-between items-end">
            {tabs.map(tab => {
                const isActive = pathname === tab.href;
                return (
                    <Link key={tab.name} href={tab.href} className={clsx("flex flex-col items-center gap-1 w-16 transition-colors", isActive ? "text-primary" : "text-gray-400 hover:text-white")}>
                        {isActive && <div className="absolute -top-3 w-8 h-1 bg-primary rounded-full shadow-[0_0_10px_#f4c025]"></div>}
                        <div className="relative">
                            <tab.icon className={clsx("w-6 h-6", isActive && "fill-current")} />
                        </div>
                        <span className={clsx("text-[10px] font-medium", isActive && "font-bold")}>{tab.name}</span>
                    </Link>
                )
            })}
        </nav>
    )
}
