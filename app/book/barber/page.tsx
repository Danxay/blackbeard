"use client";
import Header from "@/components/ui/Header";
import Link from "next/link";
import { Star, Calendar, CheckCircle } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

const barbers = [
    { id: 1, name: 'Алексей "The Fade"', role: "Топ-мастер", rating: 4.9, tags: ["Фейд", "Ножницы"], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCp00WluNZfMyGLhXf0NLuw6A-dYE39MhSYM78LoK9irti9KJpFvJDLGWO8jvmEcHC4V_AwsnIKKj7IfKcwE6zJBMRh0fyZHN0Be0UaGGq9aJvC3IzDVTQ2XGeI5dGXtDLcLsauwn3dwOqpNht7S--pfEjIFMhG4qpPT1DZDWeQUuYoCkU78qhfTWb3cw4Y1ayyd2EECpG3xOlAfmE7CfIzCKSKZP75kpX4z2ORGpHmq8HALZWksrYmrfwWvlqpmOROEfO-27Pv08MS", verified: true },
    { id: 2, name: 'Маркус Стоун', role: "Старший стилист", rating: 4.8, tags: ["Борода", "Горячее полотенце"], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJTa8mS0YfYJpJSg9qP_Id1X2FTjqPKNnPjb3aYR2Nljdt3IEzHj_WIDvJkjhCagGbCXmvn6ig9s7zMo2SjEWjr1rhWvXKs3z_F0-PBLLMKU0rJu-jfi1mhhxe5uLCBYyLO9cHDrKpmKb_NYJLUomHQWp7tQqulhoGM9tPveLuCQNEA0JmWymQjXy1_SawhTWGD0i6B9mefTWbSLKFo3MsCxQLfLtvxIkjGq5H6dkH3PwYSGb4tVCxzzZxEp9T7K2VARlrcV2uWY4t", verified: false },
    { id: 3, name: 'Давид Миллер', role: "Барбер", rating: 4.6, tags: ["Стрижка под машинку", "Детская"], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhpHvxb3GqSSaDzKEy8ZWf1Nw_l57_GwZSqRBXN9SmFfU-nyJer-0f0aIcjbi7nnb-wDzkKQLfMjBRQhMrLBFvIB-mjdcJy-wQdVCQHVl_dnpYcgejy_rlhNHoIOc2WnVhMvs0sv-9PFUwhCZ11_QDLOzlI5A4iTAxrR0K89hSICU9DfYkrArPfbeMwtMa_grIZQO-v_dehjA6_iKqHEqVCqGWdoISdWzSaY5eKD_F5nqD5nlC7zTa1asC2MCAxwvzP5pWFowt_eFi", verified: false },
    { id: 4, name: 'Джеймс "Razor"', role: "Мастер", rating: 5.0, tags: ["Королевское бритье"], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDIJsebSM4RmAuBpIt9WXqjORIbTh2lGpy3RbPKRGczPGWWYWW8NRpAUwyiN_53Y4fTjc-9S1N6HLQw7174i5Hhlm9EE2zqMexAYJsGj5amrN1uXjaK_q5ynt8u_9lMfsKQdshXZdGPQgJq6qP4dBuWiq21HY3dVoxGSSSVTSpriwS-lCK19Re_h-mb-fTUdMWexnrSBuv1Geowgsifiu_Oc870eqN7I4Wx617laJHUYkDu2ycvLQPqUANT_K3qd49O9wBbX0MrZgi", verified: false, dayOff: true },
];

const filters = ["Все мастера", "Стрижка", "Борода"];

export default function SelectBarber() {
    const [activeFilter, setActiveFilter] = useState("Все мастера");

    return (
        <main className="min-h-screen bg-background-dark pb-24 flex flex-col relative">
             <div className="absolute inset-0 pointer-events-none">
                 {/* Bg pattern */}
             </div>
            <Header title="Black Beard" />

            <div className="h-1/3 w-full bg-[url('https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center relative shrink-0 min-h-[200px]">
                <div className="absolute inset-0 bg-gradient-to-b from-background-dark/30 to-background-dark/95"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 pb-8 bg-gradient-to-t from-background-dark to-transparent">
                    <h2 className="text-3xl font-display font-bold text-white mb-1">Выберите барбера</h2>
                    <p className="text-gray-400 text-sm font-medium">Выберите специалиста для вашей стрижки.</p>
                </div>
            </div>

            <div className="flex-1 px-5 -mt-4 z-10 space-y-4">
                <div className="flex space-x-3 overflow-x-auto pb-2 no-scrollbar mb-2">
                    {filters.map(f => (
                        <button
                            key={f}
                            onClick={() => setActiveFilter(f)}
                            className={clsx(
                                "px-5 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition",
                                activeFilter === f ? "bg-primary text-background-dark shadow-lg shadow-primary/20" : "bg-surface-dark border border-white/10 text-gray-300 hover:border-primary/50"
                            )}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                <div className="space-y-4 pb-20">
                    {barbers.map(barber => {
                         const Content = (
                             <>
                             <div className="relative w-24 h-24 shrink-0">
                                <img alt={barber.name} className="w-full h-full object-cover rounded-lg shadow-md transition duration-500" src={barber.img} />
                                {barber.verified && (
                                    <div className="absolute -bottom-2 -right-2 bg-black rounded-full p-1 border-2 border-surface-dark">
                                        <CheckCircle className="text-primary w-3 h-3" />
                                    </div>
                                )}
                                {barber.dayOff && (
                                    <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center backdrop-blur-[1px]">
                                        <span className="text-white font-bold text-xs uppercase tracking-wider">Выходной</span>
                                    </div>
                                )}
                             </div>

                             <div className="flex flex-col justify-center flex-1">
                                <div className="flex justify-between items-start mb-1">
                                    <div>
                                        <h3 className="font-display font-bold text-lg text-white">{barber.name}</h3>
                                        <p className="text-primary text-xs font-semibold tracking-wide uppercase mb-1">{barber.role}</p>
                                    </div>
                                    <div className="flex items-center bg-white/5 px-2 py-1 rounded-md">
                                        <Star className="w-3 h-3 text-primary mr-1 fill-primary" />
                                        <span className="text-xs font-bold text-white">{barber.rating.toFixed(1)}</span>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 text-xs text-gray-400 mb-3">
                                    {barber.tags.map(tag => (
                                        <span key={tag} className="bg-white/5 px-2 py-0.5 rounded">{tag}</span>
                                    ))}
                                </div>
                             </div>

                             {!barber.dayOff && (
                                 <div className="absolute bottom-3 right-3 bg-white text-background-dark p-2 rounded-full shadow-lg group-hover:bg-primary group-hover:text-background-dark transition-colors">
                                     <Calendar className="w-4 h-4" />
                                 </div>
                             )}
                             </>
                         );

                         if(barber.dayOff) {
                             return (
                                <div key={barber.id} className={clsx("group relative bg-surface-dark rounded-xl p-3 flex gap-4 border border-white/5 shadow-sm opacity-60 grayscale")}>
                                    {Content}
                                </div>
                             )
                         }

                         return (
                            <Link href="/book/date" key={barber.id} className="group relative bg-surface-dark rounded-xl p-3 flex gap-4 border border-white/5 hover:border-primary/40 transition shadow-sm">
                                {Content}
                            </Link>
                         )
                    })}
                </div>
            </div>
        </main>
    )
}
