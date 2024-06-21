import { useNavigate } from "react-router-dom";

type Props = {
  onItemClick: () => void;
};
function Contact({ onItemClick }: Props) {
  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    navigate(path);
    onItemClick()
  };
  return (
    <div
      onClick={() => handleNavigate("/")}
      className="flex gap-x-3 p-3 hover:bg-sky-100 ease-in duration-100 rounded-md shadow-lg">
      <img
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt="profile-pic"
        className="rounded h-12 w-12 min-w-0 gap-x-3"
      />
      <div className="flex justify-between flex-row w-full">
        <div className="flex flex-col justify-between">
          <div className="font-extrabold text-sky-950">User name</div>
          <div className="text-xs text-sky-600">text message</div>
        </div>
        <div className="flex flex-col items-end justify-between">
          <span className="h-4 w-4 text-xs flex justify-center items-center rounded-2xl bg-red-200 py-1 text-red-700">
            1
          </span>
          <div className="text-xs text-sky-950">10:20 AM</div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
