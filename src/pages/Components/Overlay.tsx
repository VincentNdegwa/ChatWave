import { IoMdArrowRoundBack } from "react-icons/io";

type Props = {
  isOverLayOpen: boolean;
  closeOverLay: () => void;
  component: JSX.Element | undefined;
};

function Overlay({ isOverLayOpen, closeOverLay, component }: Props) {
  return (
    <>
      {isOverLayOpen && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center p-2">
          <div className="flex p-2 flex-col bg-sky-50 max-h-[96vh] min-w-[500px] min-h-[20vh] rounded-md overflow-scroll scrollbar-none">
            <div className="flex items-center gap-x-3 border-b-2 border-sky-950 p-1">
              <div
                className=" rounded-full bg-sky-600 p-3 hover:bg-sky-400 transition-all duration-200"
                onClick={closeOverLay}>
                <IoMdArrowRoundBack />
              </div>
              <div className="text-lg">Overlay Header</div>
            </div>
            {component}
          </div>
        </div>
      )}
    </>
  );
}

export default Overlay;
