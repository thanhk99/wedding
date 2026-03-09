import { motion } from "framer-motion";
import WeddingCard from "./WeddingCard";

export default function EventDetails() {
    const eventsData = [
        {
            type: "NHÀ TRAI" as const,
            events: [
                {
                    label: "BỮA CƠM THÂN MẬT",
                    time: "17:00 - THỨ BẢY",
                    date: "21.03.2026",
                    lunarDate: "(TỨC NGÀY 03 THÁNG 02 NĂM BÍNH NGỌ)"
                },
                {
                    label: "LỄ THÀNH HÔN",
                    time: "9:00 - CHỦ NHẬT",
                    date: "22.03.2026",
                    lunarDate: "(TỨC NGÀY 04 THÁNG 02 NĂM BÍNH NGỌ)"
                }
            ],
            locationName: "Tư Gia Nhà Trai",
            locationAddress: "THÔN Thong - XÃ Thanh Liêm - Tỉnh Ninh Bình",
            mapLink: "https://maps.app.goo.gl/9TWp6UogPBAiJr8Y7"
        },
        {
            type: "NHÀ GÁI" as const,
            events: [
                {
                    label: "BỮA CƠM THÂN MẬT",
                    time: "17:00 - THỨ BẢY",
                    date: "21.03.2026",
                    lunarDate: "(TỨC NGÀY 03 THÁNG 02 NĂM BÍNH NGỌ)"
                },
                {
                    label: "LỄ VU QUY",
                    time: "09:00 - CHỦ NHẬT",
                    date: "22.03.2026",
                    lunarDate: "(TỨC NGÀY 04 THÁNG 02 NĂM BÍNH NGỌ)"
                }
            ],
            locationName: "Tư Gia Nhà Gái",
            locationAddress: "Thôn Chè Trình - XÃ Thanh Liêm - Tỉnh Ninh Bình",
            mapLink: "https://www.google.com/maps/place/20%C2%B025'49.7%22N+105%C2%B056'38.8%22E/@20.4300325,105.9445928,514m/data=!3m1!1e3!4m4!3m3!8m2!3d20.4304581!4d105.9441223?entry=ttu&g_ep=EgoyMDI2MDMwNC4xIKXMDSoASAFQAw%3D%3D"
        }
    ];

    return (
        <section className="py-24 bg-ivory relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-playfair text-wine italic mb-4"
                    >
                        Thời Gian & Địa Điểm
                    </motion.h2>
                    <div className="w-24 h-[1px] bg-gold mx-auto" />
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {eventsData.map((data, idx) => (
                        <WeddingCard
                            key={idx}
                            index={idx}
                            {...data}
                        />
                    ))}
                </div>
            </div>

            {/* Decor elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </section>
    );
}
