import { Controller, Get, Post } from '@nestjs/common';

@Controller('/messages')
export class MessagesController {
  @Get()
  listMessages() {
    return 'get response';
  }

  @Post()
  createMessage() {
    return 'post response';
  }

  @Get('/:id')
  getMessages() {
    return 'get 1 message response';
  }
}
