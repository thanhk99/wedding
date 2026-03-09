"use client";

import { motion } from "framer-motion";

const wishes = [
    { name: "Anh Minh", text: "Chúc mừng hai bạn! Trăm năm hạnh phúc nhé." },
    { name: "Chị Thảo", text: "Đám cưới thật tuyệt vời. Chúc hai bạn sớm có tin vui!" },
    { name: "Bạn Hoàng", text: "Đợi mãi mới đến ngày này. Chúc anh chị mãi mặn nồng." },
    { name: "Cô Ba", text: "Mừng hai cháu về chung một nhà." }
];

export default function Guestbook() {
    return (
        <section className="py-24 bg-ivory/30 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-playfair text-wine italic mb-4">Lời Chúc Từ Bạn Bè</h2>
                    <div className="w-16 h-[1px] bg-gold mx-auto" />
                </div>

                <div className="relative">
                    {/* Marquee effect for wishes */}
                    <div className="flex gap-6 overflow-hidden">
                        <motion.div
                            className="flex gap-6 whitespace-nowrap"
                            animate={{ x: [0, -1035] }} // Giả định chiều rộng của container
                            transition={{
                                repeat: Infinity,
                                duration: 30,
                                ease: "linear"
                            }}
                        >
                            {[...wishes, ...wishes, ...wishes].map((wish, i) => (
                                <div
                                    key={i}
                                    className="bg-white p-6 rounded-2xl shadow-sm border border-gold/10 inline-block min-w-[300px]"
                                >
                                    <p className="font-cormorant text-wine italic text-lg mb-2">"{wish.text}"</p>
                                    <p className="font-bold text-gold text-sm tracking-widest uppercase">— {wish.name}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Faded edges */}
                    <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ivory to-transparent z-10" />
                    <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ivory to-transparent z-10" />
                </div>
            </div>
        </section>
    );
}
