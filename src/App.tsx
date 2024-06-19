import ColorBox from "./pages/colorbox";
import SideBar from "./pages/sidebar";
ColorBox;
type Props = {};

export default function App({}: Props) {
  return (
    <div className="flex h-full">
      <div className="w-1/6 bg-sky-100 text-sky-950 sticky top-0 left-0">
        <div className="h-full">
          <SideBar />
        </div>
      </div>
      <div className="w-5/6 flex-1">
        <ColorBox />
      </div>
    </div>
  );
}
