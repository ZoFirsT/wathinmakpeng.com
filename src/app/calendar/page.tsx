"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, isToday } from "date-fns";
import { th } from "date-fns/locale";
import { FaChevronLeft, FaChevronRight, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaInfoCircle } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Activity {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await fetch("/api/activities");
      if (!response.ok) throw new Error("Failed to fetch activities");
      const data = await response.json();
      setActivities(data);
    } catch (error) {
      toast.error("ไม่สามารถโหลดข้อมูลกิจกรรมได้", {
        position: "top-right",
        autoClose: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getActivitiesForDay = (date: Date) => {
    return activities.filter(activity => 
      isSameDay(new Date(activity.date), date)
    );
  };

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
        <motion.div 
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="rounded-full h-32 w-32 border-t-4 border-b-4 border-amber-600 shadow-lg"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-16 sm:py-24 px-2 sm:px-4">
      <ToastContainer />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-3 sm:p-8"
        >
          <div className="flex flex-col items-center justify-between mb-6 sm:mb-10 gap-4">
            <motion.h1 
              className="text-2xl sm:text-4xl font-sukhumvitBold text-amber-800 flex items-center gap-2 sm:gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <FaCalendarAlt className="text-amber-600" />
              ปฏิทินกิจกรรม
            </motion.h1>
            <div className="flex items-center gap-4 sm:gap-6 bg-amber-50 rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-inner">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevMonth}
                className="p-2 sm:p-3 rounded-full hover:bg-amber-200 transition-all duration-300"
              >
                <FaChevronLeft className="text-amber-700" />
              </motion.button>
              <h2 className="text-lg sm:text-2xl font-sukhumvitBold text-amber-800 min-w-[150px] sm:min-w-[200px] text-center">
                {format(currentDate, 'MMMM yyyy', { locale: th })}
              </h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextMonth}
                className="p-2 sm:p-3 rounded-full hover:bg-amber-200 transition-all duration-300"
              >
                <FaChevronRight className="text-amber-700" />
              </motion.button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 sm:gap-4 mb-3 sm:mb-6">
            {['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'].map((day, i) => (
              <div
                key={day}
                className="text-center py-2 font-sukhumvitBold text-amber-800 text-sm sm:text-lg"
              >
                {window.innerWidth > 640 ? ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'][i] : day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 sm:gap-4">
            {Array.from({ length: monthStart.getDay() }).map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square" />
            ))}

            {daysInMonth.map((date, index) => {
              const dayActivities = getActivitiesForDay(date);
              const hasActivities = dayActivities.length > 0;
              const isCurrentDay = isToday(date);

              return (
                <motion.div
                  key={date.toString()}
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                  className={`
                    aspect-square p-1 sm:p-2 rounded-lg sm:rounded-2xl border sm:border-2 transition-all duration-300
                    ${isCurrentDay ? 'ring-2 sm:ring-4 ring-amber-400 ring-opacity-50' : ''}
                    ${hasActivities 
                      ? 'border-amber-400 bg-amber-50/80 cursor-pointer hover:shadow-lg hover:bg-amber-100'
                      : 'border-transparent hover:border-amber-200'}
                  `}
                  onClick={() => {
                    if (hasActivities) {
                      setSelectedActivity(dayActivities[0]);
                      setIsModalOpen(true);
                    }
                  }}
                >
                  <div className="text-center h-full flex flex-col justify-between p-0.5 sm:p-1">
                    <span className={`text-sm sm:text-lg font-medium ${
                      isSameMonth(date, currentDate)
                        ? isCurrentDay ? 'text-amber-600 font-bold' : 'text-amber-800'
                        : 'text-amber-400'
                    }`}>
                      {format(date, 'd')}
                    </span>
                    {hasActivities && (
                      <div className="mt-0.5 sm:mt-1 space-y-0.5 sm:space-y-1">
                        {dayActivities.map((activity, idx) => (
                          <motion.div 
                            key={idx}
                            className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-amber-500 mx-auto"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <AnimatePresence>
            {selectedActivity && isModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                onClick={() => setIsModalOpen(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="relative">
                    <img 
                      src={selectedActivity.imageUrl} 
                      alt={selectedActivity.title}
                      className="w-full h-36 sm:h-48 object-cover rounded-xl mb-4 sm:mb-6"
                    />
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all duration-300"
                      >
                        <span className="text-amber-800 text-xl">✕</span>
                      </button>
                    </div>
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-sukhumvitBold text-amber-800 mb-4">
                    {selectedActivity.title}
                  </h3>
                  
                  <div className="space-y-3 sm:space-y-4 text-amber-700 text-sm sm:text-base">
                    <div className="flex items-center gap-3">
                      <FaCalendarAlt className="text-amber-500 flex-shrink-0" />
                      <span>{format(new Date(selectedActivity.date), 'dd MMMM yyyy', { locale: th })}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaClock className="text-amber-500 flex-shrink-0" />
                      <span>{selectedActivity.time}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaMapMarkerAlt className="text-amber-500 flex-shrink-0" />
                      <span>{selectedActivity.location}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <FaInfoCircle className="text-amber-500 mt-1 flex-shrink-0" />
                      <p className="leading-relaxed">{selectedActivity.description}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}