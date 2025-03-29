import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './modules/User/user.module';
import { DatabaseModule } from './database/database.module';
import { JWTMiddleware } from './middleware/jwt.middleware';
import { AuthService } from './modules/Auth/auth.service';

@Module({
  imports: [UserModule, DatabaseModule],
  providers:[AuthService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JWTMiddleware)
      .forRoutes('*');
  }
}
