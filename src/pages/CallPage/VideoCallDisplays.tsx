import { RefObject } from "react";

type props = {
  remoteStreamIsSet: boolean;
  localVideoRef: RefObject<HTMLVideoElement>;
  remoteVideoRef: RefObject<HTMLVideoElement>;
};
const VideoCallDisplays = ({
  remoteStreamIsSet,
  localVideoRef,
  remoteVideoRef,
}: props) => {
  return (
    <div className="videocall w-full h-full relative">
      <div
        className={
          remoteStreamIsSet
            ? "absolute top-0 right-0 w-40 h-40 z-20"
            : "absolute top-0 right-0 w-full h-full rounded-2xl z-10"
        }>
        <video
          ref={localVideoRef}
          autoPlay
          muted
          disablePictureInPicture
          className="object-cover w-full h-full"></video>
      </div>
      <div
        className={
          remoteStreamIsSet
            ? "absolute top-0 right-0 w-full h-full rounded-2xl z-10"
            : "hidden"
        }>
        <video
          ref={remoteVideoRef}
          autoPlay
          muted
          disablePictureInPicture
          className="object-cover w-full h-full"></video>
      </div>
    </div>
  );
};
export default VideoCallDisplays;
