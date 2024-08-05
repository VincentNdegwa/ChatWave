import { callMode, callerData } from "../../types";

type props = {
  mode: callerData;
  status: string;
};

const CallerNotifier = ({ mode, status }: props) => {
  return (
    <div className="flex flex-col pt-52">
      <img
        src={mode.sender?.user.profile?.profile_pic || "images/avatar.jpg"}
        className="rounded-full h-[250px] w-[250px]"
        alt="profile"
      />
      <div className="text-2xl text-center text-white font-bold">
        {mode.sender?.user.profile?.first_name +
          " " +
          mode.sender?.user.profile?.last_name ||
          mode.sender?.user.phone_number ||
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
