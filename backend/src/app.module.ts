import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseService } from './firebase/firebase.service';
import { ListsController } from './lists/lists.controller';
import { FirebaseModule } from './firebase/firebase.module';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { MusicController } from './music/music.controller';


@Module({
  imports: [FirebaseModule],
  controllers: [AppController, ListsController, AuthController, MusicController],
  providers: [AppService, FirebaseService],
})
export class AppModule {}
