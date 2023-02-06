import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, ArtistsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
