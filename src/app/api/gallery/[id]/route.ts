import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Gallery from "@/models/Gallery";
import { getServerSession } from "next-auth";
import { Session } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

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

    const image = await Gallery.findByIdAndDelete(id);

    if (!image) {
      return NextResponse.json(
        { error: "ไม่พบรูปภาพ" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "ลบรูปภาพเรียบร้อย" }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการลบข้อมูล" },
      { status: 500 }
    );
  }
} 