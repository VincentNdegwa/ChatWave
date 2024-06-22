import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SideBar from "./pages/sidebar";
import ChatSide from "./pages/chatSide";
import StartPage from "./pages/startPage";

type Props = {};

export default function App({}: Props) {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  return (
    <Router>
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
                <ChatSide onItemClick={() => setIsChatOpen(!isChatOpen)} />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
