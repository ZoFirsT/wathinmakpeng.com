"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const theme = {
  styles: {
    bg: "bg-gradient-to-br from-amber-50 to-orange-100",
    text: "text-amber-800",
    highlight: "text-amber-600",
    glow: "drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]",
    gradientText: "bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-500"
  }
};

export default function Footer() {
  return (
    <footer className="bg-white/90 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Logo & Description */}
          <div className="flex flex-col items-center md:items-start">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image 
                src="https://cdn.wathinmakpeng.stratusone.cloud/images/Wathinmakpenglogo.png"
                alt="วัดหินหมากเป้ง"
                width={80}
                height={80}
                className={theme.styles.glow}
              />
            </motion.div>
            <h3 className={`text-xl font-sukhumvitBold ${theme.styles.gradientText} mt-4`}>
              วัดหินหมากเป้ง
            </h3>
            <p className={`${theme.styles.text} text-sm mt-2 text-center md:text-left font-sukhumvit`}>
              แหล่งปฏิบัติธรรมจังหวัดหนองคาย ริมฝั่งแม่น้ำโขง
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className={`text-lg font-sukhumvitBold ${theme.styles.highlight} mb-4`}>
              เมนูลัด
            </h4>
            <ul className="space-y-2 font-sukhumvit">
              <motion.li whileHover={{ x: 5 }}>
                <Link href="/" className={`${theme.styles.text} hover:${theme.styles.highlight}`}>
                  หน้าแรก
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link href="/history" className={`${theme.styles.text} hover:${theme.styles.highlight}`}>
                  ประวัติวัด
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link href="/activities" className={`${theme.styles.text} hover:${theme.styles.highlight}`}>
                  กิจกรรม
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link href="/contact" className={`${theme.styles.text} hover:${theme.styles.highlight}`}>
                  ติดต่อ
                </Link>
              </motion.li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h4 className={`text-lg font-sukhumvitBold ${theme.styles.highlight} mb-4`}>
              ติดต่อเรา
            </h4>
            <div className="space-y-2 font-sukhumvit">
              <p className={theme.styles.text}>
                <span className="font-sukhumvitBold">ที่อยู่:</span> ตำบลพระพุทธบาท อำเภอศรีเชียงใหม่ หนองคาย 43130
              </p>
              <p className={theme.styles.text}>
                <span className="font-sukhumvitBold">โทร:</span> 081-7625055
              </p>
              <p className={theme.styles.text}>
                <span className="font-sukhumvitBold">เวลาทำการ:</span> 08:30 - 16:30 น.
              </p>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-amber-200">
          <p className={`${theme.styles.text} text-sm text-center font-sukhumvit`}>
            © 2024 วัดหินหมากเป้ง. สงวนลิขสิทธิ์. | Powered by{" "}
            <Link href="https://stratusone.cloud" className={`${theme.styles.highlight} hover:underline`} target="_blank">
              Stratusone.cloud
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
