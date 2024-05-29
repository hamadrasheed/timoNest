import { UserService } from './user.service';
import { Body, Controller, Next, Post, Req, Res, Put } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { SignInDto, SignUpDto, ResetPasswordDto, ForgotPasswordDto, ResetForgotPasswordDto, VerifySignUpOtpDto, ResendOtpDto } from '../../dto/users/user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @ApiOkResponse({ description: 'The resource will sign in user.' })
  @ApiUnauthorizedResponse({  description: 'Auth Failed' })
  @Post('login')
  public async signIn(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction, @Body() body: SignInDto) {

    try {

      const response = await this.userService.signIn({ ...body });

      return res.status(200).json({
          message: 'success',
          result: response,
      });

    } catch (error) {
      next(error);
      return;
    }
  }

  @ApiOkResponse({ description: 'The resource will register a new user.' })
  @Post('sign-up')
  public async signUp(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction, @Body() body: SignUpDto) {

    try {

      const response = await this.userService.signUp({ ...body });

      return res.status(200).json({
          message: 'success',
          result: response,
      });

    } catch (error) {
      next(error);
      return;
    }
  }

  @ApiOkResponse({ description: 'The resource will validate user email by verifying otp sent to his email, also activate user' })
  @Put('activate-user')
  public async verifySignUpOtp(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction, @Body() body: VerifySignUpOtpDto) {

    try {

      const response = await this.userService.verifySignUpOtp({ ...body });

      return res.status(200).json({
          message: 'success',
          result: response,
      });

    } catch (error) {
      next(error);
      return;
    }
  }

  @ApiOkResponse({ description: 'The resource will resend OTP to user email' })
  @Post('resend-otp')
  public async resendUserOtp(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction, @Body() body: ResendOtpDto) {

    try {

      const response = await this.userService.resendUserOtp({ ...body });

      return res.status(200).json({
          message: 'success',
          result: response,
      });

    } catch (error) {
      next(error);
      return;
    }
  }

  @ApiOkResponse({ description: `The resource will update a logged in user's password` })
  @Put('reset-password')
  public async resetPassword(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction, @Body() body: ResetPasswordDto) {

    try {

      const response = await this.userService.resetPassword({ ...body });

      return res.status(200).json({
          message: 'success',
          result: response,
      });

    } catch (error) {
      next(error);
      return;
    }
  }

  @ApiOkResponse({ description: `The resource will sent an email with OTP to user's email for resetting password` })
  @Post('forgot-password')
  public async forgotPassword(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction, @Body() body: ForgotPasswordDto) {

    try {

      const response = await this.userService.forgotPassword({ ...body });

      return res.status(200).json({
          message: 'success',
          result: response,
      });

    } catch (error) {
      next(error);
      return;
    }
  }

  @ApiOkResponse({ description: `The resource will reset a user's forgot password!` })
  @Put('reset-forgot-password')
  public async resetForgotPassword(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction, @Body() body: ResetForgotPasswordDto) {

    try {

      const response = await this.userService.resetForgotPassword({ ...body });

      return res.status(200).json({
          message: 'success',
          result: response,
      });

    } catch (error) {
      next(error);
      return;
    }
  }

}
