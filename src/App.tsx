import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProfilePage from "./pages/profilePage";
import Login from "./pages/AuthPage/Login";
import MainLayout from "./MainLayout";
import Register from "./pages/AuthPage/Register";
import ForgotPassword from "./pages/AuthPage/ForgotPassword";
import OTPVerification from "./pages/AuthPage/OTPVerification";
import { Participant } from "./types";
type Props = {};

export default function App({}: Props) {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isOverLayOpen, setOperLayOpen] = useState<boolean>(false);
  const [component, setComponent] = useState<JSX.Element>();
  const [overLayHeader, setOverLayHeader] = useState<string>("");

  const openOverlayProfile = (participant: Participant) => {
    setOperLayOpen(true);
    setOverLayHeader("Contact Details");
    setComponent(<ProfilePage participant={participant} />);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp-verification" element={<OTPVerification />} />

        <Route
          path="/*"
          element={
            <MainLayout
              isChatOpen={isChatOpen}
              setIsChatOpen={setIsChatOpen}
              openOverlayProfile={(participant: Participant) =>
                openOverlayProfile(participant)
              }
              isOverLayOpen={isOverLayOpen}
              setOperLayOpen={setOperLayOpen}
              component={component}
              overLayHeader={overLayHeader}
            />
          }
        />
      </Routes>
    </Router>
  );
}
