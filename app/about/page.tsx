"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function SlotReel() {
  const icons = [
    "./images/1.jpg",
    "./images/2.jpg",
    "./images/3.jpg",
    "./images/4.jpg",
    "./images/5.jpg",
    "./images/6.jpg",
    "./images/7.jpg",
    "./images/8.jpg",
  ];

  return (
    <div className="flex justify-center  overflow-hidden py-20 w-full">
      <div
      //     className="pointer-events-none absolute top-0 left-0 h-12 w-full
      // bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm"
      //   />

      //   {/* BLUR BOTTOM */}
      //   <div
      //     className="pointer-events-none absolute bottom-0 left-0 h-12 w-full
      // bg-gradient-to-t from-black/80 to-transparent backdrop-blur-sm"
      />
      {[0, 1, 2, 3, 4, 5].map((col) => (
        <div
          key={col}
          className="
            relative overflow-hidden rounded-2xl
            h-30 w-10
            sm:h-48 sm:w-20
            md:h-120 md:w-48
            sx:h-24
            sx:w-24  
            bg-white/5 backdrop-blur
          "
        >
          {/* SLOT CONTENT */}
          <motion.div
            className="absolute top-0 left-0 w-full flex flex-col items-center gap-4 sm:gap-5 md:gap-6 "
            animate={{
              y: col % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"],
            }}
            transition={{
              duration: 20 + col,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...icons, ...icons].map((src, i) => (
              <div
                key={i}
                className="
                  flex items-center justify-center
                  h-12 w-12
                  sm:h-14 sm:w-14
                  md:h-52 md:w-52
                "
              >
                <Image src={src} alt="" width={340} height={170} />
              </div>
            ))}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
