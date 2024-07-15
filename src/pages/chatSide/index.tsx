/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getChatId, getUser, getUserId } from "../../modules/getUserId";
import { Message, Participant, Role, User } from "../../types";
import ChatConversation from "./ChatConversation";
import ChatHead from "./ChatHead";
import SenderBox from "./SenderBox";
import useCustomAxios from "../../modules/customAxios";
import AlertNotification from "../Components/AlertNotification";
import socketConfigs from "../../modules/socketConfigs";

type Props = {
  onItemClick: () => void;
  openProfile: (profile: Participant) => void;
  chatData: Role;
};

function Index({ onItemClick, openProfile, chatData }: Props) {
  // const [message, setMessage] = useState<Message | null>(null);
  const [chatId, setChatId] = useState<number | null>(getChatId());
  const [userId, setUserId] = useState<number | null>(getUserId());

  const [alertMessage, setAlertMessage] = useState<string>("");
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  // const [savedMessage, setSavedMessage] =
  // useState<existingUpdateMessage | null>(null);
  const [savedChatData, setSavedChatData] = useState<Role>(chatData);

  const axios = useCustomAxios();
  const socket = new socketConfigs();

  const messageSend = (text: string) => {
    const user: User | null = getUser();
    const currentChatId: number | null = getChatId();
    if (!currentChatId && user) {
      const participant = {
        user_id: userId,
        added_user_id: savedChatData.chat.participants[0].user.id,
      };
      axios
        .post("/chats/create", participant)
        .then((res) => {
          if (res.data.error) {
            setOpenAlert(true);
            setAlertMessage(`${res.data.message}`);
          } else {
            setSavedChatData(res.data.data);
            setChatId(res.data.data.id);
            window.localStorage.setItem("chatId", res.data.data.id);
            addMessage(text, user, res.data.data.id);
          }
        })
        .catch((err) => {
          setOpenAlert(true);
          setAlertMessage(`${err}`);
          console.log(err);
        });
    } else {
      if (user && chatId) {
        setUserId(user.id);

        addMessage(text, user, chatId);
      }
    }
  };

  useEffect(() => {
    if (userId) {
      socket.joinRoom("join", userId);
    }
  });

  const addMessage = (text: string, user: User, chat_id: number) => {
    const newMessage: Message = {
      id: 1.0,
      text: text,
      sent_at: new Date().toISOString(),
      updated_at: null,
      sender: user,
    };

    const data = {
      text: newMessage.text,
      chat_id: chat_id,
      sender_id: newMessage.sender.id,
      receiver_id: savedChatData.chat.participants.find(
        (x) => x.user.id != newMessage.sender.id
      )?.user.id,
    };
    const skt = socket.getSocket();
    skt.emit("newMessage", data);
  };

  useEffect(() => {
    if (userId && chatId) {
      axios
        .get(`/chats/user/${userId}/${chatId}`)
        .then((res) => {
          if (res.data.error) {
            setOpenAlert(true);
            setAlertMessage(`${res.data.message}`);
          } else {
            setSavedChatData(res.data.data);
          }
        })
        .catch((error) => alert(error.message));
    }
  }, [userId, chatId]);

  useEffect(() => {
    setSavedChatData(chatData);
  }, [chatData]);

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
      {savedChatData?.chat ? (
        <>
          <div className="shadow-lg p-1 h-16 rounded-lg">
            <ChatHead
              onItemClick={onItemClick}
              openProfile={openProfile}
              chatData={savedChatData}
            />
          </div>
          <div className="h-5/6">
            <ChatConversation chatData={savedChatData} />
          </div>
          <div className="h-14 w-full rounded-md shadow-lg">
            <SenderBox messageSend={messageSend} />
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Index;
