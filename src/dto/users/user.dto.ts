import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IsStrongPassword } from 'src/utils/passwordValidator';
import { ApiProperty } from '@nestjs/swagger';

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

    @ApiProperty({
        example: 'test@gmail.com',
        required: true
    })
    @IsEmail()
    @IsNotEmpty()
    public email: string;

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

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    public oldPassword: string;
    
    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    public newPassword: string;

    // w
    public userId?: number;

}
