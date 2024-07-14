/* eslint-disable @typescript-eslint/no-explicit-any */
import { io } from "socket.io-client";

class socketConfigs {
  private socket;
  constructor() {
    this.socket = io("http://localhost:3000");
  }

  public joinRoom(room: string, data: any) {
    this.socket.emit(room, data);
  }
  //   public exitRoom(room: string, data: any) {
  //     this.socket.emit(room, data);
  //   }
  public getSocket() {
    return this.socket;
  }
}
export default socketConfigs;
