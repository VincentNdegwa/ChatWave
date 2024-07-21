/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { FaMicrophone, FaVideo } from "react-icons/fa";
import socketConfigs from "../../modules/socketConfigs";
import { callMode, callerData } from "../../types";
import { MediaConnection, Peer } from "peerjs";
import { MdOutlineCallEnd } from "react-icons/md";

type Props = {
  mode: callerData;
  incommingCall: boolean;
};

function Index({ mode, incommingCall }: Props) {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const socket = new socketConfigs().getSocket();
  const [peer, setPeer] = useState<Peer | null>(null);
  const [peerId, setPeerId] = useState<string>();
  const [localStream, setLocalStream] = useState<MediaStream>();
  const [initCall, setInitCall] = useState<MediaConnection>();

  useEffect(() => {
    if (mode.start && !incommingCall) {
      setupOutgoingConnection();
    }
  }, [mode]);

  useEffect(() => {
    if (incommingCall) {
      const nPeer = new Peer();
      nPeer.on("open", (id: string) => {
        if (mode.sender_id != undefined) {
          console.log("ansewering peer id: " + id);
          socket.emit("answer-call", {
            to: mode.sender_id?.toString(),
            peerId: id,
          });
        }
      });
      nPeer.on("call", (call) => {
        navigator.mediaDevices
          .getUserMedia({ audio: true, video: mode.mode === callMode.VIDEO })
          .then((stream) => {
            call.answer(stream || localStream);
            setInitCall(call);
          });
      });

      console.log("start incomming call");
    }
  }, [incommingCall]);

  initCall?.on("stream", (remStream) => {
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remStream;
      console.log("Setting up the remote stream");
    }
  });
  socket.on("call-accepted", (data) => {
    setPeerId(data.peerId);
  });

  useEffect(() => {
    if (peerId != undefined) {
      console.log("call answered " + peerId);
      if (peer != null) {
        if (localStream) {
          const call = peer.call(peerId, localStream);
          console.log(`calling peerId: ${peerId}`);
          call.on("stream", (remoteStream: any) => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remoteStream;
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
  }, [peerId]);
  const setupOutgoingConnection = () => {
    if (mode.sender_id && !incommingCall) {
      const newPeer = new Peer();
      setPeer(newPeer);

      newPeer.on("open", (id: string) => {
        console.log(`My peer ID is: ${id}`);
      });

      newPeer.on("error", (err: any) => {
        console.error("PeerJS error:", err);
      });

      window.navigator.mediaDevices
        .getUserMedia({ audio: true, video: mode.mode === callMode.VIDEO })
        .then((stream) => {
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
            setLocalStream(stream);
            socket.emit("join", mode.sender_id);
            socket.emit("call-user", mode);
          }
        })
        .catch((error) => {
          console.error("Error setting up connection:", error);
        });
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center md:p-1">
      <div className=" bg-slate-900 w-full md:w-4/6 h-full flex flex-col items-center relative">
        {mode.mode === callMode.VIDEO && (
          <div className="bg-slate-900">
            <div className="rounded-lg absolute top-0 left-0 w-40 h-40 z-20">
              <video
                ref={remoteVideoRef}
                autoPlay
                disablePictureInPicture
                className="object-cover w-full h-full"></video>
            </div>
            <div className="absolute top-0 right-0 w-full h-full rounded-2xl z-10">
              <video
                ref={localVideoRef}
                autoPlay
                disablePictureInPicture
                className="object-cover w-full h-full"></video>
            </div>
          </div>
        )}
        {mode.mode === callMode.VOICE && (
          <div className="w-32 h-32 bg-sky-900 rounded-full flex items-center justify-center mb-4">
            <FaMicrophone size={32} className="text-white" />
          </div>
        )}
        <div className="flex space-x-3 md:space-x-5 absolute bottom-4 z-30 bg-black bg-opacity-30 rounded-md p-1 items-center">
          <button className="cursor-pointer h-fit text-white p-3 rounded-full shadow-lg hover:bg-black hover:bg-opacity-50 transition-all duration-300">
            <FaVideo size={24} />
          </button>
          <button className="cursor-pointer h-fit text-white p-3 rounded-full shadow-lg hover:bg-black hover:bg-opacity-50 transition-all duration-300">
            <FaMicrophone size={24} />
          </button>
          <div className="cursor-pointer h-fit bg-red-700 flex items-center gap-x-2  text-white p-2 rounded-sm shadow-lg hover:bg-red-500 transition-all duration-300">
            <MdOutlineCallEnd size={24} />
            Leave
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
