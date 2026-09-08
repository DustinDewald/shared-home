import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller.js';
import { User } from './user.entity'; // Pfad zu Ihrem Bauplan

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Schaltet das Repository für User frei
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
