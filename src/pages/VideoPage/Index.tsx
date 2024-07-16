/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import { callMode } from "../../types";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaPhoneSlash,
} from "react-icons/fa";
import socketConfigs from "../../modules/socketConfigs";

type Props = {
  mode: {
    start: boolean;
    mode: callMode;
    sender_id: number | null;
    receiver_id: number | undefined;
  };
};

const socket = new socketConfigs().getSocket();

function Index({ mode }: Props) {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

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

  const setupConnection = () => {
    const configuration = {
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    };
    peerConnectionRef.current = new RTCPeerConnection(configuration);

    peerConnectionRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          candidate: event.candidate,
          to: mode.receiver_id?.toString(),
        });
      }
    };

    peerConnectionRef.current.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    socket.on("offer", async (data) => {
      if (data.to === mode.sender_id?.toString()) {
        await peerConnectionRef.current?.setRemoteDescription(
          new RTCSessionDescription(data.offer)
        );
        const answer = await peerConnectionRef.current?.createAnswer();
        await peerConnectionRef.current?.setLocalDescription(answer);
        socket.emit("answer", { answer, to: data.from });
      }
    });

    socket.on("answer", async (data) => {
      if (data.to === mode.sender_id?.toString()) {
        await peerConnectionRef.current?.setRemoteDescription(
          new RTCSessionDescription(data.answer)
        );
      }
    });

    socket.on("ice-candidate", async (data) => {
      if (data.to === mode.sender_id?.toString() && data.candidate) {
        await peerConnectionRef.current?.addIceCandidate(
          new RTCIceCandidate(data.candidate)
        );
      }
    });

    socket.emit("join", mode.sender_id);
  };

  const getMediaStream = async () => {
    const constraints = {
      video: mode.mode === callMode.VIDEO,
      audio: true,
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (localVideoRef.current && mode.mode === callMode.VIDEO) {
        localVideoRef.current.srcObject = stream;
      }
      stream.getTracks().forEach((track) => {
        peerConnectionRef.current?.addTrack(track, stream);
      });
      return stream;
    } catch (error) {
      console.error("Error accessing media devices.", error);
      throw error;
    }
  };

  const startVideoCall = async () => {
    console.log("Starting video call...");
    await getMediaStream();
    const offer = await peerConnectionRef.current?.createOffer();
    await peerConnectionRef.current?.setLocalDescription(offer);
    socket.emit("offer", { offer, to: mode.receiver_id?.toString() });
  };

  const startVoiceCall = async () => {
    console.log("Starting voice call...");
    await getMediaStream();
    const offer = await peerConnectionRef.current?.createOffer();
    await peerConnectionRef.current?.setLocalDescription(offer);
    socket.emit("offer", { offer, to: mode.receiver_id?.toString() });
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
}

export default Index;
