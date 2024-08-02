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

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET!, { expiresIn: '2m' });
        const refreshToken = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET!, { expiresIn: '5m' });

        return { token, refreshToken };
    } catch (error) {
        throw new Error('Authentication failed');
    }
};

const refreshToken = async (refreshToken: string) => {
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET!) as { id: string };
        const token = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET!, { expiresIn: '2m' });
        return { token };
    } catch (error) {
        throw new Error('Invalid or expired refresh token');
    }
};

const changePassword = async (userId: string, newPassword: string) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        user.password = newPassword;
        await user.save();

        return user.username;
    } catch (error) {
        throw new Error('Password change failed');
    }
};

export default {
    registerUser,
    authenticateUser,
    refreshToken,
    changePassword,
};
