import { UserService } from './user.service';
import { Body, Controller, Next, Post, Req, Res } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { SignInDto, SignUpDto } from 'src/dto/users/user.dto';


@Controller('user')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Post('login')
  public async signIn(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction, @Body() body: SignInDto) {

    try {

      const response = await this.userService.signIn({ ...body });

      return res.status(200).json({
          message: 'success',
          result: response,
      });

    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        message: error.message || error.name || error,
      });
    }
  }

  @Post('sign-up')
  public async signUp(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction, @Body() body: SignUpDto) {

    try {

      const response = await this.userService.signUp({ ...body });

      return res.status(200).json({
          message: 'success',
          result: response,
      });

    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        message: error.message || error.name || error,
      });
    }
  }

}
