"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function Ending() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    // Hiệu ứng "Camera Zoom-out"
    const scale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);

    return (
        <motion.section
            ref={containerRef}
            style={{ opacity }}
            className="relative min-h-[80vh] w-full bg-[#f2f0e4]/50 py-24 flex flex-col items-center justify-center text-center overflow-hidden"
        >
            <div className="relative z-10 space-y-12 px-6 max-w-4xl">
                {/* Image Frame */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2 }}
                    className="relative w-64 h-64 md:w-80 md:h-80 mx-auto"
                >
                    <div className="absolute inset-0 border-[1px] border-wine/20 rounded-full scale-110" />
                    <div className="absolute inset-0 border-[1px] border-wine/10 rounded-full scale-125" />

                    <div className="w-full h-full rounded-full overflow-hidden relative border-8 border-white shadow-2xl">
                        <Image
                            src="/images/ảnh cuối cảm ơn.jpg"
                            alt="Lời cảm ơn"
                            fill
                            className="object-cover"
                        />
                    </div>
                </motion.div>

                <div className="space-y-8 pt-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-5xl md:text-8xl font-playfair text-wine italic leading-tight"
                    >
                        Thank You
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="space-y-4"
                    >
                        <p className="text-wine/80 text-lg md:text-xl font-cormorant italic max-w-2xl mx-auto leading-relaxed">
                            "Sự hiện diện của bạn là món quà tuyệt vời nhất đối với chúng mình."
                        </p>
                        <p className="text-wine/60 text-sm md:text-base font-playfair tracking-[0.3em] uppercase">
                            Hẹn gặp lại bạn vào ngày 22 . 03 . 2026
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="pt-12"
                >
                    <div className="w-24 h-[1px] bg-gold/40 mx-auto mb-6" />
                    <p className="font-playfair italic text-2xl text-wine opacity-80">
                        Văn Cương & Thu Nụ
                    </p>
                </motion.div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-ivory to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-ivory to-transparent" />
        </motion.section>
    );
}
