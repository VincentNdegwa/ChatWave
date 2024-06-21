import SideBar from "./pages/sidebar";
import ChatSide from "./pages/chatSide";
type Props = {};

export default function App({}: Props) {
  return (
    <div className="flex h-full w-full gap-x-3">
      <div className="w-2/6 text-sky-950 sticky top-0 left-0 h-full">
        <div className="h-full">
          <SideBar />
        </div>
      </div>
      <div className="w-4/6 flex-1">
        <ChatSide />
      </div>
    </div>
  );
}
