import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'กรุณากรอกชื่อรูปภาพ'],
  },
  description: {
    type: String,
    required: [true, 'กรุณากรอกคำอธิบาย'],
  },
  imageUrl: {
    type: String,
    required: [true, 'กรุณาใส่ URL รูปภาพ'],
  },
  category: {
    type: String,
    required: [true, 'กรุณาเลือกหมวดหมู่'],
    enum: ['temple', 'activity', 'ceremony', 'landscape', 'other'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

const Gallery = mongoose.models.Gallery || mongoose.model('Gallery', gallerySchema);

export default Gallery; 