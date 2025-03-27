const mongoose= require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to database")
    } catch (err) {
        console.error("Mongodb connection error:    ", err);
        process.exit(1)
    }
} 
