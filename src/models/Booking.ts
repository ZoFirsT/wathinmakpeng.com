import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'กรุณากรอกชื่อ-นามสกุล'],
  },
  email: {
    type: String,
    required: [true, 'กรุณากรอกอีเมล'],
  },
  phone: {
    type: String,
    required: [true, 'กรุณากรอกเบอร์โทรศัพท์'],
  },
  startDate: {
    type: Date,
    required: [true, 'กรุณาเลือกวันที่เริ่มต้น'],
  },
  endDate: {
    type: Date,
    required: [true, 'กรุณาเลือกวันที่สิ้นสุด'],
  },
  numberOfPeople: {
    type: Number,
    required: [true, 'กรุณาระบุจำนวนผู้เข้าพัก'],
    min: [1, 'จำนวนผู้เข้าพักต้องมากกว่า 0'],
  },
  purpose: {
    type: String,
    required: [true, 'กรุณาระบุวัตถุประสงค์'],
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

export default Booking; 