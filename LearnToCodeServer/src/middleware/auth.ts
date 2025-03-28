import { Response, Request, NextFunction } from "express";
import { AppError } from "../utils/errors";
import jwt from 'jsonwebtoken';
import { TokenPayload } from "../types/interfaces";

export const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.headers.authorization) {
            let token = req.headers.authorization;
            token = token.split(' ')[1].trim();

            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
            
            // attach decoded information to req.user for next routes
            (req as any).user = decoded;

            next()
            
        } else {
            next(new AppError('No token provided', 401))
        }
    } catch (err) {
        throw new AppError('Unexpected Auth Error', 401)
    }
}