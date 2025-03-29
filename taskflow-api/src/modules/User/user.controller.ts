import {
  Body,
  Controller,
  Get,
  HttpStatus,
  HttpException,
  Post,
  Res,
} from '@nestjs/common';
import { UserService, validationResponse } from './user.service';
import { Response } from 'express';
import { ResponseUtil } from 'src/utils/response';
import { AuthService } from '../Auth/auth.service';
import { user } from 'src/interfaces/userInterface';

// USER ROUTE
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async Register(@Body() body: user, @Res() res: Response): Promise<object> {
    // Verificando se o Usuário recebido cumpre os requisitos
    const userValidation : validationResponse = await this.userService.validateRegister(body);
    if (!userValidation.state) {
      return ResponseUtil.sendResponse(
        res,
        HttpStatus.BAD_REQUEST,
        userValidation.reason,
      );
    }

    // Criando o Usuário no Banco
    try {
      await this.userService.createUser(body);
      return ResponseUtil.sendResponse(
        res,
        HttpStatus.CREATED,
        'User Created Successfully!',
      );
    } catch (error) {
      return ResponseUtil.sendResponse(
        res,
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Internal Server Error",
      );
    }
  }

  @Post('login')
  async Login(@Body() body: user, @Res() res: Response): Promise<object> {
    const authUser = await this.userService.authenticateUser(body);

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
        },
      };

      return ResponseUtil.sendResponse(
        res,
        HttpStatus.OK,
        'User Logged!',
        null,
        null,
        cookieOptions,
      );
    } else {
      return ResponseUtil.sendResponse(
        res,
        HttpStatus.UNAUTHORIZED,
        'Usuário não existe',
      );
    }
  }
}
