import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class ResponseUtil {
  static sendResponse(
    res: Response, 
    statusCode: HttpStatus, 
    message: string, 
    data?: any, 
    error?: any,
    cookieOptions?: { name: string, value: string, options?: any }  // Parâmetro opcional para cookies
  ): Response {
    // Adicionando o cookie, se fornecido
    if (cookieOptions) {
      res.cookie(cookieOptions.name, cookieOptions.value, cookieOptions.options);  // Define o cookie
    }

    return res.status(statusCode).json({
      statusCode: statusCode,
      message: message,
      data: data,
      error: error,
    });
  }
}
