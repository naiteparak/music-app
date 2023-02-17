import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DB } from './DB/db';
import ITrack, { Track } from './interfaces/track.interface';
import { IdParamDto } from '../common/id-param.dto';
import * as crypto from 'crypto';
import { CreateTrackDto } from './dto/create-track.dto';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { UpdateTrackDto } from './dto/update-track.dto';
import * as lodash from 'lodash';

@Injectable()
export class TracksService {
  constructor(
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistsService: ArtistsService,
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumsService: AlbumsService,
  ) {}

  findAll(): ITrack[] {
    return DB;
  }

  findMany(key): ITrack[] {
    return lodash.filter(DB, lodash.matches(key));
  }

  findOne(params: IdParamDto): ITrack {
    const track = DB.find((track) => track.id === params.id);
    if (!track) {
      throw new NotFoundException('No track with this id');
    }
    return track;
  }

  create(body: CreateTrackDto): ITrack {
    if (body.albumId !== null) {
      this.albumsService.findOne({ id: body.albumId });
    }
    if (body.artistId !== null) {
      this.artistsService.findOne({ id: body.artistId });
    }
    const track = new Track({
      ...body,
      id: crypto.randomUUID(),
    });
    DB.push(track);
    return track;
  }

  update(body: UpdateTrackDto, params: IdParamDto): ITrack {
    if (body.albumId !== null) {
      this.albumsService.findOne({ id: body.albumId });
    }
    if (body.artistId !== null) {
      this.artistsService.findOne({ id: body.artistId });
    }
    const track = this.findOne(params);
    const trackIndex = DB.findIndex((track) => track.id === params.id);
    const changedTrack: ITrack = {
      ...track,
      ...body,
    };
    DB.splice(trackIndex, 1, changedTrack);
    return changedTrack;
  }

  delete(params: IdParamDto): void {
    const trackIndex = DB.findIndex((track) => track.id === params.id);
    if (trackIndex === -1) {
      throw new NotFoundException('No track with this id');
    }
    DB.splice(trackIndex, 1);
  }
}
