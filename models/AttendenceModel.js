// models/Attendance.js
import { Schema, model } from 'mongoose';

const attendanceSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    inTime: {
      type: String, // Format: "HH:mm"
      required: true,
    },
    outTime: {
      type: String, // Format: "HH:mm"
      required: true,
    },
    lateMark: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Ensure a user can only mark attendance once per day
attendanceSchema.index({ user: 1, date: 1 }, { unique: true });

const Attendance = model('Attendance', attendanceSchema);
export default Attendance;
