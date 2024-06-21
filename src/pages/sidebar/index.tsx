import ContactList from "./ContactList";
import SearchBar from "./SearchBar";
type Props = {
  onItemClick: ()=>void
};

function index({ onItemClick }: Props) {
  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div className="w-full rounded-md shadow-lg h-16">
        <SearchBar />
      </div>
      <div className="w-full h-full mt-0 rounded-sm p-0 overflow-y-scroll scrollbar-none">
        <ContactList onItemClick={onItemClick} />
      </div>
    </div>
  );
}

export default index;
