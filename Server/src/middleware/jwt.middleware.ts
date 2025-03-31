import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/modules/Auth/auth.service';
import * as dayjs from 'dayjs';
import { readSync } from 'fs';
import { ResponseUtil } from 'src/utils/response';

// Middleware que verifica se o Token recebido é válido ou não
@Injectable()
export class JWTMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.jwt;

    // Verificando se recebeu o Token
    if (!token) return next();

    // Verificando se ele é válido
    try {
      const validateToken = this.authService.verifyToken(token);
      const expiryDate = dayjs.unix(validateToken.exp);
      const diffInHours = expiryDate.diff(dayjs(), 'hour');

      // Caso falte Duas Horas ou menos pro Token expirar eu gero um novo Token
      if (diffInHours <= 2) {
        const payload = { id: validateToken.id, email: validateToken.email };
        const newToken = this.authService.generateToken(payload);
        res.cookie('jwt', newToken);
      }
    } catch (error) {
      // Token Inválido Redirecionar pra Página de Login e limpar JWT inválido
      res.clearCookie('jwt');
      console.log(error);
      ResponseUtil.sendResponse(res, HttpStatus.UNAUTHORIZED, 'Login Expirado');
      return;
    }

    next();
  }
}
