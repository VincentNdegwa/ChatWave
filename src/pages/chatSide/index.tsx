import { useState } from "react";
import { getUser } from "../../modules/getUserId";
import { Message, Role, User } from "../../types";
import ChatConversation from "./ChatConversation";
import ChatHead from "./ChatHead";
import SenderBox from "./SenderBox";

type Props = {
  onItemClick: () => void;
  openProfile: () => void;
  chatData: Role;
};

function Index({ onItemClick, openProfile, chatData }: Props) {
  const [message, setMessage] = useState<Message>();
  const messageSend = (text: string) => {
    const user: User | null = getUser();
    if (user != null) {
      const newMessage: Message = {
        id: Math.floor(Math.random() * 1000),
        text: text,
        sent_at: `${new Date()}`,
        updated_at: null,
        sender: user,
      };
      setMessage(newMessage);
    }
  };

  return (
    <div className="h-full flex flex-col justify-between gap-2">
      <div className="shadow-lg p-1 h-16 rounded-lg">
        <ChatHead
          onItemClick={onItemClick}
          openProfile={openProfile}
          chatData={chatData}
        />
      </div>
      <div className="h-5/6">
        <ChatConversation chatData={chatData} message={message} />
      </div>
      <div className="h-14 w-full rounded-md shadow-lg">
        <SenderBox messageSend={messageSend} />
      </div>
    </div>
  );
}

export default Index;
