import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Activity from "@/models/Activity";
import { getServerSession } from "next-auth";
import { Session } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

// Update activity
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions) as Session | null;
    
    if (!session?.user?.role || session.user.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const updates = await req.json();

    await connectDB();

    const activity = await Activity.findByIdAndUpdate(
      id,
      { 
        ...updates,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!activity) {
      return NextResponse.json(
        { error: "ไม่พบข้อมูลกิจกรรม" },
        { status: 404 }
      );
    }

    return NextResponse.json(activity);
  } catch (error) {
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการอัพเดทข้อมูล" },
      { status: 500 }
    );
  }
}

// Delete activity
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions) as Session | null;
    
    if (!session?.user?.role || session.user.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    await connectDB();

    const activity = await Activity.findByIdAndDelete(id);

    if (!activity) {
      return NextResponse.json(
        { error: "ไม่พบข้อมูลกิจกรรม" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "ลบกิจกรรมเรียบร้อย" }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการลบข้อมูล" },
      { status: 500 }
    );
  }
} 