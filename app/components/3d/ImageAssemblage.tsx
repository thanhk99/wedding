"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ImageAssemblageProps {
    src: string;
    alt: string;
    rows?: number;
    cols?: number;
    isActive?: boolean;
}

export default function ImageAssemblage({ src, alt, rows = 12, cols = 12, isActive = true }: ImageAssemblageProps) {
    const [shards, setShards] = useState<any[]>([]);

    useEffect(() => {
        const newShards = [];
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                // Tính toán khoảng cách từ tâm để tạo hiệu ứng tỏa ra từ tâm
                const centerX = (cols - 1) / 2;
                const centerY = (rows - 1) / 2;
                const distFromCenter = Math.sqrt(Math.pow(c - centerX, 2) + Math.pow(r - centerY, 2));
                const maxDist = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
                const normalizedDist = distFromCenter / maxDist;

                newShards.push({
                    id: `${r}-${c}`,
                    r,
                    c,
                    // Vị trí bắt đầu ngẫu nhiên tỏa ra từ tâm hoặc xa hơn
                    startX: (c - centerX) * 100 + (Math.random() - 0.5) * 200,
                    startY: (r - centerY) * 100 + (Math.random() - 0.5) * 200,
                    startZ: Math.random() * 400 + 200, // Giảm độ sâu để bay nhanh hơn
                    startRotate: (Math.random() - 0.5) * 60,
                    startScale: 0.8 + Math.random() * 0.2,
                    delay: normalizedDist * 0.4 + Math.random() * 0.2, // Nén delay lại
                });
            }
        }
        setShards(newShards);
    }, [rows, cols]);

    return (
        <div
            className="relative w-full h-full overflow-hidden bg-transparent"
            style={{
                display: "grid",
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
                perspective: "1000px"
            }}
        >
            {shards.map((shard) => (
                <motion.div
                    key={shard.id}
                    initial={{
                        x: shard.startX,
                        y: shard.startY,
                        z: shard.startZ,
                        rotate: shard.startRotate,
                        scale: shard.startScale,
                        opacity: 0,
                        filter: "blur(4px)"
                    }}
                    animate={isActive ? {
                        x: 0,
                        y: 0,
                        z: 0,
                        rotate: 0,
                        scale: 1,
                        opacity: 1,
                        filter: "blur(0px)"
                    } : {
                        x: shard.startX,
                        y: shard.startY,
                        z: shard.startZ,
                        rotate: shard.startRotate,
                        scale: shard.startScale,
                        opacity: 0,
                        filter: "blur(4px)"
                    }}
                    transition={{
                        duration: 1.2, // Nhanh hơn: 1.8 -> 1.2
                        delay: shard.delay,
                        ease: [0.22, 1, 0.36, 1] // Quartic out
                    }}
                    style={{
                        backgroundImage: `url("${encodeURI(src)}")`,
                        backgroundSize: `${cols * 100}% ${rows * 100}%`,
                        backgroundPosition: `${(shard.c / (cols - 1)) * 100}% ${(shard.r / (rows - 1)) * 100}%`,
                        width: "100.5%", // Tránh các khe hở nhỏ do làm tròn pixel
                        height: "100.5%",
                        transformStyle: "preserve-3d"
                    }}
                    aria-label={alt}
                />
            ))}
        </div>
    );
}
