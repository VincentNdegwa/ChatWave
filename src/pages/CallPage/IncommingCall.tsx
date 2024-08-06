/* eslint-disable react-hooks/exhaustive-deps */
import { MdCallEnd, MdOutlineCallEnd } from "react-icons/md";
import { FaMicrophone, FaMicrophoneSlash, FaVideo } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import CustomSocket from "../../modules/CustomSocket";
import Peer, { MediaConnection } from "peerjs";
import CallerNotifier from "./CalllerNotifier";
import VideoCallDisplays from "./VideoCallDisplays";
import { Participant, callMode, callerData } from "../../types";
import AudioCallDisplay from "./AudioCallDisplay";

type Props = {
  mode: callerData;
  incommingCall: boolean;
};

const socket = CustomSocket.getSocket();
const IncommingCall = ({ mode, incommingCall }: Props) => {
  const [muted, setMuted] = useState<boolean>(false);
  const [localStream, setLocalStream] = useState<MediaStream>();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const localAudioRef = useRef<HTMLAudioElement>(null);
  const remoteAudioRef = useRef<HTMLAudioElement>(null);
  const [senderPeer, setSenderPeer] = useState<Peer>();
  const [receiverPeerId, setReceiverPeerId] = useState<string>();
  const [inCall, setInCall] = useState<MediaConnection>();
  const [remoteStreamIsSet, setRemoteStreamIsSet] = useState<boolean>(false);
  const [callAccepted, setCallAccepted] = useState<boolean>(false);
  const [connected, setConnected] = useState<boolean>(false);

  const callerUser: Participant | undefined = mode.sender;

  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setMuted(!muted);
    }
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
      await getLocalStream();

      const peer = new Peer();
      peer.on("open", (id: string) => {
        console.log(`caller peerId ${id}`);
      });
      setSenderPeer(peer);
      socket.emit("call-user", mode);
    } catch (err) {
      console.error("Error getting local stream:", err);
    }
  };

  const receiveCall = async () => {
    console.log("received call from: ", callerUser?.user.id);
    const peer = new Peer();

    setConnected(false);
    peer.on("open", (id: string) => {
      if (callerUser?.user.id !== undefined) {
        console.log("answering peer id: " + id);
        socket.emit("answer-call", {
          to: callerUser.user.id.toString(),
          peerId: id,
        });
      }
    });

    peer.on("call", async (call) => {
      console.log("got the media stream now");
      setConnected(true);

      const stream = await getLocalStream();

      call.answer(localStream || stream);
      setInCall(call);
      call.on("stream", (stream) => getRemoteStream(stream));
    });
  };
  inCall?.on("stream", (stream) => getRemoteStream(stream));

  useEffect(() => {
    console.log(
      `This is the status of the connected: ${connected ? true : false}`
    );
  }, [connected]);

  const getLocalStream = async (): Promise<MediaStream> => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: mode.mode === callMode.VIDEO,
    });
    setLocalStream(stream);
    if (localVideoRef.current && mode.mode === callMode.VIDEO) {
      localVideoRef.current.srcObject = stream;
    }
    if (localAudioRef.current && mode.mode === callMode.VOICE) {
      localAudioRef.current.srcObject = stream;
    }
    return stream;
  };

  const getRemoteStream = (remoteStream: MediaStream) => {
    setRemoteStreamIsSet(true);
    if (remoteVideoRef.current && mode.mode === callMode.VIDEO) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
    if (remoteAudioRef.current && mode.mode === callMode.VOICE) {
      remoteAudioRef.current.srcObject = remoteStream;
    }
  };

  useEffect(() => {
    if (receiverPeerId && senderPeer && localStream) {
      console.log("call answered " + receiverPeerId);
      const call = senderPeer.call(receiverPeerId, localStream);
      console.log(`calling receiverPeerId: ${receiverPeerId}`);

      call.on("stream", (stream) => getRemoteStream(stream));

      call.on("close", () => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = null;
        }
      });

      call.on("error", (err) => {
        console.error("PeerJS call error:", err);
      });

      setInCall(call);
    }
  }, [localStream, receiverPeerId, senderPeer]);

  socket.on("call-accepted", (data) => {
    console.log("call accepted");
    setReceiverPeerId(data.peerId);
  });

  return (
    <div className="w-full h-full bg-sky-950 relative">
      <div className="w-full h-full">
        {incommingCall && !callAccepted && (
          <>
            <div className="h-full flex justify-center">
              <CallerNotifier
                mode={mode}
                status=""
                incommingCall={incommingCall}
              />
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
              <VideoCallDisplays
                remoteStreamIsSet={remoteStreamIsSet}
                localVideoRef={localVideoRef}
                remoteVideoRef={remoteVideoRef}
              />
            )}

            {mode.mode === callMode.VOICE && (
              <AudioCallDisplay
                remoteStreamIsSet={remoteStreamIsSet}
                localAudioRef={localAudioRef}
                remoteAudioRef={remoteAudioRef}
                mode={mode}
                incommingCall={incommingCall}
              />
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
            {!connected && (
              <div className="flex justify-center">
                <CallerNotifier
                  mode={mode}
                  status="Connecting..."
                  incommingCall={incommingCall}
                />
              </div>
            )}
            {connected && mode.mode === callMode.VIDEO && (
              <VideoCallDisplays
                remoteStreamIsSet={remoteStreamIsSet}
                localVideoRef={localVideoRef}
                remoteVideoRef={remoteVideoRef}
              />
            )}

            {connected && mode.mode === callMode.VOICE && (
              <AudioCallDisplay
                remoteStreamIsSet={remoteStreamIsSet}
                localAudioRef={localAudioRef}
                remoteAudioRef={remoteAudioRef}
                mode={mode}
                incommingCall={incommingCall}
              />
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
