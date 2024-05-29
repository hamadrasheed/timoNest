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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const common_1 = require("@nestjs/common");
const user_dto_1 = require("../../dto/users/user.dto");
const swagger_1 = require("@nestjs/swagger");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async signIn(req, res, next, body) {
        try {
            const response = await this.userService.signIn({ ...body });
            return res.status(200).json({
                message: 'success',
                result: response,
            });
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
    async signUp(req, res, next, body) {
        try {
            const response = await this.userService.signUp({ ...body });
            return res.status(200).json({
                message: 'success',
                result: response,
            });
        }
        catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                message: error.message || error.name || error,
            });
        }
    }
    async verifySignUpOtp(req, res, next, body) {
        try {
            const response = await this.userService.verifySignUpOtp({ ...body });
            return res.status(200).json({
                message: 'success',
                result: response,
            });
        }
        catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                message: error.message || error.name || error,
            });
        }
    }
    async resendUserOtp(req, res, next, body) {
        try {
            const response = await this.userService.resendUserOtp({ ...body });
            return res.status(200).json({
                message: 'success',
                result: response,
            });
        }
        catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                message: error.message || error.name || error,
            });
        }
    }
    async resetPassword(req, res, next, body) {
        try {
            const response = await this.userService.resetPassword({ ...body });
            return res.status(200).json({
                message: 'success',
                result: response,
            });
        }
        catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                message: error.message || error.name || error,
            });
        }
    }
    async forgotPassword(req, res, next, body) {
        try {
            const response = await this.userService.forgotPassword({ ...body });
            return res.status(200).json({
                message: 'success',
                result: response,
            });
        }
        catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                message: error.message || error.name || error,
            });
        }
    }
    async resetForgotPassword(req, res, next, body) {
        try {
            const response = await this.userService.resetForgotPassword({ ...body });
            return res.status(200).json({
                message: 'success',
                result: response,
            });
        }
        catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                message: error.message || error.name || error,
            });
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, swagger_1.ApiOkResponse)({ description: 'The resource will sign in user.' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Auth Failed' }),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function, user_dto_1.SignInDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signIn", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ description: 'The resource will register a new user.' }),
    (0, common_1.Post)('sign-up'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function, user_dto_1.SignUpDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signUp", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ description: 'The resource will validate user email by verifying otp sent to his email, also activate user' }),
    (0, common_1.Put)('activate-user'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function, user_dto_1.VerifySignUpOtpDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "verifySignUpOtp", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ description: 'The resource will resend OTP to user email' }),
    (0, common_1.Post)('resend-otp'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function, user_dto_1.ResendOtpDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resendUserOtp", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ description: `The resource will update a logged in user's password` }),
    (0, common_1.Put)('reset-password'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function, user_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPassword", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ description: `The resource will sent an email with OTP to user's email for resetting password` }),
    (0, common_1.Post)('forgot-password'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function, user_dto_1.ForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "forgotPassword", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ description: `The resource will reset a user's forgot password!` }),
    (0, common_1.Put)('reset-forgot-password'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function, user_dto_1.ResetForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetForgotPassword", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map