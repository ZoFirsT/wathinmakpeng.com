"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa";
import { useSession } from "next-auth/react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (password !== confirmPassword) {
      setError("รหัสผ่านไม่ตรงกัน");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });

      if (res.ok) {
        router.push("/login");
      } else {
        setError("เกิดข้อผิดพลาดในการลงทะเบียน");
      }
    } catch (err) {
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อ");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen flex items-center justify-center bg-[url('/temple-bg.png')] bg-cover bg-center bg-no-repeat relative py-12 px-4 sm:px-6 lg:px-8"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/90 via-amber-50/90 to-gray-100/90 backdrop-blur-sm"></div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 100 }}
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: [0, -3, 3, -3, 0] }}
            transition={{ type: "spring", stiffness: 400 }}
            className="relative group cursor-pointer"
          >
            <div className="absolute inset-0 bg-yellow-300 rounded-full blur-3xl opacity-20 group-hover:opacity-30 group-hover:blur-2xl transition-all duration-500"></div>
            <motion.div
              animate={{ 
                y: [0, -8, 0],
                rotate: [0, -1, 1, -1, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Image
                src="/logo.png"
                alt="วัดหินหมากเป้ง Logo"
                width={200}
                height={200}
                className="mx-auto drop-shadow-2xl relative z-10 transform transition-transform duration-500"
              />
            </motion.div>
          </motion.div>
          <motion.h2 
            className="mt-8 text-center text-4xl font-sukhumvitBold drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-yellow-800 via-yellow-600 to-amber-500"
            animate={{ 
              backgroundPosition: ['0%', '100%', '0%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            ลงทะเบียนสำหรับผู้ดูแล
          </motion.h2>
        </motion.div>

        <motion.form 
          className="mt-8 space-y-6 bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-yellow-100 relative overflow-hidden"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          onSubmit={handleSubmit}
        >
          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-100 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-100 rounded-full blur-3xl opacity-50"></div>

          <div className="space-y-5 relative">
            <motion.div 
              className="relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-yellow-600 transition-colors duration-300" />
              <input
                id="email"
                name="email"
                type="email"
                required
                className="pl-10 appearance-none rounded-xl relative block w-full px-3 py-3.5 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 font-sukhumvitRegular hover:border-yellow-400 bg-white/80"
                placeholder="อีเมล"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </motion.div>

            <motion.div 
              className="relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-yellow-600 transition-colors duration-300" />
              <input
                id="username"
                name="username"
                type="text"
                required
                className="pl-10 appearance-none rounded-xl relative block w-full px-3 py-3.5 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 font-sukhumvitRegular hover:border-yellow-400 bg-white/80"
                placeholder="ชื่อผู้ใช้"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </motion.div>

            <motion.div 
              className="relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-yellow-600 transition-colors duration-300" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="pl-10 appearance-none rounded-xl relative block w-full px-3 py-3.5 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 font-sukhumvitRegular hover:border-yellow-400 bg-white/80"
                placeholder="รหัสผ่าน"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-600 transition-colors duration-300"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </motion.button>
            </motion.div>

            <motion.div 
              className="relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-yellow-600 transition-colors duration-300" />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                className="pl-10 appearance-none rounded-xl relative block w-full px-3 py-3.5 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 font-sukhumvitRegular hover:border-yellow-400 bg-white/80"
                placeholder="ยืนยันรหัสผ่าน"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-600 transition-colors duration-300"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </motion.button>
            </motion.div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-50/80 backdrop-blur-sm rounded-lg p-4 border border-red-200"
              >
                <motion.p
                  className="text-red-500 text-sm text-center font-sukhumvitRegular flex items-center justify-center gap-2"
                  animate={{ 
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <motion.span 
                    className="inline-block w-2 h-2 bg-red-500 rounded-full"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                    }}
                  ></motion.span>
                  {error}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <motion.button
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 4px 15px rgba(202, 138, 4, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-sukhumvitMedium rounded-xl text-white bg-gradient-to-r from-yellow-600 via-yellow-500 to-amber-500 hover:from-yellow-700 hover:via-yellow-600 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-500 ${
                isLoading ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ 
                    rotate: {
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear"
                    },
                    scale: {
                      duration: 0.5,
                      repeat: Infinity,
                    }
                  }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <span className="relative inline-block">
                  ลงทะเบียน
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-white"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </span>
              )}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </motion.div>
  );
}
