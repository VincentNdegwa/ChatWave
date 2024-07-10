import { useEffect, useState } from "react";
import { getUser } from "../../modules/getUserId";
import { RoleList, User, alertType } from "../../types";
import ContactList from "./ContactList";
import SearchBar from "./SearchBar";
import UserProfile from "./UserProfile";
import UserProfileEdit from "./UserProfileEdit";
import useCustomAxios from "../../modules/customAxios";
import UserChats from "./UserChats";

type Props = {
  onItemClick: (chatId: number) => void;
  chatsData: RoleList;
  notificationAlert: (alert: alertType) => void;
  handleLoading: (statu: boolean) => void;
};

function Index({
  onItemClick,
  chatsData,
  notificationAlert,
  handleLoading,
}: Props) {
  const [userProf, setUserProf] = useState<User | null>(getUser());
  const [contactOpen, setContactOpen] = useState<boolean>(true);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [viewUser, setViewUsers] = useState<boolean>(false);

  const axios = useCustomAxios();
  const openProfile = () => {
    const user = getUser();
    if (user) {
      setUserProf(user);
      setContactOpen(false);
      setProfileOpen(true);
      setEditOpen(false);
      setViewUsers(false);
    }
  };
  const closeAllSlides = () => {
    setContactOpen(true);
    setProfileOpen(false);
    setEditOpen(false);
    setViewUsers(false);
  };

  const openEditForm = () => {
    setEditOpen(true);
    setProfileOpen(false);
    setContactOpen(false);
    setViewUsers(false);
  };
  const closeEditForm = () => {
    openProfile();
  };

  useEffect(() => {
    const jsonUser = window.localStorage.getItem("user");
    if (jsonUser) {
      const user = JSON.parse(jsonUser);
      setUserProf(user);
    }
  }, []);

  const viewChats = () => {
    setViewUsers(true);
    setContactOpen(false);
    setProfileOpen(false);
    setEditOpen(false);
    axios
      .get(`/users/all/${userProf?.id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full h-full relative overflow-hidden">
      <div
        className={`absolute top-0 left-0 w-full h-full transition-transform duration-500 ${
          contactOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        <div className="h-full flex flex-col gap-y-2">
          <div className="w-full h-fit">
            <SearchBar
              openProfile={openProfile}
              user={userProf}
              viewChats={viewChats}
            />
          </div>
          <div className="w-full h-[85vh] mt-0 p-0 overflow-y-scroll scrollbar-none">
            <ContactList onItemClick={onItemClick} chatsData={chatsData} />
          </div>
        </div>
      </div>

      <div
        className={`absolute top-0 left-0 w-full h-full transition-transform duration-500 ${
          profileOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        {userProf && (
          <UserProfile
            user={userProf}
            closeProfile={closeAllSlides}
            editProfile={openEditForm}
          />
        )}
      </div>

      <div
        className={`absolute top-0 left-0 w-full h-full transition-transform duration-500 ${
          editOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        {userProf && (
          <UserProfileEdit
            user={userProf}
            onCancel={closeEditForm}
            notificationAlert={notificationAlert}
            handleLoading={handleLoading}
          />
        )}
      </div>

      <div
        className={`absolute top-0 left-0 w-full h-full transition-transform duration-500 ${
          viewUser ? "translate-x-0" : "translate-x-full"
        }`}>
        {userProf && <UserChats closeUserChat={closeAllSlides} />}
      </div>
    </div>
  );
}

export default Index;
