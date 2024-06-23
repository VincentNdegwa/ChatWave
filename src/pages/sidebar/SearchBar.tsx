import { IoMdAddCircle } from "react-icons/io";
type Props = {};

export default function SearchBar({}: Props) {
  return (
    <div className="flex flex-col gap-3 p-2 content-center rounded-lg border-sky-950">
      <div className="flex font-bold text-2xl w-full items-center justify-between ">
        <img
          src="/images/avatar.jpg"
          alt="profile-pic"
          className="h-12 w-12 rounded-full"
        />
        <div className=" font-bold text-3xl w-fit">
          <IoMdAddCircle />
        </div>
      </div>
      <div className="w-full">
        <input
          type="text"
          className="p-2 outline-none border border-sky-300 rounded-2xl w-full"
          placeholder="Search contact"
        />
      </div>
    </div>
  );
}
