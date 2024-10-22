import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Controller('lists')
export class ListsController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Get(':userId')
  async getUserLists(@Param('userId') userId: string) {
    return this.firebaseService.getUserLists(userId);
  }

  @Post(':userId')
  async addUserList(@Param('userId') userId: string, @Body() body: { name: string }) {
    return this.firebaseService.addUserList(userId, body.name);
  }

  @Delete(':userId/:listId')
  async deleteUserList(@Param('userId') userId: string, @Param('listId') listId: string) {
    return this.firebaseService.deleteUserList(userId, listId);
  }
}