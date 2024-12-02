"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";

interface Activity {
  _id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  imageUrl: string;
  status: "upcoming" | "ongoing" | "completed";
  createdAt: Date;
  updatedAt: Date;
}

export default function ActivityPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<"all" | "upcoming" | "ongoing" | "completed">("all");

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch("/api/activities");
        if (!response.ok) {
          throw new Error("Failed to fetch activities");
        }
        const data = await response.json();
        setActivities(data);
      } catch (error) {
        toast.error("เกิดข้อผิดพลาดในการโหลดข้อมูล", {
          position: "top-right",
          autoClose: 3000
        });
        setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const filteredActivities = activities.filter(activity => {
    if (filter === "all") return true;
    return activity.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "bg-blue-100 text-blue-800";
      case "ongoing": return "bg-green-100 text-green-800";
      case "completed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "upcoming": return "กำลังจะมาถึง";
      case "ongoing": return "กำลังดำเนินการ";
      case "completed": return "เสร็จสิ้น";
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="text-red-500 text-xl font-sukhumvit bg-white p-6 rounded-lg shadow-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <ToastContainer />
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-sukhumvitBold text-center mb-8 text-amber-800"
        >
          กิจกรรมภายในวัด
        </motion.h1>
      
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
          {["all", "upcoming", "ongoing", "completed"].map((status) => (
            <motion.button
              key={status}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(status as any)}
              className={`px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base transition-all duration-300 ${
                filter === status 
                  ? "bg-amber-500 text-white shadow-lg"
                  : "bg-white/80 text-gray-600 hover:bg-amber-100 shadow"
              }`}
            >
              {status === "all" ? "ทั้งหมด" : getStatusText(status)}
            </motion.button>
          ))}
        </div>
      
        {filteredActivities.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center min-h-[300px] bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6"
          >
            <FaCalendarAlt className="text-4xl sm:text-6xl text-amber-400 mb-4" />
            <h2 className="text-xl sm:text-2xl font-sukhumvitBold text-amber-800 mb-2 text-center">ยังไม่มีกิจกรรม</h2>
            <p className="text-gray-600 text-center text-sm sm:text-base">ขณะนี้ยังไม่มีกิจกรรมที่กำลังจะมาถึง โปรดกลับมาตรวจสอบอีกครั้งในภายหลัง</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <AnimatePresence>
              {filteredActivities.map((activity, index) => (
                <motion.div
                  key={activity._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-amber-100"
                >
                  <div className="relative group">
                    <img 
                      src={activity.imageUrl} 
                      alt={activity.title}
                      className="w-full h-48 sm:h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium shadow-md ${getStatusColor(activity.status)}`}>
                      {getStatusText(activity.status)}
                    </span>
                  </div>
                  <div className="p-4 sm:p-6">
                    <h2 className="text-xl sm:text-2xl font-sukhumvitBold mb-3 text-amber-800 hover:text-amber-600 transition-colors duration-300 line-clamp-2">
                      {activity.title}
                    </h2>
                    <p className="text-gray-600 mb-4 text-sm sm:text-base line-clamp-3">{activity.description}</p>
                    <div className="space-y-2 text-sm sm:text-base">
                      <div className="flex items-center text-gray-500">
                        <FaCalendarAlt className="mr-2 text-amber-500" />
                        {format(new Date(activity.date), 'dd MMMM yyyy', { locale: th })}
                      </div>
                      <div className="flex items-center text-gray-500">
                        <FaClock className="mr-2 text-amber-500" />
                        {activity.time}
                      </div>
                      <div className="flex items-center text-gray-500">
                        <FaMapMarkerAlt className="mr-2 text-amber-500" />
                        {activity.location}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
