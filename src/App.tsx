import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SideBar from "./pages/sidebar";
import ChatSide from "./pages/chatSide";

type Props = {};

export default function App({}: Props) {
  return (
    <Router>
      <div className="flex h-full w-full gap-x-3 divide-x">
        <div className="w-full tablet:w-2/6 text-sky-950 sticky top-0 left-0 h-full">
          <div className="h-full">
            <SideBar />
          </div>
        </div>
        <div className="w-full tablet:w-4/6 tablet:flex-1 hidden tablet:flex">
          <Routes>
            <Route path="/" element={<ChatSide />} />
            {/* Add more routes here if needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}
