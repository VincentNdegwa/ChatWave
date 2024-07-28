import { MdDeleteSweep } from "react-icons/md";
import { ImBlocked } from "react-icons/im";
import { MdReportProblem } from "react-icons/md";
import { Participant } from "../../types";

type Props = {
  participant: Participant;
};

function index({ participant }: Props) {
  return (
    <div className="flex flex-col items-center gap-2 dark ">
      <img
        src={participant.user.profile?.profile_pic || "/images/avatar.jpg"}
        alt="profile-pic"
        className=" rounded-full w-[200px] h-[200px] gap-x-3 mt-3"
      />
      <div className="text-lg text-sky-950 font-bold">
        {participant?.user.profile?.first_name ||
          participant?.user.phone_number}
      </div>
      {participant.user.profile?.first_name && (
        <div className="text-sm text-slate-500">
          {participant.user.phone_number}
        </div>
      )}
      <div className="flex w-full flex-col rounded-md p-2">
        {participant?.user.profile?.about && (
          <>
            <div className="text-sm text-sky-600 border-b-2 border-gray-200">
              About contact
            </div>
            <div className="text-md p-2">{participant.user.profile.about}</div>
          </>
        )}
        {/* <div className="text-sm text-sky-600 border-b-2 border-gray-200">
          Media
        </div> */}
        <div className="text-sm text-sky-600 border-b-2 border-gray-200">
          Actions
        </div>
        <div className="flex flex-col mt-1">
          <div className=" text-red-500 flex items-center gap-x-2 p-2 cursor-pointer hover:bg-sky-200 w-fit hover:text-red-700 transition-all duration-700 font-bold">
            <MdDeleteSweep /> Delete Chat
          </div>
          <div className=" text-red-500 flex items-center gap-x-2 p-2 cursor-pointer hover:bg-sky-200 w-fit hover:text-red-700 transition-all duration-700 font-bold">
            {" "}
            <MdReportProblem /> Report Contact
          </div>
          <div className=" text-red-500 flex items-center gap-x-2 p-2 cursor-pointer hover:bg-sky-200 w-fit hover:text-red-700 transition-all duration-700 font-bold">
            <ImBlocked /> Block Contact
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
