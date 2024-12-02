import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Activity from "@/models/Activity";
import { getServerSession } from "next-auth";
import { Session } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// Get all activities
export async function GET() {
  try {
    await connectDB();
    const activities = await Activity.find().sort({ date: 1 });
    return NextResponse.json(activities);
  } catch (error) {
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการดึงข้อมูล" },
      { status: 500 }
    );
  }
}

// Create new activity (admin only)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions) as Session | null;
    
    if (!session?.user?.role || session.user.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    await connectDB();

    const activity = await Activity.create({
      ...body,
      updatedAt: new Date()
    });
    
    return NextResponse.json(
      { message: "เพิ่มกิจกรรมเรียบร้อย", activity },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการบันทึกข้อมูล" },
      { status: 500 }
    );
  }
} 