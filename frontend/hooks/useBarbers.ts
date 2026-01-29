'use client';

import useSWR from 'swr';
import { Barber, fetcher } from '@/lib/api';

export function useBarbers() {
    const { data, error, isLoading, mutate } = useSWR<Barber[]>(
        '/api/barbers',
        (url) => fetcher<Barber[]>(url),
        {
            revalidateOnFocus: false,
            dedupingInterval: 60000, // 1 minute cache
        }
    );

    return {
        barbers: data || [],
        isLoading,
        isError: error,
        mutate,
    };
}

export function useBarber(id: number | null) {
    const { data, error, isLoading } = useSWR<Barber>(
        id ? `/api/barbers/${id}` : null,
        (url) => fetcher<Barber>(url),
        {
            revalidateOnFocus: false,
        }
    );

    return {
        barber: data,
        isLoading,
        isError: error,
    };
}
