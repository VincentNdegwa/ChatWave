import ColorBox from "./pages/colorbox";
import SideBar from "./pages/sidebar";
type Props = {};

export default function App({}: Props) {
  return (
    <div className="flex h-full w-full">
      <div className="w-2/6 text-sky-950 sticky top-0 left-0">
        <div className="h-full">
          <SideBar />
        </div>
      </div>
      <div className="w-4/6 flex-1">
        <ColorBox />
      </div>
    </div>
  );
}
