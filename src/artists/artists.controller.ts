import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { IArtist } from './interfaces/artists.interface';
import { ApiTags } from '@nestjs/swagger';
import { CreateArtistDto } from './dto/create-artist.dto';
import { IdParamDto } from '../common/id-param.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@ApiTags('Artists')
@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  async findAll(): Promise<IArtist[]> {
    return this.artistsService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: IdParamDto): Promise<IArtist> {
    return this.artistsService.findOne(params);
  }

  @Post()
  async create(@Body() body: CreateArtistDto): Promise<IArtist> {
    return this.artistsService.create(body);
  }

  @Put(':id')
  async update(
    @Param() params: IdParamDto,
    @Body() body: UpdateArtistDto,
  ): Promise<IArtist> {
    return this.artistsService.update(params, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param() params: IdParamDto): Promise<void> {
    return this.artistsService.delete(params);
  }
}
