/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getChatId, getUser } from "../../modules/getUserId";
import { Message, Role, User } from "../../types";
import ChatConversation from "./ChatConversation";
import ChatHead from "./ChatHead";
import SenderBox from "./SenderBox";
import useCustomAxios from "../../modules/customAxios";
import AlertNotification from "../Components/AlertNotification";
import { existingUpdateMessage, MessageStatus } from "./type";

type Props = {
  onItemClick: () => void;
  openProfile: () => void;
  chatData: Role;
};

function Index({ onItemClick, openProfile, chatData }: Props) {
  const [message, setMessage] = useState<Message>();
  const [chatId, setChatId] = useState<number>();
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [openAlert, setOpenAlert] = useState<boolean>();
  const [savedMessage, setSavedMessage] = useState<existingUpdateMessage>();

  const axios = useCustomAxios();

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
      try {
        const data = {
          text: newMessage?.text,
          chat_id: chatId,
          sender_id: newMessage?.sender.id,
        };
        axios
          .post("/messages", data)
          .then((res) => {
            let msg: existingUpdateMessage | null = null;
            if (res.data.error && res.data.data) {
              setOpenAlert(true);
              setAlertMessage("An Error Occured");
              msg = {
                existing_id: newMessage.id,
                status: MessageStatus.FAILED,
                ...res.data.data,
              };
            } else {
              msg = {
                existing_id: newMessage.id,
                status: MessageStatus.SENT,
                ...res.data.data,
              };
            }
            if (msg !== null) {
              setSavedMessage(msg);
            }
          })
          .catch((err) => {
            setOpenAlert(true);
            setAlertMessage(err);
          });
      } catch (error) {
        setOpenAlert(true);
        setAlertMessage("An Error Occured");
      }
    }
  };

  const fetchChatMessage = (chatId: number) => {
    console.log(chatId);
  };
  const closeAlert = () => {
    setOpenAlert(false);
    setAlertMessage("");
  };

  useEffect(() => {
    const JSONChatId = getChatId();
    if (JSONChatId) {
      setChatId(JSONChatId);
      if (chatId) {
        fetchChatMessage(chatId);
      }
    }
  }, [chatId]);
  return (
    <div className="h-full flex flex-col justify-between gap-2">
      {openAlert && (
        <AlertNotification
          message={alertMessage}
          onClose={closeAlert}
          type="error"
        />
      )}

      <div className="shadow-lg p-1 h-16 rounded-lg">
        <ChatHead
          onItemClick={onItemClick}
          openProfile={openProfile}
          chatData={chatData}
        />
      </div>
      <div className="h-5/6">
        <ChatConversation
          chatData={chatData}
          message={message}
          updateMessage={savedMessage}
        />
      </div>
      <div className="h-14 w-full rounded-md shadow-lg">
        <SenderBox messageSend={messageSend} />
      </div>
    </div>
  );
}

export default Index;
