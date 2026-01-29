"use client";
import Header from "@/components/ui/Header";
import { Gift, Clock, Copy, Check } from "lucide-react";
import { useState } from "react";

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
        description: "500 бонусов за каждого приглашённого друга",
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
        <main className="min-h-screen bg-bg pb-8">
            <Header title="Акции" />

            <div className="p-4 space-y-4">
                {promotions.map((promo, i) => (
                    <div key={i} className="bg-bg-card rounded-2xl border border-border p-4">
                        <div className="flex items-start justify-between mb-3">
                            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                                <Gift className="w-5 h-5 text-accent" />
                            </div>
                            <span className="text-text-muted text-xs flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {promo.validUntil}
                            </span>
                        </div>

                        <h3 className="text-white font-semibold mb-1">{promo.title}</h3>
                        <p className="text-text-secondary text-sm mb-4">{promo.description}</p>

                        <div className="flex items-center justify-between p-3 bg-bg-elevated rounded-xl">
                            <span className="text-white font-mono font-medium tracking-wider">{promo.code}</span>
                            <button
                                onClick={() => handleCopy(promo.code)}
                                className="flex items-center gap-1.5 text-sm font-medium transition-colors active:scale-95"
                            >
                                {copiedCode === promo.code ? (
                                    <>
                                        <Check className="w-4 h-4 text-success" />
                                        <span className="text-success">Скопировано</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4 text-accent" />
                                        <span className="text-accent">Скопировать</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
