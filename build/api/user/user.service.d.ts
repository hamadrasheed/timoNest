import * as models from '../../models';
import { Helper } from '../../shared/helper';
import { SignUpDto, SignInDto, ResetPasswordDto, ForgotPasswordDto, ResetForgotPasswordDto, VerifySignUpOtpDto, ResendOtpDto } from '../../dto/users/user.dto';
export declare class UserService extends Helper {
    private readonly userRepo;
    private readonly roleRepo;
    private readonly userOtpInfoRepo;
    constructor(userRepo: typeof models.users, roleRepo: typeof models.roles, userOtpInfoRepo: typeof models.userOtpInfo);
    signUp: (data: SignUpDto) => Promise<string>;
    signIn: (data: SignInDto) => Promise<{
        token: string;
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
    }>;
    resetPassword: (data: ResetPasswordDto) => Promise<string>;
    forgotPassword: (data: ForgotPasswordDto) => Promise<string>;
    resetForgotPassword: (data: ResetForgotPasswordDto) => Promise<string>;
    verifySignUpOtp: (data: VerifySignUpOtpDto) => Promise<string>;
    resendUserOtp: (data: ResendOtpDto) => Promise<string>;
}
