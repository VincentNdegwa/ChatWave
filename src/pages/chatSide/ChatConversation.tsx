import { useEffect, useRef, useState } from "react";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { Role, Message } from "../../types";
import { getChatId, getUserId } from "../../modules/getUserId";
import socketConfigs from "../../modules/socketConfigs";
import useCustomAxios from "../../modules/customAxios";
import { MessageStatus, PendingMessage } from "./type";
import { LuLoader } from "react-icons/lu";
import { MdSmsFailed } from "react-icons/md";

type Props = {
  chatData: Role;
  pendingMessages: PendingMessage[] | [];
};

function ChatConversation({ chatData, pendingMessages }: Props) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState(chatData.chat.messages || []);
  const [userId, setUserId] = useState(getUserId());
  const [socket, setSocket] = useState(new socketConfigs().getSocket());
  const [pendingTexts, setPendingText] = useState<PendingMessage[] | []>(
    pendingMessages
  );
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };
  const axios = useCustomAxios();

  useEffect(() => {
    setMessages(chatData.chat.messages || []);
    scrollToBottom();
  }, [chatData.chat.messages, pendingMessages]);

  useEffect(() => {
    setPendingText(pendingMessages);
    scrollToBottom();
  }, [pendingMessages]);

  useEffect(() => {
    const uid = getUserId();
    setUserId(uid);
    const skt = new socketConfigs().getSocket();
    setSocket(skt);
    skt.emit("join", uid);
  }, []);

  useEffect(() => {
    const chatId = getChatId();
    if (userId && chatId) {
      axios
        .get(`/chats/user/${userId}/${chatId}`)
        .then((res) => {
          if (!res.data.error) {
            setMessages(res.data.data.chat.messages);
          }
        })
        .catch((error) => alert(error.message));
    }
  }, [axios, userId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  socket.on("nothing", () => {});

  return (
    // <div className="flex flex-col w-full h-full">
    <div className="flex flex-col w-full h-full gap-y-3 overflow-y-scroll scrollbar-custom">
      {messages.map((msg: Message) => {
        const isCurrentUser = msg.sender.id === Number(getUserId());
        return (
          <div
            key={msg.id}
            className={`w-3/6 p-2 ${
              isCurrentUser ? "self-end" : "self-start"
            }`}>
            <div
              className={`flex gap-x-2 w-full ${
                isCurrentUser ? "justify-end" : "justify-start"
              }`}>
              {!isCurrentUser && (
                <img
                  src={msg.sender.profile?.profile_pic || "/images/avatar.jpg"}
                  alt="profile-pic"
                  className="rounded-full h-10 w-10 self-end"
                />
              )}
              <div className="text-sm flex flex-col">
                <div
                  className={`p-2 ${
                    isCurrentUser
                      ? "bg-sky-100 text-sky-950"
                      : "bg-sky-700 text-white"
                  } rounded-t-lg ${
                    isCurrentUser ? "rounded-bl-lg" : "rounded-br-lg"
                  }`}>
                  {msg.text}
                </div>
                <div
                  className={`mt-2 ${
                    isCurrentUser ? "self-end flex gap-x-1" : ""
                  }`}>
                  <div className="text-xs">
                    {new Date(msg.sent_at).toLocaleTimeString()}
                  </div>
                  {isCurrentUser && <IoCheckmarkDoneOutline />}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {pendingTexts.map((msg) => {
        return (
          <div className="w-3/6 p-2 self-end">
            <div className="flex gap-x-2 w-full justify-end">
              <div className="text-sm flex flex-col">
                <div className=" bg-sky-100 text-sky-950 p-2 rounded-t-lg rounded-bl-lg">
                  {msg.text}
                </div>
                <div className="mt-2 self-end flex gap-x-1">
                  <div className="text-xs">
                    {new Date(msg.date).toLocaleTimeString()}
                  </div>
                  <div>
                    {msg.status == MessageStatus.SENDING && (
                      <LuLoader className=" animate-spin" />
                    )}

                    {msg.status == MessageStatus.FAILED && (
                      <MdSmsFailed className=" text-red-500 animate-bounce" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatConversation;
