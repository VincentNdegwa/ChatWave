import ChatConversation from "./ChatConversation";
import ChatHead from "./ChatHead";
import SenderBox from "./SenderBox";
function index() {
  return (
    <div className="h-full flex flex-col justify-between gap-2">
      <div className="shadow-lg p-1 h-16 rounded-lg">
        <ChatHead />
      </div>
      <div className="h-full overflow-y-scroll scrollbar-custom">
        <ChatConversation />
      </div>
      <div className="h-14 w-full rounded-md shadow-lg">
        <SenderBox />
      </div>
    </div>
  );
}

export default index;
