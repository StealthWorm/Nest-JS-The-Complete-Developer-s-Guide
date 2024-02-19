import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';

@Controller('/messages')
export class MessagesController {
  @Get() // http GET localhost:3000/messages
  listMessages() {
    return 'get response';
  }

  @Post() // http POST localhost:3000/messages content="hi there"
  createMessage(@Body() body: CreateMessageDto) {
    console.log(body);
  }

  @Get('/:id') // http GET localhost:3000/messages/1
  getMessages(@Param('id') id: string) {
    console.log(id);
  }
}
