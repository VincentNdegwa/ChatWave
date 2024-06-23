import { MdDeleteSweep } from "react-icons/md";
import { ImBlocked } from "react-icons/im";
import { MdReportProblem } from "react-icons/md";

type Props = {};

function index({}: Props) {
  return (
    <div className="flex flex-col items-center gap-2 dark ">
      <img
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt="profile-pic"
        className=" rounded-full max-w-[200px] max-h-[200px]  min-w-0 gap-x-3 mt-3"
      />
      <div className="text-lg text-sky-950 font-bold">User name</div>
      <div className="text-sm text-slate-500">+2547890967</div>
      <div className="flex w-full flex-col bg-sky-100 rounded-md p-2">
        <div className="text-sm text-sky-600 border-b-2 border-sky-600">
          About contact
        </div>
        <div className="text-md p-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
          placeat
        </div>
        <div className="text-sm text-sky-600 border-b-2 border-sky-600">
          Media
        </div>
        <div className="text-sm text-sky-600 border-b-2 border-sky-600">
          Actions
        </div>
        <div className="flex flex-col mt-1">
          <div className=" text-red-500 flex items-center gap-x-2 p-2 cursor-pointer hover:bg-sky-200 w-fit hover:text-red-700 transition-all duration-700 font-bold">
            <MdDeleteSweep /> Delete Chat
          </div>
          <div className=" text-red-500 flex items-center gap-x-2 p-2 cursor-pointer hover:bg-sky-200 w-fit hover:text-red-700 transition-all duration-700 font-bold">
            {" "}
            <MdReportProblem /> Report Contact
          </div>
          <div className=" text-red-500 flex items-center gap-x-2 p-2 cursor-pointer hover:bg-sky-200 w-fit hover:text-red-700 transition-all duration-700 font-bold">
            <ImBlocked /> Block Contact
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
