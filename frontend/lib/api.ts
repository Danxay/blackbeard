const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface BookingData {
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

interface Barber {
    id: number;
    name: string;
    role: string;
    rating: number;
    reviews_count: number;
    experience: string;
    image: string;
    is_available: boolean;
}

interface Service {
    id: number;
    name: string;
    description: string;
    price: number;
    duration: number;
    category: string;
    icon: string;
    popular: boolean;
}

interface Booking {
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

class ApiClient {
    private baseUrl: string;

    constructor() {
        this.baseUrl = API_URL;
    }

    private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        return response.json();
    }

    // Services
    async getServices(): Promise<Service[]> {
        return this.request<Service[]>('/api/services');
    }

    async getPopularServices(): Promise<Service[]> {
        return this.request<Service[]>('/api/services/popular');
    }

    // Barbers
    async getBarbers(): Promise<Barber[]> {
        return this.request<Barber[]>('/api/barbers');
    }

    async getBarber(id: number): Promise<Barber> {
        return this.request<Barber>(`/api/barbers/${id}`);
    }

    // Bookings
    async createBooking(data: BookingData): Promise<Booking> {
        return this.request<Booking>('/api/bookings', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async getUserBookings(telegramId: number): Promise<Booking[]> {
        return this.request<Booking[]>(`/api/bookings/user/${telegramId}`);
    }

    async cancelBooking(bookingId: number): Promise<void> {
        return this.request(`/api/bookings/${bookingId}`, {
            method: 'DELETE',
        });
    }

    // Auth
    async validateInitData(initData: string): Promise<{ valid: boolean; user: any }> {
        return this.request('/api/auth/validate', {
            method: 'POST',
            body: JSON.stringify({ init_data: initData }),
        });
    }
}

export const api = new ApiClient();
export type { Barber, Service, Booking, BookingData };
