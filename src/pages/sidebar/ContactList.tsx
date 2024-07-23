import { useEffect, useState } from "react";
import { RoleList } from "../../types";
import Contact from "./Contact";

type Props = {
  onItemClick: (chatId: number) => void;
  chatsData: RoleList;
};

function ContactList({ onItemClick, chatsData }: Props) {
  const [contactData, setContactData] = useState<RoleList>(chatsData);

  useEffect(() => {
    setContactData(chatsData);
    console.log(chatsData);
  }, [chatsData]);

  return (
    <div className="w-full flex flex-col gap-1">
      {contactData &&
        contactData.map((chatItem) => {
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
