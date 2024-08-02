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

export default {registerUserController};
