import { Controller, Get, Put, Post, Body, Param, Delete, HttpException, HttpStatus} from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { Music } from './music.interface';
import { UpdateMusicDto } from './dto/update-music.dto';

@Controller('music')
export class MusicController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Get()
  async getAllMusic() {
    const musicList = await this.firebaseService.getAllMusic();
    return musicList;
  }

  @Put(':id')
  async updateMusic(@Param('id') id: string, @Body() updateMusicDto: UpdateMusicDto) {
    return this.firebaseService.update(id, updateMusicDto);
  }

  @Post()
  async addMusic(@Body() musicData: Music) {
    const musicId = await this.firebaseService.addMusic(musicData);
    return { id: musicId };
  }

  @Delete(':id')
  async deleteMusic(@Param('id') id: string): Promise<{ message: string }> {
    try {
      await this.firebaseService.deleteMusic(id);
      return { message: 'Music deleted successfully' };
    } catch (error) {
      throw new HttpException('Error deleting music', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}