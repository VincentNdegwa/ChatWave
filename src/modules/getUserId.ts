import { Profile, User } from "../types";

export function getUserId(): string | undefined {
  const uid = window.localStorage.getItem("userId");
  if (uid) {
    const userId = JSON.parse(uid);
    return userId;
  }
  return undefined;
}

export function getUser(): User | null {
  const jsonUser = window.localStorage.getItem("user");
  if (jsonUser) {
    const user: User = JSON.parse(jsonUser);
    return user;
  }
  return null;
}
export function getUserProfile(): Profile | null {
  const jsonUser = window.localStorage.getItem("user");
  if (jsonUser) {
    const user: User = JSON.parse(jsonUser);
    return user.profile;
  }
  return null;
}

export function getChatId(): number | null {
  const jsonChatId = window.localStorage.getItem("chatId");
  if (jsonChatId) {
    const chatId = JSON.parse(jsonChatId);
    return chatId;
  }
  return null;
}
