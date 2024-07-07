import { User } from "../../types";
import { IoMdCreate, IoMdArrowRoundBack } from "react-icons/io";

type Props = {
  user: User;
  closeProfile: () => void;
  editProfile: () => void;
};

function UserProfile({ user, closeProfile, editProfile }: Props) {
  const { first_name, last_name, profile_pic, about } = user.profile || {};
  const { phone_number } = user;

  return (
    <div className="flex flex-col gap-y-5 items-center text-sky-950 w-full h-full">
      <div className="flex gap-x-3 items-center bg-sky-900 w-full h-fit p-2 text-white">
        <div
          onClick={closeProfile}
          className="text-2xl ms-2 p-2 text-sky-950 bg-sky-200 rounded-lg hover:bg-sky-300 transition-all ease-in duration-300">
          <IoMdArrowRoundBack />
        </div>
        <div className="text-lg font-semibold">Profile</div>
      </div>
      <div className="flex flex-col w-full h-full items-center">
        <img
          src={profile_pic || "/images/avatar.jpg"}
          alt="profile-pic"
          className="h-40 w-40 rounded-full border-4 border-white shadow-md"
        />
        <div className="mt-4 w-full p-2">
          {user.profile && (
            <div className="flex flex-col mt-3">
              <div className="text-md text-slate-500">Full Names</div>
              <div className="text-lg font-bold mt-2">
                {first_name} {last_name}
              </div>
            </div>
          )}

          <div className="flex flex-col mt-3">
            <div className="text-md text-slate-500">Phone Number</div>
            <div className="text-lg font-bold mt-2">{phone_number}</div>
          </div>

          {user.profile && (
            <div className="flex flex-col mt-3">
              <div className="text-md text-slate-500">About</div>
              <div className="text-sm font-normal mt-2">{about}</div>
            </div>
          )}
        </div>
        <button
          onClick={() => editProfile()}
          className="mt-6 flex items-center gap-2 bg-white text-sky-600 px-4 py-2 rounded-full hover:bg-slate-200 transition-all ease-in duration-300">
          <IoMdCreate />
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
