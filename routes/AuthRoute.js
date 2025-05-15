import express from "express"
import { getallusers, getProfile, login, logout, register } from "../controllers/AuthController.js"
import { isAuthenticated } from "../middleware/isAuthenticated.js"

const Router=express.Router()

Router.route("/register").post(register)
Router.route("/login").post(login)
Router.route("/logout").post(logout)
Router.route("/MyProfile").get(isAuthenticated,getProfile)
Router.route("/allUsers").get(getallusers)





export default Router