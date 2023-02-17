import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTrackDto {
  @ApiProperty({
    example: faker.music.songName(),
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: faker.datatype.uuid(),
  })
  @IsOptional()
  @IsUUID()
  artistId: string | null;

  @ApiProperty({
    example: faker.datatype.uuid(),
  })
  @IsOptional()
  @IsUUID()
  albumId: string | null;

  @ApiProperty({
    example: faker.datatype.number({ min: 30, max: 6000 }),
  })
  @IsNumber()
  duration: number;
}
