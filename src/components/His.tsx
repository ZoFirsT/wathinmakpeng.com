"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const theme = {
  styles: {
    bg: "bg-gradient-to-br from-amber-50 to-orange-100",
    text: "text-amber-800", 
    highlight: "text-amber-600",
    glow: "drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]",
    gradientText: "bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-500"
  }
};

export default function His() {
  return (
    <div className={`min-h-screen pt-24 ${theme.styles.bg} relative overflow-hidden`}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h1 
            className={`text-4xl md:text-6xl font-sukhumvitBold ${theme.styles.gradientText} mb-6`}
            whileHover={{ scale: 1.05 }}
          >
            ประวัติการก่อตั้ง
          </motion.h1>
          <motion.p 
            className={`text-xl ${theme.styles.text} font-sukhumvit`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            จุดเริ่มต้นแห่งศรัทธาและความศักดิ์สิทธิ์
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl"
          >
            <h2 className={`text-2xl font-sukhumvitBold ${theme.styles.highlight} mb-4`}>
              การก่อตั้งวัด
            </h2>
            <p className={`${theme.styles.text} font-sukhumvit leading-relaxed`}>
              วัดหินหมากเป้งก่อตั้งขึ้นในปี พ.ศ. 2502 โดยหลวงปู่เทสก์ เทสรังสี พระเกจิอาจารย์ผู้เป็นที่เคารพนับถือ 
              ท่านได้เลือกสถานที่แห่งนี้เพราะเป็นป่าเขาริมฝั่งแม่น้ำโขง เหมาะแก่การวิเวกและปฏิบัติธรรม
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl"
          >
            <h2 className={`text-2xl font-sukhumvitBold ${theme.styles.highlight} mb-4`}>
              ที่มาของชื่อวัด
            </h2>
            <p className={`${theme.styles.text} font-sukhumvit leading-relaxed`}>
              ชื่อ "หินหมากเป้ง" มีที่มาจากหินก้อนใหญ่ที่มีรูปทรงคล้ายผลหมากเป้ง 
              ซึ่งเป็นผลไม้พื้นถิ่นในภาษาอีสาน ตั้งตระหง่านอยู่ในบริเวณวัด จนกลายเป็นที่มาของชื่อวัดอันเป็นเอกลักษณ์
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-64 mx-auto mb-8"
          >
            <Image
              src="https://cdn.wathinmakpeng.stratusone.cloud/images/Wathinmakpenglogo.png"
              alt="วัดหินหมากเป้ง"
              width={250}
              height={250}
              className={`mx-auto ${theme.styles.glow} rounded-full`}
            />
          </motion.div>
          <p className={`${theme.styles.text} font-sukhumvit text-lg max-w-4xl mx-auto leading-relaxed`}>
            วัดหินหมากเป้งยังคงสืบสานปณิธานของหลวงปู่เทสก์ในการเผยแผ่พระพุทธศาสนา 
            เป็นสถานที่ปฏิบัติธรรมที่เปี่ยมด้วยพลังศรัทธาและความศักดิ์สิทธิ์ 
            พร้อมต้อนรับผู้แสวงหาสัจธรรมจากทั่วสารทิศ
          </p>
        </motion.div>
      </div>
    </div>
  );
}
