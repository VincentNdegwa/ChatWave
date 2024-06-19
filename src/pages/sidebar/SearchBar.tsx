import { IoMdAddCircle } from "react-icons/io";
type Props = {};

export default function SearchBar({}: Props) {
  return (
    <div className="flex items-center content-center gap-1 p-3 rounded-lg border-sky-950">
      <div className="font-bold text-2xl w-1/6">Chat</div>
      <div className="w-4/6">
        <input
          type="text"
          className="p-2 outline-none border border-sky-300 rounded-2xl w-full"
          placeholder="Search contact"
        />
      </div>
      <div className=" font-bold text-3xl w-1/6">
        <IoMdAddCircle />
      </div>
    </div>
  );
}
