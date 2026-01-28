'use client';

import { motion } from 'framer-motion';
import { User, Settings, CreditCard, Bell, LogOut, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useTelegram } from '@/hooks/useTelegram';
import { useEffect, useState } from 'react';

export default function Profile() {
  const { user } = useTelegram();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const menuItems = [
    { icon: User, label: 'Личные данные', href: '#' },
    { icon: CreditCard, label: 'Способы оплаты', href: '#' },
    { icon: Bell, label: 'Уведомления', href: '#' },
    { icon: Settings, label: 'Настройки', href: '#' },
  ];

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-background-dark pb-24">
      {/* Header */}
      <header className="px-6 pt-8 pb-6 bg-surface-dark border-b border-white/5">
        <h1 className="text-2xl font-bold text-white mb-6">Профиль</h1>

        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-surface-light/10 flex items-center justify-center border-2 border-primary overflow-hidden">
            {user?.photo_url ? (
              <img src={user.photo_url} alt={user.first_name} className="w-full h-full object-cover" />
            ) : (
              <User className="w-8 h-8 text-primary" />
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              {user ? `${user.first_name} ${user.last_name || ''}` : 'Гость'}
            </h2>
            <p className="text-text-secondary text-sm">
              {user?.username ? `@${user.username}` : '+7 (999) 000-00-00'}
            </p>
          </div>
        </div>
      </header>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 p-6">
        <div className="bg-surface-dark p-4 rounded-xl border border-white/5">
          <div className="text-3xl font-bold text-primary mb-1">12</div>
          <div className="text-xs text-text-secondary uppercase tracking-wider">Всего посещений</div>
        </div>
        <div className="bg-surface-dark p-4 rounded-xl border border-white/5">
          <div className="text-3xl font-bold text-white mb-1">0</div>
          <div className="text-xs text-text-secondary uppercase tracking-wider">Бонусов</div>
        </div>
      </div>

      {/* Menu */}
      <div className="px-6 space-y-2">
        {menuItems.map((item, index) => (
          <motion.button
            key={index}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-surface-dark p-4 rounded-xl border border-white/5 flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-text-secondary group-hover:text-primary transition-colors">
                <item.icon className="w-5 h-5" />
              </div>
              <span className="font-medium text-white">{item.label}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-white/20" />
          </motion.button>
        ))}

        <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full bg-surface-dark p-4 rounded-xl border border-white/5 flex items-center justify-between group mt-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                <LogOut className="w-5 h-5" />
              </div>
              <span className="font-medium text-red-500">Выйти</span>
            </div>
          </motion.button>
      </div>
    </div>
  );
}
