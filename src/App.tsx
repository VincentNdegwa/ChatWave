import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProfilePage from "./pages/profilePage";
import Login from "./pages/AuthPage/Login";
import MainLayout from "./MainLayout";
type Props = {};

export default function App({}: Props) {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isOverLayOpen, setOperLayOpen] = useState<boolean>(false);
  const [component, setComponent] = useState<JSX.Element>();
  const [overLayHeader, setOverLayHeader] = useState<string>("");

  const openOverlayProfile = () => {
    setOperLayOpen(true);
    setOverLayHeader("Contact Details");
    setComponent(<ProfilePage />);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <MainLayout
              isChatOpen={isChatOpen}
              setIsChatOpen={setIsChatOpen}
              openOverlayProfile={openOverlayProfile}
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
