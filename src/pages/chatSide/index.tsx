import ChatConversation from "./ChatConversation";
import ChatHead from "./ChatHead";
import SenderBox from "./SenderBox";

type Props = {
  onItemClick: ()=>void
};
function index({onItemClick}:Props) {
  return (
    <div className="h-full flex flex-col justify-between gap-2">
      <div className="shadow-lg p-1 h-16 rounded-lg">
        <ChatHead onItemClick={onItemClick} />
      </div>
      <div className="h-5/6">
        <ChatConversation />
      </div>
      <div className="h-14 w-full rounded-md shadow-lg">
        <SenderBox />
      </div>
    </div>
  );
}

export default index;
