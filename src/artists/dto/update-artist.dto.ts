import { CreateArtistDto } from './create-artist.dto';

export class UpdateArtistDto
  extends CreateArtistDto
  implements Partial<CreateArtistDto> {}
