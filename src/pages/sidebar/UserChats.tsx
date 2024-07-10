import { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import useCustomAxios from "../../modules/customAxios";
import { getUserId } from "../../modules/getUserId";
import { IoSearch } from "react-icons/io5";
import { User } from "../../types";

type Props = {
  closeUserChat: () => void;
};

function UserChats({ closeUserChat }: Props) {
  const axios = useCustomAxios();
  const [userId, setUserId] = useState<number | null>(null);
  const [users, setUser] = useState<User[] | null>(null);
  const closeNewChat = () => {
    closeUserChat();
  };

  useEffect(() => {
    const uId = getUserId;
    setUserId(uId);
  }, []);

  useEffect(() => {
    if (userId) {
      axios
        .get(`/users/all/${userId}`)
        .then((res) => {
          if (res.data.error) {
            console.log(res.data.message);
          } else {
            setUser(res.data.data);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [axios, userId]);
  const startChat = (user: User) => {
    console.log(user);
  };

  return (
    <div className="flex flex-col gap-y-0 items-center text-sky-950 w-full h-ful">
      <div className="flex gap-x-3 items-center bg-sky-900 w-full h-[10vh] p-2 text-white">
        <div
          onClick={() => closeNewChat()}
          className="text-2xl ms-2 p-2 text-sky-950 bg-sky-200 rounded-lg hover:bg-sky-300 transition-all ease-in duration-300">
          <IoMdArrowRoundBack />
        </div>
        <div className="text-lg font-semibold">New Chat</div>
      </div>
      <div className="h-[90vh] w-full overflow-y-scroll scrollbar-none relative">
        <div className="sticky w-full flex justify-center mt-1">
          <div className="flex gap-x-3 items-center bg-sky-800 p-2 w-full md:w-[300px] xl:w-[400px] rounded-md">
            <IoSearch className="text-white" />
            <input
              type="text"
              className="rounded-md h-[30px] outline-none bottom-0 w-full bg-transparent text-ellipsis text-white"
              placeholder="Search by name or phone number"
            />
          </div>
        </div>
        <ul role="list" className="divide-y divide-gray-100 mt-1">
          {users &&
            users.map((person) => (
              <li
                key={person.id}
                onClick={() => startChat(person)}
                className="flex justify-between gap-x-6 p-2 cursor-default hover:bg-gray-100 transition-all ease-out duration-700">
                <div className="flex min-w-0 gap-x-4">
                  <img
                    alt=""
                    src={person.profile?.profile_pic || "/images/avatar.png"}
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {person.profile?.first_name || person.phone_number}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {person.phone_number}
                    </p>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default UserChats;
