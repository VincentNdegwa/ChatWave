/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { Role, Message, ReadStatus } from "../../types";
import { getChatId, getUserId } from "../../modules/getUserId";
import socketConfigs from "../../modules/socketConfigs";
import useCustomAxios from "../../modules/customAxios";
import { MessageStatus } from "./type";
import { LuLoader } from "react-icons/lu";
import { MdSmsFailed } from "react-icons/md";

type Props = {
  chatData: Role;
};

function ChatConversation({ chatData }: Props) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState(chatData.chat.messages || []);
  const [userId, setUserId] = useState(getUserId());
  const [socket, setSocket] = useState(new socketConfigs().getSocket());

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };
  const axios = useCustomAxios();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const uid = getUserId();
    setUserId(uid);

    const skt = new socketConfigs().getSocket();
    setSocket(skt);
    skt.emit("join", uid);
  }, []);

  useEffect(() => {
    scrollToBottom();
    setMessages(chatData.chat.messages);
    const messageId = chatData.chat.messages.map((x) => {
      if (x.sender.id !== userId && x.read_status == ReadStatus.UNREAD) {
        return x.id;
      }
    });
    if (messageId && messageId.length != 0) {
      readMessages(messageId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatData.chat.messages, messages, userId]);

  useEffect(() => {
    const cId = getChatId();
    if (userId && cId) {
      axios
        .get(`/chats/user/${userId}/${cId}`)
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

  const readMessages = (messageIds: (string | number | undefined)[]) => {
    if (messageIds.length > 0) {
      const senderId = chatData.chat.participants.find(
        (x) => x.user.id != userId
      )?.user.id;

      const cId = getChatId();
      if (senderId !== undefined && cId != null) {
        const newIds = messageIds.filter(
          (x): x is string | number => x !== undefined
        );

        const payload: {
          senderId: string | number;
          chatId: string | number;
          messageIds: (number | string)[];
        } = { senderId: senderId, chatId: cId, messageIds: newIds };
        // console.log(payload);
        socket.emit("readMessage", payload);
      }
    }
  };

  socket.on("nothing", () => {});

  return (
    <div className="flex flex-col w-full h-full gap-y-3 overflow-y-scroll scrollbar-custom">
      {messages &&
        messages.map((msg: Message) => {
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
                    {isCurrentUser && (
                      <div>
                        {msg.status == MessageStatus.SENDING && (
                          <LuLoader className=" animate-spin" />
                        )}

                        {msg.status == MessageStatus.FAILED && (
                          <MdSmsFailed className=" text-red-500 animate-bounce" />
                        )}

                        {msg.status == MessageStatus.SENT && (
                          <IoCheckmarkDoneOutline
                            className={
                              msg.read_status == ReadStatus.READ
                                ? "text-blue-950"
                                : "text-slate-600"
                            }
                          />
                        )}
                      </div>
                    )}
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
