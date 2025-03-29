import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/register")
  Register(@Body() body: any): object {
    console.log(body)
    this.userService.createUser(body.name,body.email,body.password)
    return {"message":"User Created!"};
  }

}
