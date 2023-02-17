import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Album, IAlbum } from './interfaces/albums.interface';
import { IdParamDto } from '../common/id-param.dto';
import * as crypto from 'crypto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DB } from './DB/db';
import { ArtistsService } from '../artists/artists.service';
import * as lodash from 'lodash';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class AlbumsService {
  constructor(
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistsService: ArtistsService,
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
  ) {}

  findAll(): IAlbum[] {
    return DB;
  }

  findMany(key): IAlbum[] {
    return lodash.filter(DB, lodash.matches(key));
  }

  findOne(params: IdParamDto): IAlbum {
    const album = DB.find((album) => album.id === params.id);
    if (!album) {
      throw new NotFoundException('No album with this id');
    }
    return album;
  }

  create(body): IAlbum {
    if (body.artistId !== null) {
      this.artistsService.findOne({ id: body.artistId });
    }
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
    if (body.artistId !== null) {
      this.artistsService.findOne({ id: body.artistId });
    }
    const album = this.findOne(params);
    const albumIndex = DB.findIndex((album) => album.id === params.id);
    const changedAlbum: IAlbum = {
      ...album,
      ...body,
    };
    DB.splice(albumIndex, 1, changedAlbum);
    return changedAlbum;
  }

  delete(params: IdParamDto) {
    const albumIndex = DB.findIndex((album) => album.id === params.id);
    if (albumIndex === -1) {
      throw new NotFoundException('No album with this id');
    }
    const albumsTracks = this.tracksService.findMany({ albumId: params.id });
    for (const track of albumsTracks) {
      this.tracksService.update(
        {
          ...track,
          albumId: null,
        },
        { id: track.id },
      );
    }
    DB.splice(albumIndex, 1);
  }
}
