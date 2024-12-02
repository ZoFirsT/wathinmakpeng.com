"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const theme = {
  styles: {
    bg: "bg-gradient-to-br from-amber-50 to-orange-100",
    text: "text-amber-800",
    highlight: "text-amber-600", 
    glow: "drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]",
    gradientText: "bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-500",
    glowHover: "hover:drop-shadow-[0_0_25px_rgba(245,158,11,0.7)]"
  }
};

export default function Teachings() {
  return (
    <div className={`min-h-screen py-12 sm:py-16 md:py-20 lg:py-24 ${theme.styles.bg} relative overflow-hidden`}>
      {/* Enhanced Decorative Background Elements */}
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          rotate: [0, 180, 360],
          opacity: [0.1, 0.25, 0.1]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-10 sm:top-20 right-5 sm:right-20 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-gradient-to-r from-amber-500/20 to-orange-400/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          rotate: [360, 180, 0],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-10 sm:bottom-20 left-5 sm:left-20 w-[350px] sm:w-[450px] md:w-[600px] h-[350px] sm:h-[450px] md:h-[600px] bg-gradient-to-l from-orange-500/20 to-amber-400/20 rounded-full blur-3xl"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring" }}
          className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16"
        >
          {/* Enhanced Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            className="w-full lg:w-1/2"
          >
            <motion.div 
              className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
              whileHover={{ 
                scale: 1.03,
                rotateY: 5,
                boxShadow: "0 30px 60px -12px rgba(251, 146, 60, 0.4)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Image
                src="https://cdn.wathinmakpeng.stratusone.cloud/images/ปู่หลังฉัน-1460x2048.jpg"
                alt="หลวงปู่เทสก์ เทสรังสี"
                fill
                className="object-cover transition-all duration-1000 hover:scale-110"
                quality={100}
                priority
              />
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 to-transparent"
              >
                <p className="text-white/90 text-base sm:text-lg font-sukhumvit">หลวงปู่เทสก์ เทสรังสี</p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Enhanced Quote Section */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            className="w-full lg:w-1/2 mt-8 lg:mt-0"
          >
            <motion.div 
              className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border border-amber-100/50"
              whileHover={{ 
                boxShadow: "0 35px 60px -15px rgba(251, 146, 60, 0.3)",
                y: -8,
                scale: 1.02
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  className="w-12 sm:w-16 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full mb-6 sm:mb-8"
                  whileHover={{ width: "100%", transition: { duration: 0.8 } }}
                />
                <motion.blockquote 
                  className="text-2xl sm:text-3xl lg:text-4xl font-sukhumvitBold leading-relaxed mb-6 sm:mb-8"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <span className={`${theme.styles.gradientText} ${theme.styles.glow} ${theme.styles.glowHover}`}>
                    "เพราะศาสนาทุกศาสนามิได้มีไว้ให้ถือ หากแต่มีไว้ให้ปฏิบัติ"
                  </span>
                </motion.blockquote>
                <motion.div className="flex justify-end items-center gap-3 sm:gap-4">
                  <motion.div
                    className="w-8 sm:w-12 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"
                    whileHover={{ width: "100px", transition: { duration: 0.5 } }}
                  />
                  <motion.p 
                    className={`text-lg sm:text-xl ${theme.styles.text} font-sukhumvitBold`}
                    whileHover={{ x: 8, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    - หลวงปู่เทสก์ เทสรังสี
                  </motion.p>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
