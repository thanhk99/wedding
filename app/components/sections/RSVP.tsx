"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Users, MessageSquare } from "lucide-react";

export default function RSVP() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        name: "",
        guests: "Đi 1 mình",
        message: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        try {
            const res = await fetch("/api/rsvp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setStatus("success");
                setFormData({ name: "", guests: "Đi 1 mình", message: "" });
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    return (
        <section className="py-24 bg-white relative">
            <div className="max-w-3xl mx-auto px-6 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-playfair text-wine italic mb-4">Xác Nhận Tham Dự</h2>
                    <p className="font-cormorant text-wine/60 text-lg">Anh/Chị vui lòng xác nhận để chúng mình chuẩn bị đón tiếp chu đáo nhất nhé!</p>
                </div>

                <div className="bg-ivory/50 rounded-3xl p-8 md:p-12 shadow-2xl border border-gold/10 relative overflow-hidden">
                    <AnimatePresence mode="wait">
                        {status !== "success" ? (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-cormorant uppercase tracking-widest text-wine/70 ml-1">Họ và Tên</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/50" />
                                            <input
                                                required
                                                type="text"
                                                placeholder="Nguyễn Văn A"
                                                className="w-full pl-12 pr-4 py-4 bg-white border border-gold/20 rounded-xl focus:outline-none focus:border-gold transition-colors font-cormorant"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-cormorant uppercase tracking-widest text-wine/70 ml-1">Số người tham dự</label>
                                        <div className="relative">
                                            <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/50" />
                                            <select 
                                                className="w-full pl-12 pr-4 py-4 bg-white border border-gold/20 rounded-xl focus:outline-none focus:border-gold transition-colors font-cormorant appearance-none"
                                                value={formData.guests}
                                                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                                            >
                                                <option>Đi 1 mình</option>
                                                <option>Đi 2 người</option>
                                                <option>Đi cùng gia đình</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-cormorant uppercase tracking-widest text-wine/70 ml-1">Lời chúc đặc biệt</label>
                                    <div className="relative">
                                        <MessageSquare className="absolute left-4 top-6 w-4 h-4 text-gold/50" />
                                        <textarea
                                            placeholder="Gửi lời chúc đến cô dâu chú rể..."
                                            rows={4}
                                            className="w-full pl-12 pr-4 py-4 bg-white border border-gold/20 rounded-xl focus:outline-none focus:border-gold transition-colors font-cormorant resize-none"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <button
                                    disabled={status === "loading"}
                                    type="submit"
                                    className="w-full bg-wine text-ivory py-4 rounded-xl flex items-center justify-center gap-2 uppercase tracking-[0.2em] font-cormorant hover:bg-wine/90 transition-all shadow-lg active:scale-[0.98] disabled:opacity-70"
                                >
                                    {status === "loading" ? (
                                        <div className="w-6 h-6 border-2 border-ivory/30 border-t-ivory rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            Gửi Xác Nhận
                                        </>
                                    )}
                                </button>
                                {status === "error" && (
                                    <p className="text-red-500 text-sm text-center">Có lỗi xảy ra, vui lòng thử lại sau.</p>
                                )}
                            </motion.form>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12 space-y-6"
                            >
                                <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-gold/20">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", damping: 10 }}
                                    >
                                        <Send className="w-10 h-10 text-gold" />
                                    </motion.div>
                                </div>
                                <h3 className="text-3xl font-playfair text-wine italic">Cảm Ơn Bạn!</h3>
                                <p className="font-cormorant text-wine/70 text-lg">Lời chúc và xác nhận của bạn đã được gửi đến chúng mình. <br /> Rất mong được gặp bạn tại buổi lễ!</p>
                                <button
                                    onClick={() => setStatus("idle")}
                                    className="text-gold uppercase tracking-widest text-xs font-bold border-b border-gold/30 pb-1"
                                >
                                    Gửi lại lời chúc khác
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
