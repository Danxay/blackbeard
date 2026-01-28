import Link from "next/link";

const services = [
    { name: "Классическая стрижка", desc: "45 мин • Мытье головы", price: "2500 ₽", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAX7hCQTtO0QKEbu4GNy9nwzWGN3tLZVz76gGnBKkTBMkvD_FoKyBHG7rG2o-oijLceWxwqEZnV-7meRKLh9eGHeNyBnlA9O5f9zAIMqn1ghG3pSUNsUk4KYmDVSzB7VHkzBpxClH_pyqXpQUffnbU-FwdNqgJob9kXP_Ddz6C0z0EdCIxneHUtGUpx6MmgtlOVCenbO_zGzPgnNTC4FEtrELMrxvRboHKTe17sB0jCg9e-F_5O-ju-HhHkQ5ACm5CykWMR2VI7jhTz" },
    { name: "Стрижка бороды", desc: "30 мин • Горячее полотенце", price: "1800 ₽", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4k2r5iS6_d-klQy4FMpltNAiYtb0keeEVjSrxJggzXr52h5AxkcViXtFy0NW8R5PxSX2MzKGGkJb_qYPLPOO1cEVBd_weS7batHCU0zdRFOIwpypzf7OVSpi71_XzMw9sH-qVJcdBvW2XsqmRiWWaWwQaZPz8mtiSsBhm1mjsIuOTakFa69ISJLaNG_NRAIZFOywK8G6QFgAMDuSTefP3z_3wIV8pUybiYREOztsIKMSMlQFGPD3C01Jcaxo1Ai7cbSf0E-sHDb_u" },
]

export default function Services() {
    return (
        <div className="mb-4">
            <h3 className="text-lg font-display font-bold text-white mb-4">Популярные услуги</h3>
            <div className="space-y-3">
                {services.map((s, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-surface-dark rounded-xl border border-white/5 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-surface-light/5 flex items-center justify-center">
                                <img alt={s.name} className="w-6 h-6 opacity-80 invert" src={s.img} />
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-sm">{s.name}</h4>
                                <p className="text-xs text-gray-400">{s.desc}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="block font-bold text-primary">{s.price}</span>
                            <Link href="/services" className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded mt-1 inline-block hover:bg-white/20">Запись</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
