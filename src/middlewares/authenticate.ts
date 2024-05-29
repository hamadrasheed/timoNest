import { NextFunction, Request, Response } from 'express';
import { authenticateToken } from '../utils/authToken';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {

    try {

        const { headers: { authorization } } = req;
        const currentUserId: number = authenticateToken(authorization);
        req.body = {
            ...req.body,
            userId: currentUserId
        };

        req.query = {
            ...req.query,
            userId: `${currentUserId}`
        };

        next();

    } catch (error) {
        console.log('error in',error);
        return res.status(401).json({
            message: error?.message || 'Auth failed',
        });
    }
}