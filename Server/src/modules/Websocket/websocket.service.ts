import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
  },
})
export class WebsocketService
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);
  }

  @SubscribeMessage('joinBoard')
  joinBoard(client: Socket, payload: { boardID: string }) {
    client.join(payload.boardID);
    console.log('Usuário entrou no Board ', payload.boardID);
    client.broadcast.emit('tarefaCriada', payload);
  }

  @SubscribeMessage('taskEdited')
  handleTaskEdit(client: Socket, payload: any) {
    const rooms = Array.from(client.rooms);
    const boardRoom = rooms.find((room) => room !== client.id);
    console.log(boardRoom);
    if (boardRoom) {
      console.log('Task eidtada');
      client.to(boardRoom).emit('taskUpdated', payload);
    }
  }

  @SubscribeMessage('taskMove')
  handleTaskMove(client: Socket, payload: any) {
    console.log(payload);
    const rooms = Array.from(client.rooms);
    const boardRoom = rooms.find((room) => room !== client.id);
    if (boardRoom) {
      console.log('Task Movida');
      client.to(boardRoom).emit('taskMoved', payload);
    }
  }

  @SubscribeMessage('taskCreate')
  handleTaskCreate(client: Socket, payload: any) {
    console.log(payload)
    const rooms = Array.from(client.rooms);
    const boardRoom = rooms.find((room) => room !== client.id);
    if (boardRoom) {
      client.to(boardRoom).emit('taskCreated', payload);
    }
  }

  @SubscribeMessage('taskDelete')
  handleTaskDelete(client: Socket, payload: any) {
    const rooms = Array.from(client.rooms);
    const boardRoom = rooms.find((room) => room !== client.id);
    if (boardRoom) {
      client.to(boardRoom).emit('taskDeleted', payload);
    }
  }

  @SubscribeMessage('listUpdate')
  handleListUpdate(client: Socket) {
    const rooms = Array.from(client.rooms);
    const boardRoom = rooms.find((room) => room !== client.id);
    if (boardRoom) {
      client.to(boardRoom).emit('listUpdated');
    }
  }

  @SubscribeMessage('listCreate')
  handleListCreate(client: Socket) {
    const rooms = Array.from(client.rooms);
    const boardRoom = rooms.find((room) => room !== client.id);
    if (boardRoom) {
      client.to(boardRoom).emit('listCreated');
    }
  }

  @SubscribeMessage('listDelete')
  handleListDelete(client: Socket, payload: any) {
    const rooms = Array.from(client.rooms);
    const boardRoom = rooms.find((room) => room !== client.id);
    if (boardRoom) {
      client.to(boardRoom).emit('listDeleted',payload);
    }
  }
}
