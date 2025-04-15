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

  async getBoardConnectedUsers(client: Socket) {
    const sockets = await this.server.in(client.data.boardID).fetchSockets();
    const emails = sockets.map((socket) => socket.data.email);
    return emails
  }

  handleConnection(client: Socket) {
    const email = client.handshake.auth.email;
    client.data.email = email;
  }

  async handleDisconnect(client: Socket) {
    const emails = await this.getBoardConnectedUsers(client)
    this.server.to(client.data.boardID).emit('memberConnected', emails);
  }

  @SubscribeMessage('joinBoard')
  async joinBoard(client: Socket, payload: { boardID: string }) {
    client.data.boardID = payload.boardID;
    client.join(payload.boardID);
    const emails = await this.getBoardConnectedUsers(client)
    this.server.to(payload.boardID).emit('memberConnected', emails);
  }

  @SubscribeMessage('taskEdited')
  handleTaskEdit(client: Socket, payload: any) {
    const boardRoom = client.data.boardID;
    if (boardRoom) {
      client.to(boardRoom).emit('taskUpdated', payload);
    }
  }

  @SubscribeMessage('taskMove')
  handleTaskMove(client: Socket, payload: any) {
    const boardRoom = client.data.boardID;
    if (boardRoom) {
      client.to(boardRoom).emit('taskMoved', payload);
    }
  }

  @SubscribeMessage('taskCreate')
  handleTaskCreate(client: Socket, payload: any) {
    const boardRoom = client.data.boardID;
    if (boardRoom) {
      client.to(boardRoom).emit('taskCreated', payload);
    }
  }

  @SubscribeMessage('taskDelete')
  handleTaskDelete(client: Socket, payload: any) {
    const boardRoom = client.data.boardID;
    if (boardRoom) {
      client.to(boardRoom).emit('taskDeleted', payload);
    }
  }

  @SubscribeMessage('listUpdate')
  handleListUpdate(client: Socket) {
    const boardRoom = client.data.boardID;
    if (boardRoom) {
      client.to(boardRoom).emit('listUpdated');
    }
  }

  @SubscribeMessage('listCreate')
  handleListCreate(client: Socket) {
    const boardRoom = client.data.boardID;
    if (boardRoom) {
      client.to(boardRoom).emit('listCreated');
    }
  }

  @SubscribeMessage('listDelete')
  handleListDelete(client: Socket, payload: any) {
    const boardRoom = client.data.boardID;
    if (boardRoom) {
      client.to(boardRoom).emit('listDeleted', payload);
    }
  }
}
