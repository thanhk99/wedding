"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import styles from "./hero.module.css";
import ImageAssemblage from "../3d/ImageAssemblage";

// Lazy load Canvas chỉ khi đã mount xong DOM
import dynamic from "next/dynamic";
const PetalsCanvas = dynamic(() => import("../3d/PetalsCanvas"), {
    ssr: false,
    loading: () => <></>,
});

export default function Hero({ isActive = true }: { isActive?: boolean }) {
    const containerRef = useRef<HTMLElement>(null);
    const [canvasReady, setCanvasReady] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);
    const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    // Đợi 200ms sau khi Mount mới render Canvas để tránh lỗi null addEventListener
    useEffect(() => {
        const t = setTimeout(() => setCanvasReady(true), 200);
        return () => clearTimeout(t);
    }, []);

    return (
        <section ref={containerRef} className={styles.heroSection}>
            {/* Three.js Canvas - chỉ render sau khi DOM đã sẵn sàng */}
            {canvasReady && (
                <div className={styles.canvasContainer}>
                    <PetalsCanvas />
                </div>
            )}

            <div className={styles.overlayGradient} />

            <motion.div className={styles.contentWrapper} style={{ y: textY, opacity }}>
                <motion.div
                    initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                    animate={isActive ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={styles.imageCard}
                >
                    <img
                        src="/images/ảnh đầu tiên.jpg"
                        alt="Văn Cương & Thu Nụ"
                        className="w-full h-full object-cover object-top"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <span className={styles.badge}>Save the Date</span>
                    <h1 className={styles.title}>Văn Cương & Thu Nụ</h1>
                    <p className={styles.date}>22 . 03 . 2026</p>
                </motion.div>
            </motion.div>

            {/* Decorative text */}
            <motion.div
                style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]) }}
                className="absolute bottom-10 left-10 md:left-20 text-gold/20 font-playfair text-6xl md:text-9xl -rotate-12 pointer-events-none z-0"
            >
                Love
            </motion.div>
            <motion.div
                style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-150%"]) }}
                className="absolute top-20 right-10 md:right-20 text-gold/20 font-playfair text-6xl md:text-9xl rotate-12 pointer-events-none z-0"
            >
                Wedding
            </motion.div>
        </section>
    );
}
