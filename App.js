import express from 'express';
import dotenv from 'dotenv';
import cookieparser from 'cookie-parser'
import { ConnectDb } from './utils/lib/ConnectDb.js';
import AuthRoute from "./routes/AuthRoute.js"
import AttendenceRoute from "./routes/AttendenceRoute.js"
import cors from "cors"
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser())

app.use(cors({
  origin:'http://localhost:5173',
  credentials:true,
  methods:["POST","GET","PUT","DELETE"]
}))
const PORT = process.env.PORT || 3000;









app.use("/auth/v1",AuthRoute)
app.use("/api/attendence",AttendenceRoute)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  ConnectDb();
});
app.get('/', (req, res) => {
  res.send('Hello World!');
});


process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
})

process.on('uncaughtException', (err, origin) => {
  console.log('Uncaught Exception at:', origin, 'error:', err);
  // application specific logging, throwing an error, or other logic here
})