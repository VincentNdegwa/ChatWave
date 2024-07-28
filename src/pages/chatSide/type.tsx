export enum MessageStatus {
  SENT = "sent",
  FAILED = "failed",
  DELIVERED = "delivered",
  SENDING = "sending",
}
export type PendingMessage = {
  text: string | number;
  id: string;
  date: string;
  status: MessageStatus;
};
