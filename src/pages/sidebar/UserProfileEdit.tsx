/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { User, alertType } from "../../types";
import { IoMdSave, IoMdArrowRoundBack } from "react-icons/io";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import imageDB from "../../modules/FireBaseConifg";
import { v4 as uuidv4 } from "uuid";
import { ProfileUpdate } from "./Types/types";
import Loading from "../Components/Loading";

type Props = {
  user: User;
  onCancel: () => void;
  notificationAlert: (alert: alertType) => void;
};

export default function UserProfileEdit({
  user,
  onCancel,
  notificationAlert,
}: Props) {
  const [profilePic, setProfilePic] = useState(user.profile?.profile_pic || "");
  const [image, setImage] = useState<any>("");
  const [firstName, setFirstName] = useState(user.profile?.first_name || "");
  const [lastName, setLastName] = useState(user.profile?.last_name || "");
  const [about, setAbout] = useState(user.profile?.about || "");
  const [firebaseLink, setFirebaseLink] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const { phone_number } = user;

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = () => setProfilePic(reader.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const uploadImageToFireBase = async (): Promise<string | null> => {
    try {
      const imageRef = ref(imageDB, `/files/${uuidv4()}`);
      await uploadBytes(imageRef, image);
      const linkUrl = await getDownloadURL(imageRef);
      notificationAlert({
        message: "Photo uploaded successfully",
        type: "success",
      });
      return linkUrl;
    } catch (error) {
      console.error("Error uploading image and getting URL:", error);
      notificationAlert({
        message: "Unable to upload the image",
        type: "error",
      });
      return null;
    }
  };

  const handleSave = async () => {
    setLoading(true);
    const profileUrl = await uploadImageToFireBase();
    if (profileUrl) {
      setProfilePic(profileUrl);
      setFirebaseLink(profileUrl);
    }

    const updatedUser: ProfileUpdate = {
      user_id: user.id,
      first_name: firstName,
      last_name: lastName,
      profile_pic: firebaseLink,
      about: about,
    };
    updateProfile(updatedUser);
  };

  const updateProfile = async (profile: ProfileUpdate) => {
    try {
      console.log(profile);
    } catch (error) {
      notificationAlert({ message: "Something wrong happened", type: "error" });
      console.error("Error updating profile:", error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-y-5 items-center text-sky-950 w-full h-full">
      <div className="flex gap-x-3 items-center bg-sky-900 w-full h-fit p-2 text-white">
        <div
          onClick={onCancel}
          className="text-2xl ms-2 p-2 text-sky-950 bg-sky-200 rounded-lg hover:bg-sky-300 transition-all ease-in duration-300">
          <IoMdArrowRoundBack />
        </div>
        <div className="text-lg font-semibold">Edit Profile</div>
      </div>
      <div className="flex flex-col w-full h-full items-center">
        <img
          src={profilePic || "/images/avatar.jpg"}
          alt="profile-pic"
          className="h-40 w-40 rounded-full border-4 border-white shadow-md"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePicChange}
          className="mt-2"
        />
        <div className="mt-4 w-full p-2">
          <div className="flex flex-col mt-3">
            <label className="text-md text-slate-500">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-2 p-2 border rounded outline-sky-500"
            />
          </div>
          <div className="flex flex-col mt-3">
            <label className="text-md text-slate-500">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-2 p-2 border rounded outline-sky-500"
            />
          </div>
          <div className="flex flex-col mt-3">
            <label className="text-md text-slate-500">About</label>
            <input
              type="text"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="mt-2 p-2 border rounded outline-sky-500"
            />
          </div>
          <div className="flex flex-col mt-3">
            <label className="text-md text-slate-500">Phone Number</label>
            <input
              type="text"
              value={phone_number}
              readOnly
              className="mt-2 p-2 border-0 outline-none rounded bg-gray-100 cursor-not-allowed"
            />
          </div>
        </div>
        <button
          onClick={handleSave}
          className="mt-6 flex items-center gap-2 bg-white text-sky-600 px-4 py-2 rounded-full hover:bg-slate-200 transition-all ease-in duration-300">
          <IoMdSave />
          Save Changes
        </button>
      </div>
    </div>
  );
}
