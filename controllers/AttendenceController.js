import moment from 'moment';
import Attendance from "../models/AttendenceModel.js"


export const markAttendance = async (req, res) => {
  try {
    const userId = req.user.id;
    const { date, inTime, outTime, day } = req.body || {};

    // Input validation
    if (!date || !inTime || !outTime) {
      return res.status(400).json({ message: "Date, inTime and outTime are required." });
    }

    // Parse date and inTime to build full DateTime
    const parsedDate = moment(new Date(date)); // parses to moment object
    const fullInTime = moment(`${parsedDate.format('YYYY-MM-DD')} ${inTime}`, 'YYYY-MM-DD hh:mm A'); // e.g., 2025-05-15 09:30 AM

    // Bound: 10:00 AM
    const lateBound = moment(`${parsedDate.format('YYYY-MM-DD')} 10:00 AM`, 'YYYY-MM-DD hh:mm A');

    const late = fullInTime.isAfter(lateBound); // true if marked after 10:00 AM

    // Check if attendance already marked for the day
    const startOfDay = parsedDate.clone().startOf('day').toDate();
    const existing = await Attendance.findOne({ user: userId, date: startOfDay });

    if (existing) {
      return res.status(409).json({ 
        message: "Attendance already marked for this date.", 
        attendance: existing 
      });
    }

    const attendance = new Attendance({
      user: userId,
      date: startOfDay,
      day,
      inTime,
      outTime,
      lateMark: late,
    });

    await attendance.save();

    res.status(201).json({ message: "Attendance marked successfully", late });

  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        message: "Attendance already exists for today.",
        details: err.keyValue,
      });
    }

    console.error("Error in markAttendance:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};



export const getUserAttendance = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId);
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const records = await Attendance.find({ user: userId })
      
      .populate("user");

    if (!records.length) {
      return res.status(404).json({ message: "No attendance records found for this user." });
    }

    res.status(200).json(records);

  } catch (err) {
    console.error("Error in getUserAttendance:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

export const getLastMonthAttendance = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const lastMonth = moment().subtract(1, "months");
    const startDate = lastMonth.startOf("month").toDate();
    const endDate = lastMonth.endOf("month").toDate();

    const records = await Attendance.find({
      user: userId,
      date: { $gte: startDate, $lte: endDate },
    }).sort({ date: -1 });

    if (!records.length) {
      return res.status(404).json({ message: "No attendance records found for last month." });
    }

    res.status(200).json(records);

  } catch (err) {
    console.error("Error in getLastMonthAttendance:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};
