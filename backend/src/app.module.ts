import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MusicModule } from './music/music.module';
import { AuthModule } from './auth/auth.module';
import { ListsModule } from './lists/lists.module';


@Module({
  imports: [MusicModule, AuthModule, ListsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
