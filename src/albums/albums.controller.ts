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
import { ApiTags } from '@nestjs/swagger';
import { AlbumsService } from './albums.service';
import { IAlbum } from './interfaces/albums.interface';
import { IdParamDto } from '../common/id-param.dto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@ApiTags('Albums')
@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  async findAll(): Promise<IAlbum[]> {
    return this.albumsService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: IdParamDto): Promise<IAlbum> {
    return this.albumsService.findOne(params);
  }

  @Post()
  async create(@Body() body: CreateAlbumDto): Promise<IAlbum> {
    return this.albumsService.create(body);
  }

  @Put(':id')
  async update(
    @Param() params: IdParamDto,
    @Body() body: UpdateAlbumDto,
  ): Promise<IAlbum> {
    return this.albumsService.update(params, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param() params: IdParamDto) {
    return this.albumsService.delete(params);
  }
}
