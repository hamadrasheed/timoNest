import { NextFunction, Request, Response } from 'express';
export declare const authenticate: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
