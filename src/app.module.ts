import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, ArtistsModule, AlbumsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
