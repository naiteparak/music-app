import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards()
  @Post('signup')
  async signup(@Body() body: CreateUserDto): Promise<string> {
    return this.authService.signup(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body: CreateUserDto) {
    return this.authService.login(body);
  }

  @UseGuards()
  @Post('refresh')
  refresh(@Body() body) {
    return this.authService.refresh(body);
  }
}
