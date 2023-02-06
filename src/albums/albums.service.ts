import { Injectable, NotFoundException } from '@nestjs/common';
import { Album, IAlbum } from './interfaces/albums.interface';
import { IdParamDto } from '../common/id-param.dto';
import * as crypto from 'crypto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DB } from './DB/db';
import { ArtistsService } from '../artists/artists.service';

@Injectable()
export class AlbumsService {
  constructor(private readonly artistsService: ArtistsService) {}

  findAll(): IAlbum[] {
    return DB;
  }

  findOne(params: IdParamDto): IAlbum {
    const album = DB.find((album) => album.id === params.id);
    if (!album) {
      throw new NotFoundException('No artist with this id');
    }
    return album;
  }

  create(body): IAlbum {
    this.artistsService.findOne({ id: body.artistId });
    const album = new Album({
      artistId: body.artistId,
      id: crypto.randomUUID(),
      name: body.name,
      year: body.year,
    });
    DB.push(album);
    return album;
  }

  update(params: IdParamDto, body: UpdateAlbumDto): IAlbum {
    const album = this.findOne(params);
    const userIndex = DB.findIndex((artist) => artist.id === params.id);
    const changedAlbums: IAlbum = {
      ...album,
      year: body.year,
      name: body.name,
    };
    DB.splice(userIndex, 1, changedAlbums);
    return changedAlbums;
  }

  delete(params: IdParamDto) {
    const albumIndex = DB.findIndex((album) => album.id === params.id);
    if (albumIndex === -1) {
      throw new NotFoundException('No artist with this id');
    }
    DB.splice(albumIndex, 1);
  }
}
