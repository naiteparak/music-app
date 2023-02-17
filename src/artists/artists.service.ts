import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Artist, IArtist } from './interfaces/artists.interface';
import { CreateArtistDto } from './dto/create-artist.dto';
import * as crypto from 'crypto';
import { IdParamDto } from '../common/id-param.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DB } from './DB/db';
import { AlbumsService } from '../albums/albums.service';

@Injectable()
export class ArtistsService {
  constructor(
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumsService: AlbumsService,
  ) {}

  findAll(): IArtist[] {
    return DB;
  }

  findOne(params: IdParamDto): IArtist {
    const artist = DB.find((artist) => artist.id === params.id);
    if (!artist) {
      throw new NotFoundException('No artist with this id');
    }
    return artist;
  }

  create(body: CreateArtistDto): IArtist {
    const artist = new Artist({
      ...body,
      id: crypto.randomUUID(),
    });
    DB.push(artist);
    return artist;
  }

  update(params: IdParamDto, body: UpdateArtistDto): IArtist {
    const artist = this.findOne(params);
    const artistIndex = DB.findIndex((artist) => artist.id === params.id);
    const changedArtist: IArtist = {
      ...artist,
      grammy: body.grammy,
      name: body.name,
    };
    DB.splice(artistIndex, 1, changedArtist);
    return changedArtist;
  }

  delete(params: IdParamDto): void {
    const artistIndex = DB.findIndex((artist) => artist.id === params.id);
    if (artistIndex === -1) {
      throw new NotFoundException('No artist with this id');
    }
    const artistAlbums = this.albumsService.findMany({ artistId: params.id });
    for (const album of artistAlbums) {
      this.albumsService.update(
        { id: album.id },
        {
          ...album,
          artistId: null,
        },
      );
    }
    DB.splice(artistIndex, 1);
  }
}
