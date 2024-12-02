"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";

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

export default function ActivityManagement() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAddingActivity, setIsAddingActivity] = useState(false);
  const [newActivity, setNewActivity] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    imageUrl: "",
    status: "upcoming"
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    fetchActivities();
  }, [session]);

  const fetchActivities = async () => {
    try {
      const response = await fetch("/api/activities");
      if (!response.ok) throw new Error("Failed to fetch activities");
      const data = await response.json();
      setActivities(data);
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการโหลดข้อมูล");
      setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
    } finally {
      setLoading(false);
    }
  };

  const handleAddActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/activities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newActivity),
      });

      if (!response.ok) throw new Error("Failed to add activity");

      toast.success("เพิ่มกิจกรรมเรียบร้อย");
      setIsAddingActivity(false);
      setNewActivity({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        imageUrl: "",
        status: "upcoming"
      });
      fetchActivities();
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการเพิ่มกิจกรรม");
    }
  };

  const handleDeleteActivity = async (id: string) => {
    if (!confirm("ต้องการลบกิจกรรมนี้หรือไม่?")) return;

    try {
      const response = await fetch(`/api/activities/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete activity");

      toast.success("ลบกิจกรรมเรียบร้อย");
      fetchActivities();
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการลบกิจกรรม");
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (!session || session.user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="text-center">
          <h1 className="text-2xl text-amber-800 mb-4">ไม่มีสิทธิ์เข้าถึง</h1>
          <button
            onClick={() => router.push("/")}
            className="text-amber-600 hover:text-amber-700"
          >
            กลับสู่หน้าหลัก
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-12 px-4">
      <ToastContainer />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-lg shadow-xl p-6"
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-sukhumvitBold text-amber-800">
              จัดการกิจกรรม
            </h1>
            <button
              onClick={() => setIsAddingActivity(true)}
              className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
            >
              เพิ่มกิจกรรม
            </button>
          </div>

          {isAddingActivity && (
            <form onSubmit={handleAddActivity} className="mb-8 space-y-4">
              <input
                type="text"
                placeholder="ชื่อกิจกรรม"
                value={newActivity.title}
                onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              <textarea
                placeholder="รายละเอียด"
                value={newActivity.description}
                onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="date"
                value={newActivity.date}
                onChange={(e) => setNewActivity({ ...newActivity, date: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="time"
                value={newActivity.time}
                onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="สถานที่"
                value={newActivity.location}
                onChange={(e) => setNewActivity({ ...newActivity, location: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="URL รูปภาพ"
                value={newActivity.imageUrl}
                onChange={(e) => setNewActivity({ ...newActivity, imageUrl: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              <select
                value={newActivity.status}
                onChange={(e) => setNewActivity({ ...newActivity, status: e.target.value as Activity['status'] })}
                className="w-full p-2 border rounded"
              >
                <option value="upcoming">กำลังจะมาถึง</option>
                <option value="ongoing">กำลังดำเนินการ</option>
                <option value="completed">เสร็จสิ้น</option>
              </select>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  บันทึก
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingActivity(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  ยกเลิก
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => (
              <motion.div
                key={activity._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={activity.imageUrl}
                    alt={activity.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-sukhumvitBold text-amber-800 mb-2">
                    {activity.title}
                  </h3>
                  <p className="text-amber-600 mb-2">
                    {format(new Date(activity.date), 'dd MMMM yyyy', { locale: th })}
                  </p>
                  <p className="text-gray-600 mb-4">{activity.description}</p>
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleDeleteActivity(activity._id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      ลบ
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 