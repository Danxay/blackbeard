'use client';

import useSWR from 'swr';
import { Booking, fetcher, api } from '@/lib/api';
import { useTelegram } from './useTelegram';

export function useBookings() {
    const { user, isReady } = useTelegram();

    // Use /api/bookings as key, but only if user exists and app is ready
    const shouldFetch = isReady && user;

    const { data, error, isLoading, mutate } = useSWR<Booking[]>(
        shouldFetch ? '/api/bookings' : null,
        (url) => fetcher<Booking[]>(url),
        {
            revalidateOnFocus: true,
            dedupingInterval: 30000, // 30 sec cache
        }
    );

    const cancelBooking = async (bookingId: number) => {
        try {
            await api.cancelBooking(bookingId);
            mutate(); // Refresh bookings list
            return true;
        } catch (error) {
            console.error('Cancel booking error:', error);
            return false;
        }
    };

    return {
        bookings: data || [],
        isLoading,
        isError: error,
        mutate,
        cancelBooking,
    };
}
