"use client";

import { motion } from "framer-motion";
import { FaHandHoldingHeart, FaQrcode, FaUniversity, FaBox, FaMoneyBill, FaPlaceOfWorship } from "react-icons/fa";

const theme = {
  styles: {
    bg: "bg-gradient-to-br from-amber-50 to-orange-100",
    text: "text-amber-800", 
    highlight: "text-amber-600",
    glow: "drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]",
    gradientText: "bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-500"
  }
};

export default function Donation() {
  return (
    <div className={`min-h-screen ${theme.styles.bg} py-16`}>
      {/* Background Effects */}
      <motion.div></motion.div>


      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="flex justify-center items-center gap-4 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <FaPlaceOfWorship className="text-5xl md:text-6xl text-amber-600" />
            <motion.h1
              className={`text-4xl md:text-6xl font-sukhumvitBold ${theme.styles.gradientText}`}
            >
              ร่วมทำบุญ
            </motion.h1>
          </motion.div>
          <p className={`text-xl ${theme.styles.text} font-sukhumvit`}>
            ร่วมทำนุบำรุงพระพุทธศาสนาและสืบทอดพระธรรมคำสอน
          </p>
        </motion.div>

        {/* Donation Methods */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* QR Code */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(245,158,11,0.2)" }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-100/50 transition-all duration-300"
          >
            <div className="flex items-center mb-6">
              <FaQrcode className="text-3xl text-amber-600" />
              <h2 className={`text-2xl font-sukhumvitBold ${theme.styles.highlight} ml-4`}>
                สแกน QR Code
              </h2>
            </div>
            <motion.div 
              className="flex justify-center mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src="https://cdn.wathinmakpeng.stratusone.cloud/images/qr-code.png" 
                alt="QR Code" 
                className="w-48 h-48 object-contain hover:drop-shadow-2xl transition-all duration-300"
              />
            </motion.div>
            <p className={`${theme.styles.text} font-sukhumvit text-center`}>
              สแกนเพื่อโอนเงินผ่าน Mobile Banking
            </p>
          </motion.div>

          {/* Bank Transfer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(245,158,11,0.2)" }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-100/50 transition-all duration-300"
          >
            <div className="flex items-center mb-6">
              <FaUniversity className="text-3xl text-amber-600" />
              <h2 className={`text-2xl font-sukhumvitBold ${theme.styles.highlight} ml-4`}>
                โอนผ่านธนาคาร
              </h2>
            </div>
            <motion.div 
              className={`${theme.styles.text} font-sukhumvit space-y-4`}
              whileHover={{ y: -5 }}
            >
              <p className="flex items-center gap-2">
                <FaMoneyBill className="text-amber-500" />
                ธนาคารกสิกรไทย สาขาหนองคาย
              </p>
              <p>ชื่อบัญชี: วัดหินหมากเป้ง</p>
              <p>เลขที่บัญชี: 123-4-56789-0</p>
            </motion.div>
          </motion.div>

          {/* Direct Donation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(245,158,11,0.2)" }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-100/50 transition-all duration-300"
          >
            <div className="flex items-center mb-6">
              <FaHandHoldingHeart className="text-3xl text-amber-600" />
              <h2 className={`text-2xl font-sukhumvitBold ${theme.styles.highlight} ml-4`}>
                ทำบุญด้วยตนเอง
              </h2>
            </div>
            <motion.div 
              className={`${theme.styles.text} font-sukhumvit space-y-4`}
              whileHover={{ y: -5 }}
            >
              <p>สามารถเดินทางมาทำบุญด้วยตนเองได้ที่วัด</p>
              <p>เวลาทำการ: 08:30 - 16:30 น.</p>
              <p>ติดต่อสอบถาม: 081-7625055</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center bg-white/60 p-6 rounded-xl shadow-lg"
        >
          <motion.p 
            className={`${theme.styles.text} font-sukhumvit`}
            whileHover={{ scale: 1.02 }}
          >
            หากท่านมีข้อสงสัยเพิ่มเติมเกี่ยวกับการทำบุญ สามารถติดต่อสอบถามได้ที่สำนักงานวัด
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
