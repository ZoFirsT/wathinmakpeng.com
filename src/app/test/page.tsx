"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function TestPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>กำลังโหลด...</p>;
  }

  if (session) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">ข้อมูลผู้ใช้</h1>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="mb-2">อีเมล: {session.user.email}</p>
          <p className="mb-2">ชื่อผู้ใช้: {session.user.username}</p>
          <p>สถานะ: {session.user.role}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <p className="text-red-500">กรุณาเข้าสู่ระบบก่อนเข้าใช้งาน</p>
      <button
        onClick={() => router.push("/login")}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        เข้าสู่ระบบ
      </button>
    </div>
  );
}