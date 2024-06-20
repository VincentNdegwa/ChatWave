import ContactList from "./ContactList";
import SearchBar from "./SearchBar";
type Props = {};

function index({}: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full rounded-md shadow-lg">
        <SearchBar />
      </div>
      <div className="w-full mt-1 rounded-sm p-0">
        <ContactList />
      </div>
    </div>
  );
}

export default index;
