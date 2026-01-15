import mongoose from "mongoose";
import dotenv from "dotenv"; 

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;


export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(databaseUrl as string);
        console.log("connected to mongodb successfully");
    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error}`);
    }
};