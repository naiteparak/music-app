import { CreateAlbumDto } from './create-album.dto';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

export class UpdateAlbumDto implements Partial<CreateAlbumDto> {
  @ApiProperty({
    example: faker.music.songName(),
  })
  name: string;

  @ApiProperty({
    example: faker.date.past().getFullYear(),
  })
  year: number;
}
