import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Service, Barber, api } from '@/lib/api';

// Промокоды
const PROMO_CODES: Record<string, { discount: number; type: 'percent' | 'fixed'; description: string }> = {
    'FIRST20': { discount: 20, type: 'percent', description: 'Скидка 20% на первый визит' },
    'COMBO15': { discount: 15, type: 'percent', description: 'Скидка 15% на комплекс' },
    'FRIEND': { discount: 500, type: 'fixed', description: 'Скидка 500₽ за друга' },
};

interface BookingState {
    // Выбранные данные
    selectedServices: Service[];
    selectedBarber: Barber | null;
    selectedDate: Date | null;
    selectedTime: string | null;

    // Промокод
    promoCode: string | null;
    promoDiscount: number;
    promoDescription: string | null;
    promoError: string | null;

    // Откуда начали флоу
    entryPoint: 'services' | 'barber' | 'home' | null;

    // Loading state
    isSubmitting: boolean;
    hasHydrated: boolean;

    // Actions
    setServices: (services: Service[]) => void;
    addService: (service: Service) => void;
    removeService: (serviceId: number) => void;
    toggleService: (service: Service) => void;

    setBarber: (barber: Barber) => void;
    setDate: (date: Date) => void;
    setTime: (time: string) => void;
    setEntryPoint: (point: 'services' | 'barber' | 'home') => void;

    // Promo
    applyPromoCode: (code: string) => boolean;
    clearPromoCode: () => void;

    // Computed
    getTotalPrice: () => number;
    getFinalPrice: () => number;
    getTotalDuration: () => number;

    // API
    submitBooking: () => Promise<boolean>;

    // Utils
    reset: () => void;
    isServiceSelected: (serviceId: number) => boolean;
    setHasHydrated: (value: boolean) => void;
}

const initialState = {
    selectedServices: [] as Service[],
    selectedBarber: null as Barber | null,
    selectedDate: null as Date | null,
    selectedTime: null as string | null,
    promoCode: null as string | null,
    promoDiscount: 0,
    promoDescription: null as string | null,
    promoError: null as string | null,
    entryPoint: null as BookingState['entryPoint'],
    isSubmitting: false,
    hasHydrated: false,
};

// Get Telegram user data
function getTelegramUser() {
    if (typeof window === 'undefined') return null;
    return window.Telegram?.WebApp?.initDataUnsafe?.user || null;
}

function getChatId() {
    if (typeof window === 'undefined') return 0;
    const user = window.Telegram?.WebApp?.initDataUnsafe?.user;
    return user?.id || 0;
}

function formatLocalDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export const useBookingStore = create<BookingState>()(
    persist(
        (set, get) => ({
            ...initialState,

            setServices: (services) => set({ selectedServices: services }),

            addService: (service) => set((state) => ({
                selectedServices: [...state.selectedServices, service]
            })),

            removeService: (serviceId) => set((state) => ({
                selectedServices: state.selectedServices.filter(s => s.id !== serviceId)
            })),

            toggleService: (service) => {
                const state = get();
                if (state.selectedServices.some(s => s.id === service.id)) {
                    get().removeService(service.id);
                } else {
                    get().addService(service);
                }
            },

            setBarber: (barber) => set({ selectedBarber: barber }),
            setDate: (date) => set({ selectedDate: date }),
            setTime: (time) => set({ selectedTime: time }),
            setEntryPoint: (point) => set({ entryPoint: point }),
            setHasHydrated: (value) => set({ hasHydrated: value }),

            applyPromoCode: (code: string) => {
                const normalizedCode = code.trim().toUpperCase();
                const promo = PROMO_CODES[normalizedCode];

                if (!promo) {
                    set({ promoError: 'Промокод не найден', promoCode: null, promoDiscount: 0, promoDescription: null });
                    return false;
                }

                const totalPrice = get().getTotalPrice();
                let discount = 0;

                if (promo.type === 'percent') {
                    discount = Math.round(totalPrice * promo.discount / 100);
                } else {
                    discount = Math.min(promo.discount, totalPrice);
                }

                set({
                    promoCode: normalizedCode,
                    promoDiscount: discount,
                    promoDescription: promo.description,
                    promoError: null,
                });
                return true;
            },

            clearPromoCode: () => set({
                promoCode: null,
                promoDiscount: 0,
                promoDescription: null,
                promoError: null,
            }),

            getTotalPrice: () => {
                return get().selectedServices.reduce((sum, s) => sum + s.price, 0);
            },

            getFinalPrice: () => {
                const total = get().getTotalPrice();
                return Math.max(0, total - get().promoDiscount);
            },

            getTotalDuration: () => {
                return get().selectedServices.reduce((sum, s) => sum + s.duration, 0);
            },

            submitBooking: async () => {
                const state = get();
                const user = getTelegramUser();

                if (!state.selectedBarber || !state.selectedDate || !state.selectedTime || state.selectedServices.length === 0) {
                    return false;
                }

                set({ isSubmitting: true });

                try {
                    await api.createBooking({
                        telegram_id: user?.id || 0,
                        chat_id: getChatId(),
                        first_name: user?.first_name || 'Гость',
                        username: user?.username,
                        barber_id: state.selectedBarber.id,
                        service_ids: state.selectedServices.map(s => s.id),
                        date: formatLocalDate(state.selectedDate),
                        time: state.selectedTime,
                        total_price: state.getFinalPrice(),
                        total_duration: state.getTotalDuration(),
                    });

                    return true;
                } catch (error) {
                    console.error('Booking error:', error);
                    return false;
                } finally {
                    set({ isSubmitting: false });
                }
            },

            reset: () => set((state) => ({
                ...initialState,
                hasHydrated: state.hasHydrated,
            })),

            isServiceSelected: (serviceId) => {
                return get().selectedServices.some(s => s.id === serviceId);
            },
        }),
        {
            name: 'booking-storage',
            partialize: (state) => ({
                selectedServices: state.selectedServices,
                selectedBarber: state.selectedBarber,
            }),
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            },
        }
    )
);
