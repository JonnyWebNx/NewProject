import express from 'express';
import authRoutes from './routes/authRoutes';
import openAiRoutes from './routes/openAiRoutes';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from '../src/config/db';
import { handleError } from './utils/errors';

// Load environment variables first
dotenv.config();

// Debug environment variables
console.log('Environment variables loaded:', {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY ? 'Set' : 'Not set',
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI ? 'Set' : 'Not set'
});

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}));

// Debug middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Register Routes
app.use('/api/auth', authRoutes);
app.use('/api/openAi', openAiRoutes);

// Error handling middleware (should be last)
app.use(handleError);

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`)
    })
}

startServer();

