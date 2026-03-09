"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import EnvelopeIntro from "./components/sections/EnvelopeIntro";
import MusicPlayer from "./components/MusicPlayer";

// Import động để tránh load Three.js ngay từ đầu
import dynamic from "next/dynamic";
const Hero = dynamic(() => import("./components/sections/Hero"), { ssr: false });
const Gallery = dynamic(() => import("./components/sections/Gallery"), { ssr: false });
const Ending = dynamic(() => import("./components/sections/Ending"), { ssr: false });
const EventDetails = dynamic(() => import("./components/sections/EventDetails"), { ssr: false });
const LoveStory = dynamic(() => import("./components/sections/LoveStory"), { ssr: false });
const Countdown = dynamic(() => import("./components/sections/Countdown"), { ssr: false });
const RSVP = dynamic(() => import("./components/sections/RSVP"), { ssr: false });
const GiftSection = dynamic(() => import("./components/Gift/GiftSection"), { ssr: false });



export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="relative bg-ivory w-full">
      {/* Âm nhạc chỉ bật sau khi mở thiệp */}
      {isOpen && <MusicPlayer />}

      {/* Màn hình intro: phong bì */}
      <EnvelopeIntro onOpen={() => setIsOpen(true)} />

      {/* Nội dung chính — CHILI MOUNT sau khi mở thiệp, tránh 4 Canvas Three.js ăn GPU */}
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <Hero isActive={isOpen} />
            <EventDetails />
          </motion.div>

          {/* Section Hành Trình Tình Yêu (LoveStory CSS version) */}
          <LoveStory />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Gallery />
            <GiftSection />
            <RSVP />

            <Countdown />

            <Ending />
          </motion.div>
        </>
      )}
    </main>
  );
}



