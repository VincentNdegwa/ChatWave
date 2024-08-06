import { RefObject } from "react";
import CallerNotifier from "./CalllerNotifier";
import { callerData } from "../../types";

type Props = {
  remoteStreamIsSet: boolean;
  localAudioRef: RefObject<HTMLAudioElement>;
  remoteAudioRef: RefObject<HTMLAudioElement>;
  mode: callerData;
  incommingCall: boolean;
};

const AudioCallDisplay = ({
  remoteStreamIsSet,
  localAudioRef,
  remoteAudioRef,
  mode,
  incommingCall,
}: Props) => {
  return (
    <div className="w-full h-full flex justify-center bg-gray-900">
      <div className="flex flex-col items-center space-y-4">
        {!remoteStreamIsSet && (
          <CallerNotifier
            mode={mode}
            status="Connecting..."
            incommingCall={incommingCall}
          />
        )}

        {remoteStreamIsSet && (
          <CallerNotifier
            mode={mode}
            status="Connected"
            incommingCall={incommingCall}
          />
        )}

        <audio
          ref={localAudioRef}
          autoPlay
          muted
          className="w-full h-16 bg-black"
        />
        <audio
          ref={remoteAudioRef}
          autoPlay
          className="w-full h-16 bg-white hidden"
        />
      </div>
    </div>
  );
};

export default AudioCallDisplay;
