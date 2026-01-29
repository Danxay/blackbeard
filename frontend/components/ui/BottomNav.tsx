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
        <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border safe-bottom">
            <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                "flex flex-col items-center justify-center w-20 h-full transition-all",
                                isActive ? "text-white" : "text-text-muted hover:text-text-secondary"
                            )}
                        >
                            <item.icon
                                className={clsx(
                                    "w-5 h-5 mb-1 transition-transform",
                                    isActive && "scale-110"
                                )}
                                strokeWidth={isActive ? 2.5 : 2}
                            />
                            <span className={clsx(
                                "text-[10px] font-medium tracking-wide",
                                isActive && "font-semibold"
                            )}>
                                {item.label}
                            </span>
                            {isActive && (
                                <div className="absolute top-0 w-12 h-0.5 bg-white rounded-full" />
                            )}
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
