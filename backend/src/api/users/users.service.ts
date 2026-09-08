import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(email: string, name: string): Promise<User> {
    const newUser = this.usersRepository.create({ email, name });
    return await this.usersRepository.save(newUser);
  }

  async getAllUsers(): Promise<User[]> {
    const users: User[] = await this.usersRepository.find();
    return users;
  }

  async getUser(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User mit der ID ${id} wurde nicht gefunden.`);
    }

    return user;
  }
}
