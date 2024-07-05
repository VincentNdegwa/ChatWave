import { User } from "../../types";
export enum MessageStatus {
  SENT = "sent",
  FAILED = "failed",
  DELIVERED = "delivered",
  SENDING = "sending",
}

export type existingUpdateMessage = {
  existing_id: number;
  status: MessageStatus;
  id: number;
  text: string;
  sent_at: string;
  updated_at: string | null;
  sender: User;
};
