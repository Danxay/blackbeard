import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Service, Barber, api } from '@/lib/api';

interface BookingState {
    // Выбранные данные
    selectedServices: Service[];
    selectedBarber: Barber | null;
    selectedDate: Date | null;
    selectedTime: string | null;

    // Откуда начали флоу
    entryPoint: 'services' | 'barber' | 'home' | null;

    // Loading state
    isSubmitting: boolean;

    // Actions
    setServices: (services: Service[]) => void;
    addService: (service: Service) => void;
    removeService: (serviceId: number) => void;
    toggleService: (service: Service) => void;

    setBarber: (barber: Barber) => void;
    setDate: (date: Date) => void;
    setTime: (time: string) => void;
    setEntryPoint: (point: 'services' | 'barber' | 'home') => void;

    // Computed
    getTotalPrice: () => number;
    getTotalDuration: () => number;

    // API
    submitBooking: () => Promise<boolean>;

    // Utils
    reset: () => void;
    isServiceSelected: (serviceId: number) => boolean;
}

const initialState = {
    selectedServices: [] as Service[],
    selectedBarber: null as Barber | null,
    selectedDate: null as Date | null,
    selectedTime: null as string | null,
    entryPoint: null as BookingState['entryPoint'],
    isSubmitting: false,
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

            getTotalPrice: () => {
                return get().selectedServices.reduce((sum, s) => sum + s.price, 0);
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
                        total_price: state.getTotalPrice(),
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

            reset: () => set(initialState),

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
        }
    )
);
