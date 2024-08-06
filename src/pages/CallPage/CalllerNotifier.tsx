import { Participant, callMode, callerData } from "../../types";

type Props = {
  mode: callerData;
  status: string;
  incommingCall: boolean;
};

const CallerNotifier = ({ mode, status, incommingCall }: Props) => {
  const user: Participant | undefined = incommingCall
    ? mode.sender
    : mode.receiver;

  if (!user) {
    return (
      <div className="flex flex-col pt-52">
        <img
          src="images/avatar.jpg"
          className="rounded-full h-[250px] w-[250px]"
          alt="profile"
        />
        <div className="text-2xl text-center text-white font-bold">
          "Unknown"
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col pt-52">
      <img
        src={user.user.profile?.profile_pic || "images/avatar.jpg"}
        className="rounded-full h-[250px] w-[250px]"
        alt="profile"
      />
      <div className="text-2xl text-center text-white font-bold">
        {user.user.profile?.first_name + " " + user.user.profile?.last_name ||
          user.user.phone_number ||
          "Unknown"}
      </div>
      <div className="text-sm text-center text-sky-300">
        {status.trim() && status}
        {mode.mode === callMode.VIDEO &&
          !status.trim() &&
          "Incoming Video Call"}
        {mode.mode === callMode.VOICE &&
          !status.trim() &&
          "Incoming Voice Call"}
      </div>
    </div>
  );
};

export default CallerNotifier;
