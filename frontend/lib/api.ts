// Remove trailing slash from API_URL
const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const API_URL = rawApiUrl.endsWith('/') ? rawApiUrl.slice(0, -1) : rawApiUrl;

// Types matching backend schemas
export interface Service {
    id: number;
    name: string;
    description: string;
    price: number;
    duration: number;
    category: string;
    icon: string;
    popular: boolean;
}

export interface Barber {
    id: number;
    name: string;
    role: string;
    rating: number;
    reviews_count: number;
    experience: string;
    image: string;
    is_available: boolean;
}

export interface Booking {
    id: number;
    barber: Barber;
    services: Service[];
    date: string;
    time: string;
    status: string;
    total_price: number;
    total_duration: number;
    created_at: string;
}

export interface BookingCreate {
    telegram_id: number;
    chat_id: number;
    first_name: string;
    username?: string;
    barber_id: number;
    service_ids: number[];
    date: string;
    time: string;
    total_price: number;
    total_duration: number;
}

// Fetcher for SWR with error handling
export const fetcher = async <T>(url: string): Promise<T> => {
    const fullUrl = `${API_URL}${url}`;
    const res = await fetch(fullUrl);
    if (!res.ok) {
        const error = new Error(`API Error: ${res.status}`);
        throw error;
    }
    return res.json();
};

// API methods
export const api = {
    // Services
    getServices: () => fetcher<Service[]>('/api/services'),
    getPopularServices: () => fetcher<Service[]>('/api/services/popular'),

    // Barbers
    getBarbers: () => fetcher<Barber[]>('/api/barbers'),
    getBarber: (id: number) => fetcher<Barber>(`/api/barbers/${id}`),

    // Bookings
    createBooking: async (data: BookingCreate): Promise<Booking> => {
        const url = `${API_URL}/api/bookings`;
        console.log('Creating booking:', { url, data });

        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const errorBody = await res.text();
            console.error('Booking error response:', { status: res.status, body: errorBody });
            throw new Error(`Ошибка ${res.status}: ${errorBody}`);
        }

        return res.json();
    },

    getUserBookings: (telegramId: number) =>
        fetcher<Booking[]>(`/api/bookings/user/${telegramId}`),

    cancelBooking: async (bookingId: number): Promise<void> => {
        const res = await fetch(`${API_URL}/api/bookings/${bookingId}`, {
            method: 'DELETE',
        });
        if (!res.ok) {
            const errorBody = await res.text();
            throw new Error(`Ошибка отмены ${res.status}: ${errorBody}`);
        }
    },

    // Auth
    validateInitData: async (initData: string) => {
        const res = await fetch(`${API_URL}/api/auth/validate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ init_data: initData }),
        });
        if (!res.ok) throw new Error('Validation failed');
        return res.json();
    },
};

// Export API URL for direct use
export { API_URL };
