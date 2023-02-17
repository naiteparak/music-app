import { forwardRef, Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { ArtistsModule } from '../artists/artists.module';

@Module({
  imports: [forwardRef(() => ArtistsModule)],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
})
export class AlbumsModule {}
