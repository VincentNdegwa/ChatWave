import { RoleList } from "../../types";
import Contact from "./Contact";

type Props = {
  onItemClick: (chatId: number) => void;
  chatsData: RoleList;
};

function ContactList({ onItemClick, chatsData }: Props) {
  return (
    <div className="w-full flex flex-col gap-1">
      {chatsData.map((chatItem) => {
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
