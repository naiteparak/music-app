export interface IArtist {
  id: string;
  name: string;
  grammy: boolean;
}

export class Artist implements IArtist {
  constructor(props: IArtist) {
    Object.assign(this, props);
  }

  grammy: boolean;
  id: string;
  name: string;
}
