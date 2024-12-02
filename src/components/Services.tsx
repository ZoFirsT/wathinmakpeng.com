"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaMapMarkerAlt, FaPray, FaMapMarked, FaCalendarAlt } from "react-icons/fa";
import { GiMeditation } from "react-icons/gi";

const theme = {
  styles: {
    bg: "bg-gradient-to-br from-amber-50 to-orange-100",
    text: "text-amber-800",
    highlight: "text-amber-600", 
    button: "bg-amber-600 text-white hover:bg-amber-700",
    glow: "drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]",
    gradientText: "bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-500"
  }
};

export default function Services() {
  const services = [
    {
      title: "การเดินทางมาวัด",
      description: "วัดหินหมากเป้ง ตั้งอยู่ห่างจากตัวเมืองหนองคาย ประมาณ 25 กิโลเมตร",
      link: "/travel",
      icon: <FaMapMarkerAlt className="text-4xl text-amber-600" />
    },
    {
      title: "การบวช",
      description: "ผู้มีความประสงค์จะเข้าบรรพชาอุปสมบท สามารถติดต่อสอบถามรายละเอียดได้",
      link: "/ordination",
      icon: <FaPray className="text-4xl text-amber-600" />
    },
    {
      title: "จองการปฏิบัติธรรม",
      description: "กรุณากรอกข้อมูลเพื่อจองการปฏิบัติธรรม",
      link: "/booking",
      icon: <FaCalendarAlt className="text-4xl text-amber-600" />
    },
    {
      title: "แผนที่มาวัด",
      description: "GPS ตำแหน่งพื้นที่ตั้งของวัดหินหมากเป้ง",
      link: "https://maps.app.goo.gl/Yz144MfyxJ6TknqN9",
      icon: <FaMapMarked className="text-4xl text-amber-600" />
    }
  ];

  return (
    <div id="Section1" className={`h-auto py-20 ${theme.styles.bg} relative overflow-hidden`}>
      {/* Animated background elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 0],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[80px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [180, 0, 180],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[100px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            className={`text-4xl font-sukhumvitBold ${theme.styles.gradientText} mb-4`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            บริการของทางวัด
          </motion.h2>
          <motion.p 
            className={`text-xl ${theme.styles.text} font-sukhumvit`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            ข้อมูลและรายละเอียดการให้บริการต่างๆ
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Link href={service.link}>
                <motion.div 
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 h-full border border-amber-100"
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: "0 0 30px rgba(245,158,11,0.2)",
                  }}
                >
                  <motion.div 
                    className="mb-4"
                    transition={{ duration: 0.7 }}
                  >
                    {service.icon}
                  </motion.div>
                  <motion.h3 
                    className={`text-xl font-sukhumvitBold ${theme.styles.highlight} mb-3`}
                    whileHover={{ x: 5 }}
                  >
                    {service.title}
                  </motion.h3>
                  <p className={`${theme.styles.text} font-sukhumvit text-sm mb-4`}>
                    {service.description}
                  </p>
                  <motion.button
                    className={`mt-2 px-6 py-2 rounded-full ${theme.styles.button} font-sukhumvit text-sm transition-all duration-300 ${theme.styles.glow}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    เพิ่มเติม
                  </motion.button>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
