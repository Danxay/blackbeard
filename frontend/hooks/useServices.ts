'use client';

import useSWR from 'swr';
import { Service, fetcher } from '@/lib/api';


export function useServices() {
    const { data, error, isLoading, mutate } = useSWR<Service[]>(
        '/api/services',
        (url) => fetcher<Service[]>(url),
        {
            revalidateOnFocus: false,
            dedupingInterval: 60000, // 1 minute cache
        }
    );

    return {
        services: data || [],
        isLoading,
        isError: error,
        mutate,
    };
}

export function usePopularServices() {
    const { data, error, isLoading } = useSWR<Service[]>(
        '/api/services/popular',
        (url) => fetcher<Service[]>(url),
        {
            revalidateOnFocus: false,
            dedupingInterval: 60000,
        }
    );

    return {
        services: data || [],
        isLoading,
        isError: error,
    };
}

// Category labels for UI
export const categoryLabels: Record<string, string> = {
    haircut: 'Стрижки',
    hair: 'Стрижки',
    beard: 'Борода',
    combo: 'Комплексы',
    complex: 'Комплексы',
    shave: 'Бритьё',
    color: 'Окрашивание',
    kids: 'Детские',
    styling: 'Укладка',
    wash: 'Мытьё',
    additional: 'Дополнительно',
};

// Icon mapping (backend stores icon names as strings)
export const iconMap: Record<string, string> = {
    Scissors: 'Scissors',
    Brush: 'Brush',
    Palette: 'Palette',
    Baby: 'Baby',
    Wind: 'Wind',
    Droplets: 'Droplets',
    Sparkles: 'Sparkles',
    Crown: 'Crown',
    Star: 'Star',
};
