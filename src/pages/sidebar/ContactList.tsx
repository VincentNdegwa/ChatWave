import { useEffect, useState } from "react";
import { RoleCountList } from "../../types";
import Contact from "./Contact";
import useCustomAxios from "../../modules/customAxios";

type Props = {
  onItemClick: (chatId: number) => void;
  chatsData: RoleCountList;
};

function ContactList({ onItemClick, chatsData }: Props) {
  const [contactData, setContactData] = useState<RoleCountList>(chatsData);
  const axios = useCustomAxios();

  useEffect(() => {
    setContactData(chatsData);
  }, [chatsData]);

  const handleDeleteChat = (participantId: number, userId: number) => {
    axios
      .delete(`chats/user/${participantId}/${userId}`)
      .then((res) => {
        const partId: number = res.data.data.participantId;
        const updatedData = contactData.filter((role) => role.id !== partId);
        setContactData(updatedData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleItemClick = (id: number) => {
    onItemClick(id);
    const data = chatsData.map((x) => {
      if (x.chat.id == id) {
        return { ...x, unreadCount: 0 };
      }
      return x;
    });
    setContactData(data);
  };

  return (
    <div className="w-full flex flex-col gap-1">
      {contactData &&
        contactData.map((chatItem) => {
          return (
            <Contact
              onItemClick={handleItemClick}
              key={chatItem.chat.id}
              chat={chatItem.chat}
              handleDeleteChat={handleDeleteChat}
              count={chatItem.unreadCount}
            />
          );
        })}
    </div>
  );
}

export default ContactList;
