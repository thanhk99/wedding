"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Sử dụng một bản nhạc cưới không bản quyền làm mặc định
    const audioUrl = "/Mãi Mãi Bên Nhau.mp3";
    const encodedAudioUrl = encodeURI(audioUrl);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.4;
            // Tự động phát khi mount (vì MusicPlayer chỉ hiện sau khi nhấn Mở thiệp)
            audioRef.current.play().then(() => {
                setIsPlaying(true);
            }).catch(err => console.log("Auto-play blocked", err));
        }
    }, []);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(err => console.log("Auto-play blocked", err));
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="fixed bottom-6 left-6 z-[100]">
            <audio ref={audioRef} src={encodedAudioUrl} loop />

            <motion.button
                onClick={togglePlay}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative w-12 h-12 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-gold/30 flex items-center justify-center text-wine"
            >
                {isPlaying ? (
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                            <path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.85 14,18.71V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16.02C15.5,15.29 16.5,13.77 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
                        </svg>
                    </motion.div>
                ) : (
                    <svg className="w-6 h-6 fill-current opacity-50" viewBox="0 0 24 24">
                        <path d="M16.5,12L14,9.19V14.82L16.5,12M19,12C19,15.17 16.89,17.85 14,18.71V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L4.27,3M12,4L9.91,6.09L12,8.18V4Z" />
                    </svg>
                )}

                {isPlaying && (
                    <div className="absolute -inset-1 rounded-full border border-gold/50 animate-ping" />
                )}
            </motion.button>

            <AnimatePresence>
                {!isPlaying && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="absolute left-16 top-1/2 -translate-y-1/2 whitespace-nowrap bg-white/90 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-gold shadow-sm border border-gold/10"
                    >
                        Chạm để phát nhạc ✨
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
