import { UserService } from './user.service';
import { NextFunction, Request, Response } from 'express';
import { SignInDto, SignUpDto, ResetPasswordDto, ForgotPasswordDto, ResetForgotPasswordDto, VerifySignUpOtpDto, ResendOtpDto } from '../../dto/users/user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    signIn(req: Request, res: Response, next: NextFunction, body: SignInDto): Promise<Response<any, Record<string, any>>>;
    signUp(req: Request, res: Response, next: NextFunction, body: SignUpDto): Promise<Response<any, Record<string, any>>>;
    verifySignUpOtp(req: Request, res: Response, next: NextFunction, body: VerifySignUpOtpDto): Promise<Response<any, Record<string, any>>>;
    resendUserOtp(req: Request, res: Response, next: NextFunction, body: ResendOtpDto): Promise<Response<any, Record<string, any>>>;
    resetPassword(req: Request, res: Response, next: NextFunction, body: ResetPasswordDto): Promise<Response<any, Record<string, any>>>;
    forgotPassword(req: Request, res: Response, next: NextFunction, body: ForgotPasswordDto): Promise<Response<any, Record<string, any>>>;
    resetForgotPassword(req: Request, res: Response, next: NextFunction, body: ResetForgotPasswordDto): Promise<Response<any, Record<string, any>>>;
}
