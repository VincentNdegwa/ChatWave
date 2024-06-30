/* eslint-disable @typescript-eslint/no-explicit-any */
import { Route, Routes } from "react-router-dom";
import ChatSide from "./pages/chatSide";
import StartPage from "./pages/startPage";
import Overlay from "./pages/Components/Overlay";
import SideBar from "./pages/sidebar";
import { useEffect, useState } from "react";
import useCustomAxios from "./modules/customAxios";
import { getUserId } from "./modules/getUserId";
import Loading from "./pages/Components/Loading";
import AlertNotification from "./pages/Components/AlertNotification";
import { RoleList, alertType } from "./types";
import ErrorPage from "./pages/Components/ErrorPage";
import { AxiosError } from "axios";

type Props = {
  isChatOpen: boolean;
  setIsChatOpen: (isOpen: boolean) => void;
  openOverlayProfile: () => void;
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
  const [userId, setUserId] = useState<number | string | undefined>(
    getUserId()
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [alert, setAlert] = useState<alertType>({ message: "", type: "info" });
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [chatsData, setChatsData] = useState<RoleList>([]);
  const [singleChat, setSingleChat] = useState<any>([]);
  const navigateOpenChat = (chatId: number) => {
    setIsChatOpen(true);
    const chats = chatsData.find((chatItem) => chatItem.id === chatId);
    if (chats) {
      setSingleChat(chats);
    }
  };
  useEffect(() => {
    const uid = getUserId();
    if (uid) {
      setUserId(uid);
    } else {
      console.log("undefined userid");
    }
    const fetchData = async () => {
      try {
        setLoading(true);
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
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response) {
          const errorMessage = error.response.data.message;
          setError(errorMessage);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  if (loading) {
    return <Loading />;
  }
  if (error) return <ErrorPage message={error} />;
  return (
    <div className="flex h-full w-full md:divide-x">
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
                openProfile={() => openOverlayProfile()}
                chatData={singleChat}
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
