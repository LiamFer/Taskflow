import { Module } from '@nestjs/common';
import {  WebsocketService } from 'src/modules/Websocket/websocket.service';

@Module({
  providers: [WebsocketService],
})
export class SocketModule {}
