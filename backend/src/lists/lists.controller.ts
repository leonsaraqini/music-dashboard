import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ListsService } from './lists.service';

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Get(':userId')
  async getUserLists(@Param('userId') userId: string) {
    return this.listsService.getUserLists(userId);
  }

  @Post(':userId')
  async addUserList(@Param('userId') userId: string, @Body() body: { name: string }) {
    return this.listsService.addUserList(userId, body.name);
  }

  @Delete(':userId/:listId')
  async deleteUserList(@Param('userId') userId: string, @Param('listId') listId: string) {
    return this.listsService.deleteUserList(userId, listId);
  }
}