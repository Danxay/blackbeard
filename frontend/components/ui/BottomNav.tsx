'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Calendar, User } from 'lucide-react'
import clsx from 'clsx'

const navItems = [
    { href: '/', icon: Home, label: 'Главная' },
    { href: '/bookings', icon: Calendar, label: 'Записи' },
    { href: '/profile', icon: User, label: 'Профиль' },
]

export default function BottomNav() {
    const pathname = usePathname()

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border">
            <div className="flex items-stretch justify-around max-w-lg mx-auto safe-bottom">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            aria-current={isActive ? 'page' : undefined}
                            className={clsx(
                                "relative flex flex-col items-center justify-center flex-1 py-3 min-h-[56px] transition-all duration-200 touch-feedback",
                                isActive ? "text-white" : "text-text-muted"
                            )}
                        >
                            {/* Индикатор активности */}
                            <div className={clsx(
                                "absolute top-0 left-1/2 -translate-x-1/2 h-0.5 bg-white rounded-full transition-all duration-300",
                                isActive ? "w-8 opacity-100" : "w-0 opacity-0"
                            )} />

                            <div className={clsx(
                                "relative transition-transform duration-200",
                                isActive && "scale-105"
                            )}>
                                <item.icon
                                    className="w-6 h-6"
                                    strokeWidth={isActive ? 2.5 : 1.8}
                                />
                            </div>

                            <span className={clsx(
                                "text-[11px] mt-1 transition-all duration-200",
                                isActive ? "font-semibold" : "font-medium opacity-80"
                            )}>
                                {item.label}
                            </span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
