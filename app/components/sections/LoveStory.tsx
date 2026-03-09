"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const milestones = [
    {
        title: "Lần đầu gặp gỡ",
        date: "15/05/2021",
        desc: "Hai ánh mắt chạm nhau lần đầu, lặng lẽ như một trang thơ mở ra...",
        img: "/images/DSC02860k.jpg",
        side: "left",
    },
    {
        title: "Lời tỏ tình ấm áp",
        date: "20/10/2022",
        desc: "Một buổi chiều thu, những lời chưa nói vội vã tìm được câu trả lời.",
        img: "/images/DSC03060k.jpg",
        side: "right",
    },
    {
        title: "Cùg nhau khám phá",
        date: "01/01/2024",
        desc: "Mỗi con đường dài thêm bởi tiếng cười, mỗi khoảnh khắc đẹp vì có nhau.",
        img: "/images/DSC03276k.jpg",
        side: "left",
    },
    {
        title: "Hứa ước trọn đời",
        date: "22/03/2026",
        desc: "Trước mặt đất trời, chúng mình nguyện cùng nhau đến cuối con đường này.",
        img: "/images/DSC03481k.jpg",
        side: "right",
    },
];

// Một mốc kỷ niệm — slide vào từ trái/phải khi cuộn vào view
function MilestoneCard({ item, index }: { item: typeof milestones[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"],
    });

    const x = useTransform(
        scrollYProgress,
        [0, 1],
        [item.side === "left" ? -120 : 120, 0]
    );
    const cardOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);

    return (
        <div
            ref={ref}
            className={`relative flex items-center gap-6 md:gap-12 ${item.side === "right" ? "flex-row-reverse" : "flex-row"
                }`}
        >
            {/* Ảnh */}
            <motion.div
                style={{ x, opacity: cardOpacity, scale }}
                className="relative w-[45%] md:w-[40%] aspect-[3/4] rounded-xl overflow-hidden shadow-2xl flex-shrink-0"
            >
                <Image
                    src={encodeURI(item.img)}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 45vw, 40vw"
                />
                {/* Gold border overlay */}
                <div className="absolute inset-0 rounded-xl ring-1 ring-gold/30 pointer-events-none" />
                {/* Date badge */}
                <div className="absolute top-4 right-4 bg-wine/80 text-ivory text-xs font-cormorant tracking-[0.2em] px-3 py-1 rounded-full backdrop-blur-sm">
                    {item.date}
                </div>
            </motion.div>

            {/* Nội dung text */}
            <motion.div
                style={{
                    x: useTransform(
                        scrollYProgress,
                        [0, 1],
                        [item.side === "left" ? 60 : -60, 0]
                    ),
                    opacity: cardOpacity,
                }}
                className="flex-1 py-6"
            >
                {/* Số thứ tự */}
                <p className="text-gold/40 font-playfair text-6xl md:text-8xl font-bold leading-none mb-2 select-none">
                    {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="text-2xl md:text-3xl font-playfair text-wine italic mb-3">
                    {item.title}
                </h3>
                <div className="w-12 h-[1px] bg-gold mb-4" />
                <p className="text-wine/60 font-cormorant text-base md:text-lg leading-relaxed max-w-xs">
                    {item.desc}
                </p>
            </motion.div>

            {/* Connector line tới timeline giữa */}
            <div className="hidden md:block absolute left-1/2 top-1/2 w-8 h-[1px] bg-gold/30 -translate-x-1/2" />
        </div>
    );
}

export default function LoveStory() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Camera parallax: nền di chuyển chậm hơn khi cuộn
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    return (
        <section ref={containerRef} className="relative bg-ivory py-24 overflow-hidden">

            {/* Parallax background decorative pattern */}
            <motion.div
                style={{ y: bgY }}
                className="absolute inset-0 pointer-events-none opacity-5"
            >
                <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />
            </motion.div>

            {/* Đường timeline giữa dọc */}
            <div className="absolute left-1/2 top-24 bottom-24 w-[1px] bg-gradient-to-b from-transparent via-gold/30 to-transparent hidden md:block" />

            {/* Dots trên timeline */}
            {milestones.map((_, i) => (
                <div
                    key={i}
                    className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gold/50 hidden md:block"
                    style={{ top: `${20 + (i + 1) * (60 / milestones.length)}%` }}
                />
            ))}

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                {/* Tiêu đề section */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <p className="text-gold uppercase tracking-[0.3em] font-cormorant text-sm mb-4">
                        Câu chuyện của chúng mình
                    </p>
                    <h2 className="text-4xl md:text-6xl font-playfair text-wine italic mb-6">
                        Hành Trình Tình Yêu
                    </h2>
                    <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
                </motion.div>

                {/* Danh sách các mốc */}
                <div className="space-y-24 md:space-y-36">
                    {milestones.map((item, index) => (
                        <MilestoneCard key={index} item={item} index={index} />
                    ))}
                </div>

                {/* Kết thúc section */}
                <motion.div
                    className="text-center mt-24"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="w-16 h-[1px] bg-gold mx-auto mb-6" />
                    <p className="text-wine/50 font-cormorant text-xl italic">
                        & rồi chúng mình cùng nhau đi đến ngày hôm nay...
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
