import { Module } from '@nestjs/common';
import { UserModule } from './modules/User/user.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [UserModule, DatabaseModule]
})
export class AppModule {}
