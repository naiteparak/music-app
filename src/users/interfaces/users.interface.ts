import { Exclude } from 'class-transformer';

export interface IUser {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export class User implements IUser {
  constructor(props: IUser) {
    Object.assign(this, props);
  }

  createdAt: number;
  id: string;
  login: string;

  @Exclude()
  password: string;

  updatedAt: number;
  version: number;
}
