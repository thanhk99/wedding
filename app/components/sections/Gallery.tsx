"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const images = [
    { src: "/images/DSC03481k.jpg", span: "col-span-1 md:col-span-2 row-span-2", position: "center 20%" },
    { src: "/images/DSC03695k.jpg", span: "col-span-1", position: "center 10%" },
    { src: "/images/DSC03060k.jpg", span: "col-span-1", position: "center 15%" },
    { src: "/images/DSC02860k.jpg", span: "col-span-1", position: "center 20%" },
    { src: "/images/DSC03276k.jpg", span: "col-span-1", position: "center 10%" },
];

export default function Gallery() {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    // Xử lý phím tắt
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedIndex === null) return;
            if (e.key === "Escape") setSelectedIndex(null);
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") prevImage();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedIndex]);

    const nextImage = () => {
        if (selectedIndex === null) return;
        setSelectedIndex((selectedIndex + 1) % images.length);
    };

    const prevImage = () => {
        if (selectedIndex === null) return;
        setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    };
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
                            onClick={() => setSelectedIndex(index)}
                        >
                            {/* Ảnh với Next/Image - tối ưu load */}
                            <Image
                                src={encodeURI(img.src)}
                                alt={`Wedding photo ${index + 1}`}
                                fill
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                style={{ objectPosition: img.position || "center" }}
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

            {/* Lightbox / Modal xem ảnh */}
            <AnimatePresence>
                {selectedIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
                        onClick={() => setSelectedIndex(null)}
                    >
                        {/* Close button */}
                        <motion.button
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="absolute top-6 right-6 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedIndex(null);
                            }}
                        >
                            <X size={28} />
                        </motion.button>

                        {/* Navigation - Prev */}
                        <button
                            className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/5 hover:bg-white/20 rounded-full text-white border border-white/10 transition-all"
                            onClick={(e) => {
                                e.stopPropagation();
                                prevImage();
                            }}
                        >
                            <ChevronLeft size={32} />
                        </button>

                        {/* Main Image Container */}
                        <motion.div
                            key={selectedIndex}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="relative w-full max-w-5xl aspect-[4/5] md:aspect-[16/10] overflow-hidden rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.5)] border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={encodeURI(images[selectedIndex].src)}
                                alt="Selected wedding photo"
                                fill
                                className="object-contain bg-black/40"
                                priority
                            />
                            
                            {/* Decorative Frame Overlay */}
                            <div className="absolute inset-0 border-[16px] border-white/5 pointer-events-none" />
                            
                            {/* Image Info Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 pt-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex justify-between items-end">
                                <div>
                                    <p className="text-gold font-playfair text-xl md:text-2xl italic">Văn Cương & Thu Nụ</p>
                                    <p className="text-white/60 text-xs tracking-[0.3em] uppercase mt-1">Hội hôn 22.03.2026</p>
                                </div>
                                <div className="text-white/40 font-cormorant text-lg italic">
                                    {selectedIndex + 1} / {images.length}
                                </div>
                            </div>
                        </motion.div>

                        {/* Navigation - Next */}
                        <button
                            className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/5 hover:bg-white/20 rounded-full text-white border border-white/10 transition-all"
                            onClick={(e) => {
                                e.stopPropagation();
                                nextImage();
                            }}
                        >
                            <ChevronRight size={32} />
                        </button>

                        {/* Thumbnail strips - Optional but adds premium feel */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex gap-3 px-6 py-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedIndex(idx);
                                    }}
                                    className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                                        idx === selectedIndex ? "border-gold scale-110" : "border-transparent opacity-50 hover:opacity-100"
                                    }`}
                                >
                                    <Image
                                        src={encodeURI(img.src)}
                                        alt="thumbnail"
                                        fill
                                        className="object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>


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
