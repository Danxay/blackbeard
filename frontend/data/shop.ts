// Информация о барбершопе — Санкт-Петербург
export const shopInfo = {
    name: 'Black Beard',
    tagline: 'Премиум барбершоп',

    address: {
        street: 'Невский просп., 28',
        city: 'Санкт-Петербург',
        metro: 'м. Гостиный двор',
        short: 'Невский 28, Гостиный двор',
        full: 'Санкт-Петербург, Невский просп., 28 (м. Гостиный двор)'
    },

    phone: '+7 (812) 309-28-50',
    phoneClean: '+78123092850',

    workHours: {
        weekdays: '10:00 - 22:00',
        saturday: '10:00 - 21:00',
        sunday: '11:00 - 20:00'
    },

    // Яндекс.Карты — Невский проспект
    mapsUrl: 'https://yandex.ru/maps/-/CHAdnM~g',
    mapImage: 'https://static-maps.yandex.ru/1.x/?ll=30.329899,59.935493&z=16&l=map&size=450,300&pt=30.329899,59.935493,pm2rdm',

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
        instagram: '@blackbeard_spb',
        telegram: '@blackbeard_spb_bot',
        vk: 'vk.com/blackbeard_spb'
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
