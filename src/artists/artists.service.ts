import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import * as crypto from 'crypto';
import { IdParamDto } from '../common/id-param.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';
import { FavoritesService } from '../favorites/favorites.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistsEntity } from './entities/artists.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumsService: AlbumsService,
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
    @InjectRepository(ArtistsEntity)
    private artistsRepository: Repository<ArtistsEntity>,
  ) {}

  async findAll(): Promise<ArtistsEntity[]> {
    return await this.artistsRepository.find();
  }

  async findOne(params: IdParamDto): Promise<ArtistsEntity> {
    const artist = await this.artistsRepository.findOneBy({ id: params.id });
    if (!artist) {
      throw new NotFoundException('No artist with this id');
    }
    return artist;
  }

  async create(body: CreateArtistDto): Promise<ArtistsEntity> {
    const artist: ArtistsEntity = await this.artistsRepository.create({
      ...body,
      id: crypto.randomUUID(),
    });
    return await this.artistsRepository.save(artist);
  }

  async update(
    params: IdParamDto,
    body: UpdateArtistDto,
  ): Promise<ArtistsEntity> {
    const artist: ArtistsEntity = await this.findOne(params);
    const updatedArtist: ArtistsEntity = await this.artistsRepository.create({
      ...artist,
      grammy: body.grammy,
      name: body.name,
    });
    return await this.artistsRepository.save(updatedArtist);
  }

  async delete(params: IdParamDto): Promise<void> {
    const artist = await this.findOne(params);
    await this.artistsRepository.delete(artist.id);
    const favoriteArtist = this.favoritesService.findOne({
      type: 'artists',
      id: params.id,
    });
    if (favoriteArtist) {
      this.favoritesService.deleteArtistFromFavorites(params.id);
    }
    const artistAlbums = await this.albumsService.findMany({
      artistId: params.id,
    });
    for (const album of artistAlbums) {
      await this.albumsService.update(
        { id: album.id },
        {
          ...album,
          artistId: null,
        },
      );
    }
    const artistsTracks = await this.tracksService.findMany({
      artistId: params.id,
    });
    for (const track of artistsTracks) {
      await this.tracksService.update(
        {
          ...track,
          artistId: null,
        },
        { id: track.id },
      );
    }
  }
}
