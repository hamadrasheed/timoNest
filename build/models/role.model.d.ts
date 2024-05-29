import { Model } from 'sequelize-typescript';
export interface rolesI {
    id?: number;
    name?: string;
    slug?: string;
    updatedBy: number;
    createdBy: number;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt: Date;
}
export declare class roles extends Model<rolesI> {
    id: number;
    name: string;
    slug: string;
    updatedAt: Date;
    updatedBy: number;
    createdBy: number;
    createdAt: Date;
    deletedAt: Date;
}
