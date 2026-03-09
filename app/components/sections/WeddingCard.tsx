"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

interface EventInfo {
    label: string;
    time: string;
    date: string;
    lunarDate: string;
}

interface WeddingCardProps {
    type: "NHÀ TRAI" | "NHÀ GÁI";
    events: EventInfo[];
    locationName: string;
    locationAddress: string;
    mapLink: string;
    index: number;
}

export default function WeddingCard({
    type,
    events,
    locationName,
    locationAddress,
    mapLink,
    index
}: WeddingCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="flex flex-col items-center w-full max-w-lg mx-auto"
        >
            {/* Header Badge */}
            <div className="bg-[#e2e0d1] px-14 py-2.5 rounded-full mb-8 shadow-sm border border-wine/10">
                <span className="text-wine font-bold tracking-[0.4em] text-base md:text-lg">{type}</span>
            </div>

            {/* Card Body */}
            <div className="bg-[#f2f0e4] rounded-[1.5rem] p-10 md:p-14 w-full shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-white relative overflow-hidden flex flex-col items-center">
                <div className="flex flex-col items-center space-y-12 w-full">
                    {events.map((event, idx) => (
                        <div key={idx} className="flex flex-col items-center w-full">
                            <h3 className="text-wine font-bold text-xl md:text-2xl tracking-[0.2em] mb-3 font-playfair uppercase">
                                {event.label}
                            </h3>
                            <p className="text-wine/80 font-medium text-xs md:text-sm tracking-[0.2em] mb-5 uppercase">
                                VÀO LÚC {event.time}
                            </p>

                            <div className="w-full flex flex-col items-center max-w-[280px]">
                                <div className="h-[1.5px] w-full bg-wine/40 mb-3" />
                                <div className="border-y-[1.5px] border-wine/40 w-full py-3 flex justify-center">
                                    <span className="text-wine text-3xl md:text-4xl font-bold tracking-[0.1em] font-playfair">
                                        {event.date}
                                    </span>
                                </div>
                                <div className="h-[1.5px] w-full bg-wine/40 mt-3" />
                            </div>

                            <p className="text-wine/70 text-[10px] md:text-xs mt-4 tracking-wider uppercase font-medium">
                                {event.lunarDate}
                            </p>

                            {idx < events.length - 1 && (
                                <div className="w-full max-w-[200px] border-t border-dotted border-wine/30 mt-12" />
                            )}
                        </div>
                    ))}

                    {/* Location Section */}
                    <div className="flex flex-col items-center text-center space-y-6 pt-6 w-full">
                        <MapPin className="w-10 h-10 text-wine/80 mb-1" />

                        <div className="space-y-3">
                            <h4 className="font-playfair italic text-3xl md:text-4xl text-wine opacity-90 leading-tight px-4">
                                Tại {locationName}
                            </h4>
                            <p className="text-wine/70 text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold max-w-xs mx-auto leading-relaxed">
                                {locationAddress}
                            </p>
                        </div>

                        <motion.a
                            href={mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05, backgroundColor: "#722F37", color: "#F8F4EF" }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-8 px-12 py-2.5 border border-wine/40 rounded-full text-wine transition-all duration-300 text-xs md:text-sm tracking-[0.2em] font-bold uppercase hover:shadow-lg"
                        >
                            XEM BẢN ĐỒ
                        </motion.a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
