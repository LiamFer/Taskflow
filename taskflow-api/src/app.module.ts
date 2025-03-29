import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './modules/User/user.module';
import { DatabaseModule } from './database/database.module';
import { JWTMiddleware } from './middleware/jwt.middleware';
import { AuthService } from './modules/Auth/auth.service';
import { BoardModule } from './modules/Board/board.module';

@Module({
  imports: [UserModule, BoardModule, DatabaseModule],
  providers: [AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JWTMiddleware).forRoutes('*');
  }
}
