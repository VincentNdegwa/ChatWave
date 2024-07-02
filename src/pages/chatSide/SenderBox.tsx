import { MdAttachFile } from "react-icons/md";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { FaMicrophone } from "react-icons/fa6";
import { BsFillSendFill } from "react-icons/bs";

function SenderBox() {
  return (
    <div className="w-full h-full flex justify-between items-center">
      <div className="flex relative items-center h-full w-5/6 gap-x-0 p-0">
        <div className="text-2xl text-sky-950 bg-white h-full flex items-center p-3 rounded-md cursor-pointer">
          <MdAttachFile />
        </div>
        <div className=" flex-1 h-full flex items-center">
          <input
            className="w-full h-full border-0 outline-0 indent-2 text-sky-950"
            type="text"
            placeholder="Send a message..."
          />
          <div className="text-2xl text-sky-950 bg-white h-full flex items-center">
            <MdOutlineEmojiEmotions />
          </div>
        </div>
      </div>
      <div className="flex w-1/6 h-full items-center gap-x-0 justify-between">
        <div className="text-2xl text-sky-950 bg-white h-full flex items-center p-3 rounded-md cursor-pointer">
          <FaMicrophone />
        </div>
        <div className="text-2xl text-white bg-sky-700 hover:bg-sky-600 transition-all ease-out duration-200 h-full w-[50px] flex items-center p-3 rounded-md cursor-pointer">
          <BsFillSendFill />
        </div>
      </div>
    </div>
  );
}

export default SenderBox;
