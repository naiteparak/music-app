export interface IAlbum {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

export class Album implements IAlbum {
  constructor(props: IAlbum) {
    Object.assign(this, props);
  }

  artistId: string | null;
  id: string;
  name: string;
  year: number;
}
