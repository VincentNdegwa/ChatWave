import { MessageStatus } from "./pages/chatSide/type";

export type alertType = {
  message: string;
  type: "success" | "error" | "info" | "warning";
};
export interface Profile {
  id: number;
  first_name: string;
  last_name: string;
  profile_pic: string;
  about: string;
  created_at: string;
  updated_at: string | null;
}

export interface User {
  id: number;
  phone_number: string;
  created_at: string;
  updated_at: string | null;
  profile: Profile | null;
}

export interface Participant {
  id: number;
  role: string;
  user: User;
}
export enum ReadStatus {
  READ = "read",
  UNREAD = "unread",
}
export interface Message {
  id: number | string;
  text: string;
  sent_at: string;
  updated_at: string | null;
  sender: User;
  status: MessageStatus;
  message_id: string | null;
  read_status: ReadStatus;
}
export interface newMessage {
  id: number | string;
  text: string;
  sent_at: string;
  updated_at: string | null;
  sender: User;
  chat: Chat;
  status: MessageStatus;
}

export interface LastMessage {
  id: number | string;
  text: string;
  sent_at: string;
  updated_at: string | null;
  status: MessageStatus;
}

export interface Chat {
  id: number;
  created_at: string;
  participants: Participant[];
  messages: Message[];
  lastMessage: LastMessage | null;
}

export interface Role {
  id: number | string;
  role: string;
  chat: Chat;
}

export type RoleList = Role[];

export enum callMode {
  VIDEO = "video",
  VOICE = "voice",
}
export interface callerData {
  start: boolean;
  mode: callMode;
  sender: Participant | undefined;
  receiver: Participant | undefined;
}

