import { MdCall } from "react-icons/md";
import { FaVideo } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Participant, Role, callMode } from "../../types";
import { getUserId } from "../../modules/getUserId";
type Props = {
  onItemClick: () => void;
  openProfile: (profile: Participant) => void;
  chatData: Role;
  handleCall: (callType: {
    mode: callMode;
    sender: Participant | undefined;
    receiver: Participant | undefined;
  }) => void;
};
function ChatHead({ onItemClick, openProfile, chatData, handleCall }: Props) {
  const getUserProfile = (participants: Participant[]) => {
    const currentUserId = getUserId();
    const currentUserIdNumber =
      currentUserId !== undefined ? Number(currentUserId) : undefined;
    return participants.find(
      (participant) => participant.user.id !== currentUserIdNumber
    );
  };

  const getMyProfile = (participants: Participant[]) => {
    const currentUserId = getUserId();
    const currentUserIdNumber =
      currentUserId !== undefined ? Number(currentUserId) : undefined;
    return participants.find(
      (participant) => participant.user.id === currentUserIdNumber
    );
  };

  const profile = getUserProfile(chatData.chat.participants);
  const myProfile = getMyProfile(chatData.chat.participants);

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3 items-center">
        <div
          onClick={() => onItemClick()}
          className="md:hidden block text-2xl ms-2 p-2 bg-slate-200 rounded-lg hover:bg-slate-300 transition-all ease-in duration-300">
          <IoMdArrowRoundBack />
        </div>
        <img
          src={profile?.user.profile?.profile_pic || "/images/avatar.jpg"}
          alt="profile-pic"
          className=" rounded-full h-14 w-14 min-w-0 gap-x-3"
        />
        {profile && (
          <div
            className="flex flex-col justify-center hover:bg-gray-50 h-full md:min-w-[200px] cursor-pointer"
            onClick={() => openProfile(profile)}>
            <div className="text-sky-950 font-extrabold text-lg">
              {profile?.user.profile?.first_name || profile?.user.phone_number}
            </div>
            {/* <div className="text-xs text-green-700">Online</div> */}
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <span
          onClick={() =>
            handleCall({
              mode: callMode.VIDEO,
              sender: myProfile,
              receiver: profile,
            })
          }
          className="rounded-lg bg-green-700 p-3 text-white cursor-pointer hover:bg-green-400 transition duration-300">
          <FaVideo />
        </span>
        <span
          onClick={() =>
            handleCall({
              mode: callMode.VOICE,
              sender: myProfile,
              receiver: profile,
            })
          }
          className="rounded-lg bg-sky-700 p-3 text-white cursor-pointer hover:bg-sky-400 transition duration-300">
          <MdCall />
        </span>
      </div>
    </div>
  );
}

export default ChatHead;
