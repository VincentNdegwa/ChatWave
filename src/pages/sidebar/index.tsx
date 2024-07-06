import { RoleList } from "../../types";
import ContactList from "./ContactList";
import SearchBar from "./SearchBar";
type Props = {
  onItemClick: (chatId: number) => void;
  chatsData: RoleList;
};

function index({ onItemClick, chatsData }: Props) {
  return (
    <div className="w-full h-full">
      <div className="h-full flex flex-col gap-y-2">
        <div className="w-full h-fit">
          <SearchBar />
        </div>
        <div className="w-full h-[85vh] mt-0 p-0 overflow-y-scroll scrollbar-none">
          <ContactList onItemClick={onItemClick} chatsData={chatsData} />
        </div>
      </div>
    </div>
  );
}

export default index;
