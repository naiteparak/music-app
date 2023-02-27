import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(body: CreateUserDto): Promise<string> {
    const user = await this.userService.findOneByLogin(body.login);
    if (user) {
      throw new ConflictException('User with this username already exist');
    }
    const hashedPass = await bcrypt.hash(
      body.password,
      +this.configService.get('CRYPT_SALT'),
    );
    await this.userService.create({
      password: hashedPass,
      login: body.login,
    });
    return 'You have successfully sign up';
  }

  async login(user) {
    return {
      access_token: this.jwtService.sign(
        { id: user.id, login: user.login },
        {
          secret: this.configService.get('JWT_SECRET_KEY'),
          expiresIn: this.configService.get('TOKEN_EXPIRE_TIME'),
        },
      ),
      refresh_token: this.jwtService.sign(
        {},
        {
          secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
          expiresIn: this.configService.get('TOKEN_REFRESH_EXPIRE_TIME'),
        },
      ),
    };
  }

  async refresh(body) {
    return `This action returns a # auth`;
  }
}
