/* eslint-disable @typescript-eslint/no-explicit-any */
import { Route, Routes, useNavigate } from "react-router-dom";
import ChatSide from "./pages/chatSide";
import StartPage from "./pages/startPage";
import Overlay from "./pages/Components/Overlay";
import SideBar from "./pages/sidebar";
import { useEffect, useState } from "react";
import useCustomAxios from "./modules/customAxios";
import { getUserId } from "./modules/getUserId";
import Loading from "./pages/Components/Loading";
import AlertNotification from "./pages/Components/AlertNotification";
import {
  Chat,
  Participant,
  Role,
  RoleList,
  User,
  alertType,
  callMode,
  callerData,
} from "./types";
import ErrorPage from "./pages/Components/ErrorPage";
import { AxiosError } from "axios";
import socketConfigs from "./modules/socketConfigs";
import CallPage from "./pages/CallPage/Index";
type Props = {
  isChatOpen: boolean;
  setIsChatOpen: (isOpen: boolean) => void;
  openOverlayProfile: (participant: Participant) => void;
  isOverLayOpen: boolean;
  setOperLayOpen: (isOpen: boolean) => void;
  component: JSX.Element | undefined;
  overLayHeader: string;
};

function MainLayout({
  isChatOpen,
  setIsChatOpen,
  openOverlayProfile,
  isOverLayOpen,
  setOperLayOpen,
  component,
  overLayHeader,
}: Props) {
  const axios = useCustomAxios();
  const [userId, setUserId] = useState<number | string | null>(getUserId());
  const [loading, setLoading] = useState<boolean>(true);
  const [alert, setAlert] = useState<alertType>({ message: "", type: "info" });
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [chatsData, setChatsData] = useState<RoleList>([]);
  const [singleChat, setSingleChat] = useState<any>([]);
  const [newCall, SetNewCall] = useState<callerData>();

  const [startCall, setStartCall] = useState<callerData>({
    start: false,
    mode: callMode.VOICE,
    sender_id: null,
    receiver_id: undefined,
  });

  const [socket, setSocket] = useState(new socketConfigs().getSocket());
  const [incommingCall, SetIncommingCall] = useState<boolean>(false);
  const navigate = useNavigate();
  const navigateOpenChat = (chatId: number) => {
    window.localStorage.removeItem("chatId");
    window.localStorage.setItem("chatId", JSON.stringify(chatId));
    setIsChatOpen(true);
    const chats = chatsData.find((chatItem) => chatItem.chat.id === chatId);
    if (chats) {
      setSingleChat(chats);
    }
  };

  useEffect(() => {
    const socket = new socketConfigs().getSocket();
    const userId = getUserId();
    socket.emit("join", userId);

    socket.on("call-user", (data) => {
      SetNewCall(data);
    });
  }, [newCall]);
  
  useEffect(() => {
    const skt = new socketConfigs().getSocket();
    setSocket(skt);
    const uid = getUserId();
    if (uid) {
      skt.emit("join", getUserId());
    }
  }, []);

  useEffect(() => {
    const handleMessageReceived = (message: any) => {
      const newMessage = message.data;

      const chatIndex = chatsData.findIndex(
        (chat) => chat.chat.id === newMessage.chat.id
      );

      if (chatIndex !== -1) {
        const newChat: Chat = { ...chatsData[chatIndex].chat };
        newChat.lastMessage = { ...newMessage };
        newChat.messages = [...newChat.messages, { ...newMessage }];

        const updatedChats = [...chatsData];

        updatedChats.splice(chatIndex, 1);
        updatedChats.unshift({
          ...chatsData[chatIndex],
          chat: newChat,
        });

        setChatsData([...updatedChats]);
      }
    };

    socket.on("messageReceived", handleMessageReceived);

    return () => {
      socket.off("messageReceived", handleMessageReceived);
    };
  }, [chatsData, socket]);

  useEffect(() => {
    if (newCall && newCall.start) {
      SetIncommingCall(true);
    }
  }, [newCall, incommingCall]);

  useEffect(() => {
    setLoading(true);

    const uid = getUserId();
    if (uid) {
      setUserId(uid);
    }
    const fetchData = async () => {
      try {
        if (userId) {
          axios
            .get(`/chats/user/${userId}`)
            .then((res) => {
              const { error, message, data } = res.data;
              if (!error) {
                setLoading(false);
                setChatsData(data);
              } else {
                setAlert({ message: message, type: "error" });
                setAlertVisible(true);
              }
            })
            .catch((err) => {
              const errorMessage = err.response.data.message;
              setError(errorMessage);
            });
        } else {
          console.log("failed to get UserId");
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response) {
          const errorMessage = error.response.data.message;
          setError(errorMessage);
        } else {
          setError("Something went wrong");
        }
      }
    };
    fetchData();
  }, [axios, userId]);

  useEffect(() => {
    setSingleChat(singleChat);
    const chatId = Number(window.localStorage.getItem("chatId"));
    if (chatId) {
      const chats = chatsData.find((chatItem) => chatItem.chat.id === chatId);
      if (chats) {
        setSingleChat(chats);
      }
    }
  }, [singleChat, chatsData]);

  const displayNotification = (alert: alertType) => {
    setAlertVisible(true);
    setAlert(alert);
  };
  const handleLoading = (status: boolean) => {
    setLoading(status);
  };

  const createChat = (user: User) => {
    const data = chatsData.find((item) =>
      item.chat.participants.some((x) => x.user.id === user.id)
    );
    navigate("/chat");
    if (data) {
      setSingleChat(data);
      window.localStorage.setItem("chatId", JSON.stringify(data.chat.id));
    } else {
      window.localStorage.removeItem("chatId");
      const newRole: Role = {
        id: 763478,
        role: "string",
        chat: {
          id: 378647,
          created_at: new Date().toISOString(),
          participants: [{ id: user.id, role: "user", user: user }],
          lastMessage: null,
          messages: [],
        },
      };
      setSingleChat(newRole);
    }
    setIsChatOpen(true);
    //  console.log(chatsData);
  };
  const handleCall = (callType: {
    mode: callMode;
    sender_id: number | null;
    receiver_id: number | undefined;
  }) => {
    setStartCall({
      start: true,
      mode: callType.mode,
      sender_id: callType.sender_id,
      receiver_id: callType.receiver_id,
    });
  };

  if (loading) {
    return <Loading />;
  }
  if (error) return <ErrorPage message={error} />;

  if (startCall.start) {
    return <CallPage mode={startCall} incommingCall={incommingCall} />;
  }
  if (newCall) {
    return <CallPage mode={newCall} incommingCall={incommingCall} />;
  }
  return (
    <div className="flex h-dvh w-full md:divide-x">
      {alertVisible && alert.message && (
        <AlertNotification
          message={alert.message}
          type={alert.type}
          onClose={() => setAlertVisible(false)}
        />
      )}
      <div
        className={`w-full ${
          isChatOpen ? "hidden" : "block"
        } md:w-2/6 md:block text-sky-950 sticky top-0 left-0 h-full`}>
        <div className="h-full">
          <SideBar
            onItemClick={(chatId: number) => navigateOpenChat(chatId)}
            chatsData={chatsData}
            notificationAlert={displayNotification}
            handleLoading={handleLoading}
            createChat={createChat}
          />
        </div>
      </div>
      <div
        className={`w-full ${
          isChatOpen ? "block" : "hidden"
        } md:w-4/6 md:block`}>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route
            path="/chat"
            element={
              <ChatSide
                onItemClick={() => setIsChatOpen(!isChatOpen)}
                openProfile={(participant: Participant) =>
                  openOverlayProfile(participant)
                }
                chatData={singleChat}
                handleCall={handleCall}
              />
            }
          />
        </Routes>
      </div>
      <Overlay
        isOverLayOpen={isOverLayOpen}
        closeOverLay={() => setOperLayOpen(false)}
        component={component}
        overLayHeader={overLayHeader}
      />
    </div>
  );
}

export default MainLayout;
