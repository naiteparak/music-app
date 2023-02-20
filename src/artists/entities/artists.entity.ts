import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('artists')
export class ArtistsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;
}
