export interface IAlbum {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
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
