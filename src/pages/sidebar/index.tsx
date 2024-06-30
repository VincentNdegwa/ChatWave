import { RoleList } from "../../types";
import ContactList from "./ContactList";
import SearchBar from "./SearchBar";
type Props = {
  onItemClick: (chatId: number) => void;
  chatsData: RoleList;
};

function index({ onItemClick, chatsData }: Props) {
  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div className="w-full rounded-md shadow-lg h-fit">
        <SearchBar />
      </div>
      <div className="w-full h-full mt-0 rounded-sm p-0 overflow-y-scroll scrollbar-none">
        <ContactList onItemClick={onItemClick} chatsData={chatsData} />
      </div>
    </div>
  );
}

export default index;
