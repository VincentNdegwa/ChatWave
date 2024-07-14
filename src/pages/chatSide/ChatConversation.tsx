import { useEffect, useRef, useState } from "react";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { Role, Message } from "../../types";
import { getUserId } from "../../modules/getUserId";
import { existingUpdateMessage } from "./type";
import socketConfigs from "../../modules/socketConfigs";

type Props = {
  chatData: Role;
  message: Message | null;
  updateMessage: existingUpdateMessage | null;
};

function ChatConversation({ chatData, message, updateMessage }: Props) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState(chatData.chat.messages || []);
  const [userId, setUserId] = useState(getUserId());
  const [socket, setSocket] = useState(new socketConfigs().getSocket());
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    setMessages(chatData.chat.messages || []);
    scrollToBottom();
  }, [chatData.chat.messages]);
  useEffect(() => {
    const skt = new socketConfigs();
    const uid = getUserId();
    setSocket(skt.getSocket());
    setUserId(uid);
    if (uid) {
      skt.joinRoom("join", userId);
    }
  }, [userId]);

  useEffect(() => {
    socket.on("messageReceived", (newMessage) => {
      const latesMessage = newMessage.data;
      setMessages((prev) => {
        const textExist = prev.some((msg) => {
          if (msg.id === latesMessage.id || msg.id === 1.0) {
            return true;
          }
          return false;
        });
        if (!textExist) {
          return [...prev, latesMessage];
        }
        return prev;
      });
    });
  }, [socket]);
  useEffect(() => {
    if (message) {
      setMessages((prevMessages) => {
        const messageExists = prevMessages.some((msg) => msg.id === message.id);
        if (!messageExists) {
          return [...prevMessages, message];
        }
        return prevMessages;
      });
    }

    if (updateMessage) {
      setMessages((prevMessages) => {
        const message = prevMessages.find(
          (item) => item.id === updateMessage.existing_id
        );
        if (message) {
          message.text = updateMessage.text;
          message.id = updateMessage.id;
        }
        return prevMessages;
      });
    }
  }, [message, updateMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col w-full h-full">
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
                    src={
                      msg.sender.profile?.profile_pic || "/images/avatar.jpg"
                    }
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
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

export default ChatConversation;
