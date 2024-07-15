import { useEffect, useState } from "react";
import socketConfigs from "../../modules/socketConfigs";
import { RoleList, newMessage } from "../../types";
import Contact from "./Contact";
import { getChatId, getUserId } from "../../modules/getUserId";

type Props = {
  onItemClick: (chatId: number) => void;
  chatsData: RoleList;
};

function ContactList({ onItemClick, chatsData }: Props) {
  const socket = new socketConfigs();
  // const [chatId, setChatId] = useState<number>();
  const [userId, setUserId] = useState<number>();
  const [latestMessage, setLatestMessage] = useState<newMessage>();
  const [contactData, setContactData] = useState<RoleList>(chatsData);

  useEffect(() => {
    const chId = getChatId();
    const uid = getUserId();
    if (chId && uid) {
      // setChatId(chId);
      setUserId(uid);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      socket.joinRoom("join", userId);
    }
  });

  useEffect(() => {
    const skt = socket.getSocket();
    skt.on("messageReceived", (data) => {
      if (!data.error) {
        setLatestMessage(data.data);
      }
    });
  });
  useEffect(() => {
    if (latestMessage) {
      setContactData((prevContactData) =>
        prevContactData.map((x) => {
          if (x.chat.id === latestMessage.chat.id) {
            return {
              ...x,
              chat: {
                ...x.chat,
                lastMessage: latestMessage,
              },
            };
          }
          return x;
        })
      );
      // console.log(latestMessage);
    }
  }, [latestMessage]);
  return (
    <div className="w-full flex flex-col gap-1">
      {contactData.map((chatItem) => {
        return (
          <Contact
            onItemClick={onItemClick}
            key={chatItem.chat.id}
            chat={chatItem.chat}
          />
        );
      })}
    </div>
  );
}

export default ContactList;
