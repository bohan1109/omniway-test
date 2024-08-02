import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(202).json({ message: 'Token expired' });
                }
                return res.status(404).json({ message: 'Invalid token' });
            }

            (req as any).user = user;
            next();
        });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

export default authenticateJWT;
