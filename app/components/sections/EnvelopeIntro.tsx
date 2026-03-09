"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface EnvelopeIntroProps {
    onOpen: () => void;
}

export default function EnvelopeIntro({ onOpen }: EnvelopeIntroProps) {
    const [phase, setPhase] = useState<"idle" | "opening" | "zooming" | "done">("idle");
    const [baseScale, setBaseScale] = useState(1);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const calledRef = useRef(false); // Đảm bảo onOpen chỉ gọi 1 lần

    useEffect(() => {
        const handleResize = () => setBaseScale(window.innerWidth < 640 ? 0.85 : 1);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleClick = () => {
        if (phase !== "idle") return;
        setPhase("opening");

        // Sau 1.5s: cửa mở xong → bắt đầu zoom
        timerRef.current = setTimeout(() => {
            setPhase("zooming");

            // Sau thêm 1s: zoom xong → gọi onOpen ngay lập tức
            timerRef.current = setTimeout(() => {
                if (!calledRef.current) {
                    calledRef.current = true;
                    setPhase("done");
                    onOpen();
                }
            }, 900);
        }, 1500);
    };

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    const isDone = phase === "done";
    const isZooming = phase === "zooming";

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ivory"
            style={{
                perspective: "1500px",
                // Khi done: ẩn hoàn toàn, không block sự kiện
                opacity: isDone ? 0 : 1,
                pointerEvents: isDone ? "none" : "auto",
                transition: "opacity 0.5s ease",
                // Khi done: đẩy ra khỏi luồng render bằng visibility
                visibility: isDone ? "hidden" : "visible",
            }}
        >
            {/* Gate Container — zoom out khi mở tiệp */}
            <motion.div
                className="relative cursor-pointer select-none origin-center"
                onClick={handleClick}
                style={{ width: 360, height: 480, transformStyle: "preserve-3d" }}
                animate={isZooming ? { scale: 3.5, opacity: 0 } : { scale: baseScale, opacity: 1 }}
                transition={
                    isZooming
                        ? { duration: 0.9, ease: [0.76, 0, 0.24, 1] }
                        : { duration: 0.5 }
                }
            >
                {/* Nền hàng thiệp */}
                <div className="absolute inset-0 bg-[#f3ebe0] rounded-xl shadow-2xl border border-gold/20" />

                {/* Card nội dung */}
                <motion.div
                    className="absolute inset-x-4 inset-y-4 rounded-lg flex flex-col items-center justify-center text-center z-10 p-4 md:p-6 space-y-4 bg-white shadow-inner"
                    style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')" }}
                    animate={
                        isZooming ? { scale: 1.05 }
                            : phase === "opening" ? { scale: 1 }
                                : { scale: 0.95 }
                    }
                    transition={{ duration: 1.0, ease: "easeOut" }}
                >
                    <div className="w-12 h-12 relative opacity-80 mb-2">
                        <svg viewBox="0 0 100 100" className="w-full h-full text-gold fill-current">
                            <path d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-playfair text-wine italic text-center leading-tight">
                        Văn Cương <span className="text-2xl text-gold/80 block my-1">&</span> Thu Nụ
                    </h1>
                    <p className="text-base text-wine/70 font-cormorant tracking-[0.2em]">22 . 03 . 2026</p>
                    <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mt-4" />
                    <p className="text-xs text-gold/80 uppercase tracking-widest mt-4 font-light">
                        Thân mời tới dự hôn lễ
                    </p>
                </motion.div>

                {/* Cánh trái */}
                <motion.div
                    className="absolute inset-y-0 left-0 w-1/2 rounded-l-xl border-r border-gold/30 shadow-[10px_0_20px_rgba(0,0,0,0.15)] z-20 flex flex-col items-center justify-center overflow-hidden"
                    style={{
                        transformOrigin: "left center",
                        backgroundColor: "#F8F4EF",
                        backgroundImage: "linear-gradient(to right, rgba(235, 225, 210, 0.4), rgba(248, 244, 239, 0.9))"
                    }}
                    animate={phase === "opening" || isZooming ? { rotateY: -130 } : { rotateY: 0 }}
                    transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                >
                    <h3 className="font-playfair text-wine italic tracking-[0.1em] text-2xl md:text-3xl px-2 text-center"
                        style={{ textShadow: "1px 1px 1px rgba(255,255,255,0.8)" }}>
                        Văn Cương
                    </h3>
                </motion.div>

                {/* Cánh phải */}
                <motion.div
                    className="absolute inset-y-0 right-0 w-1/2 rounded-r-xl border-l border-gold/30 shadow-[-10px_0_20px_rgba(0,0,0,0.15)] z-20 flex flex-col items-center justify-center overflow-hidden"
                    style={{
                        transformOrigin: "right center",
                        backgroundColor: "#F8F4EF",
                        backgroundImage: "linear-gradient(to left, rgba(235, 225, 210, 0.4), rgba(248, 244, 239, 0.9))"
                    }}
                    animate={phase === "opening" || isZooming ? { rotateY: 130 } : { rotateY: 0 }}
                    transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
                >
                    <h3 className="font-playfair text-wine italic tracking-[0.1em] text-2xl md:text-3xl px-2 text-center"
                        style={{ textShadow: "1px 1px 1px rgba(255,255,255,0.8)" }}>
                        Thu Nụ
                    </h3>
                </motion.div>

                {/* Nút seal giữa - chỉ hiện khi idle */}
                {phase === "idle" && (
                    <motion.div
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gold border-[3px] border-ivory/80 shadow-lg flex items-center justify-center z-30"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="w-12 h-12 rounded-full border border-ivory/30 flex items-center justify-center">
                            <span className="text-ivory text-2xl font-playfair italic">C&N</span>
                        </div>
                        <motion.div
                            className="absolute inset-0 rounded-full border-2 border-gold"
                            animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </motion.div>
                )}

                {/* Chữ hướng dẫn - chỉ hiện khi idle */}
                {phase === "idle" && (
                    <motion.p
                        className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-wine/50 text-sm tracking-[0.2em] whitespace-nowrap uppercase font-cormorant"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        Chạm để mở thiệp
                    </motion.p>
                )}
            </motion.div>
        </div>
    );
}
