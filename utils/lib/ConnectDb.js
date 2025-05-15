import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const MONGO_URl=process.env.MONGO_URl || 'mongodb+srv://vikasfixl:oW6l2YjTNgPbUTpQ@cluster0.gzrlpen.mongodb.net/FixlAttendence?retryWrites=true&w=majority&appName=Cluster0'


export const ConnectDb = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URl);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};