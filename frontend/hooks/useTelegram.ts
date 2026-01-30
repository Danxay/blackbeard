'use client';

import { useEffect, useRef, useState } from 'react';

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
    initData?: string;
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
    const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);
    const isInitializedRef = useRef(false);

    // Ensure WebApp is available even if injected after hydration
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const tryAttach = () => {
            const tg = window.Telegram?.WebApp ?? null;
            if (tg) {
                setWebApp(tg);
                return true;
            }
            return false;
        };

        if (tryAttach()) return;

        let attempts = 0;
        const maxAttempts = 50;
        const interval = setInterval(() => {
            attempts += 1;
            if (tryAttach() || attempts >= maxAttempts) {
                clearInterval(interval);
            }
        }, 100);

        return () => clearInterval(interval);
    }, []);

    // Initialize WebApp once
    useEffect(() => {
        if (webApp && !isInitializedRef.current) {
            isInitializedRef.current = true;

            webApp.ready();

            try {
                webApp.expand();
            } catch (e) {
                console.warn("Failed to expand WebApp:", e);
            }

            try {
                webApp.setHeaderColor('#221e10');
                webApp.setBackgroundColor('#221e10');
            } catch (e) {
                console.warn("Failed to set colors:", e);
            }
        }
    }, [webApp]);

    const onClose = () => {
        webApp?.close();
    };

    const user = webApp?.initDataUnsafe?.user || null;
    const initData = webApp?.initData || '';

    return {
        tg: webApp,
        user,
        initData,
        onClose,
        isReady: !!webApp,
        isMounted: typeof window !== 'undefined'
    };
}
