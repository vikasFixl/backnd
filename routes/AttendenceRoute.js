import { getLastMonthAttendance, getUserAttendance, markAttendance } from "../controllers/AttendenceController.js";
import { isAuthenticated,isAdmin } from "../middleware/isAuthenticated.js";
import express from "express"

const Router=express.Router()
Router.route("/MarkAttendence").post(isAuthenticated,markAttendance)
Router.route("/user/:userId").get(isAuthenticated, isAdmin,getUserAttendance)
Router.route("/user/:userId/last-month").get(isAuthenticated,isAdmin,getLastMonthAttendance)






export default Router