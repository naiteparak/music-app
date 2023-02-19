import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { faker } from '@faker-js/faker';
export class UpdatePasswordDto {
  @ApiProperty({
    example: 'password',
  })
  @IsString()
  oldPassword: string;

  @ApiProperty({
    example: faker.internet.password(),
  })
  @IsString()
  newPassword: string;
}
