import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ArtistsEntity } from '../../artists/entities/artists.entity';
import { AlbumsEntity } from '../../albums/entities/albums.entity';

@Entity('tracks')
export class TracksEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  artistId: string | null;

  @Column()
  albumId: string | null;

  @Column()
  duration: number;

  @ManyToOne(() => ArtistsEntity, {
    onDelete: 'SET NULL',
  })
  artist: ArtistsEntity;

  @ManyToOne(() => AlbumsEntity, {
    onDelete: 'SET NULL',
  })
  albums: AlbumsEntity;
}
