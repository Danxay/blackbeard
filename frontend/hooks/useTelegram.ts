'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';

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

// Server snapshot always returns null
function getServerSnapshot(): TelegramWebApp | null {
    return null;
}

// Client snapshot returns the actual WebApp
function getSnapshot(): TelegramWebApp | null {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        return window.Telegram.WebApp;
    }
    return null;
}

// Subscribe function (no-op since Telegram WebApp doesn't change)
function subscribe(): () => void {
    return () => { };
}

export function useTelegram() {
    const webApp = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    const isInitializedRef = useRef(false);

    // Initialize WebApp once (using ref to avoid lint warning about setState in effect)
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

    return {
        tg: webApp,
        user,
        onClose,
        isReady: !!webApp,
        isMounted: typeof window !== 'undefined'
    };
}
