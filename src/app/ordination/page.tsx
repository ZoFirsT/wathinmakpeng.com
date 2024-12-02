"use client";

import { motion } from "framer-motion";
import { FaInfoCircle, FaClipboardList, FaFileAlt, FaUserCheck } from "react-icons/fa";

const theme = {
  styles: {
    bg: "bg-gradient-to-br from-amber-50 to-orange-100",
    text: "text-amber-800", 
    highlight: "text-amber-600",
    glow: "drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]",
    gradientText: "bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-500",
  },
};

export default function Ordination() {
  return (
    <div className={`min-h-screen ${theme.styles.bg} py-16`}>
      {/* Background Effects */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[100px]"
      />

      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Header Section */}
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
            อุปสมบทวิธี แบบคณะธรรมยุต
          </motion.h1>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8">
          {/* Requirements Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-100/50"
          >
            <div className="flex items-center mb-6">
              <FaUserCheck className="text-3xl text-amber-600" />
              <h2 className={`text-2xl font-sukhumvitBold ${theme.styles.highlight} ml-4`}>
                คุณสมบัติของผู้อุปสมบท
              </h2>
            </div>
            <div className={`${theme.styles.text} font-sukhumvit space-y-4`}>
              <p>1. เป็นผู้ชาย คือมีเพศชายเป็นปกติ ไม่ใช่คนถูกตอน</p>
              <p>2. มีอายุครบ 20 ปี บริบูรณ์</p>
              <p>3. มิใช่อภัพบุคคล (บุคคลผู้ไม่สมควร) ผู้ถูกห้ามเด็ดขาด</p>
            </div>
          </motion.div>

          {/* Documents Required */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-100/50"
          >
            <div className="flex items-center mb-6">
              <FaClipboardList className="text-3xl text-amber-600" />
              <h2 className={`text-2xl font-sukhumvitBold ${theme.styles.highlight} ml-4`}>
                เอกสารที่ต้องเตรียม
              </h2>
            </div>
            <div className={`${theme.styles.text} font-sukhumvit space-y-4`}>
              <p>1. สำเนาบัตรประชาชน</p>
              <p>2. สำเนาทะเบียนบ้าน</p>
              <p>3. ใบรับรองแพทย์ (ตรวจเลือดและโรคติดต่อ)</p>
              <p>4. ใบสมัครขอบรรพชาอุปสมบท</p>
              <p>5. ใบรายการคุณสมบัติ</p>
              <p>6. ใบรับรองผู้สมัครขอบรรพชาอุปสมบท</p>
              <p>7. ผลการตรวจสอบประวัติ</p>
            </div>
          </motion.div>

          {/* Preparation Guidelines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-100/50"
          >
            <div className="flex items-center mb-6">
              <FaInfoCircle className="text-3xl text-amber-600" />
              <h2 className={`text-2xl font-sukhumvitBold ${theme.styles.highlight} ml-4`}>
                การเตรียมตัวและการเตรียมใจ
              </h2>
            </div>
            <div className={`${theme.styles.text} font-sukhumvit space-y-4`}>
              <p className="font-sukhumvitBold">การเตรียมตัว:</p>
              <p>- จัดการเรื่องส่วนตัวและภารกิจทุกอย่างให้เรียบร้อย</p>
              <p>- เตรียมเครื่องอัฏฐบริขารตามที่วัดกำหนด</p>
              <p>- เตรียมชุดขาว 2 ชุด สำหรับการฝึกปฏิบัติ</p>
              
              <p className="font-sukhumvitBold mt-6">การเตรียมใจ:</p>
              <p>- มีศรัทธาในพระพุทธ พระธรรม พระสงฆ์</p>
              <p>- ตั้งใจศึกษาพระธรรมวินัยและปฏิบัติขัดเกลากิเลส</p>
              <p>- ยินดีปฏิบัติตามคำสอนของครูบาอาจารย์</p>
            </div>
          </motion.div>

          {/* Download Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-100/50"
          >
            <div className="flex items-center mb-6">
              <FaFileAlt className="text-3xl text-amber-600" />
              <h2 className={`text-2xl font-sukhumvitBold ${theme.styles.highlight} ml-4`}>
                เอกสารดาวน์โหลด
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <motion.a
                href="https://cdn.wathinmakpeng.stratusone.cloud/documents/คู่มืออุปสมบท.pdf"
                whileHover={{ scale: 1.02 }}
                className="block p-4 bg-amber-50 rounded-xl text-center font-sukhumvit text-amber-800"
              >
                คู่มืออุปสมบทวิธี (PDF)
              </motion.a>
              <motion.a
                href="https://cdn.wathinmakpeng.stratusone.cloud/media/อุปสมบทวิธี.mp3"
                whileHover={{ scale: 1.02 }}
                className="block p-4 bg-amber-50 rounded-xl text-center font-sukhumvit text-amber-800"
              >
                ไฟล์เสียงบทสวดอุปสมบท (MP3)
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
