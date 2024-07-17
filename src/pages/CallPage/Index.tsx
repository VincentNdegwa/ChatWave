/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaPhoneSlash,
} from "react-icons/fa";
import socketConfigs from "../../modules/socketConfigs";
import { callMode, callerData } from "../../types";
import { Peer } from "peerjs";

type Props = {
  mode: callerData;
  incommingCall: boolean;
};

function Index({ mode, incommingCall }: Props) {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const socket = new socketConfigs().getSocket();
  const [peer, setPeer] = useState<Peer | null>(null);

  useEffect(() => {
    if (mode.start) {
      setupConnection();
    }
  }, [mode]);

  useEffect(() => {
    if (incommingCall) {
      console.log("start incomming call");
    }
  }, [incommingCall]);

  useEffect(() => {
    if (peer) {
      peer.on("call", (call) => {
        window.navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream) => {
            // setMediaConnection(call);
            call.answer(stream);
            call.on("stream", (remoteStream: any) => {
              if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = remoteStream;
              }
            });
          })
          .catch((error) => {
            console.error("Error answering call:", error);
          });
      });
    }
  }, [peer]);

  const setupConnection = () => {
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
          socket.emit("call-user", mode);
        }
        if (mode.receiver_id) {
          const call = newPeer.call(mode.receiver_id.toString(), stream);
          // setMediaConnection(call);

          call.on("stream", (remoteStream: any) => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remoteStream;
            }
          });

          call.on("close", () => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = null;
            }
            // setMediaConnection(null);
          });

          call.on("error", (err) => {
            console.error("PeerJS call error:", err);
          });
        }
      })
      .catch((error) => {
        console.error("Error setting up connection:", error);
      });
  };

  // const startVoiceCall = () => {
  //   // Implement voice call start logic
  // };

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-sky-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg flex flex-col items-center">
        {mode.mode === callMode.VIDEO && (
          <div className="w-full h-64 bg-sky-900 rounded-lg mb-4 relative">
            <video
              ref={localVideoRef}
              autoPlay
              muted
              className="w-full h-full rounded-lg"></video>
            <video
              ref={remoteVideoRef}
              autoPlay
              className="w-full h-full rounded-lg absolute top-0 left-0"></video>
          </div>
        )}
        {mode.mode === callMode.VOICE && (
          <div className="w-32 h-32 bg-sky-900 rounded-full flex items-center justify-center mb-4">
            <FaMicrophone size={32} className="text-white" />
          </div>
        )}
        <div className="flex space-x-4">
          <button className="bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-500">
            <FaPhoneSlash size={24} />
          </button>
          {mode.mode === callMode.VIDEO ? (
            <>
              <button className="bg-sky-700 text-white p-4 rounded-full shadow-lg hover:bg-sky-600">
                <FaVideo size={24} />
              </button>
              <button className="bg-sky-700 text-white p-4 rounded-full shadow-lg hover:bg-sky-600">
                <FaMicrophone size={24} />
              </button>
            </>
          ) : (
            <>
              <button className="bg-sky-700 text-white p-4 rounded-full shadow-lg hover:bg-sky-600">
                <FaMicrophone size={24} />
              </button>
              <button className="bg-sky-700 text-white p-4 rounded-full shadow-lg hover:bg-sky-600">
                <FaMicrophoneSlash size={24} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Index;
