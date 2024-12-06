"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";
import { FaCamera, FaTrash, FaPlus } from "react-icons/fa";

interface GalleryItem {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  createdAt: string;
}

const categories = [
  { id: 'temple', name: 'วัด' },
  { id: 'activity', name: 'กิจกรรม' },
  { id: 'ceremony', name: 'พิธีกรรม' },
  { id: 'landscape', name: 'ทิวทัศน์' },
  { id: 'other', name: 'อื่นๆ' }
];

export default function GalleryManagement() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddingImage, setIsAddingImage] = useState(false);
  const [newImage, setNewImage] = useState({
    title: "",
    description: "",
    imageUrl: "",
    category: "temple"
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    fetchImages();
  }, [session]);

  const fetchImages = async () => {
    try {
      const response = await fetch("/api/gallery");
      if (!response.ok) throw new Error("Failed to fetch images");
      const data = await response.json();
      setImages(data);
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการโหลดข้อมูล");
    } finally {
      setLoading(false);
    }
  };

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newImage),
      });

      if (!response.ok) throw new Error("Failed to add image");

      toast.success("เพิ่มรูปภาพเรียบร้อย");
      setIsAddingImage(false);
      setNewImage({
        title: "",
        description: "",
        imageUrl: "",
        category: "temple"
      });
      fetchImages();
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการเพิ่มรูปภาพ");
    }
  };

  const handleDeleteImage = async (id: string) => {
    if (!confirm("ต้องการลบรูปภาพนี้หรือไม่?")) return;

    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete image");

      toast.success("ลบรูปภาพเรียบร้อย");
      fetchImages();
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการลบรูปภาพ");
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-32 w-32 border-t-4 border-b-4 border-amber-600"
        />
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-24 px-4">
      <ToastContainer />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6"
        >
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <FaCamera className="text-3xl text-amber-600" />
              <h1 className="text-3xl font-sukhumvitBold text-amber-800">
                จัดการอัลบั้มภาพ
              </h1>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAddingImage(true)}
              className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2"
            >
              <FaPlus />
              เพิ่มรูปภาพ
            </motion.button>
          </div>

          <AnimatePresence>
            {isAddingImage && (
              <motion.form
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                onSubmit={handleAddImage}
                className="mb-8 space-y-4 overflow-hidden bg-amber-50/50 p-6 rounded-xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-amber-800 font-sukhumvitBold">ชื่อรูปภาพ</label>
                    <input
                      type="text"
                      value={newImage.title}
                      onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                      className="w-full p-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-amber-800 font-sukhumvitBold">หมวดหมู่</label>
                    <select
                      value={newImage.category}
                      onChange={(e) => setNewImage({ ...newImage, category: e.target.value })}
                      className="w-full p-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-amber-800 font-sukhumvitBold">URL รูปภาพ</label>
                    <input
                      type="text"
                      value={newImage.imageUrl}
                      onChange={(e) => setNewImage({ ...newImage, imageUrl: e.target.value })}
                      className="w-full p-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-amber-800 font-sukhumvitBold">คำอธิบาย</label>
                    <textarea
                      value={newImage.description}
                      onChange={(e) => setNewImage({ ...newImage, description: e.target.value })}
                      className="w-full p-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                      rows={3}
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    บันทึก
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setIsAddingImage(false)}
                    className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                  >
                    ยกเลิก
                  </motion.button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <motion.div
                key={image._id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg group"
              >
                <div className="relative aspect-square">
                  <Image
                    src={image.imageUrl}
                    alt={image.title}
                    fill
                    className="object-cover"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDeleteImage(image._id)}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FaTrash />
                  </motion.button>
                </div>
                <div className="p-4">
                  <h3 className="font-sukhumvitBold text-amber-800 mb-1">
                    {image.title}
                  </h3>
                  <p className="text-sm text-amber-600">
                    {categories.find(c => c.id === image.category)?.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 