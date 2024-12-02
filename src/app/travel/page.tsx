"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaCar, FaBus, FaMapMarkerAlt, FaPhoneAlt, FaMotorcycle, FaTaxi, FaPlane, FaInfoCircle, FaClock } from "react-icons/fa";

const theme = {
  styles: {
    bg: "bg-gradient-to-br from-amber-50 to-orange-100",
    text: "text-amber-800",
    highlight: "text-amber-600",
    glow: "drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]",
    gradientText: "bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-500",
  },
};

export default function Travel() {
  const transportMethods = [
    {
      title: "การเดินทางโดยรถยนต์ส่วนตัว",
      icon: <FaCar className="text-4xl text-amber-600" />,
      details: [
        "จากตัวเมืองหนองคาย ใช้ทางหลวงหมายเลข 212 (เส้นริมโขง) มุ่งหน้าไปทางอำเภอศรีเชียงใหม่",
        "เดินทางประมาณ 25 กิโลเมตร จะเห็นป้ายบอกทางเข้าวัดหินหมากเป้งด้านซ้ายมือ",
        "เลี้ยวซ้ายเข้าซอยตามป้าย เดินทางต่อไปอีกประมาณ 2 กิโลเมตรจะถึงวัด",
        "มีที่จอดรถกว้างขวาง สามารถจอดรถได้สะดวกสบาย",
        "ใช้เวลาเดินทางประมาณ 30-40 นาทีจากตัวเมืองหนองคาย",
      ],
    },
    {
      title: "การเดินทางโดยรถโดยสารประจำทาง",
      icon: <FaBus className="text-4xl text-amber-600" />,
      details: [
        "จากสถานีขนส่งหนองคาย สามารถขึ้นรถสองแถวสาย หนองคาย-ศรีเชียงใหม่",
        "รถออกทุก 30 นาที ตั้งแต่เวลา 06.00 - 17.00 น.",
        "ค่าโดยสารประมาณ 40 บาท ใช้เวลาเดินทาง 45 นาที",
        "แจ้งคนขับรถให้จอดที่ทางเข้าวัดหินหมากเป้ง",
        "จากนั้นต่อรถมอเตอร์ไซค์รับจ้างเข้าวัดอีกประมาณ 2 กิโลเมตร ค่าโดยสาร 30 บาท",
      ],
    },
    {
      title: "การเดินทางโดยเครื่องบิน",
      icon: <FaPlane className="text-4xl text-amber-600" />,
      details: [
        "บินมาลงที่สนามบินอุดรธานี",
        "จากสนามบินนั่งรถแท็กซี่หรือรถตู้มายังหนองคาย ใช้เวลาประมาณ 1 ชั่วโมง",
        "ค่าเดินทางประมาณ 800-1,000 บาท",
        "สามารถนั่งรถสองแถวหรือแท็กซี่ต่อมายังวัด",
      ],
    },
    {
      title: "บริการรถรับ-ส่ง",
      icon: <FaTaxi className="text-4xl text-amber-600" />,
      details: [
        "ทางวัดมีบริการรถรับ-ส่งสำหรับคณะที่ต้องการเดินทางมาทำบุญ",
        "กรุณาติดต่อล่วงหน้าอย่างน้อย 3 วัน",
        "รองรับคณะขนาด 10-40 ท่าน",
        "มีค่าบริการตามระยะทาง กรุณาสอบถามรายละเอียดเพิ่มเติม",
      ],
    },
  ];

  const additionalInfo = [
    {
      title: "ช่วงเวลาที่เหมาะแก่การเดินทาง",
      details: "ควรเดินทางในช่วงเช้า 8.00-11.00 น. หรือช่วงบ่าย 13.00-16.00 น. เนื่องจากอากาศไม่ร้อนเกินไป"
    },
    {
      title: "การแต่งกาย",
      details: "ควรแต่งกายสุภาพ เรียบร้อย เหมาะสมกับการเข้าวัด สวมรองเท้าที่สวมใส่สะดวก"
    },
    {
      title: "สิ่งที่ควรเตรียม",
      details: "ร่ม หมวก น้ำดื่ม และของใช้ส่วนตัวที่จำเป็น เนื่องจากเส้นทางเดินในวัดค่อนข้างกว้าง"
    }
  ];

  const contactInfo = {
    address: "วัดหินหมากเป้ง ตำบลผาตั้ง อำเภอสังคม จังหวัดหนองคาย 43160",
    phone: "042-441-888",
    emergency: "042-441-889",
    lineID: "@wathinmakpeng",
    email: "wathinmakpeng@gmail.com",
    coordinates: "17.9747° N, 102.2797° E",
    openingHours: "เปิดทุกวัน 06.00 - 18.00 น."
  };

  return (
    <div className={`min-h-screen pt-24 ${theme.styles.bg} relative overflow-hidden`}>
      {/* Animated Background */}
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
      
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-orange-500/10 rounded-full blur-[120px]"
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
            การเดินทางมาวัด
          </motion.h1>
          <motion.p
            className={`text-xl ${theme.styles.text} font-sukhumvit max-w-3xl mx-auto`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            วัดหินหมากเป้งตั้งอยู่ในพื้นที่ธรรมชาติที่สวยงาม ริมแม่น้ำโขง การเดินทางสะดวกสบาย 
            มีหลากหลายเส้นทางให้เลือกตามความเหมาะสม
          </motion.p>
        </motion.div>

        {/* Transport Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {transportMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-100/50"
            >
              <div className="flex items-center mb-6">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {method.icon}
                </motion.div>
                <h3 className={`text-2xl font-sukhumvitBold ${theme.styles.highlight} ml-4`}>
                  {method.title}
                </h3>
              </div>
              <ul className="space-y-4">
                {method.details.map((detail, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`${theme.styles.text} font-sukhumvit flex items-start`}
                  >
                    <span className="mr-2 text-amber-500">•</span>
                    {detail}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg mb-16 border border-amber-100/50"
        >
          <div className="flex items-center mb-6">
            <FaInfoCircle className="text-3xl text-amber-600" />
            <h3 className={`text-2xl font-sukhumvitBold ${theme.styles.highlight} ml-4`}>
              ข้อมูลที่ควรทราบ
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {additionalInfo.map((info, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="p-4 rounded-xl bg-amber-50/50"
              >
                <h4 className={`font-sukhumvitBold ${theme.styles.highlight} mb-2`}>
                  {info.title}
                </h4>
                <p className={`${theme.styles.text} font-sukhumvit text-sm`}>
                  {info.details}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg mb-16 border border-amber-100/50"
        >
          <h3 className={`text-2xl font-sukhumvitBold ${theme.styles.highlight} mb-6`}>
            ข้อมูลการติดต่อ
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <motion.div 
                className="flex items-start"
                whileHover={{ x: 5 }}
              >
                <FaMapMarkerAlt className="text-amber-600 mt-1 mr-3" />
                <div>
                  <p className={`${theme.styles.text} font-sukhumvitBold mb-1`}>ที่อยู่</p>
                  <p className={`${theme.styles.text} font-sukhumvit`}>{contactInfo.address}</p>
                </div>
              </motion.div>
              <motion.div 
                className="flex items-start"
                whileHover={{ x: 5 }}
              >
                <FaPhoneAlt className="text-amber-600 mt-1 mr-3" />
                <div>
                  <p className={`${theme.styles.text} font-sukhumvitBold mb-1`}>เบอร์ติดต่อ</p>
                  <p className={`${theme.styles.text} font-sukhumvit`}>
                    โทรศัพท์: {contactInfo.phone}<br/>
                    ฉุกเฉิน: {contactInfo.emergency}
                  </p>
                </div>
              </motion.div>
            </div>
            <div className="space-y-4">
              <motion.div 
                className="flex items-start"
                whileHover={{ x: 5 }}
              >
                <FaInfoCircle className="text-amber-600 mt-1 mr-3" />
                <div>
                  <p className={`${theme.styles.text} font-sukhumvitBold mb-1`}>ช่องทางติดต่ออื่นๆ</p>
                  <p className={`${theme.styles.text} font-sukhumvit`}>
                    Line ID: {contactInfo.lineID}<br/>
                    Email: {contactInfo.email}
                  </p>
                </div>
              </motion.div>
              <motion.div 
                className="flex items-start"
                whileHover={{ x: 5 }}
              >
                <FaClock className="text-amber-600 mt-1 mr-3" />
                <div>
                  <p className={`${theme.styles.text} font-sukhumvitBold mb-1`}>เวลาทำการ</p>
                  <p className={`${theme.styles.text} font-sukhumvit`}>{contactInfo.openingHours}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.01 }}
          className="rounded-2xl overflow-hidden shadow-lg h-[500px] mb-16 border border-amber-100/50"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3794.8997136400776!2d102.4285311!3d17.9834022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x312415280ea7e6eb%3A0xa2191600bcb093e5!2z4Lin4Lix4LiU4Lir4Li04LiZ4Lir4Lih4Liy4LiB4LmA4Lib4LmJ4LiHICjguKvguKXguKfguIfguJvguLnguYjguYDguJfguKrguIHguYwg4LmA4LiX4Liq4Lij4Lix4LiH4Liq4Li1KQ!5e0!3m2!1sth!2sth!4v1732993050509!5m2!1sth!2sth"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            className="rounded-2xl"
          />
        </motion.div>
      </div>
    </div>
  );
}
