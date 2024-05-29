import { IsEmail, IsNotEmpty, IsNumber, IsString, IsIn } from 'class-validator';
import { IsStrongPassword } from '../../utils/passwordValidator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {

    @ApiProperty({
        example: 'testUser@gmail.com',
        required: true
    })
    @IsEmail()
    @IsNotEmpty()
    public email: string;
    
    @ApiProperty({
        example: 'testUser',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    public userName: string;
    
    @ApiProperty({
        example: 'Ae@12345',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    public password: string;

    @ApiProperty({
        example: 'carrier_admin',
        required: true
    })    
    @IsString()
    @IsNotEmpty()
    public roleSlug: string;
}

export class SignInDto {

    @ApiProperty({
        example: 'testUser',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    public userName: string;

    @ApiProperty({
        example: 'Ab@12345',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    public password: string;

    @ApiProperty({
        example: 'carrier_admin',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    public roleSlug: string;
}

export class ResetPasswordDto {

    @ApiProperty({
        example: 'Ab@12345',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    public oldPassword: string;
    
    @ApiProperty({
        example: 'Dnb!12345',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    public newPassword: string;

    // This user id will be added from authentication middleware
    public userId?: number;

}

export class ForgotPasswordDto {

    @ApiProperty({
        example: 'testUser@gmail.com',
        required: true
    })
    @IsEmail()
    @IsNotEmpty()
    public email: string;

}

export class ResetForgotPasswordDto {

    @ApiProperty({
        example: 'testUser@gmail.com',
        required: true
    })
    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @ApiProperty({
        example: '4321',
        required: true
    })
    @IsNumber()
    @IsNotEmpty()
    public otp: number;

    @ApiProperty({
        example: 'Dnb!12345',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    public newPassword: string;
}

export class VerifySignUpOtpDto {

    @ApiProperty({
        example: 'testUser@gmail.com',
        required: true
    })
    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @ApiProperty({
        example: '4321',
        required: true
    })
    @IsNumber()
    @IsNotEmpty()
    public otp: number;

}

export class ResendOtpDto {

    @ApiProperty({
        example: 'testUser@gmail.com',
        required: true
    })
    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @ApiProperty({
        example: 'signUp | password',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    @IsIn(['signUp', 'password'])
    public otpType: string;

}
