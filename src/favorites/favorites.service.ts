import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import IFavorites from './interfaces/favorites.interface';
import { TracksService } from '../tracks/tracks.service';
import { DB } from './DB/db';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { IAlbum } from '../albums/interfaces/albums.interface';
import { IArtist } from '../artists/interfaces/artists.interface';
import ITrack from '../tracks/interfaces/track.interface';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly tracksService: TracksService,
    private readonly albumsService: AlbumsService,
    private readonly artistsService: ArtistsService,
  ) {}

  findAll(): IFavorites {
    return DB;
  }

  findOne(key): IAlbum | IArtist | ITrack {
    switch (key.type) {
      case 'artists':
        const artist = DB.artists.find((artist) => artist.id === key.id);
        return artist;
        break;
      case 'albums':
        const album = DB.albums.find((album) => album.id === key.id);
        return album;
        break;
      case 'tracks':
        const track = DB.tracks.find((track) => track.id === key.id);
        return track;
        break;
      default:
        throw new InternalServerErrorException('Key type is wrong');
    }
  }

  addFavoriteTrack(params): string {
    const favTrack = this.tracksService.findOne({ id: params.id });
    DB.tracks.push(favTrack);
    return `Track ${params.id} added to favorites`;
  }

  deleteTrackFromFavorites(id): void {
    const favoriteTrackIndex = DB.tracks.findIndex((track) => track.id === id);
    if (favoriteTrackIndex === -1) {
      throw new NotFoundException('No track with this id');
    }
    DB.tracks.splice(favoriteTrackIndex, 1);
  }

  addFavoriteAlbum(params): string {
    const favAlbum = this.albumsService.findOne({ id: params.id });
    DB.albums.push(favAlbum);
    return `Album ${params.id} added to favorites`;
  }

  deleteAlbumFromFavorites(id): void {
    const favoriteAlbumIndex = DB.albums.findIndex((album) => album.id === id);
    if (favoriteAlbumIndex === -1) {
      throw new NotFoundException('No album with this id');
    }
    DB.albums.splice(favoriteAlbumIndex, 1);
  }

  addFavoriteArtist(params): string {
    const favArtist = this.artistsService.findOne({ id: params.id });
    DB.artists.push(favArtist);
    return `Artist ${params.id} added to favorites`;
  }

  deleteArtistFromFavorites(id): void {
    const favoriteArtistIndex = DB.artists.findIndex(
      (artist) => artist.id === id,
    );
    if (favoriteArtistIndex === -1) {
      throw new NotFoundException('No artist with this id');
    }
    DB.artists.splice(favoriteArtistIndex, 1);
  }
}
