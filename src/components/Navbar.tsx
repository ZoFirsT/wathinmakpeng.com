"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const theme = {
  styles: {
    bg: "bg-gradient-to-br from-amber-50 to-orange-100",
    text: "text-amber-800",
    highlight: "text-amber-600", 
    button: "bg-amber-600 text-white hover:bg-amber-700",
    hover: "hover:text-amber-600",
    glow: "drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]",
    gradientText: "bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-500"
  }
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle scroll events with throttling
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const offset = window.scrollY;
          setScrolled(offset > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "หน้าแรก", href: "/" },
    { name: "ประวัติวัด", href: "/history" },
    { name: "กิจกรรม", href: "/activity" },
    { name: "ปฏิทินกิจกรรม", href: "/calendar" },
    { name: "ติดต่อ", href: "/contact" },
  ];

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-white/80 backdrop-blur-lg shadow-lg shadow-amber-100/50" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
          >
            <Link href="/" className="flex-shrink-0 flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                <Image 
                  src="https://cdn.wathinmakpeng.stratusone.cloud/images/Wathinmakpenglogo.png" 
                  alt="Wathinmakpeng Temple" 
                  width={60} 
                  height={60}
                  priority
                  className={`object-contain ${theme.styles.glow} transition-all duration-300 group-hover:scale-110`}
                />
              </motion.div>
              <motion.span 
                className={`text-xl font-sukhumvitBold ${theme.styles.gradientText} transition-all duration-300`}
                whileHover={{ y: -2 }}
              >
                วัดหินหมากเป้ง
              </motion.span>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            {menuItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <Link
                  href={item.href}
                  className={`ml-8 font-sukhumvit ${
                    pathname === item.href ? theme.styles.highlight : theme.styles.text
                  } px-4 py-2 rounded-md text-sm transition-all duration-300 relative group overflow-hidden`}
                >
                  <span className="relative z-10">{item.name}</span>
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 transform origin-left"
                    initial={{ scaleX: pathname === item.href ? 1 : 0 }}
                    animate={{ scaleX: pathname === item.href ? 1 : 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-amber-50/30 rounded-lg -z-10"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.div 
            className="md:hidden flex items-center"
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${theme.styles.text} focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all duration-300 relative w-10 h-10`}
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              <motion.div
                animate={isOpen ? "open" : "closed"}
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.span
                  className="absolute h-0.5 w-6 bg-current transform"
                  variants={{
                    closed: { rotate: 0, y: -4 },
                    open: { rotate: 45, y: 0 }
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="absolute h-0.5 w-6 bg-current"
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="absolute h-0.5 w-6 bg-current transform"
                  variants={{
                    closed: { rotate: 0, y: 4 },
                    open: { rotate: -45, y: 0 }
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <motion.div 
              className="px-2 pt-2 pb-3 space-y-1 bg-white/90 backdrop-blur-md shadow-lg"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10, backgroundColor: "rgba(245,158,11,0.1)" }}
                >
                  <Link
                    href={item.href}
                    className={`block font-sukhumvit ${
                      pathname === item.href ? theme.styles.highlight : theme.styles.text
                    } px-4 py-3 rounded-md text-base transition-all duration-300`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
