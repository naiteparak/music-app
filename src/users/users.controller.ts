import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from './interfaces/users.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { IdParamDto } from '../common/id-param.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(): Promise<IUser[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: IdParamDto): Promise<IUser> {
    return this.usersService.findOne(params);
  }

  @Post()
  async create(@Body() body: CreateUserDto): Promise<IUser> {
    return this.usersService.create(body);
  }

  @Put(':id')
  async update(
    @Param() params: IdParamDto,
    @Body() body: UpdatePasswordDto,
  ): Promise<IUser> {
    return this.usersService.update(params, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param() params: IdParamDto): Promise<void> {
    return this.usersService.delete(params);
  }
}
