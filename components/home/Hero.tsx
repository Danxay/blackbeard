import React from "react";

export default function Hero() {
  return (
    <header className="relative w-full h-72">
        <div className="absolute inset-0">
            <img
                alt="Barbershop interior"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8AGf0gfl4X4Mnj5h08XXzq3xR8PwNExWgv6ORt_aXuTxyub5uQ2CAZlEFRzolXeztQTchbr7Zo8ta3xW4ydG-hyFlZe1aNxUcRzGhd657lbKPncywIIZDeKuaf-SBvwZyu9nCVNgL_vVQ6kCOzMgFFRB1m56tU12sIB4Ok9qI3DbZ_W83K2xf_5is9BFEhQ1tiAoZ-xTobDPM61Vd1UgczFYW2sjeXRFOpd2NedXp_etcFRPqMnEmgW8hho3I64C4MESkE07rVuzX"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background-dark"></div>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 z-10 flex items-end justify-between">
            <div>
                <h2 className="text-primary font-bold tracking-wider text-xs uppercase mb-1">Премиум Барбершоп</h2>
                <h1 className="text-4xl text-white font-display font-bold leading-tight">Black <br/>Beard</h1>
            </div>
            <div className="bg-surface-light/10 backdrop-blur-md p-2 rounded-lg border border-white/10">
                <span className="text-primary text-3xl font-bold material-icons">✂</span>
            </div>
        </div>
    </header>
  );
}
