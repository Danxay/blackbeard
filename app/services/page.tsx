"use client";
import Header from "@/components/ui/Header";
import { useState } from "react";
import clsx from "clsx";
import { Check, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

const filters = ["Все", "Стрижка", "Борода", "Уход", "Комбо"];

const services = [
    { id: 1, name: "Классический Фейд", desc: "Точный фейд с работой ножницами. Укладка включена.", price: 2500, time: 45, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBT6dy1LnxZv8rrQL9u7FPQZpAwRsrAgS08GDEwqH3U7S_nvXAP1LCHjRjenmt2ji0gnD0h7J3fs1SbP4IFGMfHzMrt3MBToIkSIrNah_-1EQb1_et4U50qr0heS8dbnBqQji0I_dn3SiIxLpzjDIVaFoOF6sFZz7s_YvyHFDcLLQS5EXR7hdkO1_OWKKQxFYvEOU8EQ_QT10Js0_Twh0EGtc0VA-Rj0Pb7foVNWILnaoz7QfQiPY1vMv7_dpha5kYStIlbtaB_OW1N" },
    { id: 2, name: "Стрижка и моделирование бороды", desc: "Окантовка, стрижка и бритье для четкого образа.", price: 1800, time: 30, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuALqngOjwdzeWSO-uSvfbuY08WV5V-SwFCl5TmLZZTdLDhE8wLl3Jyxs2O06tOCPrg_4wamSsE7hXVUbMTUGNtCPue8ES4HnKzZfLpHpb8rid0XJwvy-AnROA4QIFK4HtV4htyqFErlyjHuS_DacZ91coafc1p3-JaqiWhM99u6bwU9NeQPqJjxLjVy7LVoLAqgGq6tf73VFw2EkwXzCETmfcqXedr9Noni38R_FRpJ_YLfYqR9cp0zz9s3ThP5NH7x4emFxwC7wn-z" },
    { id: 3, name: "Королевское бритье", desc: "Классическое бритье опасной бритвой с горячим полотенцем.", price: 2200, time: 25, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJMUD6fMzw2dEqDLnkHfTBUlrukKjvbYjfTkDblzq15GnLMM5Oc0pYurC3zACVK8WidSJhv1vxRwfMEAbhtmcOu4Fsujt7rslZtYNZcLKT39T5Hh28hRUR1-4Y8QBuf_0-cJoShNYu2aN9bhG9_WB_-FBEQV63depW6VfEYX3YQuPlk3Ed2EdVgjqUCnluvYWbr5SlkAkrclPhoMxRP59Th1tYGahzEZhmjlLFneFOB7JAmwShZiv54Wwlj7xGTIstrECVYhEXme0G" },
    { id: 4, name: "Черная маска", desc: "Глубокое очищение пор угольной маской.", price: 1500, time: 15, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNLuqCEY0211lNRxPE-YRJGLNOks6-TdP2MEDVSyPMoyIfaaacmEUvNdYoJNldVlbJgKSujE3bWws1UbLIVtVx5Ys6Pb4dEJBmFu-erq7Opg_RtPiBkr3F8ihpn_BQYXQpNw9-1R0QMeVbB3LYIvUDB7GO9aDtEYW9zqd_dtl42rBrGzbvx9VUJCAzRIA6kITpvye94db1ByEAN1u1vD1tF-tMwT9C9cDUGhc3YBuQnur6NtVb7UFi7ZUqSBK-6Vn02YxUNRdBAD-W" },
    { id: 5, name: "Мытье и укладка", desc: "Расслабляющее мытье и профессиональная укладка.", price: 1000, time: 20, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbLbtGW6P_PP65PKMfDoG50PIAby7N83gZJzTTsK3faJ4d1CxQFA_28H7GLLQO5POG6KTQnxQBfWKPrCJcP21277973020MW2Z3eZh1m24J495WoLPpOhnrs-mO4T04vuUBZ44TZ3PG-lrEuu7q1ZQD3wyqRoAKg8JHWwzbz0zwkEAZJWhr5hfW05FK8Fe-pPhZh9gVfe9q-wXZVAqsRFsnL42xxtSXS-1lW4PQlNBJ35KrPkJas9BDGwRkpPPfUxM0H8B6mPOTV6E" },
];

export default function ServicesPage() {
    const [selected, setSelected] = useState<number[]>([1, 4]);
    const [activeFilter, setActiveFilter] = useState("Все");

    const toggleService = (id: number) => {
        if(selected.includes(id)) {
            setSelected(selected.filter(s => s !== id));
        } else {
            setSelected([...selected, id]);
        }
    }

    const total = services.filter(s => selected.includes(s.id)).reduce((acc, s) => acc + s.price, 0);
    const duration = services.filter(s => selected.includes(s.id)).reduce((acc, s) => acc + s.time, 0);

    return (
        <main className="min-h-screen bg-background-dark pb-32 flex flex-col relative">
             <Header title="Выберите услуги" />

             {/* Category Filter */}
             <div className="sticky top-[72px] z-10 w-full bg-background-dark/95 backdrop-blur-sm pb-2 pt-2 border-b border-white/5 shadow-lg shadow-black/20">
                <div className="flex gap-3 overflow-x-auto px-4 py-2 no-scrollbar">
                    {filters.map(f => (
                         <button
                            key={f}
                            onClick={() => setActiveFilter(f)}
                            className={clsx(
                                "flex h-9 shrink-0 items-center justify-center rounded-full px-5 transition-all active:scale-95",
                                activeFilter === f
                                    ? "bg-primary shadow-lg shadow-primary/20 text-background-dark font-bold"
                                    : "bg-surface-dark border border-white/10 text-gray-400 font-medium hover:bg-white/5"
                            )}
                        >
                            <p className="text-sm leading-normal">{f}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Services List */}
            <div className="flex flex-col gap-4 p-4 pb-36">
                {services.map(s => {
                    const isSelected = selected.includes(s.id);
                    return (
                        <div
                            key={s.id}
                            onClick={() => toggleService(s.id)}
                            className={clsx(
                                "group relative flex cursor-pointer flex-col overflow-hidden rounded-xl transition-all active:scale-[0.98]",
                                isSelected ? "border-2 border-primary bg-surface-dark" : "border border-white/5 bg-surface-dark hover:bg-white/5"
                            )}
                        >
                            <div className="flex items-center gap-4 p-3">
                                <div className="aspect-square size-20 shrink-0 overflow-hidden rounded-lg bg-gray-800">
                                    <img alt={s.name} className={clsx("h-full w-full object-cover transition-opacity", isSelected ? "opacity-90" : "opacity-80 group-hover:opacity-100")} src={s.img} />
                                </div>
                                <div className="flex flex-1 flex-col justify-center">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-base font-bold text-white leading-tight">{s.name}</h3>
                                        <span className={clsx("font-bold text-lg", isSelected ? "text-primary" : "text-white")}>{s.price} ₽</span>
                                    </div>
                                    <p className="mt-1 text-xs text-gray-400 line-clamp-2">{s.desc}</p>
                                    <div className="mt-3 flex items-center justify-between">
                                        <div className="flex items-center gap-1.5 text-gray-400">
                                            <Clock className="w-4 h-4" />
                                            <span className="text-xs font-medium">{s.time} мин</span>
                                        </div>
                                        <div className={clsx(
                                            "flex size-6 items-center justify-center rounded-full transition-colors",
                                            isSelected ? "bg-primary text-background-dark" : "border-2 border-white/20 bg-transparent"
                                        )}>
                                            {isSelected && <Check className="w-4 h-4 font-bold" />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Sticky Footer */}
            <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-background-dark/95 backdrop-blur-xl pb-[max(20px,env(safe-area-inset-bottom))] pt-4 px-4 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                <div className="flex items-center justify-between mb-3 px-1">
                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Итого</span>
                        <span className="text-sm font-semibold text-white">{selected.length} услуги</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Длительность</span>
                        <span className="text-sm font-semibold text-white">~ {Math.floor(duration / 60)}ч {duration % 60}мин</span>
                    </div>
                </div>
                <Link href="/book/barber" className="flex w-full items-center justify-between rounded-xl bg-primary px-6 py-4 text-background-dark shadow-lg shadow-primary/20 transition-transform active:scale-95 hover:bg-primary-dim">
                    <span className="text-base font-bold">Продолжить</span>
                    <div className="flex items-center gap-2">
                        <span className="text-base font-bold">{total} ₽</span>
                        <ArrowRight className="w-5 h-5" />
                    </div>
                </Link>
            </div>
        </main>
    )
}
