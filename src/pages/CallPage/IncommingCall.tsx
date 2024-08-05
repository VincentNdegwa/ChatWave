import { MdCallEnd } from "react-icons/md";
import { Participant, callMode, callerData } from "../../types";
import { FaMicrophone, FaMicrophoneSlash, FaVideo } from "react-icons/fa";
import { MdOutlineCallEnd } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import CustomSocket from "../../modules/CustomSocket";
import Peer, { MediaConnection } from "peerjs";

type props = {
  mode: callerData;
  incommingCall: boolean;
};

const socket = CustomSocket.getSocket();

const IncommingCall = ({ mode, incommingCall }: props) => {
  const [muted, setMuted] = useState<boolean>(false);
  const [localStream, setLocalStream] = useState<MediaStream>();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const [senderPeer, setSenderPeer] = useState<Peer>();
  const [receiverPeerId, setReceiverPeerId] = useState<string>();

  const [remoteStreamIsSet, setRemoteStreamIsSet] = useState<boolean>(false);

  const [callAccepted, setCallAccepted] = useState<boolean>(false);
  const callerUser: Participant | undefined = mode.sender;

  const toggleMute = () => {
    setMuted(!muted);
  };
  const handleCallResponse = (status: string) => {
    console.log(status);
  };
  useEffect(() => {
    if (!incommingCall) {
      callUser();
    } else {
      setCallAccepted(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, incommingCall]);

  useEffect(() => {
    if (incommingCall && callAccepted) {
      receiveCall();
    }
  });

  const callUser = async () => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: mode.mode === callMode.VIDEO,
      })
      .then((stream: MediaStream) => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
          setLocalStream(stream);
          const peer = new Peer();
          peer.on("open", (id: string) => {
            console.log(`caller peerId ${id}`);
          });
          setSenderPeer(peer);
          socket.emit("call-user", mode);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const receiveCall = () => {
    console.log("incomming call from: ", callerUser?.user.id);

    const receivingPeer = new Peer();

    receivingPeer.on("open", (id: string) => {
      if (callerUser?.user.id != undefined) {
        console.log("answering peer id: " + id);
        socket.emit("answer-call", {
          to: callerUser?.user.id?.toString(),
          peerId: id,
        });
      }
    });

    receivingPeer.on("call", async (call: MediaConnection) => {
      const str = await getLocalStream();
      if (str) {
        setLocalStream(str);
        if (localVideoRef.current) {
          localStreamRef.current = str;
          call.answer(localStreamRef.current);

          call.on("stream", (remStream) => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remStream;
              setRemoteStreamIsSet(true);
              console.log("Setting up the remote stream");
            }
          });
        }
      }
    });
  };

  const getLocalStream = async (): Promise<MediaStream | null> => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: mode.mode === callMode.VIDEO,
      })
      .then((stream: MediaStream) => {
        return stream;
      });
    return null;
  };

  socket.on("call-accepted", (data) => {
    console.log("call accepted");
    setReceiverPeerId(data.peerId);
  });

  useEffect(() => {
    if (receiverPeerId != undefined) {
      console.log("call answered " + receiverPeerId);
      if (senderPeer != null) {
        if (localStream) {
          const call = senderPeer.call(receiverPeerId, localStream);
          console.log(`calling receiverPeerId: ${receiverPeerId}`);
          call.on("stream", (remoteStream: MediaStream) => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remoteStream;
              setRemoteStreamIsSet(true);
            }
          });

          call.on("close", () => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = null;
            }
          });

          call.on("error", (err) => {
            console.error("PeerJS call error:", err);
          });
        }
      }
    }
  }, [localStream, receiverPeerId, senderPeer]);

  return (
    <div className="w-full h-full bg-sky-950 relative">
      <div className="w-full h-full">
        {incommingCall && (
          <div className="h-full flex justify-center">
            <div className="flex flex-col pt-52">
              <img
                src={
                  mode.sender?.user.profile?.profile_pic || "images/avatar.jpg"
                }
                className=" rounded-full h-[250px] w-[250px]"
                alt="profile"
              />
              <div className="text-2xl text-center text-white font-bold">
                {mode.sender?.user.profile?.first_name +
                  " " +
                  mode.sender?.user.profile?.last_name ||
                  mode.sender?.user.phone_number ||
                  "Unknown"}
              </div>
              <div className="text-sm text-center text-sky-300">
                {mode.mode == callMode.VIDEO && "Incomming Video Call"}
                {mode.mode == callMode.VOICE && "Incomming Voice Call"}
              </div>
            </div>
          </div>
        )}

        {!incommingCall && (
          <>
            {mode.mode == callMode.VIDEO && (
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
                      : "absolute top-0 right-0 w-40 h-40 z-20"
                  }>
                  <video
                    ref={remoteVideoRef}
                    autoPlay
                    disablePictureInPicture
                    className="object-cover w-full h-full"></video>
                </div>
              </div>
            )}

            {mode.mode == callMode.VOICE && (
              <div className="voicecall w-full h-full"></div>
            )}
          </>
        )}
      </div>
      {incommingCall && (
        <div className="flex space-x-3 md:space-x-5 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bottom-4 z-30 bg-black bg-opacity-30 rounded-md p-1 items-center">
          <div
            onClick={() => handleCallResponse("answer")}
            className="cursor-pointer h-20 w-20 rounded-full  justify-center bg-red-700 flex items-center gap-x-2 text-white p-2 shadow-lg hover:bg-red-500 transition-all duration-300">
            <MdCallEnd size={24} />
          </div>
          <div
            onClick={() => handleCallResponse("reject")}
            className="cursor-pointer h-20 w-20 rounded-full  justify-center bg-green-700 flex items-center gap-x-2 text-white p-2 shadow-lg hover:bg-green-500 transition-all duration-300">
            <MdCallEnd size={24} />
          </div>
        </div>
      )}

      {!incommingCall && (
        <div className="flex space-x-3 md:space-x-5 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bottom-4 z-30 bg-black bg-opacity-30 rounded-md p-1 items-center">
          <button className="cursor-pointer h-fit text-white p-3 rounded-full shadow-lg hover:bg-black hover:bg-opacity-50 transition-all duration-300">
            <FaVideo size={24} />
          </button>
          <button
            className="cursor-pointer h-fit text-white p-3 rounded-full shadow-lg hover:bg-black hover:bg-opacity-50 transition-all duration-300"
            onClick={toggleMute}>
            {muted ? (
              <FaMicrophoneSlash size={24} />
            ) : (
              <FaMicrophone size={24} />
            )}
          </button>
          <div
            onClick={() => handleCallResponse("reject")}
            className="cursor-pointer h-fit bg-red-700 flex items-center gap-x-2 text-white p-2 rounded-sm shadow-lg hover:bg-red-500 transition-all duration-300">
            <MdOutlineCallEnd size={24} />
            Leave
          </div>
        </div>
      )}
    </div>
  );
};
export default IncommingCall;
