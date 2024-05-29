import { Model } from 'sequelize-typescript';
export interface userOtpInfoI {
    id: number;
    userId: number;
    otp: number;
    otpType: string;
    updatedBy: number;
    createdBy: number;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt: Date;
}
export declare class userOtpInfo extends Model<userOtpInfoI> {
    id: number;
    userId: number;
    otp: number;
    otpType: string;
    updatedAt: Date;
    updatedBy: number;
    createdBy: number;
    createdAt: Date;
    deletedAt: Date;
}
