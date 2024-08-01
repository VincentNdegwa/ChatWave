/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getChatId, getUser, getUserId } from "../../modules/getUserId";
import { Message, Participant, Role, User, callMode } from "../../types";
import ChatConversation from "./ChatConversation";
import ChatHead from "./ChatHead";
import SenderBox from "./SenderBox";
import useCustomAxios from "../../modules/customAxios";
import AlertNotification from "../Components/AlertNotification";
import socketConfigs from "../../modules/socketConfigs";
import { MessageStatus, PendingMessage } from "./type";
import { v4 as uuidv4 } from "uuid";

type Props = {
  onItemClick: () => void;
  openProfile: (profile: Participant) => void;
  chatData: Role;
  handleCall: (callType: {
    mode: callMode;
    sender_id: number | null;
    receiver_id: number | undefined;
  }) => void;
  addNewRole: (role: Role) => void;
};

function Index({
  onItemClick,
  openProfile,
  chatData,
  handleCall,
  addNewRole,
}: Props) {
  const [chatId, setChatId] = useState<number | null>(getChatId());
  const [userId, setUserId] = useState<number | null>(getUserId());

  const [alertMessage, setAlertMessage] = useState<string>("");
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [savedChatData, setSavedChatData] = useState<Role>(chatData);
  const [pendingMessages, setPendingMessages] = useState<Message[] | []>([]);
  const axios = useCustomAxios();
  const socket = new socketConfigs();

  const messageSend = (text: string) => {
    const user: User | null = getUser();
    const currentChatId: number = Number(window.localStorage.getItem("chatId"));
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
            const part: Participant[] = res.data.data.participants;
            const chatId = res.data.chatId;
            setChatId(chatId);
            window.localStorage.setItem("chatId", chatId);
            const currentPart = part.find((x) => x.user.id === userId);
            if (currentPart) {
              const newRole: Role = {
                id: currentPart?.id,
                role: currentPart?.role,
                chat: {
                  id: chatId,
                  created_at: res.data.data.created_at,
                  participants: part,
                  messages: [],
                  lastMessage: null,
                },
              };
              setSavedChatData(newRole);
              addNewRole(newRole);
              addMessage(text, user, chatId);
            }
          }
        })
        .catch((err) => {
          setOpenAlert(true);
          setAlertMessage(`${err}`);
          console.log(err);
        });
    } else {
      if (user && currentChatId) {
        setUserId(user.id);

        addMessage(text, user, currentChatId);
      }
    }
  };

  useEffect(() => {
    if (userId) {
      socket.joinRoom("join", userId);
    }
  }, [userId]);

  const addMessage = (text: string, user: User, chat_id: number) => {
    const newMessage: Message = {
      id: uuidv4(),
      text: text,
      sent_at: new Date().toISOString(),
      updated_at: null,
      sender: user,
      message_id: null,
      status: MessageStatus.SENDING,
    };

    setSavedChatData((prev) => {
      return {
        ...prev,
        chat: { ...prev.chat, messages: [...prev.chat.messages, newMessage] },
      };
    });

    const pMessage: PendingMessage = {
      id: newMessage.id.toString(),
      text: newMessage.text,
      date: new Date().toISOString(),
      status: MessageStatus.SENDING,
    };

    setPendingMessages((prev) => {
      return [...prev, newMessage];
    });

    const data = {
      text: newMessage.text,
      chat_id: chat_id,
      sender_id: newMessage.sender.id,
      receiver_id: savedChatData.chat.participants.find(
        (x) => x.user.id != newMessage.sender.id
      )?.user.id,
      message_id: pMessage.id,
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
    pendingMessages.map((x) => {
      if (
        x.id ===
        savedChatData.chat.messages.find((y) => y.message_id === x.id)
          ?.message_id
      ) {
        setSavedChatData((prev) => {
          return {
            ...prev,
            chat: {
              ...prev.chat,
              messages: prev.chat.messages.map((y) => {
                if (y.message_id === x.id) {
                  return { ...y, status: MessageStatus.SENT };
                }
                return y;
              }),
            },
          };
        });
      }
    });
  }, [chatData]);

  const closeAlert = () => {
    setOpenAlert(false);
    setAlertMessage("");
  };

  useEffect(() => {
    const JSONChatId = getChatId();
    if (JSONChatId) {
      setChatId(JSONChatId);
    }
  }, [chatId]);

  return (
    <div className="h-screen w-full flex flex-col">
      {openAlert && (
        <AlertNotification
          message={alertMessage}
          onClose={closeAlert}
          type="error"
        />
      )}
      {savedChatData?.chat ? (
        <>
          <div className="shadow-lg p-1 h-16 rounded-lg sticky top-0 bg-white z-10">
            <ChatHead
              onItemClick={onItemClick}
              openProfile={openProfile}
              chatData={savedChatData}
              handleCall={handleCall}
            />
          </div>
          <div className="flex-1 overflow-auto">
            <ChatConversation chatData={savedChatData} />
          </div>
          <div className="h-fit w-full rounded-md shadow-lg sticky bottom-0 bg-white z-10">
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
