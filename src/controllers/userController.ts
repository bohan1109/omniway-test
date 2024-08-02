import { Request, Response } from 'express';
import userService from '../services/userService';
import jwt from 'jsonwebtoken';

const registerUserController = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const user = await userService.registerUser({ username, password });
        res.status(201).json(user);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

const loginUserController = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const authResult = await userService.authenticateUser(username, password);
        if (!authResult) {
            return res.status(204).end();
        }
        const { token, refreshToken } = authResult;
        res.status(200).json({ token, refreshToken });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

const refreshTokenController = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    try {
        const { token } = await userService.refreshToken(refreshToken);
        res.status(200).json({ token });
    } catch (error: any) {
        res.status(401).json({ message: error.message });
    }
};

const changePasswordController = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
        const { newPassword } = req.body;

        await userService.changePassword(decoded.id, newPassword);

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

export default {
    registerUserController,
    loginUserController,
    refreshTokenController,
    changePasswordController
};
