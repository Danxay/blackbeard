// Информация о барбершопе
export const shopInfo = {
    name: 'Black Beard',
    tagline: 'Премиум барбершоп',

    address: {
        street: 'ул. Тверская, 15',
        city: 'Москва',
        metro: 'м. Пушкинская',
        short: 'Тверская 15, Пушкинская',
        full: 'Москва, ул. Тверская, 15 (м. Пушкинская)'
    },

    phone: '+7 (495) 123-45-67',
    phoneClean: '+74951234567',

    workHours: {
        weekdays: '10:00 - 22:00',
        saturday: '10:00 - 21:00',
        sunday: '11:00 - 20:00'
    },

    // Яндекс.Карты
    mapsUrl: 'https://yandex.ru/maps/-/CDuOzK~V',
    mapImage: 'https://static-maps.yandex.ru/1.x/?ll=37.606628,55.763969&z=16&l=map&size=450,300&pt=37.606628,55.763969,pm2rdm',

    schedule: [
        { day: 'Понедельник', hours: '10:00 – 22:00', open: '10:00', close: '22:00', isToday: false },
        { day: 'Вторник', hours: '10:00 – 22:00', open: '10:00', close: '22:00', isToday: false },
        { day: 'Среда', hours: '10:00 – 22:00', open: '10:00', close: '22:00', isToday: false },
        { day: 'Четверг', hours: '10:00 – 22:00', open: '10:00', close: '22:00', isToday: false },
        { day: 'Пятница', hours: '10:00 – 22:00', open: '10:00', close: '22:00', isToday: false },
        { day: 'Суббота', hours: '10:00 – 21:00', open: '10:00', close: '21:00', isToday: false },
        { day: 'Воскресенье', hours: '11:00 – 20:00', open: '11:00', close: '20:00', isToday: false },
    ],

    social: {
        instagram: '@blackbeard_moscow',
        telegram: '@blackbeard_bot',
        vk: 'vk.com/blackbeard_moscow'
    }
};

// Получить расписание на сегодня
export function getTodaySchedule() {
    const dayIndex = new Date().getDay();
    const scheduleIndex = dayIndex === 0 ? 6 : dayIndex - 1;
    const today = shopInfo.schedule[scheduleIndex];
    return { open: today.open, close: today.close, hours: today.hours };
}

// Проверить открыто ли сейчас
export function isOpenNow(): boolean {
    const now = new Date();
    const schedule = getTodaySchedule();
    const [openHour, openMin] = schedule.open.split(':').map(Number);
    const [closeHour, closeMin] = schedule.close.split(':').map(Number);

    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const openMinutes = openHour * 60 + openMin;
    const closeMinutes = closeHour * 60 + closeMin;

    return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
}

// Хелпер для форматирования даты по-русски
export function formatDateRu(date: Date): string {
    const months = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];
    const days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];

    return `${date.getDate()} ${months[date.getMonth()]}, ${days[date.getDay()]}`;
}

export function formatDateShort(date: Date): string {
    const months = [
        'янв', 'фев', 'мар', 'апр', 'мая', 'июн',
        'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'
    ];
    return `${date.getDate()} ${months[date.getMonth()]}`;
}

// Генерация будущей даты для демо
export function getFutureDate(daysFromNow: number): Date {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date;
}
