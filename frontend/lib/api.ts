const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';

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

// Fetcher for SWR
export const fetcher = async <T>(url: string): Promise<T> => {
    const res = await fetch(`${API_URL}${url}`);
    if (!res.ok) {
        throw new Error(`API Error: ${res.status}`);
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
        const res = await fetch(`${API_URL}/api/bookings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(`Booking failed: ${res.status}`);
        return res.json();
    },
    
    getUserBookings: (telegramId: number) => 
        fetcher<Booking[]>(`/api/bookings/user/${telegramId}`),
    
    cancelBooking: async (bookingId: number): Promise<void> => {
        const res = await fetch(`${API_URL}/api/bookings/${bookingId}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error(`Cancel failed: ${res.status}`);
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
