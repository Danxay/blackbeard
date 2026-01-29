// Централизованные данные барберов
export interface Barber {
    id: string;
    name: string;
    role: string;
    rating: number;
    reviewCount: number;
    experience: string;
    specialties: string[];
    image: string;
    isVerified: boolean;
    isAvailable: boolean;
}

export const barbers: Barber[] = [
    {
        id: 'alexey',
        name: 'Алексей Волков',
        role: 'Топ-мастер',
        rating: 4.9,
        reviewCount: 312,
        experience: '8 лет',
        specialties: ['Классика', 'Фейд', 'Борода'],
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        isVerified: true,
        isAvailable: true
    },
    {
        id: 'dmitry',
        name: 'Дмитрий Козлов',
        role: 'Старший барбер',
        rating: 4.8,
        reviewCount: 245,
        experience: '6 лет',
        specialties: ['Креатив', 'Борода', 'Окрашивание'],
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
        isVerified: true,
        isAvailable: true
    },
    {
        id: 'ivan',
        name: 'Иван Петров',
        role: 'Барбер',
        rating: 4.7,
        reviewCount: 156,
        experience: '4 года',
        specialties: ['Классика', 'Короткие стрижки'],
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        isVerified: false,
        isAvailable: true
    },
    {
        id: 'maxim',
        name: 'Максим Соколов',
        role: 'Барбер',
        rating: 4.6,
        reviewCount: 89,
        experience: '3 года',
        specialties: ['Фейд', 'Молодёжные стрижки'],
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
        isVerified: false,
        isAvailable: false // выходной
    }
];

export function getBarberById(id: string): Barber | undefined {
    return barbers.find(b => b.id === id);
}

export function getAvailableBarbers(): Barber[] {
    return barbers.filter(b => b.isAvailable);
}
