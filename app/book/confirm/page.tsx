"use client";
import Header from "@/components/ui/Header";
import { Star, Calendar, Clock, MapPin, ArrowRight, CreditCard } from "lucide-react";
import Link from "next/link";

export default function ConfirmPage() {
    return (
        <main className="min-h-screen bg-background-dark pb-32 flex flex-col relative">
             <Header title="Подтверждение" />

             <div className="flex-1 px-5 pt-2 overflow-y-auto">
                 {/* Barber Profile */}
                 <div className="flex flex-col items-center mb-8">
                     <div className="relative w-24 h-24 mb-4">
                         <div className="absolute inset-0 rounded-full border-2 border-primary p-1">
                             <img alt="Barber" className="w-full h-full object-cover rounded-full shadow-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCl3by34QILAQbOp8jFVpV-96DvKjC9m-JYYyueTcxmTC7jybk9cvmSTzfWOS-caa3mV1u-Dt8_LgkF9YMbEVUw0PzKjLpIDgKpw2ko2MplbDD5wEMSX8O8nMMg7VMEioTTZv58aAxUDNzBNZk6V8F2CNGYS169kMsSRQJGLXk0XKGGYBenhi_iTOL1fG29ycViqi1rcEbXzrV3rgpP_OWRyFW29jHwdvfuRXXYUNt8kfIzyhuCoy2A-t7Z0-fGsfWBQ8XEeFSLmUB" />
                         </div>
                         <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-4 border-background-dark"></div>
                     </div>
                     <h2 className="font-display text-2xl font-bold mb-1 text-white">Алексей "The Fade"</h2>
                     <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">Топ-мастер</p>
                     <div className="flex items-center gap-1 mt-2 text-primary text-sm">
                         <Star className="w-4 h-4 fill-primary" />
                         <span className="font-bold">4.9</span>
                         <span className="text-gray-500">(128 отзывов)</span>
                     </div>
                 </div>

                 {/* Service Details */}
                 <div className="bg-surface-dark rounded-2xl p-5 shadow-sm border border-white/5 mb-6">
                     <div className="flex items-start justify-between border-b border-white/5 pb-4 mb-4">
                         <div>
                             <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Услуга</p>
                             <h3 className="font-semibold text-lg text-white">Королевское бритье</h3>
                             <p className="text-sm text-gray-400 mt-1">Включает мытье, стрижку и уход</p>
                         </div>
                         <div className="text-right">
                             <p className="text-lg font-bold text-primary">4500 ₽</p>
                             <p className="text-xs text-gray-500">60 мин</p>
                         </div>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                         <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-full bg-surface-light/5 flex items-center justify-center text-primary">
                                 <Calendar className="w-5 h-5" />
                             </div>
                             <div>
                                 <p className="text-xs text-gray-500 mb-0.5">Дата</p>
                                 <p className="font-medium text-sm text-white">24 окт, 2023</p>
                             </div>
                         </div>
                         <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-full bg-surface-light/5 flex items-center justify-center text-primary">
                                 <Clock className="w-5 h-5" />
                             </div>
                             <div>
                                 <p className="text-xs text-gray-500 mb-0.5">Время</p>
                                 <p className="font-medium text-sm text-white">10:00</p>
                             </div>
                         </div>
                     </div>
                 </div>

                 {/* Location Preview */}
                 <div className="bg-surface-dark rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-white/5 mb-6">
                     <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                         <img alt="Map" className="w-full h-full object-cover opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3dyomHOKJRkZHMdcBajioAfYTsynLXBVJLLZHusOVMWCSJ-AQ3w9XCvt64LdOOWDyxLPfk3MuLEeXUrtkGJQ_aSX3HebCuF95utfXRKKc2OkjVn3GBett3qvDTVVnFK_J12cq8whC3pSBU9udxqUv4kgQuMCoB1U2MG7mfvnjZ1VIcaK_q5ynt8u_9lMfsKQdshXZdGPQgJq6qP4dBuWiq21HY3dVoxGSSSVTSpriwS-lCK19Re_h-mb-fTUdMWexnrSBuv1Geowgsifiu_Oc870eqN7I4Wx617laJHUYkDu2ycvLQPqUANT_K3qd49O9wBbX0MrZgi" />
                     </div>
                     <div className="flex-1">
                         <p className="text-sm font-semibold text-white">Black Beard Studio</p>
                         <p className="text-xs text-gray-400 mt-0.5 truncate">ул. Ленина, 128, Москва</p>
                     </div>
                     <button className="w-8 h-8 rounded-full bg-surface-light/5 flex items-center justify-center text-gray-400 hover:text-primary transition-colors">
                         <MapPin className="w-4 h-4" />
                     </button>
                 </div>

                 {/* Payment Method */}
                 <div className="mb-6">
                     <h3 className="text-sm font-semibold mb-3 px-1 text-white">Способ оплаты</h3>
                     <div className="flex items-center justify-between bg-surface-dark rounded-2xl p-4 border border-white/5 cursor-pointer hover:border-primary transition-colors">
                         <div className="flex items-center gap-3">
                             <div className="w-10 h-6 bg-gray-700 rounded flex items-center justify-center overflow-hidden">
                                <CreditCard className="w-4 h-4 text-white" />
                             </div>
                             <span className="text-sm font-medium text-white">Банковская карта</span>
                         </div>
                         <span className="text-primary text-sm font-medium">Изменить</span>
                     </div>
                 </div>

                 {/* Total */}
                 <div className="flex justify-between items-center px-2 mb-2">
                     <span className="text-gray-400 text-sm">Налог (включен)</span>
                     <span className="text-white font-medium text-sm">0 ₽</span>
                 </div>
                 <div className="flex justify-between items-center px-2 mb-8">
                     <span className="text-white font-bold text-lg">Итого</span>
                     <span className="text-primary font-display font-bold text-2xl">4500 ₽</span>
                 </div>
             </div>

             {/* Footer */}
             <div className="fixed bottom-0 left-0 right-0 p-5 bg-background-dark border-t border-white/5 backdrop-blur-lg bg-opacity-95 z-20 pb-[env(safe-area-inset-bottom)]">
                 <Link href="/success" className="w-full bg-primary hover:bg-[#b08732] text-white font-semibold py-4 rounded-xl shadow-glow active:scale-[0.98] transition-all flex items-center justify-center gap-2 group">
                     <span>Оплатить и записаться</span>
                     <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                 </Link>
                 <p className="text-center text-[10px] text-gray-400 mt-3">
                    Бесплатная отмена за 2 часа до визита.
                 </p>
             </div>
        </main>
    )
}
