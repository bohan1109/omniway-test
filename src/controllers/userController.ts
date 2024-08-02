import { Request, Response } from 'express';
import userService from '../services/userService';

const registerUserController = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const user = await userService.registerUser({ username, password });
        res.status(201).json(user);
    } catch (error:any) {
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

export default {registerUserController,loginUserController,refreshTokenController};
