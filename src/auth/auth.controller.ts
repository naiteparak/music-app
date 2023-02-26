import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserEntity } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: CreateUserDto): Promise<UserEntity> {
    return this.authService.signup(body);
  }

  @Post('login')
  async login(@Body() body: CreateUserDto) {
    return this.authService.login(body);
  }

  @Post('refresh')
  refresh(@Body() body) {
    return this.authService.refresh(body);
  }
}
