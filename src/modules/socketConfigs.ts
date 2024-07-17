/* eslint-disable @typescript-eslint/no-explicit-any */
import { io } from "socket.io-client";

class socketConfigs {
  private socket;
  constructor() {
    const BackendURL = import.meta.env.VITE_BackendURL;

    if (BackendURL) {
      this.socket = io(BackendURL);
    }
  }

  public joinRoom(room: string, data: any) {
    if (this.socket) {
      this.socket.emit(room, data);
    }
  }
  //   public exitRoom(room: string, data: any) {
  //     this.socket.emit(room, data);
  //   }
  public getSocket() {
    if (this.socket) {
      return this.socket;
    }
  }
}
export default socketConfigs;
