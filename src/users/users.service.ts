import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUser, User } from './interfaces/users.interface';
import { CreateUserDto } from './dto/create-user.dto';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {
  private readonly users: IUser[] = [];
  findAll(): IUser[] {
    return this.users;
  }

  findOne(params): IUser {
    const user = this.users.find((user) => user.id === params.id);
    if (!user) {
      throw new NotFoundException('No user with this id');
    }
    return user;
  }

  create(body: CreateUserDto): IUser {
    const user = new User({
      ...body,
      id: crypto.randomUUID(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    this.users.push(user);
    return user;
  }

  update(params, body): IUser {
    const user = this.findOne(params);
    if (user.password !== body.oldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }
    const userIndex = this.users.findIndex((user) => user.id === params.id);
    this.users.splice(userIndex, 1, { ...user, password: body.newPassword });
    return user;
  }

  delete(params): void {
    const userIndex = this.users.findIndex((user) => user.id === params.id);
    if (userIndex === -1) {
      throw new NotFoundException('No user with this id');
    }
    this.users.splice(userIndex, 1);
  }
}
