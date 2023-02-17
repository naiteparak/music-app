import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TracksService } from './tracks.service';
import ITrack from './interfaces/track.interface';
import { IdParamDto } from '../common/id-param.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@ApiTags('Tracks')
@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  async findAll(): Promise<ITrack[]> {
    return this.tracksService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: IdParamDto): Promise<ITrack> {
    return this.tracksService.findOne(params);
  }

  @Post()
  async create(@Body() body: CreateTrackDto): Promise<ITrack> {
    return this.tracksService.create(body);
  }

  @Put(':id')
  async update(
    @Body() body: UpdateTrackDto,
    @Param() params: IdParamDto,
  ): Promise<ITrack> {
    return this.tracksService.update(body, params);
  }

  @Delete(':id')
  async delete(@Param() params: IdParamDto): Promise<void> {
    return this.tracksService.delete(params);
  }
}
