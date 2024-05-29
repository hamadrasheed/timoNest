import { NestModule, MiddlewareConsumer, OnApplicationBootstrap } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
export declare class AppModule implements NestModule, OnApplicationBootstrap {
    private readonly sequelize;
    constructor(sequelize: Sequelize);
    configure(consumer: MiddlewareConsumer): void;
    onApplicationBootstrap(): Promise<void>;
}
