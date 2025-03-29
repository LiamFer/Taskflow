import {
  Body,
  Controller,
  Get,
  HttpStatus,
  HttpException,
  Post,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { ResponseUtil } from 'src/utils/response';
import { AuthService } from '../Auth/auth.service';

// USER ROUTE
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('register')
  Register(@Body() body: any, @Res() res: Response): object {
    try {
      console.log(body);
      this.userService.createUser(body.name, body.email, body.password);
      return ResponseUtil.sendResponse(
        res,
        HttpStatus.CREATED,
        'User Created Successfully!',
      );
    } catch (error) {
      return { statusCode: HttpStatus.BAD_REQUEST, message: error.message };
    }
  }

  @Post('login')
  async Login(@Body() body: any, @Res() res: Response): Promise<object> {
    const authUser = await this.userService.authenticateUser(
      body.email,
      body.password,
    );

    if (authUser) {
      // Gerando o JWT
      const jwtToken = this.authService.generateToken(body);

      // Definindo as opções do cookie
      const cookieOptions = {
        name: 'jwt', 
        value: jwtToken,
        options: {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', 
          maxAge: 3600000, // 1 hora de expiração
        },
      };

      return ResponseUtil.sendResponse(
        res,
        HttpStatus.ACCEPTED,
        'User Logged!',
        null, 
        null, 
        cookieOptions,
      );
    } else {
      return ResponseUtil.sendResponse(
        res,
        HttpStatus.NOT_FOUND,
        'User not Found!',
      );
    }
  }
}
