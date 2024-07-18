import { Profile, User } from "../types";

export function getUserId(): number | null {
  const uid = window.localStorage.getItem("userId");
  if (uid) {
    const userId = JSON.parse(uid);
    return userId;
  }
  // window.location.href = "/login";
  return null;
}

export function getUser(): User | null {
  const jsonUser = window.localStorage.getItem("user");
  if (jsonUser) {
    const user: User = JSON.parse(jsonUser);
    return user;
  }
  // window.location.href = "/login";
  return null;
}
export function getUserProfile(): Profile | null {
  const jsonUser = window.localStorage.getItem("user");
  if (jsonUser) {
    const user: User = JSON.parse(jsonUser);
    return user.profile;
  }
  // window.location.href = "/login";
  return null;
}

export function getChatId(): number | null {
  const jsonChatId = window.localStorage.getItem("chatId");
  if (jsonChatId) {
    const chatId = JSON.parse(jsonChatId);
    return chatId;
  }
  // window.location.href = "/login";
  return null;
}
