import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IsStrongPassword } from 'src/utils/passwordValidator';

export class SignUpDto {
    @IsEmail()
    @IsNotEmpty()
    public email: string;
    
    @IsString()
    @IsNotEmpty()
    public userName: string;
    
    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    public password: string;

    @IsString()
    @IsNotEmpty()
    public roleSlug: string;
}

export class SignInDto {
    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    public password: string;

    @IsString()
    @IsNotEmpty()
    public roleSlug: string;
}

export class ResetPasswordDto {

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    public oldPassword: string;
    
    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    public newPassword: string;

    public userId?: number;

}
