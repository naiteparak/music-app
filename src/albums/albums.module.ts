import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { ArtistsService } from '../artists/artists.service';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, ArtistsService],
})
export class AlbumsModule {}
