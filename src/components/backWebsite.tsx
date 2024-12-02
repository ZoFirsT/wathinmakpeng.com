"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FaUserCircle, FaSignOutAlt, FaTools } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

export default function BackWebsite() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`fixed ${isMobile ? 'bottom-6 right-1/2 transform translate-x-1/2' : 'bottom-4 right-4'} z-50`}>
      {session ? (
        <div className="relative">
          <motion.button
            onClick={() => setShowDropdown(!showDropdown)}
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "rgba(251, 191, 36, 0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              type: "spring",
              stiffness: 300
            }}
            className={`
              px-4 sm:px-6 py-2 sm:py-3 
              text-xs sm:text-sm 
              bg-amber-500/10 text-amber-700 
              hover:text-amber-900 rounded-full 
              font-sukhumvitMedium transition-all duration-300 
              flex items-center gap-2 sm:gap-3 
              shadow-lg backdrop-blur-md hover:shadow-amber-200/50
              ${isMobile ? 'w-[200px] justify-center' : ''}
            `}
          >
            <FaUserCircle className="text-lg sm:text-xl" />
            <span className="font-medium truncate max-w-[150px]">{session.user?.username}</span>
          </motion.button>

          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className={`absolute ${isMobile ? 'bottom-full mb-2 left-1/2 -translate-x-1/2' : 'bottom-full mb-2 right-0'} w-full min-w-[200px] flex flex-col gap-2`}
              >
                {session.user?.role === 'admin' && (
                  <Link href="/dashboard" className="w-full">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      className="w-full px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm bg-blue-500/10 text-blue-700 hover:text-blue-900 rounded-full font-sukhumvitMedium transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 shadow-lg backdrop-blur-md hover:shadow-blue-200/50 hover:bg-blue-500/20"
                    >
                      <FaTools className="text-lg sm:text-xl" />
                      <span className="font-medium">จัดการระบบ</span>
                    </motion.button>
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
                  className="w-full px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm bg-red-500/10 text-red-700 hover:text-red-900 rounded-full font-sukhumvitMedium transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 shadow-lg backdrop-blur-md hover:shadow-red-200/50 hover:bg-red-500/20"
                >
                  <FaSignOutAlt className="text-lg sm:text-xl" />
                  <span className="font-medium">ออกจากระบบ</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <Link href="/login" className={isMobile ? 'block w-[200px]' : ''}>
          <motion.button
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "rgba(251, 191, 36, 0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              type: "spring",
              stiffness: 300
            }}
            className={`
              px-4 sm:px-6 py-2 sm:py-3 
              text-xs sm:text-sm 
              bg-amber-500/10 text-amber-700 
              hover:text-amber-900 rounded-full 
              font-sukhumvitMedium transition-all duration-300 
              flex items-center gap-2 sm:gap-3 
              shadow-lg backdrop-blur-md hover:shadow-amber-200/50
              ${isMobile ? 'w-full justify-center' : ''}
            `}
          >
            <FaUserCircle className="text-lg sm:text-xl" />
            <span className="font-medium">เข้าสู่ระบบแอดมิน</span>
          </motion.button>
        </Link>
      )}
    </div>
  );
}
