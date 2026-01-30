"use client";

import { MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { shopInfo } from "@/data/shop";

export default function Hero() {
    return (
        <header className="relative w-full h-[50vh] min-h-[400px] overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    alt="Barbershop"
                    className="object-cover"
                    src="https://images.unsplash.com/photo-1621605815971-fbc98d665033"
                    fill
                    priority
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 pb-12">
                <div className="space-y-4">
                    {/* Brand */}
                    <div>
                        <p className="text-text-muted text-xs font-medium tracking-widest uppercase mb-2">
                            Барбершоп
                        </p>
                        <h1 className="text-4xl font-bold text-white tracking-tight leading-none">
                            Black Beard
                        </h1>
                    </div>

                    {/* Location chip */}
                    <Link
                        href="/location"
                        className="inline-flex items-center gap-2 bg-bg-card/80 backdrop-blur-sm px-3 py-2 rounded-full border border-border hover:border-border-hover transition-colors"
                    >
                        <MapPin className="w-3.5 h-3.5 text-text-secondary" />
                        <span className="text-text-secondary text-sm">{shopInfo.address.short}</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}
