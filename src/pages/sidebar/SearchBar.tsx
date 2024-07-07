import { IoMdAddCircle } from "react-icons/io";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { User } from "../../types";

type Props = {
  openProfile: () => void;
  user: User | null;
};

export default function SearchBar({ openProfile, user }: Props) {
  return (
    <div className="flex flex-col items-center gap-1 bg-gradient-to-r from-sky-500 to-sky-800 rounded-b-lg p-2">
      <div className="flex items-center justify-between w-full shadow-lg p-2">
        <div className="flex items-center gap-3">
          <img
            src={(user && user.profile?.profile_pic) || "/images/avatar.jpg"}
            alt="profile-pic"
            className="h-12 w-12 rounded-full border-2 border-white cursor-pointer"
            onClick={() => openProfile()}
          />
          <div className="flex flex-col text-white">
            <span className="font-bold text-xl">
              {(user && user.profile?.first_name) ||
                (user && user.phone_number)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-white text-2xl">
          <IoNotificationsOutline className="cursor-pointer hover:text-yellow-300" />
          <IoSettingsOutline className="cursor-pointer hover:text-yellow-300" />
          <IoMdAddCircle className="cursor-pointer hover:text-green-300" />
        </div>
      </div>
      <div className=" w-5/6">
        <div className="flex items-center shadow-sm p-2 bg-white rounded-lg">
          <FaUserCircle className="text-gray-500 ml-2" />
          <input
            type="text"
            className="flex-grow p-0 ml-2 outline-none border-none  indent-2"
            placeholder="Search contact"
          />
        </div>
      </div>
    </div>
  );
}
