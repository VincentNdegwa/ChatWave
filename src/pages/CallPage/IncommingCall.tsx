/* eslint-disable react-hooks/exhaustive-deps */
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
  const [inCall, setInCall] = useState<MediaConnection>();
  const [remoteStreamIsSet, setRemoteStreamIsSet] = useState<boolean>(false);
  const [callAccepted, setCallAccepted] = useState<boolean>(false);
  const callerUser: Participant | undefined = mode.sender;

  const toggleMute = () => {
    setMuted(!muted);
  };

  const handleCallResponse = (status: string) => {
    if (status === "answer") {
      setCallAccepted(true);
    } else if (status === "reject") {
      setCallAccepted(false);
    }
  };

  useEffect(() => {
    if (!incommingCall) {
      callUser();
    }
  }, [mode, incommingCall]);

  useEffect(() => {
    if (incommingCall && callAccepted) {
      receiveCall();
    }
  }, [callAccepted, incommingCall]);

  const callUser = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: mode.mode === callMode.VIDEO,
      });
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
    } catch (err) {
      console.error("Error getting local stream:", err);
    }
  };

  const receiveCall = () => {
    console.log("received call from: ", callerUser?.user.id);
    const peer = new Peer();

    peer.on("open", (id: string) => {
      if (callerUser?.user.id != undefined) {
        console.log("answering peer id: " + id);
        socket.emit("answer-call", {
          to: callerUser?.user.id?.toString(),
          peerId: id,
        });
      }
    });

    peer.on("call", async (call) => {
      const str = await getLocalStream();
      setLocalStream(str);
      localStreamRef.current = str;
      console.log("got the local stream");

      call.answer(localStreamRef.current);
      setInCall(call);

      call.on("stream", (remStream) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remStream;
          setRemoteStreamIsSet(true);
          console.log("Setting up the remote stream");
        }
      });
    });
  };

  inCall?.on("stream", (remStream) => {
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remStream;
      setRemoteStreamIsSet(true);
      console.log("Setting up the remote stream");
    }
  });

  const getLocalStream = async (): Promise<MediaStream> => {
    console.log("getting media stream");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: mode.mode === callMode.VIDEO,
      });
      setLocalStream(stream);
      localStreamRef.current = stream;
      return stream;
    } catch (err) {
      console.error("Error getting media stream:", err);
      throw err;
    }
  };

  socket.on("call-accepted", (data) => {
    console.log("call accepted");
    setReceiverPeerId(data.peerId);
  });

  useEffect(() => {
    if (receiverPeerId) {
      console.log("call answered " + receiverPeerId);
      if (senderPeer && localStream) {
        const call = senderPeer.call(receiverPeerId, localStream);
        console.log(`calling receiverPeerId: ${receiverPeerId}`);
        call.on("stream", (remoteStream: MediaStream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
            setRemoteStreamIsSet(true);
            console.log("Received remote stream");
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
  }, [localStream, receiverPeerId, senderPeer]);

  return (
    <div className="w-full h-full bg-sky-950 relative">
      <div className="w-full h-full">
        {incommingCall && !callAccepted && (
          <>
            <div className="h-full flex justify-center">
              <div className="flex flex-col pt-52">
                <img
                  src={
                    mode.sender?.user.profile?.profile_pic ||
                    "images/avatar.jpg"
                  }
                  className="rounded-full h-[250px] w-[250px]"
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
                  {mode.mode === callMode.VIDEO && "Incoming Video Call"}
                  {mode.mode === callMode.VOICE && "Incoming Voice Call"}
                </div>
              </div>
            </div>

            <div className="flex space-x-3 md:space-x-5 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bottom-4 z-30 bg-black bg-opacity-30 rounded-md p-1 items-center">
              <div
                onClick={() => handleCallResponse("reject")}
                className="cursor-pointer h-20 w-20 rounded-full justify-center bg-red-700 flex items-center gap-x-2 text-white p-2 shadow-lg hover:bg-red-500 transition-all duration-300">
                <MdCallEnd size={24} />
              </div>
              <div
                onClick={() => handleCallResponse("answer")}
                className="cursor-pointer h-20 w-20 rounded-full justify-center bg-green-700 flex items-center gap-x-2 text-white p-2 shadow-lg hover:bg-green-500 transition-all duration-300">
                <MdCallEnd size={24} />
              </div>
            </div>
          </>
        )}

        {!incommingCall && (
          <>
            {mode.mode === callMode.VIDEO && (
              <div className="videocall w-full h-full relative">
                <div
                  className={
                    remoteStreamIsSet
                      ? "absolute top-4 right-4 w-40 h-40 z-20"
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
                    disablePictureInPicture
                    className="object-cover w-full h-full"></video>
                </div>
              </div>
            )}

            {mode.mode === callMode.VOICE && (
              <div className="voicecall w-full h-full"></div>
            )}

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
          </>
        )}

        {incommingCall && callAccepted && (
          <>
            {mode.mode === callMode.VIDEO && (
              <div className="videocall w-full h-full relative">
                <div
                  className={
                    remoteStreamIsSet
                      ? "absolute top-4 right-4 w-40 h-40 z-20"
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
                    disablePictureInPicture
                    className="object-cover w-full h-full"></video>
                </div>
              </div>
            )}

            {mode.mode === callMode.VOICE && (
              <div className="voicecall w-full h-full"></div>
            )}

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
          </>
        )}
      </div>
    </div>
  );
};

export default IncommingCall;
