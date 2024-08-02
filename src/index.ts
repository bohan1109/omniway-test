import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routers/userRoutes';
import connectDB from './config/database';

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
