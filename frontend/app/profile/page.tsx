'use client';

import { Gift, Bell, MapPin, ChevronRight, Phone, User } from 'lucide-react';
import Link from 'next/link';
import { useTelegram } from '@/hooks/useTelegram';
import BottomNav from '@/components/ui/BottomNav';
import { shopInfo } from '@/data/shop';

export default function Profile() {
  const { user, isMounted } = useTelegram();

  const menuItems = [
    { icon: Gift, label: 'Акции', href: '/promotions', color: 'text-accent' },
    { icon: Bell, label: 'Уведомления', href: '/notifications' },
    { icon: MapPin, label: 'Адрес', href: '/location' },
  ];

  if (!isMounted) {
    return (
      <div className="flex flex-col min-h-screen bg-bg pb-24">
        <div className="p-4 pt-12">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full skeleton" />
            <div className="flex-1 space-y-2">
              <div className="h-5 w-32 skeleton rounded" />
              <div className="h-4 w-24 skeleton rounded" />
            </div>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      {/* Header */}
      <div className="p-4 pt-12 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-bg-card border border-border flex items-center justify-center overflow-hidden">
            {user?.photo_url ? (
              <img src={user.photo_url} alt="" className="w-full h-full object-cover" />
            ) : (
              <User className="w-7 h-7 text-text-muted" />
            )}
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">
              {user ? `${user.first_name} ${user.last_name || ''}` : 'Гость'}
            </h1>
            <p className="text-text-secondary text-sm">
              {user?.username ? `@${user.username}` : 'Добро пожаловать'}
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-bg-card p-4 rounded-2xl border border-border text-center">
            <p className="text-2xl font-semibold text-white">12</p>
            <p className="text-text-muted text-xs mt-1">Визитов</p>
          </div>
          <div className="bg-bg-card p-4 rounded-2xl border border-border text-center">
            <p className="text-2xl font-semibold text-white">500</p>
            <p className="text-text-muted text-xs mt-1">Бонусов</p>
          </div>
          <div className="bg-bg-card p-4 rounded-2xl border border-border text-center">
            <p className="text-2xl font-semibold text-white">4.9</p>
            <p className="text-text-muted text-xs mt-1">Рейтинг</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="px-4 pb-28 flex flex-col gap-3">
        {menuItems.map((item, i) => (
          <Link key={i} href={item.href} className="block">
            <div className="flex items-center justify-between p-4 bg-bg-card rounded-2xl border border-border active:scale-[0.99] transition-transform">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-bg-elevated flex items-center justify-center">
                  <item.icon className={`w-5 h-5 ${item.color || 'text-text-secondary'}`} />
                </div>
                <span className="text-white font-medium">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-text-muted" />
            </div>
          </Link>
        ))}

        {/* Phone */}
        <a href={`tel:${shopInfo.phoneClean}`} className="block mt-2">
          <div className="flex items-center justify-between p-4 bg-bg-card rounded-2xl border border-border active:scale-[0.99] transition-transform">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-success" />
              </div>
              <div>
                <span className="text-white font-medium block">Позвонить</span>
                <span className="text-text-muted text-sm">{shopInfo.phone}</span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-text-muted" />
          </div>
        </a>
      </div>

      <BottomNav />
    </div>
  );
}
