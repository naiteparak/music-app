import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUser, User } from './interfaces/users.interface';
import { CreateUserDto } from './dto/create-user.dto';
import * as crypto from 'crypto';
import { IdParamDto } from '../common/id-param.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { DB } from './DB/db';

@Injectable()
export class UsersService {
  findAll(): IUser[] {
    return DB;
  }

  findOne(params: IdParamDto): IUser {
    const user = DB.find((user) => user.id === params.id);
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
    DB.push(user);
    return user;
  }

  update(params: IdParamDto, body: UpdatePasswordDto): IUser {
    const user = this.findOne(params);
    if (user.password !== body.oldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }
    const userIndex = DB.findIndex((user) => user.id === params.id);
    const changedUser = {
      ...user,
      password: body.newPassword,
      version: ++user.version,
      updatedAt: 1,
    };
    DB.splice(userIndex, 1, changedUser);
    return changedUser;
  }

  delete(params: IdParamDto): void {
    const userIndex = DB.findIndex((user) => user.id === params.id);
    if (userIndex === -1) {
      throw new NotFoundException('No user with this id');
    }
    DB.splice(userIndex, 1);
  }
}
