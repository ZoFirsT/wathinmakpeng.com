"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { BiTime, BiPhone, BiSticker, BiGlobe, BiMap } from "react-icons/bi";
import { FaDharmachakra } from "react-icons/fa6"; 
import { GiLotusFlower } from "react-icons/gi"; // Use GiLotusFlower instead of FaLotus

const theme = {
  styles: {
    bg: "bg-gradient-to-br from-amber-50 to-orange-100",
    text: "text-amber-800",
    highlight: "text-amber-600",
    glow: "drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]", 
    gradientText: "bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-500",
    lotus: "text-pink-600/40"
  }
};

const contactInfo = [
  {
    icon: <BiTime />,
    label: "เวลาทำการ",
    value: "เปิดทุกวัน 08:30 - 16:30 น.",
    desc: "เหมาะสำหรับการเยี่ยมชมและทำบุญในช่วงเช้าถึงบ่าย",
    animation: "clock"
  },
  {
    icon: <BiPhone />,
    label: "ติดต่อสอบถาม",
    value: "081-7625055",
    desc: "สามารถติดต่อสอบถามข้อมูลเพิ่มเติมได้ในเวลาทำการ",
    animation: "phone"
  },
  {
    icon: <BiSticker />,
    label: "ค่าเข้าชม",
    value: "ไม่มีค่าใช้จ่าย",
    desc: "ทางวัดไม่เก็บค่าเข้าชม ท่านสามารถทำบุญตามกำลังศรัทธา",
    animation: "ticket"
  },
  {
    icon: <BiGlobe />,
    label: "เว็บไซต์",
    value: "wathinmakpeng.com",
    desc: "ติดตามข่าวสารและกิจกรรมของทางวัดได้ที่เว็บไซต์หลัก",
    animation: "globe"
  },
  {
    icon: <BiMap />,
    label: "สถานที่ตั้ง",
    value: "ทางหลวงแผ่นดินหมายเลข 211 ตำบลพระพุทธบาท อำเภอศรีเชียงใหม่ หนองคาย 43130",
    desc: "ตั้งอยู่ริมฝั่งแม่น้ำโขง บรรยากาศร่มรื่น เหมาะแก่การปฏิบัติธรรม",
    animation: "pin"
  }
];

export default function Contact() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Initial size
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getAnimation = (type: string) => {
    switch(type) {
      case "clock":
        return { rotate: [0, 360] };
      case "phone":
        return { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] };
      case "ticket":
        return { y: [0, -5, 0] };
      case "globe":
        return { rotate: [0, 360] };
      case "pin":
        return { scale: [1, 1.3, 1], y: [0, -5, 0] };
      default:
        return {};
    }
  };

  return (
    <div className={`min-h-screen pt-24 ${theme.styles.bg} relative overflow-hidden`}>
      {/* Enhanced Background Elements */}
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
        <motion.div 
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[100px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Decorative Lotus & Dharmachakra */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute ${i % 2 === 0 ? theme.styles.lotus : 'text-amber-600/30'}`}
          initial={{ 
            x: Math.random() * (windowSize.width || 500), 
            y: -50,
            rotate: Math.random() * 360
          }}
          animate={{
            y: (windowSize.height || 800) + 100,
            rotate: 360,
            x: Math.random() * 200 - 100
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {i % 2 === 0 ? (
            <GiLotusFlower size={30} />
          ) : (
            <FaDharmachakra size={25} />
          )}
        </motion.div>
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src="https://cdn.wathinmakpeng.stratusone.cloud/images/Wathinmakpenglogo.png"
              alt="วัดหินหมากเป้ง"
              width={120}
              height={120}
              className={`${theme.styles.glow}`}
              priority
            />
          </motion.div>
          
          <motion.h1 
            className={`text-5xl font-sukhumvitBold ${theme.styles.gradientText} mb-4`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            ติดต่อวัดหินหมากเป้ง
          </motion.h1>
          <motion.p 
            className={`text-xl ${theme.styles.text} font-sukhumvit max-w-2xl mx-auto`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            ยินดีต้อนรับทุกท่านสู่วัดหินหมากเป้ง
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <h2 className={`text-2xl font-sukhumvitBold ${theme.styles.highlight} mb-6`}>
              ข้อมูลการติดต่อ
            </h2>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex items-start space-x-4 p-4 rounded-lg hover:bg-amber-50/50 transition-colors duration-300"
                  onHoverStart={() => setHoveredItem(index)}
                  onHoverEnd={() => setHoveredItem(null)}
                >
                  <motion.span 
                    className="text-2xl"
                    animate={hoveredItem === index ? getAnimation(info.animation) : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {info.icon}
                  </motion.span>
                  <div>
                    <motion.p 
                      className={`font-sukhumvitMedium ${theme.styles.text}`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {info.label}
                    </motion.p>
                    <motion.p 
                      className={`font-sukhumvit ${theme.styles.highlight}`}
                      whileHover={{ x: 5 }}
                    >
                      {info.value}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-[400px] rounded-2xl overflow-hidden group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 group-hover:transition-opacity duration-300"></div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3794.8997136400776!2d102.4285311!3d17.9834022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x312415280ea7e6eb%3A0xa2191600bcb093e5!2z4Lin4Lix4LiU4Lir4Li04LiZ4Lir4Lih4Liy4LiB4LmA4Lib4LmJ4LiHICjguKvguKXguKfguIfguJvguLnguYjguYDguJfguKrguIHguYwg4LmA4LiX4Liq4Lij4Lix4LiH4Liq4Li1KQ!5e0!3m2!1sth!2sth!4v1732993050509!5m2!1sth!2sth"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl"
              title="วัดหินหมากเป้ง Google Maps"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
