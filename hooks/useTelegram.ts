import { useEffect, useState } from 'react';

// Using 'any' for Telegram object to avoid complex type setup if global types aren't picked up immediately,
// but usually @types/telegram-web-app handles it.
// We'll try to use the specific types if possible, but fallback to any for safety.

export function useTelegram() {
    const [tg, setTg] = useState<any>(null);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
            const webApp = window.Telegram.WebApp;
            webApp.ready();

            // Expand to full height
            try {
                webApp.expand();
            } catch (e) {
                console.error("Failed to expand WebApp", e);
            }

            setTg(webApp);
            setUser(webApp.initDataUnsafe?.user);

            // Set header color
            try {
                webApp.setHeaderColor('#221e10'); // background-dark
                webApp.setBackgroundColor('#221e10');
            } catch (e) {
                console.error("Failed to set colors", e);
            }
        }
    }, []);

    const onClose = () => {
        tg?.close();
    }

    return {
        tg,
        user,
        onClose,
        isReady: !!tg
    }
}
