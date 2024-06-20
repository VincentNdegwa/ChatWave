import ChatConversation from "./ChatConversation";
import ChatHead from "./ChatHead";
import SenderBox from "./SenderBox";
function index() {
  return (
    <div className="h-full flex flex-col justify-between gap-2">
      <div className="shadow-lg p-1 h-16 rounded-lg">
        <ChatHead />
      </div>
      <div className=" bg-sky-950 h-full">
        <ChatConversation />
      </div>
      <div className="h-14 bg-sky-100">
        <SenderBox />
      </div>
    </div>
  );
}

export default index;
