"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaCalendarAlt, FaUser, FaPhone, FaEnvelope, FaIdCard, FaBed, FaCommentAlt, FaCheckCircle } from "react-icons/fa";

const theme = {
  styles: {
    bg: "bg-gradient-to-br from-amber-50 to-orange-100",
    text: "text-amber-800",
    highlight: "text-amber-600", 
    gradientText: "bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-500",
    glow: "drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]"
  }
};

export default function BookingPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    idCard: "",
    startDate: "",
    endDate: "",
    numberOfPeople: "1",
    purpose: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          startDate: formData.startDate,
          endDate: formData.endDate,
          numberOfPeople: parseInt(formData.numberOfPeople),
          purpose: formData.purpose || 'ปฏิบัติธรรม',
          idCard: formData.idCard
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Something went wrong');
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message);
      console.error('Error submitting form:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className={`min-h-screen ${theme.styles.bg} py-16 relative overflow-hidden`}>
      {/* Animated Background Elements */}
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

      <div className="max-w-4xl mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-block"
          >
            <h1 className={`text-4xl md:text-5xl font-sukhumvitBold ${theme.styles.gradientText} mb-4 ${theme.styles.glow}`}>
              จองการปฏิบัติธรรม
            </h1>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`${theme.styles.text} text-lg font-sukhumvit`}
          >
            กรุณากรอกข้อมูลเพื่อจองการปฏิบัติธรรม
          </motion.p>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            >
              {error}
            </motion.div>
          )}

          {!isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-100/50"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className={`text-2xl font-sukhumvitBold ${theme.styles.highlight} mb-4 flex items-center gap-2`}>
                    <FaUser className="text-amber-500" />
                    ข้อมูลส่วนตัว
                  </h2>
                  
                  <div className="flex flex-col md:flex-row gap-4">
                    <motion.div 
                      className="flex-1"
                      whileHover={{ scale: 1.01 }}
                    >
                      <label className="flex items-center gap-2 mb-2 font-sukhumvit">
                        <FaUser className="text-amber-500" />
                        ชื่อ-นามสกุล
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300"
                        required
                      />
                    </motion.div>

                    <motion.div 
                      className="flex-1"
                      whileHover={{ scale: 1.01 }}
                    >
                      <label className="flex items-center gap-2 mb-2 font-sukhumvit">
                        <FaIdCard className="text-amber-500" />
                        เลขบัตรประชาชน
                      </label>
                      <input
                        type="text"
                        name="idCard"
                        value={formData.idCard}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300"
                        required
                      />
                    </motion.div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <motion.div 
                      className="flex-1"
                      whileHover={{ scale: 1.01 }}
                    >
                      <label className="flex items-center gap-2 mb-2 font-sukhumvit">
                        <FaPhone className="text-amber-500" />
                        เบอร์โทรศัพท์
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300"
                        required
                      />
                    </motion.div>

                    <motion.div 
                      className="flex-1"
                      whileHover={{ scale: 1.01 }}
                    >
                      <label className="flex items-center gap-2 mb-2 font-sukhumvit">
                        <FaEnvelope className="text-amber-500" />
                        อีเมล
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300"
                        required
                      />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Booking Details */}
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <h2 className={`text-2xl font-sukhumvitBold ${theme.styles.highlight} mb-4 flex items-center gap-2`}>
                    <FaBed className="text-amber-500" />
                    รายละเอียดการจอง
                  </h2>

                  <div className="flex flex-col md:flex-row gap-4">
                    <motion.div 
                      className="flex-1"
                      whileHover={{ scale: 1.01 }}
                    >
                      <label className="flex items-center gap-2 mb-2 font-sukhumvit">
                        <FaCalendarAlt className="text-amber-500" />
                        วันที่เริ่มต้น
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300"
                        required
                      />
                    </motion.div>

                    <motion.div 
                      className="flex-1"
                      whileHover={{ scale: 1.01 }}
                    >
                      <label className="flex items-center gap-2 mb-2 font-sukhumvit">
                        <FaCalendarAlt className="text-amber-500" />
                        วันที่สิ้นสุด
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300"
                        required
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                  >
                    <label className="flex items-center gap-2 mb-2 font-sukhumvit">
                      <FaUser className="text-amber-500" />
                      จำนวนผู้เข้าพัก
                    </label>
                    <select
                      name="numberOfPeople"
                      value={formData.numberOfPeople}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300"
                      required
                    >
                      {[1,2,3,4,5].map(num => (
                        <option key={num} value={num}>{num} ท่าน</option>
                      ))}
                    </select>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                  >
                    <label className="flex items-center gap-2 mb-2 font-sukhumvit">
                      <FaCommentAlt className="text-amber-500" />
                      ความต้องการพิเศษ
                    </label>
                    <textarea
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300 h-32"
                      placeholder="หากมีความต้องการพิเศษ กรุณาระบุ"
                    />
                  </motion.div>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(245,158,11,0.2)" }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-sukhumvitBold py-3 rounded-lg shadow-lg transition-all duration-300"
                >
                  ยืนยันการจอง
                </motion.button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg text-center"
            >
              <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
              <h2 className={`text-2xl font-sukhumvitBold ${theme.styles.highlight} mb-4`}>
                จองสำเร็จ
              </h2>
              <p className={`${theme.styles.text} font-sukhumvit`}>
                ขอบคุณที่ใช้บริการ เราจะติดต่อกลับไปยังท่านเร็วๆ นี้
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center bg-white/60 p-6 rounded-xl shadow-lg"
        >
          <motion.p 
            className={`${theme.styles.text} font-sukhumvit`}
            whileHover={{ scale: 1.02 }}
          >
            หากมีข้อสงสัยเพิ่มเติม กรุณาติดต่อ 081-7625055
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
