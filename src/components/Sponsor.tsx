"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";

const theme = {
  styles: {
    bg: "bg-gradient-to-br from-amber-50 to-orange-100",
    text: "text-amber-800",
    highlight: "text-amber-600", 
    glow: "drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]",
    gradientText: "bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-500"
  }
};

export default function Sponsor() {
  const sponsors = [
    {
      name: "Stratusone Cloud",
      url: "https://stratusone.cloud", 
      logo: "https://cdn.wathinmakpeng.stratusone.cloud/images/StratusOne%20New%20Brand.png",
      description: "บริการคลาวด์ระดับองค์กรที่เชื่อถือได้"
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white/95 via-amber-50/95 to-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-12"
          >
            <motion.div 
              className="flex items-center gap-3 px-8 py-3 rounded-full border-2 border-amber-200 shadow-lg bg-white/80"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 0 25px rgba(245,158,11,0.4)"
              }}
            >
              <FaHeart className="text-amber-500 animate-pulse" />
              <h2 className={`text-xl ${theme.styles.gradientText} font-sukhumvitBold`}>
                ผู้สนับสนุนหลักอย่างเป็นทางการ
              </h2>
              <FaHeart className="text-amber-500 animate-pulse" />
            </motion.div>
          </motion.div>
          
          <div className="flex justify-center max-w-4xl mx-auto">
            {sponsors.map((sponsor, index) => (
              <motion.div
                key={sponsor.name}
                whileHover={{ 
                  scale: 1.01,
                  rotateY: 2,
                }}
                whileTap={{ scale: 0.99 }}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.2
                }}
                className="bg-white/90 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-amber-100 w-full max-w-md gap-4"
              >
                <Link 
                  href={sponsor.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-100/30 to-orange-100/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      width={200}
                      height={70}
                      className="mx-auto opacity-95 group-hover:opacity-100 transition-all duration-500 drop-shadow-md group-hover:drop-shadow-xl rounded-xl"
                    />
                    <div className="mt-4 space-y-2">
                      <h3 className="text-lg font-sukhumvitBold text-amber-800 group-hover:text-amber-600 transition-colors duration-300">
                        {sponsor.name}
                      </h3>
                      <p className="text-sm font-sukhumvit text-amber-700/80 group-hover:text-amber-700 transition-colors duration-300">
                        {sponsor.description}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div >
    </section>
  );
}
