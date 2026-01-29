import { useEffect, useState } from 'react';

interface TelegramUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    photo_url?: string;
}

interface TelegramWebApp {
    ready: () => void;
    expand: () => void;
    close: () => void;
    setHeaderColor: (color: string) => void;
    setBackgroundColor: (color: string) => void;
    initDataUnsafe?: {
        user?: TelegramUser;
    };
}

declare global {
    interface Window {
        Telegram?: {
            WebApp?: TelegramWebApp;
        };
    }
}

export function useTelegram() {
    const [isMounted, setIsMounted] = useState(false);
    const [tg, setTg] = useState<TelegramWebApp | null>(null);
    const [user, setUser] = useState<TelegramUser | null>(null);

    useEffect(() => {
        setIsMounted(true);
        
        // Безопасная проверка только на клиенте
        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
            const webApp = window.Telegram.WebApp;
            webApp.ready();

            try {
                webApp.expand();
            } catch (e) {
                console.warn("Failed to expand WebApp:", e);
            }

            setTg(webApp);
            setUser(webApp.initDataUnsafe?.user || null);

            try {
                webApp.setHeaderColor('#221e10');
                webApp.setBackgroundColor('#221e10');
            } catch (e) {
                console.warn("Failed to set colors:", e);
            }
        }
    }, []);

    const onClose = () => {
        tg?.close();
    };

    return {
        tg,
        user,
        onClose,
        isReady: isMounted && !!tg,
        isMounted
    };
}

