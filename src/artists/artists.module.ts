import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';

@Module({
  imports: [],
  controllers: [ArtistsController],
  providers: [ArtistsService],
})
export class ArtistsModule {}
