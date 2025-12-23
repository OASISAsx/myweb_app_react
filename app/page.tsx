// components/TypewriterHero.tsx
"use client";

import Grid from "@mui/material/Grid";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  Variants,
} from "framer-motion";

import { useEffect, useState } from "react";
import Image from "next/image";
import Snowfall from "react-snowfall";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const greetingText = "สวัสดี, ผมชื่อ นันธวัช อินธิแสน";
const rotatingWords = [
  "Full-Stack Developer",
  "UI/UX Designer",
  "Next.js Enthusiast",
  "Animation Lover",
  "Creative Coder",
];

// ============== Card Animation Styles ================
const cardVariants: Variants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 20,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const hue = (h: number) => `hsl(${h}, 100%, 50%)`;

const containerStyle: React.CSSProperties = {
  padding: "100px 0",
  maxWidth: "auto",
  margin: "0 auto",
  position: "relative",
};

const cardContainerStyle: React.CSSProperties = {
  overflow: "hidden",
  display: "flex",
  width: "100%", // ✅ จาก 700 → auto
  maxWidth: 700,
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  paddingRight: 0, // ✅ เอาออก
  paddingTop: 20,
  marginBottom: -80, // ลดนิดหน่อย
};

const splashStyle = (hueA: number, hueB: number): React.CSSProperties => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`,
  clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
});

const cardStyle: React.CSSProperties = {
  fontSize: 140,
  width: "min(280px, 90vw)", // ✅ mobile safe
  height: "auto",
  aspectRatio: "300 / 430", // รักษาสัดส่วน
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 20,
  background: "#1a1a1a",
  color: "#fff",
  boxShadow:
    "0 0 1px hsl(0deg 0% 100% / 0.1), 0 0 8px hsl(0deg 0% 100% / 0.1), 0 0 16px hsl(0deg 0% 100% / 0.1), inset 0 0 20px rgba(0,0,0,0.5)",
  transformOrigin: "10% 60%",
};

const food: [string, string, string, number, number][] = [
  [
    "./images/next.png",
    "Next.js",
    "เชี่ยวชาญการสร้างเว็บที่เร็วและ SEO-friendly ด้วย App Router, Server Components และ Streaming",
    340,
    10,
  ],
  [
    "./images/Ts.png",
    "TypeScript",
    "เขียนโค้ดที่ปลอดภัยและ maintainable ด้วย type safety เต็มรูปแบบ",
    20,
    60,
  ],
  [
    "./images/vue.png",
    "Vue.js",
    "พัฒนาเว็บแอปด้วย Vue 3, Composition API และ Ecosystem ที่หลากหลาย",
    80,
    120,
  ],
  [
    "./images/tw.png",
    "Tailwind CSS",
    "ออกแบบ responsive และสวยเร็วด้วย utility-first CSS",
    140,
    180,
  ],
  [
    "./images/render.jpg",
    "Render.com",
    "ปรับใช้แอปพลิเคชันด้วย Render.com อย่างง่ายดายและรวดเร็ว\n    จัดการเวอร์ชันโค้ดและตั้งค่า CI/CD pipeline เพื่อการ deploy อัตโนมัติ",
    200,
    240,
  ],
  [
    "./images/github.png",
    "Git & CI/CD",
    "ใช้ Git และ CI/CD pipeline เพื่อการ อัพเดทงาน มีประสิทธิภาพและราบรื่น",
    300,
    340,
  ],
  [
    "./images/Pinialogo.svg",
    "Pinia & Vuex",
    "จัดการสถานะแอปพลิเคชัน Vue.js อย่างมีประสิทธิภาพด้วย Pinia และ Vuex",
    260,
    300,
  ],

  [
    "./images/ant.png",
    "Ant Design",
    "สร้าง UI ที่สวยงามและใช้งานง่ายด้วย Ant Design สำหรับ React และ Vue",
    20,
    80,
  ],
];

// ============== Main Component ================
export default function TypewriterHero() {
  const router = useRouter();
  // Typewriter logic (เหมือนเดิม)
  const greetingCount = useMotionValue(0);
  const greetingRounded = useTransform(greetingCount, Math.round);
  const greetingDisplay = useTransform(greetingRounded, (latest) =>
    greetingText.slice(0, latest)
  );

  const wordIndex = useMotionValue(0);
  const wordCount = useMotionValue(0);
  const wordRounded = useTransform(wordCount, Math.round);
  const currentWord = useTransform(
    wordIndex,
    (latest) => rotatingWords[latest % rotatingWords.length]
  );
  const wordDisplay = useTransform(wordRounded, (latest) => {
    const text = currentWord.get();
    return latest <= text.length ? text.slice(0, latest) : text;
  });

  const [isGreetingComplete, setIsGreetingComplete] = useState(false);
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      session?.user && console.log("User ID:", session.user.id);
    } else if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    const controls = animate(greetingCount, greetingText.length, {
      duration: greetingText.length * 0.08,
      ease: "easeOut",
      delay: 0.5,
      onComplete: () => setIsGreetingComplete(true),
    });
    return () => controls.stop();
  }, []);

  useEffect(() => {
    if (!isGreetingComplete) return;

    let controls: ReturnType<typeof animate> | null = null;
    const runWordAnimation = () => {
      const wordLength =
        rotatingWords[wordIndex.get() % rotatingWords.length].length;
      controls = animate(wordCount, wordLength, {
        type: "tween",
        ease: "easeIn",
        duration: wordLength * 0.07,
        onComplete: () => {
          setTimeout(() => {
            controls = animate(wordCount, 0, {
              type: "tween",
              ease: "easeOut",
              duration: wordLength * 0.05,
              onComplete: () => {
                wordIndex.set(wordIndex.get() + 1);
                runWordAnimation();
              },
            });
          }, 1500);
        },
      });
    };
    runWordAnimation();
    return () => controls?.stop();
  }, [isGreetingComplete]);

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="w-full bg-blue-500 text-white py-2 rounded"
      >
        Logout
      </button>
      <section className="flex min-h-screen items-center justify-center  px-6">
        <Snowfall snowflakeCount={50} />

        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 max-w-7xl w-full">
          {/* Text Part */}
          <div className="text-center lg:text-left space-y-8">
            <h1 className="text-2xl xs:text-2xl md:text-4xl lg:text-6xl font-light text-gray-400 tracking-wider">
              <motion.span className="inline-block">
                <motion.span>{greetingDisplay}</motion.span>
                {!isGreetingComplete && (
                  <motion.span
                    className="inline-block w-1 h-12 ml-1 bg-gray-400 align-middle"
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                  />
                )}
              </motion.span>
            </h1>

            <div className="text-2xl xs:text-2xl md:text-6xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              <motion.span className="flex items-center justify-center lg:justify-start">
                <motion.span>{wordDisplay}</motion.span>
                <motion.span
                  className="inline-block w-1 h-12 ml-2 bg-white"
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                />
              </motion.span>
            </div>

            <p className="mt-12 text-xl text-gray-500">
              Full-Stack Developer | Creative Coder
            </p>
          </div>

          {/* Logo Part */}
          <motion.div
            className="relative w-80 h-80"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
          >
            <motion.img
              src="/images/profile.jpg"
              alt="Profile"
              className="w-full h-full object-cover rounded-2xl border-blue-400/10"
              animate={{
                rotate: [0, 2, -2, 0],
                opacity: [0.35, 0.45, 0.35],
                filter: ["blur(0.6px)", "blur(0.8px)", "blur(1.6px)"],
                boxShadow: [
                  "0 0 10px rgba(59,130,246,0.08)",
                  "0 0 18px rgba(59,130,246,0.15)",
                  "0 0 10px rgba(59,130,246,0.08)",
                ],
              }}
              transition={{
                repeat: Infinity,
                duration: 10,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      </section>
      {/* ===== STACKED CARDS SECTION (ด้านล่าง) ===== */}
      <section className=" py-10 px-6 pb-32">
        <div className="text-center mb-2">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My Skills & Passion
          </h2>
          <p className="text-gray-400 text-lg">สิ่งที่ฉันรักและเชี่ยวชาญ</p>
        </div>

        <div style={containerStyle} className="relative">
          {food.map(([emoji, skillName, description, hueA, hueB], i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center justify-center"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: false, amount: 0.5, margin: "1px" }}
              transition={{
                delay: i * 0.3,
                type: "spring",
                stiffness: 80,
                damping: 20,
              }} // sequential ชัดขึ้น
            >
              <Grid
                container
                spacing={4}
                alignItems="center"
                justifyContent="center"
              >
                {/* ===== CARD ===== */}
                <Grid size={{ xs: 12, md: 6 }} className="flex justify-center">
                  <div style={cardContainerStyle}>
                    <div style={splashStyle(hueA, hueB)} />
                    <motion.div
                      variants={cardVariants}
                      style={cardStyle}
                      whileHover={{
                        rotate: -5,
                        y: -10,
                        scale: 1.03,
                        transition: {
                          type: "spring",
                          stiffness: 150,
                          damping: 18,
                        },
                      }}
                    >
                      <span className="text-8xl md:text-9xl select-none">
                        <Image
                          src={emoji}
                          alt="Next.js"
                          width={200}
                          height={200}
                        />
                      </span>
                    </motion.div>
                  </div>
                </Grid>

                {/* ===== TEXT Desktop ===== */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <motion.div
                    initial={{ opacity: 0, x: 80 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }} // same as card
                    transition={{
                      delay: i * 0.3 + 0.2, // เลื่อน text หลัง card เล็กน้อย
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                    className="hidden md:block md:ml-12 max-w-lg"
                  >
                    <h3 className="text-4xl font-bold text-white mb-4 tracking-tight italic">
                      {skillName}
                    </h3>
                    <p className="text-lg text-gray-300 leading-relaxed antialiased">
                      {description}
                    </p>
                  </motion.div>
                </Grid>
              </Grid>

              {/* ===== TEXT Mobile (ใต้ Card) ===== */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }} // เล่นครั้งเดียว
                transition={{
                  delay: i * 0.3 + 0.25, // เลื่อนหลัง card เล็กน้อย
                  duration: 0.6,
                }}
                className="mt-6 text-center md:hidden px-6 py-10"
              >
                <h3 className="text-2xl xs:text-3xl md:text-2xl xl:text-5xl font-bold text-white mb-4 tracking-tight italic">
                  {skillName}
                </h3>
                <p className="text-gray-300 text-base leading-relaxed max-w-md mx-auto antialiased">
                  {description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>
      <motion.button
        onClick={() => {
          window.scrollBy({
            top: window.innerHeight,
            behavior: "smooth",
          });
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white opacity-70 hover:opacity-100"
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
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
    </>
  );
}
