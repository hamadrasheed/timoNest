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
exports.userOtpInfo = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let userOtpInfo = class userOtpInfo extends sequelize_typescript_1.Model {
};
exports.userOtpInfo = userOtpInfo;
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], userOtpInfo.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], userOtpInfo.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], userOtpInfo.prototype, "otp", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], userOtpInfo.prototype, "otpType", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], userOtpInfo.prototype, "updatedAt", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], userOtpInfo.prototype, "updatedBy", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], userOtpInfo.prototype, "createdBy", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], userOtpInfo.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], userOtpInfo.prototype, "deletedAt", void 0);
exports.userOtpInfo = userOtpInfo = __decorate([
    (0, sequelize_typescript_1.Table)({
        modelName: 'userOtpInfo',
        tableName: 'userOtpInfo',
        paranoid: false
    })
], userOtpInfo);
//# sourceMappingURL=userOtpInfo.model.js.map