import User from '../models/userModel';
import IUser from '../interfaces/userInterface';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const registerUser = async (userData: IUser) => {
    const { username, password } = userData;
    try {
        const user = new User({ username, password });
        await user.save();
        return user;
    } catch (error) {
        throw new Error('User registration failed');
    }
};

const authenticateUser = async (username: string, password: string) => {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return null;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return null;
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '2m' });
        const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '5m' });

        return { token, refreshToken };
    } catch (error) {
        throw new Error('Authentication failed');
    }
};
export default {registerUser,authenticateUser};
