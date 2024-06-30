export function getUserId(): string | undefined {
  const uid = window.localStorage.getItem("userId");
  if (uid) {
    const userId = JSON.parse(uid);
    return userId;
  }
  return undefined;
}
