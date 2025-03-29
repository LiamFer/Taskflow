import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../Auth/auth.service';
import { Board } from 'src/database/entities/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  controllers: [],
  providers: [AuthService],
})
export class BoardModule {}
