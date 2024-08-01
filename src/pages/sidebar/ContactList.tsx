import { useEffect, useState } from "react";
import { RoleList } from "../../types";
import Contact from "./Contact";
import useCustomAxios from "../../modules/customAxios";

type Props = {
  onItemClick: (chatId: number) => void;
  chatsData: RoleList;
};

function ContactList({ onItemClick, chatsData }: Props) {
  const [contactData, setContactData] = useState<RoleList>(chatsData);
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

  return (
    <div className="w-full flex flex-col gap-1">
      {contactData &&
        contactData.map((chatItem) => {
          return (
            <Contact
              onItemClick={onItemClick}
              key={chatItem.chat.id}
              chat={chatItem.chat}
              handleDeleteChat={handleDeleteChat}
            />
          );
        })}
    </div>
  );
}

export default ContactList;
