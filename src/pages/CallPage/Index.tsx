import { callerData } from "../../types";
import IncommingCall from "./IncommingCall";

type Props = {
  mode: callerData;
  incommingCall: boolean;
};

function Index({ mode, incommingCall }: Props) {
  return (
    <div className="h-dvh w-full absolute top-0 left-0">
      <IncommingCall mode={mode} incommingCall={incommingCall} />
    </div>
  );
}

export default Index;
