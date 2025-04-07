import {
  Body,
  Controller,
  Get,
  HttpStatus,
  HttpException,
  Post,
  Res,
  Req,
} from '@nestjs/common';
import { UserService, validationResponse } from './user.service';
import { Response, Request } from 'express';
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
    const userValidation: validationResponse =
      await this.userService.validateRegister(body);
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
        'Internal Server Error',
      );
    }
  }

  @Post('login')
  async Login(@Body() body: user, @Res() res: Response): Promise<object> {
    const authUser: user | null = await this.userService.authenticateUser(body);
    if (authUser) {
      // Gerando o JWT
      const payload = { id: authUser.id, email: authUser.email };
      const jwtToken = this.authService.generateToken(payload);

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

  @Get('authme')
  async Auth(
    @Body() body: user,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<object> {
    // Endpoint pra validar se o login do Usuário é válido
    const token = req.cookies.jwt;

    if (!token) {
      return ResponseUtil.sendResponse(
        res,
        HttpStatus.UNAUTHORIZED,
        'Unauthorized!',
      );
    }

    try {
      const tokenData = await this.authService.verifyToken(token);
      const user = await this.userService.findByEmail(tokenData.email)

      if(!user) {return ResponseUtil.sendResponse(
        res,
        HttpStatus.UNAUTHORIZED,
        'Unauthorized!',
      );}

      return ResponseUtil.sendResponse(res, HttpStatus.OK, 'Authenticated!',{id:user.id,name:user.name,email:user.email});
    } catch (error) {
      return ResponseUtil.sendResponse(
        res,
        HttpStatus.UNAUTHORIZED,
        'Unauthorized!',
      );
    }
  }
}
