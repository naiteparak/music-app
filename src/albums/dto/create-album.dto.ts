import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty({
    example: faker.datatype.uuid(),
  })
  @IsOptional()
  @IsUUID()
  artistId: string | null;

  @ApiProperty({
    example: faker.music.songName(),
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: faker.date.past().getFullYear(),
  })
  @IsNumber()
  year: number;
}
