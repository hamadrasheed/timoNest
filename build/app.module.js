"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const user_module_1 = require("./api/user/user.module");
const sequelize_1 = require("@nestjs/sequelize");
const cors = require("cors");
const models_1 = require("./models");
const authenticate_1 = require("./middlewares/authenticate");
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv = require("dotenv");
dotenv.config({ path: '.env' });
let AppModule = class AppModule {
    constructor(sequelize) {
        this.sequelize = sequelize;
    }
    configure(consumer) {
        consumer
            .apply(cors(), authenticate_1.authenticate)
            .exclude({ path: 'user/login', method: common_1.RequestMethod.POST }, { path: 'user/sign-up', method: common_1.RequestMethod.POST }, { path: 'user/activate-user', method: common_1.RequestMethod.PUT }, { path: 'user/resend-otp', method: common_1.RequestMethod.POST }, { path: 'user/forgot-password', method: common_1.RequestMethod.POST }, { path: 'user/reset-forgot-password', method: common_1.RequestMethod.PUT })
            .forRoutes({
            path: '*', method: common_1.RequestMethod.ALL,
        });
    }
    async onApplicationBootstrap() {
        try {
            await this.sequelize.authenticate();
            console.log('Database connected successfully');
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'mysql',
                host: process.env.DATABASE_HOST,
                port: +process.env.DATABASE_PORT,
                username: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_NAME,
                models: [...models_1.models],
                logging: false,
            }),
            user_module_1.UserModule
        ],
    }),
    __metadata("design:paramtypes", [sequelize_typescript_1.Sequelize])
], AppModule);
//# sourceMappingURL=app.module.js.map