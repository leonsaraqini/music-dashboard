import { Module } from '@nestjs/common';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
    imports: [FirebaseModule],
    providers: [MusicService],
    controllers: [MusicController],
    exports: [MusicService]
})
export class MusicModule {}
