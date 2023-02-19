import { Artist } from '../../artists/interfaces/artists.interface';
import { Album } from '../../albums/interfaces/albums.interface';
import { Track } from '../../tracks/interfaces/track.interface';

export default interface IFavorites {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export class Favorites {
  id: string;

  constructor(props: IFavorites) {
    Object.assign(this, props);
  }
}
