import { Route, Routes } from "react-router-dom";
import ChatSide from "./pages/chatSide";
import StartPage from "./pages/startPage";
import Overlay from "./pages/Components/Overlay";
import SideBar from "./pages/sidebar";
import { useEffect } from "react";
import useCustomAxios from "./modules/customAxios";

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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get("/users");
        console.log(data);
      } catch (error) {console.log(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex h-full w-full md:divide-x">
      <div
        className={`w-full ${
          isChatOpen ? "hidden" : "block"
        } md:w-2/6 md:block text-sky-950 sticky top-0 left-0 h-full`}>
        <div className="h-full">
          <SideBar onItemClick={() => setIsChatOpen(!isChatOpen)} />
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
