import {
    Scissors,
    Sparkles,
    Droplets,
    Crown,
    Blend,
    Eraser,
    Wind,
    Star,
    LucideIcon
} from 'lucide-react';

export interface Service {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: number; // в минутах
    category: 'haircut' | 'beard' | 'complex' | 'additional';
    icon: LucideIcon;
    popular?: boolean;
}

export const categoryLabels = {
    haircut: 'Стрижки',
    beard: 'Борода',
    complex: 'Комплексы',
    additional: 'Дополнительно'
};

export const services: Service[] = [
    {
        id: 'classic-haircut',
        name: 'Классическая стрижка',
        description: 'Стрижка машинкой и ножницами, укладка',
        price: 2500,
        duration: 45,
        category: 'haircut',
        icon: Scissors,
        popular: true,
    },
    {
        id: 'fade',
        name: 'Фейд',
        description: 'Плавный переход от кожи',
        price: 2800,
        duration: 50,
        category: 'haircut',
        icon: Blend,
    },
    {
        id: 'crop',
        name: 'Кроп',
        description: 'Короткая текстурная стрижка',
        price: 2500,
        duration: 40,
        category: 'haircut',
        icon: Eraser,
    },
    {
        id: 'beard-trim',
        name: 'Моделирование бороды',
        description: 'Стрижка и оформление бороды',
        price: 1500,
        duration: 30,
        category: 'beard',
        icon: Sparkles,
    },
    {
        id: 'royal-shave',
        name: 'Королевское бритьё',
        description: 'Опасная бритва, горячие полотенца',
        price: 2000,
        duration: 40,
        category: 'beard',
        icon: Crown,
        popular: true,
    },
    {
        id: 'haircut-beard-combo',
        name: 'Стрижка + борода',
        description: 'Полный уход: стрижка и оформление бороды',
        price: 3500,
        duration: 75,
        category: 'complex',
        icon: Star,
        popular: true,
    },
    {
        id: 'father-son',
        name: 'Отец и сын',
        description: 'Две стрижки по специальной цене',
        price: 4000,
        duration: 90,
        category: 'complex',
        icon: Scissors,
    },
    {
        id: 'hair-wash',
        name: 'Мытьё и укладка',
        description: 'Мытьё головы и стайлинг',
        price: 800,
        duration: 20,
        category: 'additional',
        icon: Droplets,
    },
    {
        id: 'hair-coloring',
        name: 'Камуфляж седины',
        description: 'Лёгкое тонирование',
        price: 1500,
        duration: 30,
        category: 'additional',
        icon: Wind,
    },
];
