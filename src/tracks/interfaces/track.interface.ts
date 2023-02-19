export default interface ITrack {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export class Track implements ITrack {
  constructor(props: ITrack) {
    Object.assign(this, props);
  }
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}
