import { Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { ListsController } from './lists.controller';

@Module({
  imports: [FirebaseModule],
  providers: [ListsService],
  controllers: [ListsController],
  exports: [ListsService]
})
export class ListsModule {}
