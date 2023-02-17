import { forwardRef, Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { AlbumsModule } from '../albums/albums.module';

@Module({
  imports: [forwardRef(() => AlbumsModule)],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
