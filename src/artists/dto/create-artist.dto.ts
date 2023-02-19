import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
import { faker } from '@faker-js/faker';

export class CreateArtistDto {
  @ApiProperty({
    example: faker.name.fullName(),
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: faker.datatype.boolean(),
  })
  @IsBoolean()
  grammy: boolean;
}
