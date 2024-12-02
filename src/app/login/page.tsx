"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";

export default function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
      router.refresh();
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        login,
        password,
        redirect: false
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      setError("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-20 w-64 h-64 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-64 h-64 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl relative z-10"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mx-auto w-20 h-20 mb-4"
          >
            <Image
              src="https://cdn.wathinmakpeng.stratusone.cloud/images/Wathinmakpenglogo.png"
              alt="Logo"
              width={80}
              height={80}
              className="rounded-full"
            />
          </motion.div>
          <h2 className="text-center text-3xl font-sukhumvitBold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            เข้าสู่ระบบ
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="rounded-md shadow-sm space-y-4">
            <div className="relative">
              <label htmlFor="login" className="text-amber-800 flex items-center gap-2 mb-1">
                <FaUser className="text-amber-600" />
                <span>อีเมลหรือชื่อผู้ใช้</span>
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                id="login"
                name="login"
                type="text"
                required
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-amber-300 placeholder-amber-500 text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 ease-in-out"
                placeholder="กรุณากรอกอีเมลหรือชื่อผู้ใช้"
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="text-amber-800 flex items-center gap-2 mb-1">
                <FaLock className="text-amber-600" />
                <span>รหัสผ่าน</span>
              </label>
              <div className="relative">
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-amber-300 placeholder-amber-500 text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 ease-in-out pr-12"
                  placeholder="กรุณากรอกรหัสผ่าน"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-600 hover:text-amber-700 transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>

          <div>
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#d97706" }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-200 ease-in-out ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
                  <span>กำลังดำเนินการ...</span>
                </div>
              ) : (
                "เข้าสู่ระบบ"
              )}
            </motion.button>
          </div>

          <motion.div 
            className="text-center text-sm"
            whileHover={{ scale: 1.05 }}
          >
            <Link
              href="/register"
              className="font-medium text-amber-600 hover:text-amber-500 transition-colors duration-200 inline-block"
            >
              ยังไม่มีบัญชี? ลงทะเบียนที่นี่
            </Link>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
