"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const images = [
    { src: "/images/DSC03481k.jpg", span: "col-span-1 md:col-span-2 row-span-2" },
    { src: "/images/DSC03695k.jpg", span: "col-span-1" },
    { src: "/images/DSC03060k.jpg", span: "col-span-1" },
    { src: "/images/DSC02860k.jpg", span: "col-span-1" },
    { src: "/images/DSC03276k.jpg", span: "col-span-1" },
];

export default function Gallery() {
    return (
        <section className="py-24 bg-wine text-ivory relative z-10 overflow-hidden">
            {/* Texture overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-6xl italic font-playfair mb-4">Album Ảnh Cưới</h2>
                    <div className="w-24 h-[1px] bg-gold mx-auto mb-4" />
                    <p className="text-gold tracking-[0.2em] uppercase text-sm">Khoảnh khắc hạnh phúc</p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[220px] md:auto-rows-[280px]">
                    {images.map((img, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 60, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                                duration: 0.8,
                                delay: index * 0.12,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            viewport={{ once: true, margin: "-60px" }}
                            className={`relative overflow-hidden group rounded-lg shadow-2xl cursor-pointer ${img.span}`}
                        >
                            {/* Ảnh với Next/Image - tối ưu load */}
                            <Image
                                src={encodeURI(img.src)}
                                alt={`Wedding photo ${index + 1}`}
                                fill
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                sizes="(max-width: 768px) 50vw, 25vw"
                            />

                            {/* Hiệu ứng overlay khi hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-wine/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Shimmer scan line khi hover */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden"
                            >
                                <div
                                    className="absolute h-[2px] w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent"
                                    style={{
                                        animation: "scanline 1.5s linear infinite",
                                        top: 0
                                    }}
                                />
                            </div>

                            {/* Label góc dưới khi hover */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                <p className="text-gold font-cormorant tracking-[0.15em] text-sm uppercase">
                                    Văn Cương & Thu Nụ
                                </p>
                                <p className="text-ivory/60 text-xs mt-1">22 . 03 . 2026</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* CSS Animation cho scanline */}
            <style jsx>{`
                @keyframes scanline {
                    from { top: -2px; }
                    to { top: 100%; }
                }
            `}</style>
        </section>
    );
}
