import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

export class CreateAlbumDto {
  @ApiProperty({
    example: faker.datatype.uuid(),
  })
  artistId: string | null;

  @ApiProperty({
    example: faker.music.songName(),
  })
  name: string;

  @ApiProperty({
    example: faker.date.past().getFullYear(),
  })
  year: number;
}
