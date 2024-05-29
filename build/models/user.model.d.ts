import { Model } from 'sequelize-typescript';
export interface usersI {
    id?: number;
    userName?: string;
    email?: string;
    password?: string;
    roleId: number;
    roleSlug: string;
    isActive: boolean;
    updatedBy: number;
    createdBy: number;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt: Date;
}
export declare class users extends Model<usersI> {
    id: number;
    userName: string;
    email: string;
    password: string;
    roleId: number;
    roleSlug: string;
    isActive: boolean;
    updatedAt: Date;
    updatedBy: number;
    createdBy: number;
    createdAt: Date;
    deletedAt: Date;
}
