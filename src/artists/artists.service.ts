import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist, IArtist } from './interfaces/artists.interface';
import { CreateArtistDto } from './dto/create-artist.dto';
import * as crypto from 'crypto';
import { IdParamDto } from '../common/id-param.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  private readonly artist: IArtist[] = [];

  findAll(): IArtist[] {
    return this.artist;
  }

  findOne(params: IdParamDto): IArtist {
    const artist = this.artist.find((artist) => artist.id === params.id);
    if (!artist) {
      throw new NotFoundException('No user with this id');
    }
    return artist;
  }

  create(body: CreateArtistDto): IArtist {
    const artist = new Artist({
      ...body,
      id: crypto.randomUUID(),
    });
    this.artist.push(artist);
    return artist;
  }

  update(params: IdParamDto, body: UpdateArtistDto): IArtist {
    const artist = this.findOne(params);
    const userIndex = this.artist.findIndex(
      (artist) => artist.id === params.id,
    );
    const changedArtist: IArtist = {
      ...artist,
      grammy: body.grammy,
      name: body.name,
    };
    this.artist.splice(userIndex, 1, changedArtist);
    return changedArtist;
  }

  delete(params: IdParamDto): void {
    const artistIndex = this.artist.findIndex((user) => user.id === params.id);
    if (artistIndex === -1) {
      throw new NotFoundException('No user with this id');
    }
    this.artist.splice(artistIndex, 1);
  }
}
