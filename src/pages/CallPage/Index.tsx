/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaPhoneSlash,
} from "react-icons/fa";
import socketConfigs from "../../modules/socketConfigs";
import { callMode } from "../../types";

type Props = {
  mode: {
    start: boolean;
    mode: callMode;
    sender_id: number | null;
    receiver_id: number | undefined;
  };
};

const Index: React.FC<Props> = ({ mode }) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const socket = new socketConfigs().getSocket();

  useEffect(() => {
    if (mode.start) {
      setupConnection();
      if (mode.mode === callMode.VIDEO) {
        startVideoCall();
      } else if (mode.mode === callMode.VOICE) {
        startVoiceCall();
      }
    }
  }, [mode]);

  // useEffect(() => {
  //   socket.on("call-user", (data) => {
  //     console.log(data);
  //   });
  //   socket.on("call-ongoing", (data) => {
  //     console.log(data);
  //   });
  // }, []);

  const setupConnection = () => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: mode.mode === callMode.VIDEO,
      })
      .then((stream) => {
        localVideoRef.current!.srcObject = stream;
        socket.emit("join", mode.sender_id);

        if (mode.mode === callMode.VIDEO) {
          socket.emit("call-user", {
            receiver_id: mode.receiver_id,
            signalData: stream,
          });
        } else if (mode.mode === callMode.VOICE) {
          // Handle voice call setup
        }
      });
  };

  const startVideoCall = () => {
    // socket.on("call-accepted", (signalData: any) => {
    // Handle call acceptance
    // });
    // socket.emit("call-user", { to: mode.receiver_id, signalData: null });
  };

  const startVoiceCall = () => {
    // Implement voice call start logic
  };



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
};

export default Index;
