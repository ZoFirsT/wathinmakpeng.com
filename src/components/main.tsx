"use client";
import React, { useState } from "react";
import Image from "next/legacy/image";
import { motion } from "framer-motion";
import Link from "next/link";

const theme = {
  styles: {
    bg: "bg-gradient-to-br from-amber-50 to-orange-100",
    bg_image: "https://cdn.wathinmakpeng.stratusone.cloud/images/YiPygyPSzil7uurfjwNA%20800x500.png",
    glowBg: "bg-amber-500", 
    particle: "bg-amber-600",
    heading: "text-amber-600",
    text: "text-amber-800",
    highlight: "text-amber-600",
    button: "bg-amber-600 text-white hover:bg-amber-700",
    gradientBg: "from-amber-500 to-amber-600",
    glow: "drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]",
    lotus: "text-pink-600"
  }
};

function Main() {
  return (
    <div className={`relative min-h-screen w-screen ${theme.styles.bg} overflow-hidden`}>
      {/* Background image with blur effect */}
      <div className="absolute inset-0">
        <Image
          src={theme.styles.bg_image}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-30 blur-[3px]"
          priority
        />
      </div>

      {/* Enhanced animated background with lotus patterns */}
      <div className="absolute inset-0">
        <div className={`absolute top-0 left-1/4 w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[700px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] ${theme.styles.glowBg} opacity-15 blur-[150px] animate-[pulse_6s_ease-in-out_infinite]`}></div>
        <div className={`absolute bottom-0 right-1/4 w-[250px] sm:w-[350px] md:w-[450px] lg:w-[550px] xl:w-[650px] h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] xl:h-[650px] ${theme.styles.glowBg} opacity-20 blur-[160px] animate-[pulse_7s_ease-in-out_infinite]`}></div>
        <div className={`absolute top-1/3 right-1/3 w-[200px] sm:w-[300px] md:w-[400px] lg:w-[500px] xl:w-[600px] h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] ${theme.styles.glowBg} opacity-15 blur-[140px] animate-[pulse_8s_ease-in-out_infinite]`}></div>
      </div>

      {/* Decorative lotus flowers */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-600 drop-shadow-[0_0_3px_rgba(244,114,182,0.6)]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg width="40" height="40" viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 0 C60 40 90 50 50 100 C10 50 40 40 50 0"/>
              <path d="M0 50 C40 60 50 90 100 50 C50 10 40 40 0 50"/>
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Main content with enhanced spiritual aesthetics */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-7 px-4 sm:px-6 md:px-8 lg:px-10 py-12 sm:py-14 md:py-16 lg:py-18">
        <motion.div 
          className="relative group"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
        >
          <Image 
            src="https://cdn.wathinmakpeng.stratusone.cloud/images/Wathinmakpenglogo.png"
            alt="วัดหินหมากเป้ง" 
            width={120} 
            height={120} 
            priority={true}
            className={`w-32 sm:w-36 md:w-40 lg:w-44 xl:w-48 2xl:w-52 mb-3 sm:mb-4 md:mb-5 lg:mb-6 transition-all duration-700 animate-[float_8s_ease-in-out_infinite] ${theme.styles.glow}`}
          />
          <div className={`absolute inset-0 ${theme.styles.glowBg}/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`${theme.styles.heading} text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-6xl font-sukhumvitBold tracking-tight drop-shadow-xl text-center`}
        >
          วัดหินหมากเป้ง
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`${theme.styles.text} text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-2xl font-sukhumvit tracking-wide text-center max-w-[95%] sm:max-w-[85%] md:max-w-[75%] lg:max-w-[65%] leading-relaxed`}
        >
          สถานที่ศักดิ์สิทธิ์แห่งการปฏิบัติธรรม
          <span className={`block mt-2 sm:mt-3 text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-xl ${theme.styles.highlight} font-sukhumvitBold`}>
            "ดินแดนแห่งความสงบ ริมฝั่งโขง ที่ซึ่งธรรมะและธรรมชาติหลอมรวมเป็นหนึ่ง"
          </span>
        </motion.p>
        
        <motion.button
          className={`group mt-4 sm:mt-5 md:mt-6 lg:mt-7 xl:mt-8 px-6 sm:px-7 md:px-8 lg:px-9 py-3 sm:py-3.5 md:py-4 lg:py-4 ${theme.styles.button} rounded-full backdrop-blur-sm text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl font-sukhumvitMedium relative overflow-hidden`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link href="#Section1" className="relative z-10 flex items-center justify-center gap-3 sm:gap-4">
            <span className="relative">
              เริ่มต้นการเดินทางแห่งธรรม
              <span className={`absolute bottom-0 left-0 w-full h-0.5 ${theme.styles.highlight} transform scale-x-0 transition-transform duration-500 origin-left group-hover:scale-x-100`}></span>
            </span>
            <motion.svg
              className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              animate={{ 
                x: [0, 5, 0],
                rotate: [0, 15, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut"
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </motion.svg>
          </Link>
          <motion.div
            className={`absolute inset-0 bg-gradient-to-r ${theme.styles.gradientBg}`}
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          <motion.div
            className={`absolute -inset-1 ${theme.styles.glowBg} blur-xl opacity-40`}
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1.2, opacity: 0.6 }}
            transition={{ duration: 0.5 }}
          />
        </motion.button>
      </div>
    </div>
  );
}

export default Main;