import { Controller, Get, Param, ParseIntPipe, Post, Body } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./user.entity";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Post()
  async createUser(
    @Body('email') email: string,
    @Body('name') name: string,
  ): Promise<User> {
    return await this.usersService.create(email, name);
  }

  @Get()
  async fineAll(): Promise<User[]> {
    return await this.usersService.getAllUsers();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.getUser(id);
  }
}