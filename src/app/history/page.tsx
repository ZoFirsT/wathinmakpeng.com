"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const theme = {
  styles: {
    bg: "bg-gradient-to-br from-amber-50 to-orange-100",
    bgImage: "https://cdn.wathinmakpeng.stratusone.cloud/images/wat.jpg",
    text: "text-amber-800",
    highlight: "text-amber-600",
    glow: "drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]",
    gradientText: "bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-500"
  }
};

export default function History() {
  return (
    <div className={`min-h-screen pt-20 md:pt-24 ${theme.styles.bg} relative overflow-hidden`}>
      {/* Background Image with Blur */}
      <div className="absolute inset-0 z-0">
        <Image
          src={theme.styles.bgImage}
          alt="Background"
          fill
          className="object-cover opacity-20"
          quality={100}
        />
        <div className="absolute inset-0 backdrop-blur-sm"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2] 
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 left-1/4 w-48 md:w-96 h-48 md:h-96 bg-amber-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="absolute bottom-0 right-1/4 w-48 md:w-96 h-48 md:h-96 bg-orange-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-16"
        >
          <motion.h1 
            className={`text-4xl md:text-6xl font-sukhumvitBold ${theme.styles.gradientText} mb-4 md:mb-6`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            ประวัติวัดหินหมากเป้ง
          </motion.h1>
          <motion.p 
            className={`text-xl md:text-2xl ${theme.styles.text} font-sukhumvit px-4`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            สถานที่ศักดิ์สิทธิ์แห่งการปฏิบัติธรรมริมฝั่งโขง
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:gap-8 mb-8 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4 md:space-y-8"
          >
            {[
              {
                title: "ประวัติการก่อตั้ง",
                content: "วัดหินหมากเป้งก่อตั้งขึ้นในปี พ.ศ. 2502 โดยหลวงปู่เทสก์ เทสรังสี พระเกจิอาจารย์ผู้เป็นที่เคารพนับถือ ท่านได้เลือกสถานที่แห่งนี้เพราะเป็นป่าเขาริมฝั่งแม่น้ำโขง เหมาะแก่การวิเวกและปฏิบัติธรรม"
              },
              {
                title: "ที่มาของชื่อวัด",
                content: "ชื่อ 'หินหมากเป้ง' มีที่มาจากหินก้อนใหญ่ที่มีรูปทรงคล้ายผลหมากเป้ง ซึ่งเป็นผลไม้พื้นถิ่นในภาษาอีสาน ตั้งตระหง่านอยู่ในบริเวณวัด จนกลายเป็นที่มาของชื่อวัดอันเป็นเอกลักษณ์"
              },
              {
                title: "หลวงปู่เทสก์ เทสรังสี",
                content: "หลวงปู่เทสก์เป็นพระนักปฏิบัติที่มีชื่อเสียงระดับประเทศ ท่านได้วางรากฐานการปฏิบัติธรรมตามแนวทางสติปัฏฐานสี่ และสร้างวัดให้เป็นศูนย์กลางการเผยแผ่พระพุทธศาสนาที่สำคัญของภาคอีสาน"
              },
              {
                title: "สถาปัตยกรรมสำคัญ",
                content: "ภายในวัดประกอบด้วยเจดีย์พิพิธภัณฑ์หลวงปู่เทสก์ ศาลาปฏิบัติธรรม และสถานที่สำคัญอื่นๆ ที่รายล้อมด้วยธรรมชาติอันร่มรื่น เหมาะแก่การปฏิบัติธรรมและสงบจิตใจ"
              },
              {
                title: "ความสำคัญต่อชุมชน",
                content: "วัดหินหมากเป้งเป็นศูนย์รวมจิตใจของชุมชนและพุทธศาสนิกชนจากทั่วประเทศ เป็นแหล่งเรียนรู้และปฏิบัติธรรมที่สำคัญ โดยยึดมั่นในแนวทางการปฏิบัติที่เคร่งครัดตามหลักพระธรรมวินัย"
              },
              {
                title: "ปัจจุบัน",
                content: "ปัจจุบันวัดยังคงรักษาไว้ซึ่งความเป็นวัดป่ากรรมฐาน พร้อมทั้งพัฒนาเป็นแหล่งท่องเที่ยวเชิงพุทธศาสนาที่สำคัญของจังหวัดหนองคาย โดดเด่นด้วยทัศนียภาพอันงดงามริมฝั่งโขง"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <motion.h2 
                  className={`text-xl md:text-2xl font-sukhumvitBold ${theme.styles.highlight} mb-3 md:mb-4`}
                  whileHover={{ scale: 1.02 }}
                >
                  {item.title}
                </motion.h2>
                <p className={`${theme.styles.text} font-sukhumvit leading-relaxed text-base md:text-lg`}>
                  {item.content}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-48 md:w-64 mx-auto"
          >
            <Image
              src="https://cdn.wathinmakpeng.stratusone.cloud/images/Wathinmakpenglogo.png"
              alt="วัดหินหมากเป้ง"
              width={250}
              height={250}
              className={`mx-auto mb-6 md:mb-8 ${theme.styles.glow} rounded-full`}
            />
          </motion.div>
          <motion.p 
            className={`${theme.styles.text} font-sukhumvit text-lg md:text-xl max-w-4xl mx-auto leading-relaxed px-4`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            วัดหินหมากเป้งยังคงสืบสานปณิธานของหลวงปู่เทสก์ในการเผยแผ่พระพุทธศาสนา 
            เป็นสถานที่ปฏิบัติธรรมที่เปี่ยมด้วยพลังศรัทธาและความศักดิ์สิทธิ์ 
            พร้อมต้อนรับผู้แสวงหาสัจธรรมจากทั่วสารทิศ
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
