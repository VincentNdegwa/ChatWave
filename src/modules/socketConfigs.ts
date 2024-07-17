/* eslint-disable @typescript-eslint/no-explicit-any */
import { io } from "socket.io-client";

class socketConfigs {
  private BackendURL = import.meta.env.VITE_BackendURL;

  public joinRoom(room: string, data: any) {
    const skt = io(this.BackendURL);
    skt.emit(room, data);
  }
  //   public exitRoom(room: string, data: any) {
  //     this.socket.emit(room, data);
  //   }
  public getSocket() {
    const skt = io(this.BackendURL);
    return skt;
  }
}
export default socketConfigs;
