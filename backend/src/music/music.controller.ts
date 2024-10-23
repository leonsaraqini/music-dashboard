import { Controller, Get, Put, Post, Body, Param, Delete, HttpException, HttpStatus} from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { Music } from './music.interface';
import { UpdateMusicDto } from './dto/update-music.dto';
import { MusicService } from './music.service';

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Get()
  async getAllMusic() {
    const musicList = await this.musicService.getAllMusic();
    return musicList;
  }

  @Put(':id')
  async updateMusic(@Param('id') id: string, @Body() updateMusicDto: UpdateMusicDto) {
    return this.musicService.update(id, updateMusicDto);
  }

  @Post()
  async addMusic(@Body() musicData: Music) {
    const musicId = await this.musicService.addMusic(musicData);
    return { id: musicId };
  }

  @Delete(':id')
  async deleteMusic(@Param('id') id: string): Promise<{ message: string }> {
    try {
      await this.musicService.deleteMusic(id);
      return { message: 'Music deleted successfully' };
    } catch (error) {
      throw new HttpException('Error deleting music', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}