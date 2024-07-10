import { IoMdArrowRoundBack } from "react-icons/io";
type Props = {
  closeUserChat: () => void;
};

function UserChats({ closeUserChat }: Props) {
  const closeNewChat = () => {
    closeUserChat();
  };
    return (
      <div className="flex flex-col gap-y-5 items-center text-sky-950 w-full h-ful">
        <div className="flex gap-x-3 items-center bg-sky-900 w-full h-fit p-2 text-white">
          <div
            onClick={() => closeNewChat()}
            className="text-2xl ms-2 p-2 text-sky-950 bg-sky-200 rounded-lg hover:bg-sky-300 transition-all ease-in duration-300">
            <IoMdArrowRoundBack />
          </div>
          <div className="text-lg font-semibold">New Chat</div>
        </div>
      </div>
    );
}

export default UserChats;
