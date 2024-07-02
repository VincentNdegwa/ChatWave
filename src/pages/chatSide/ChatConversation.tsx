import { useEffect, useRef, useState } from "react";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { Role, Message } from "../../types";
import { getUserId } from "../../modules/getUserId";

type Props = {
  chatData: Role;
};

function ChatConversation({ chatData }: Props) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [messages, setMessage] = useState(chatData.chat.messages || []);
  useEffect(() => {
    setMessage(chatData.chat.messages || []);
    scrollToBottom();
  }, [chatData.chat.messages]);

  return (
    <div className="flex flex-col justify-end w-full h-full">
      <div className="flex flex-col-reverse w-full h-full gap-y-3 overflow-y-scroll scrollbar-custom">
        {messages?.map((message: Message) => {
          const isCurrentUser = message.sender.id === Number(getUserId());
          return (
            <div
              key={message.id}
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
                      message.sender.profile?.profile_pic ||
                      "/images/avatar.jpg"
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
                    {message.text}
                  </div>
                  <div
                    className={`mt-2 ${
                      isCurrentUser ? "self-end flex gap-x-1" : ""
                    }`}>
                    <div className="text-xs">
                      {new Date(message.sent_at).toLocaleTimeString()}
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
