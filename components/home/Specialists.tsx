import Link from 'next/link';

const specialists = [
    { name: "Иван Петров", role: "Топ-мастер", rating: "4.9", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0Tl2jx7LlD1kseB8lu1lC03NLLPOqRyuM6njrpB568v9OwRJ07ngzim_jpwmPdQhIX0tlsqxiX24nsB1FtxyxFIOFkxwwpHo5eRhtEza07_JmlhTi9tFHUif1XroY4WYzIQ1srv5CQqZ2pcGDfJuDvFfKb9Lm1Z2rqTdLTaz8lX2Hf1QrbG8QDgtx1LsYFUS7BuTDRE2XpqusOHzK-qo0tx9XaZTCRQzD1qgrlXsiAW-9-cZW5utr_gqRS_Db2kP683jfdg2zr81A" },
    { name: "Михаил Росс", role: "Стилист", rating: "4.8", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAls0g8XNR3_5fTZjy1DjomdtDyAVTrknQQ6IVFiVIBEbv2lpvITEvOuZJ49spZIyzbw0dLlUFI5nIP3ywG6c66H1tyLwAHIaiR-wxHKYSxxv9m0bfEsGd1UXxVH7KJPAAh5sN2qrOpRjJzIdM0jzU2-dWtmqaqAai6AbY21mwB6rOw3m9IuV9lbmiOa_OuKkAatI2ACfwHJGrj58vNxoTTVcquBlwJPlKQGQfAEJeZvZNOHQrVpTp0ochM0Y-y-cm5g9ynFFLh34Rk" },
    { name: "Алексей Смит", role: "Эксперт по бороде", rating: "4.7", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC57R93ZEfNvb1__IQ7nkJ0-mpc_et-P5p_uHuT74GQBM5dX_be31ZcKV7BbbcyVZNQoZi1ZK5VTDiVvDVrRJNYm6ydvzQvDPzv2tEIgq2igzzgDwJn86Zm3kikTMT6-bs9QVLf_a-EW3_W66IR2sZZMSmbnXRS_jfhiYcwNt47KTVKzDkqjAwoutZyRIlkwVmBG7lQ6wMfQg_GKn7KXXgMnaJWQzdbS1k5wVqwYwwGRWs3KcnDV9JjNwFlNk16Wvncitfj7urvFEVA" },
];

export default function Specialists() {
    return (
        <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-display font-bold text-white">Топ Барберы</h3>
                <Link href="/book/barber" className="text-primary text-sm font-medium hover:text-primary-dim">Все</Link>
            </div>
            <div className="flex overflow-x-auto gap-4 pb-2 -mx-6 px-6 no-scrollbar">
                {specialists.map((s, i) => (
                    <Link href="/book/barber" key={i} className="flex-shrink-0 w-36 group cursor-pointer">
                        <div className="relative overflow-hidden rounded-xl mb-3 h-48">
                            <img alt={s.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={s.img} />
                            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-md flex items-center gap-1">
                                <span className="text-primary text-[10px]">★</span>
                                <span className="text-white text-[10px] font-bold">{s.rating}</span>
                            </div>
                        </div>
                        <h4 className="font-bold text-white text-base">{s.name}</h4>
                        <p className="text-xs text-gray-400">{s.role}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}
