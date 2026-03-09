"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Countdown() {
    const targetDate = new Date("2026-03-22T10:30:00").getTime();
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(timer);
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    const items = [
        { label: "Ngày", value: timeLeft.days },
        { label: "Giờ", value: timeLeft.hours },
        { label: "Phút", value: timeLeft.minutes },
        { label: "Giây", value: timeLeft.seconds },
    ];

    return (
        <section className="py-24 bg-ivory relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <h2 className="text-wine font-playfair italic text-4xl md:text-5xl mb-4">
                        Save The Date
                    </h2>
                    <div className="w-24 h-[1px] bg-gold mx-auto" />
                </motion.div>

                <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                    {items.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="flex flex-col items-center"
                        >
                            <div className="bg-[#f2f0e4] w-24 h-28 md:w-32 md:h-40 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.05)] border border-white flex flex-col items-center justify-center relative overflow-hidden">
                                {/* Decorative lines */}
                                <div className="absolute top-4 left-4 right-4 h-[1px] bg-wine/10" />
                                <div className="absolute bottom-4 left-4 right-4 h-[1px] bg-wine/10" />

                                <span className="text-4xl md:text-6xl font-playfair font-bold text-wine">
                                    {String(item.value).padStart(2, '0')}
                                </span>
                            </div>
                            <span className="mt-4 text-[10px] md:text-xs text-wine/60 uppercase tracking-[0.3em] font-bold">
                                {item.label}
                            </span>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 text-wine/70 font-cormorant italic text-xl md:text-2xl"
                >
                    Cho đến ngày chung đôi...
                </motion.p>
            </div>

            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
        </section>
    );
}
