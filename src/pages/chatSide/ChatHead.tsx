import { MdCall } from "react-icons/md";
import { FaVideo } from "react-icons/fa6";

function ChatHead() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3">
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="profile-pic"
          className=" rounded-full h-14 w-14 min-w-0 gap-x-3"
        />
        <div className="flex flex-col justify-center">
          <div className="text-sky-950 font-extrabold text-lg">User name</div>
          <div className="text-xs text-green-700">Online</div>
        </div>
      </div>
      <div className="flex gap-2">
        <span className="rounded-lg bg-green-700 p-3 text-white cursor-pointer hover:bg-green-400 transition duration-300">
          <FaVideo />
        </span>
        <span className="rounded-lg bg-sky-700 p-3 text-white cursor-pointer hover:bg-sky-400 transition duration-300">
          <MdCall />
        </span>
      </div>
    </div>
  );
}

export default ChatHead;
