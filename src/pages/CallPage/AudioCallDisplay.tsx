import { RefObject } from "react";

type Props = {
  remoteStreamIsSet: boolean;
  localAudioRef: RefObject<HTMLAudioElement>;
  remoteAudioRef: RefObject<HTMLAudioElement>;
};

const AudioCallDisplay = ({
  remoteStreamIsSet,
  localAudioRef,
  remoteAudioRef,
}: Props) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-900">
      <div className="flex flex-col items-center space-y-4">
        <audio
          ref={localAudioRef}
          autoPlay
          muted
          className="w-full h-16 bg-black"
        />
        <audio ref={remoteAudioRef} autoPlay className="w-full h-16 bg-white" />
        {!remoteStreamIsSet && (
          <div className="text-white">Waiting for remote stream...</div>
        )}
      </div>
    </div>
  );
};

export default AudioCallDisplay;
