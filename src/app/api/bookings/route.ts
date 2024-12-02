import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// Get all bookings (admin only)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const bookings = await Booking.find().sort({ createdAt: -1 });
    
    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการดึงข้อมูล" },
      { status: 500 }
    );
  }
}

// Create new booking
export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectDB();

    // Basic validation
    const requiredFields = ['fullName', 'email', 'phone', 'startDate', 'endDate', 'numberOfPeople', 'purpose'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `กรุณากรอก ${field}` },
          { status: 400 }
        );
      }
    }

    // Check if dates are valid
    const startDate = new Date(body.startDate);
    const endDate = new Date(body.endDate);
    
    if (startDate < new Date()) {
      return NextResponse.json(
        { error: "วันที่เริ่มต้นต้องไม่น้อยกว่าวันปัจจุบัน" },
        { status: 400 }
      );
    }

    if (endDate < startDate) {
      return NextResponse.json(
        { error: "วันที่สิ้นสุดต้องมากกว่าวันที่เริ่มต้น" },
        { status: 400 }
      );
    }

    // Check for overlapping bookings
    const overlappingBooking = await Booking.findOne({
      $and: [
        { status: 'approved' },
        {
          $or: [
            {
              startDate: { $lte: endDate },
              endDate: { $gte: startDate }
            }
          ]
        }
      ]
    });

    if (overlappingBooking) {
      return NextResponse.json(
        { error: "ช่วงเวลาดังกล่าวมีการจองแล้ว กรุณาเลือกวันที่อื่น" },
        { status: 400 }
      );
    }

    const booking = await Booking.create(body);
    
    return NextResponse.json(
      { message: "บันทึกการจองเรียบร้อย", booking },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการบันทึกข้อมูล" },
      { status: 500 }
    );
  }
} 