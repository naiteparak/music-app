import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/entities/user.entity';
import crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(private usersRepository: Repository<UserEntity>) {}
  async signup(body: CreateUserDto): Promise<UserEntity> {
    const user: UserEntity = await this.usersRepository.create({
      ...body,
      id: crypto.randomUUID(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return await this.usersRepository.save(user);
  }

  async login(body: CreateUserDto) {
    const user = await this.usersRepository.findOneBy({
      login: body.login,
    });
    if (user.password !== body.password || !user) {
      throw new ForbiddenException('Something is incorrect');
    }
  }

  async refresh(body) {
    return `This action returns a # auth`;
  }
}
