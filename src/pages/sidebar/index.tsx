import { useState } from "react";
import { getUser } from "../../modules/getUserId";
import { RoleList, User } from "../../types";
import ContactList from "./ContactList";
import SearchBar from "./SearchBar";
import UserProfile from "./UserProfile";
type Props = {
  onItemClick: (chatId: number) => void;
  chatsData: RoleList;
};

function Index({ onItemClick, chatsData }: Props) {
  const [userProf, setUserProf] = useState<User | null>(getUser());
  const [contactOpen, setContactOpen] = useState<boolean>(true);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);

  const openProfile = () => {
    const user = getUser();
    if (user) {
      setUserProf(user);
      setContactOpen(false);
      setProfileOpen(true);
    }
  };
  return (
    <div className="w-full h-full">
      {contactOpen && !profileOpen && (
        <div className="h-full flex flex-col gap-y-2">
          <div className="w-full h-fit">
            <SearchBar openProfile={openProfile} />
          </div>
          <div className="w-full h-[85vh] mt-0 p-0 overflow-y-scroll scrollbar-none">
            <ContactList onItemClick={onItemClick} chatsData={chatsData} />
          </div>
        </div>
      )}

      {!contactOpen && profileOpen && userProf && (
        <div>
          <UserProfile user={userProf} />
        </div>
      )}
    </div>
  );
}

export default Index;
