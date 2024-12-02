"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { FaUserFriends, FaCalendarAlt, FaClipboardList, FaCheckCircle, FaTimesCircle, FaHourglassHalf } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Booking {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  startDate: string;
  endDate: string;
  numberOfPeople: number;
  purpose: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/bookings");
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await response.json();
        setBookings(data);
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

    if (session?.user.role === 'admin') {
      fetchBookings();
    }
  }, [session]);

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      setBookings(bookings.map(booking => 
        booking._id === bookingId 
          ? { ...booking, status: newStatus as 'pending' | 'approved' | 'rejected' }
          : booking
      ));

      toast.success("อัพเดทสถานะเรียบร้อยแล้ว", {
        position: "top-right",
        autoClose: 2000
      });
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการอัพเดทสถานะ", {
        position: "top-right",
        autoClose: 3000
      });
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || booking.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'approved': return <FaCheckCircle className="text-green-500" />;
      case 'rejected': return <FaTimesCircle className="text-red-500" />;
      default: return <FaHourglassHalf className="text-yellow-500" />;
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-16 w-16 md:h-32 md:w-32 border-t-4 border-b-4 border-amber-600"
        />
      </div>
    );
  }

  if (!session || session.user.role !== 'admin') {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 px-4"
      >
        <div className="text-center">
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-xl md:text-2xl text-amber-800 mb-4"
          >
            ไม่มีสิทธิ์เข้าถึง
          </motion.h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/")}
            className="text-amber-600 hover:text-amber-700 transition-colors text-sm md:text-base"
          >
            กลับสู่หน้าหลัก
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-6 md:py-12 px-2 sm:px-4 lg:px-8">
      <ToastContainer />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-lg shadow-xl p-3 md:p-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 space-y-4 md:space-y-0">
            <h1 className="text-2xl md:text-3xl font-sukhumvitBold text-amber-800">
              จัดการการจอง
            </h1>
            <div className="flex flex-col sm:flex-row gap-2 md:gap-4 w-full md:w-auto">
              <input
                type="text"
                placeholder="ค้นหา..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 w-full sm:w-auto text-sm md:text-base"
              />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 w-full sm:w-auto text-sm md:text-base"
              >
                <option value="all">ทั้งหมด</option>
                <option value="pending">รอดำเนินการ</option>
                <option value="approved">อนุมัติ</option>
                <option value="rejected">ปฏิเสธ</option>
              </select>
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 md:p-4 bg-red-100 text-red-700 rounded-lg text-sm md:text-base"
            >
              {error}
            </motion.div>
          )}

          <div className="overflow-x-auto -mx-3 md:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-amber-200">
                <thead className="bg-amber-50">
                  <tr>
                    <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-amber-800 uppercase tracking-wider">
                      <div className="flex items-center gap-1 md:gap-2">
                        <FaUserFriends />
                        ชื่อ-นามสกุล
                      </div>
                    </th>
                    <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-amber-800 uppercase tracking-wider">
                      <div className="flex items-center gap-1 md:gap-2">
                        <FaCalendarAlt />
                        วันที่
                      </div>
                    </th>
                    <th className="hidden md:table-cell px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-amber-800 uppercase tracking-wider">
                      จำนวนคน
                    </th>
                    <th className="hidden md:table-cell px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-amber-800 uppercase tracking-wider">
                      <div className="flex items-center gap-1 md:gap-2">
                        <FaClipboardList />
                        วัตถุประสงค์
                      </div>
                    </th>
                    <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-amber-800 uppercase tracking-wider">
                      สถานะ
                    </th>
                    <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-amber-800 uppercase tracking-wider">
                      การจัดการ
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-amber-200">
                  <AnimatePresence>
                    {filteredBookings.map((booking) => (
                      <motion.tr
                        key={booking._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-amber-50 transition-colors"
                      >
                        <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap">
                          <div className="text-xs md:text-sm text-amber-900">{booking.fullName}</div>
                          <div className="text-xs md:text-sm text-amber-500">{booking.email}</div>
                          <div className="text-xs md:text-sm text-amber-500">{booking.phone}</div>
                        </td>
                        <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap">
                          <div className="text-xs md:text-sm text-amber-900">
                            {format(new Date(booking.startDate), 'dd MMM yy', { locale: th })}
                          </div>
                          <div className="text-xs md:text-sm text-amber-500">
                            ถึง {format(new Date(booking.endDate), 'dd MMM yy', { locale: th })}
                          </div>
                        </td>
                        <td className="hidden md:table-cell px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm text-amber-900">
                          {booking.numberOfPeople} คน
                        </td>
                        <td className="hidden md:table-cell px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm text-amber-900">
                          {booking.purpose}
                        </td>
                        <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap">
                          <motion.span
                            whileHover={{ scale: 1.05 }}
                            className={`px-2 md:px-3 py-1 inline-flex items-center gap-1 md:gap-2 text-xs leading-5 font-semibold rounded-full ${
                              booking.status === 'approved'
                                ? 'bg-green-100 text-green-800'
                                : booking.status === 'rejected'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {getStatusIcon(booking.status)}
                            <span className="hidden sm:inline">
                              {booking.status === 'approved'
                                ? 'อนุมัติ'
                                : booking.status === 'rejected'
                                ? 'ปฏิเสธ'
                                : 'รอดำเนินการ'}
                            </span>
                          </motion.span>
                        </td>
                        <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium">
                          <motion.select
                            whileHover={{ scale: 1.02 }}
                            value={booking.status}
                            onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                            className="block w-full py-1 md:py-2 px-2 md:px-3 border border-amber-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 transition-all text-xs md:text-sm"
                          >
                            <option value="pending">รอดำเนินการ</option>
                            <option value="approved">อนุมัติ</option>
                            <option value="rejected">ปฏิเสธ</option>
                          </motion.select>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}