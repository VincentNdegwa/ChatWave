/* eslint-disable @typescript-eslint/no-explicit-any */
import { io } from "socket.io-client";

class CustomSocket {
  private static instance: CustomSocket;
  private BackendURL = import.meta.env.VITE_BackendURL;
  private skt = io(this.BackendURL, {
    transports: ["websocket"],
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  private constructor() {
    // Private constructor to prevent direct instantiation
  }

  public static getInstance(): CustomSocket {
    if (!CustomSocket.instance) {
      CustomSocket.instance = new CustomSocket();
    }
    return CustomSocket.instance;
  }

  public joinRoom(room: string, data: any) {
    this.skt.emit(room, data);
  }

  public exitRoom(room: string, data: any) {
    this.skt.emit(room, data);
  }

  public getSocket() {
    return this.skt;
  }
}

export default CustomSocket.getInstance();
