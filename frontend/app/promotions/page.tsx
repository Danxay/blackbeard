"use client";
import Header from "@/components/ui/Header";
import { Gift, Clock, Copy, Check, Tag } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const promotions = [
    {
        title: "Первый визит -20%",
        description: "Скидка на первое посещение для новых клиентов",
        code: "FIRST20",
        validUntil: "Бессрочно",
    },
    {
        title: "Комплекс выгоднее",
        description: "Стрижка + борода со скидкой 15%",
        code: "COMBO15",
        validUntil: "до 28 февраля",
    },
    {
        title: "Приведи друга",
        description: "500₽ скидки за каждого приглашённого друга",
        code: "FRIEND",
        validUntil: "Бессрочно",
    },
];

export default function PromotionsPage() {
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    const handleCopy = async (code: string) => {
        try {
            await navigator.clipboard.writeText(code);
            setCopiedCode(code);
            setTimeout(() => setCopiedCode(null), 2000);
        } catch {
            // Fallback для старых браузеров
            const textarea = document.createElement('textarea');
            textarea.value = code;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            setCopiedCode(code);
            setTimeout(() => setCopiedCode(null), 2000);
        }
    };

    return (
        <main className="min-h-screen-dynamic bg-bg pb-8">
            <Header title="Акции" />

            {/* Info banner */}
            <div className="p-4 pt-2">
                <div className="bg-accent/10 border border-accent/20 rounded-2xl p-4 mb-4">
                    <div className="flex items-start gap-3">
                        <Tag className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-white text-sm font-medium mb-1">Как использовать промокод?</p>
                            <p className="text-text-secondary text-xs leading-relaxed">
                                Скопируйте код и введите его на странице подтверждения бронирования.
                                Скидка применится автоматически.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 space-y-3 stagger">
                {promotions.map((promo, i) => (
                    <div key={i} className="bg-bg-card rounded-2xl border border-border p-4">
                        <div className="flex items-start justify-between mb-3">
                            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                                <Gift className="w-6 h-6 text-accent" />
                            </div>
                            <span className="text-text-muted text-xs flex items-center gap-1 bg-bg-elevated px-2 py-1 rounded-full">
                                <Clock className="w-3 h-3" />
                                {promo.validUntil}
                            </span>
                        </div>

                        <h3 className="text-white font-semibold text-base mb-1">{promo.title}</h3>
                        <p className="text-text-secondary text-sm mb-4">{promo.description}</p>

                        <div className="flex items-center justify-between p-3.5 bg-bg-elevated rounded-xl">
                            <span className="text-white font-mono font-bold tracking-wider text-base">{promo.code}</span>
                            <button
                                onClick={() => handleCopy(promo.code)}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors touch-feedback"
                            >
                                {copiedCode === promo.code ? (
                                    <>
                                        <Check className="w-4 h-4 text-success" />
                                        <span className="text-success text-sm font-medium">Скопировано</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4 text-accent" />
                                        <span className="text-accent text-sm font-medium">Скопировать</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <div className="p-4 mt-4">
                <Link
                    href="/services"
                    className="flex items-center justify-center w-full py-4 bg-white text-black rounded-2xl font-semibold btn-press"
                >
                    Записаться со скидкой
                </Link>
            </div>
        </main>
    );
}
