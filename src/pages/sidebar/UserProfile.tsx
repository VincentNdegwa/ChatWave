import { User } from "../../types";
import { IoMdCreate } from "react-icons/io";

type Props = {
  user: User;
};
function UserProfile({ user }: Props) {
  if (!user.profile) {
    return (
      <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg w-80">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Profile not available</h1>
          <p className="text-gray-500">No profile data to display.</p>
        </div>
      </div>
    );
  }
  const { first_name, last_name, profile_pic, about } = user.profile;
  const { phone_number } = user;
  return (
    <div className="flex flex-col items-center p-6 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg shadow-xl w-96 text-white">
      <img
        src={profile_pic}
        alt="profile-pic"
        className="h-24 w-24 rounded-full border-4 border-white shadow-md"
      />
      <div className="mt-4 text-center">
        <h1 className="text-2xl font-bold">
          {first_name} {last_name}
        </h1>
        <p className="text-sm mt-1 opacity-75">{phone_number}</p>
        <p className="mt-4 text-lg">{about}</p>
      </div>
      <button className="mt-6 flex items-center gap-2 bg-white text-purple-600 px-4 py-2 rounded-full hover:bg-gray-200">
        <IoMdCreate />
        Edit Profile
      </button>
    </div>
  );
}

export default UserProfile;
