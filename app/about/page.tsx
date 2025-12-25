"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

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

  const heroRef = useRef<HTMLElement>(null);
  const isInView = useInView(heroRef, {
    amount: 0.8,
    once: false,
  });

  const scrollToNext = () => {
    const next = heroRef.current?.nextElementSibling as HTMLElement;
    next?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory overflow-x-hidden">
      {/* ===== PAGE 1 : SLOT ===== */}
      <section
        className="h-screen snap-start flex items-center justify-center"
        ref={heroRef}
      >
        <div className="flex sm:w-[10%] md:w-[90%] lg:w-[95%] xl:w-full justify-center">
          {[0, 1, 2, 3, 4].map((col) => (
            <div
              key={col}
              className="
                relative overflow-hidden rounded-2xl
                h-48 w-28
                sm:h-56 sm:w-32
                md:h-90 md:w-48
                
              "
            >
              <motion.div
                className="absolute top-0 left-0 w-full flex flex-col items-center gap-4"
                animate={{
                  y: col % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"],
                }}
                transition={{
                  duration: 18 + col,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {[...icons, ...icons].map((src, i) => (
                  <Image
                    key={i}
                    src={src}
                    alt=""
                    width={200}
                    height={160}
                    className=" flex items-center justify-center h-52 w-36 sm:h-32 sm:w-32 md:h-80 md:w-66 "
                  />
                ))}
              </motion.div>
            </div>
          ))}
        </div>
        <motion.button
          onClick={scrollToNext}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isInView ? 0.7 : 0,
            y: isInView ? [0, 12, 0] : 0,
          }}
          transition={{
            repeat: isInView ? Infinity : 0,
            duration: 1.5,
            ease: "easeInOut",
          }}
          style={{ pointerEvents: isInView ? "auto" : "none" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.button>
      </section>

      {/* ===== PAGE 2 : NEXT SECTION ===== */}
      <section className="h-screen snap-start relative flex items-center justify-center ">
        <div className="max-w-6xl w-full">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white text-4xl md:text-5xl font-bold mb-16 px-6 pt-2"
          >
            Work Experience
          </motion.h1>

          <div className="relative grid md:grid-cols-2 gap-12 sx:gap-8 px-6">
            <div className="hidden md:block absolute left-1/2 top-0 h-full w-px bg-white/20" />

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/5 backdrop-blur rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between gap-4 mb-4">
                <h3 className="text-white text-xl font-semibold">
                  Full-Stack Developer
                </h3>

                <Image
                  src="/images/poon_logo.png"
                  alt="Company logo"
                  width={160}
                  height={40}
                  className="object-contain"
                />
              </div>

              <p className="text-gray-400 text-sm mb-3">
                2023 – Present (Poontana Marketing Co., Ltd)
              </p>
              <p className="text-gray-300 leading-relaxed">
                Worked as a Full-Stack Developer designing and delivering
                scalable web applications with modern frontend and backend
                technologies. Led development using Vue, React, and Next.js,
                integrated APIs with Node.js and Prisma, managed relational and
                NoSQL databases, and implemented automated CI/CD workflows with
                GitHub Actions for cloud deployments on Plesk and Render.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-white/5 backdrop-blur rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between gap-4 mt-6">
                <h3 className="text-white text-xl font-semibold">
                  Internship Developer
                </h3>

                <Image
                  className="items-center justify-center mb-2 rounded-md "
                  alt=""
                  src={"./images/dexon.jpg"}
                  width={160}
                  height={50}
                />
              </div>
              <p className="text-gray-400 text-sm mb-3 mt-10">
                2021 – 2023 (Dexon technologies Co., Ltd)
              </p>
              <p className="text-gray-300 leading-relaxed">
                Assisted in developing web applications and gained experience in
                frontend technologies use framework vue.js, Tailwind CSS to
                develop systems related to software engineering.
              </p>
            </motion.div>
          </div>
        </div>
        <motion.div
          className="
            absolute bottom-8 right-8
            hidden md:block
            lg:hidden
            sm:hidden
            ms:hidden
            xl:block
          "
        >
          <Image
            src="/images/2590506.png"
            alt="Developer"
            width={320}
            height={170}
            className="object-contain"
          />
        </motion.div>
      </section>
    </div>
  );
}
