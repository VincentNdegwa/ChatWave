/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { MdAttachFile } from "react-icons/md";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { FaMicrophone } from "react-icons/fa6";
import { BsFillSendFill } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";

type Props = { messageSend: (msg: string) => void };
function SenderBox({ messageSend }: Props) {
  const [message, setMessage] = useState<string>("");
  const [pickEmoji, setPickEmoji] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (message && message.trim()) {
      messageSend(message);
      setMessage("");
    }
  };

  const handleEmojiClick = (emojiObject: any) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  return (
    <div className="relative w-full">
      {/* <div className="absolute bottom-[60px] left-0 w-full z-10 duration-100 transition-all ease-out"> */}
      <EmojiPicker
        onEmojiClick={handleEmojiClick}
        width="100%"
        open={pickEmoji}
        lazyLoadEmojis={true}
      />
      {/* </div> */}
      <form
        className="w-full h-full flex justify-between items-center"
        onSubmit={handleSubmit}>
        <div className="flex relative items-center h-full w-4/6 sm:w-5/6 gap-x-0 p-0">
          <div className="text-2xl text-sky-950 bg-white h-full flex items-center p-3 rounded-md cursor-pointer">
            <MdAttachFile />
          </div>
          <div className="flex-1 h-full flex items-center">
            <input
              className="w-full h-full border-0 outline-0 indent-2 text-sky-950"
              type="text"
              placeholder="Send a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div
              onClick={() => setPickEmoji((prev) => !prev)}
              className="text-2xl text-sky-950 bg-white h-full flex items-center cursor-pointer p-3">
              <MdOutlineEmojiEmotions />
            </div>
          </div>
        </div>
        <div className="flex w-2/6 sm:w-1/6 h-full items-center gap-x-0 justify-between sm:justify-normal">
          <div className="text-2xl text-sky-950 bg-white h-full flex items-center p-3 rounded-md cursor-pointer">
            <FaMicrophone />
          </div>

          <button
            type="submit"
            className="text-2xl text-white bg-sky-700 hover:bg-sky-600 transition-all ease-out duration-200 h-[50px] w-[50px] flex items-center p-3 rounded-md cursor-pointer">
            <BsFillSendFill />
          </button>
        </div>
      </form>
    </div>
  );
}

export default SenderBox;
