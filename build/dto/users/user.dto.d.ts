export declare class SignUpDto {
    email: string;
    userName: string;
    password: string;
    roleSlug: string;
}
export declare class SignInDto {
    userName: string;
    password: string;
    roleSlug: string;
}
export declare class ResetPasswordDto {
    oldPassword: string;
    newPassword: string;
    userId?: number;
}
export declare class ForgotPasswordDto {
    email: string;
}
export declare class ResetForgotPasswordDto {
    email: string;
    otp: number;
    newPassword: string;
}
export declare class VerifySignUpOtpDto {
    email: string;
    otp: number;
}
export declare class ResendOtpDto {
    email: string;
    otpType: string;
}
