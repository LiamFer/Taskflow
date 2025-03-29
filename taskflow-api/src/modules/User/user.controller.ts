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

// USER ROUTE
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  Register(@Body() body: any, @Res() res: Response): object {
    try {
      console.log(body);
      this.userService.createUser(body.name, body.email, body.password);
      return ResponseUtil.sendResponse(res,HttpStatus.ALREADY_REPORTED,'User Created Successfully!')
    } catch (error) {
      return { statusCode: HttpStatus.BAD_REQUEST, message: error.message };
    }
  }

  @Post('login')
  Login(@Body() body: any): object {
    console.log(body);
    this.userService.createUser(body.name, body.email, body.password);
    return { message: 'User Created!' };
  }
}
