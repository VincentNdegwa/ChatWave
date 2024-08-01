import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Chat, Participant, LastMessage } from "../../types";
import { getUserId } from "../../modules/getUserId";
import { FaAngleDown } from "react-icons/fa6";

type Props = {
  onItemClick: (chatId: number) => void;
  chat: Chat;
  handleDeleteChat: (participantId: number, userId: number) => void;
};
enum OptionType {
  DeleteOption = "Delete",
  UnreadOption = "Unread",
}

function Contact({ onItemClick, chat, handleDeleteChat }: Props) {
  const navigate = useNavigate();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [viewMenu, setViewMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [userId, setUserId] = useState(getUserId());

  const handleNavigate = (path: string) => {
    navigate(path);
    onItemClick(chat.id);
  };

  useEffect(() => {
    setUserId(getUserId());
  }, []);

  const getUserProfile = (participants: Participant[]) => {
    const currentUserId = userId;
    const currentUserIdNumber =
      currentUserId !== undefined ? Number(currentUserId) : undefined;
    return participants.find(
      (participant) => participant.user.id !== currentUserIdNumber
    );
  };

  const getMyProfile = (participants: Participant[]) => {
    const currentUserId = userId;
    const currentUserIdNumber =
      currentUserId !== undefined ? Number(currentUserId) : undefined;
    return participants.find(
      (participant) => participant.user.id === currentUserIdNumber
    );
  };

  const renderLastMessage = (
    lastMessage: LastMessage | null
  ): React.ReactNode => {
    return lastMessage ? lastMessage.text : "";
  };

  const profile = getUserProfile(chat.participants);

  const openChatOption = (ev: React.MouseEvent) => {
    ev.stopPropagation();
    setViewMenu(!viewMenu);
  };

  const handleClickOutside = (ev: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(ev.target as Node)
    ) {
      setIsDropdownVisible(false);
      setViewMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (click: {
    message: OptionType;
    ev: React.MouseEvent<HTMLElement>;
    action: string;
  }) => {
    click.ev.stopPropagation();
    setViewMenu(false);
    if (profile) {
      handleAction(click.action);
    }
  };

  const handleAction = (action: string) => {
    const myProfile: Participant | undefined = getMyProfile(chat.participants);
    if (action == "delete" && myProfile) {
      handleDeleteChat(myProfile.id, myProfile.user.id);
    }
  };

  return (
    <>
      {profile && (
        <div
          onClick={() => handleNavigate("/chat")}
          onMouseEnter={() => setIsDropdownVisible(true)}
          onMouseLeave={() => setIsDropdownVisible(false)}
          className="flex gap-3 p-2 hover:bg-gray-50 ease-in duration-100 rounded-md cursor-pointer relative">
          <div className="h-[40px] w-[45px] ">
            <img
              src={profile?.user.profile?.profile_pic || "/images/avatar.jpg"}
              alt="profile-pic"
              className="rounded-full h-full w-full min-w-0"
            />
          </div>
          <div className="flex justify-between flex-row w-full">
            <div className="flex flex-col justify-evenly">
              <div className=" font-medium text-sky-900 text-sm">
                {profile?.user.profile?.first_name ||
                  profile?.user.phone_number}
              </div>
              <div className="text-xxs text-sky-600">
                {renderLastMessage(chat.lastMessage)}
              </div>
            </div>
            <div className="flex flex-col items-end justify-between">
              <div className="text-xs text-sky-950">
                {(chat.lastMessage?.sent_at &&
                  new Date(chat.lastMessage?.sent_at).toLocaleDateString()) ||
                  ""}
              </div>
              <div className="drop-down text-sm relative">
                <FaAngleDown
                  className="hover:bg-slate-200 p-1 text-2xl text-sky-950 transition-all ease-in-out duration-200 rounded-full"
                  opacity={isDropdownVisible ? 1 : 0}
                  onClick={(ev) => openChatOption(ev)}
                />
                {viewMenu && (
                  <div
                    ref={dropdownRef}
                    className="absolute top-1 right-0 bg-white border rounded shadow-md z-10">
                    <ul>
                      <li
                        onClick={(ev) => {
                          handleOptionClick({
                            message: OptionType.DeleteOption,
                            ev,
                            action: "delete",
                          });
                        }}
                        className="p-2 hover:bg-gray-200 cursor-pointer">
                        Delete
                      </li>

                      {/* <li
                        onClick={(ev) => {
                          handleOptionClick({
                            message: OptionType.UnreadOption,
                            ev,
                            action: "unread",
                          });

                          setViewMenu(false);
                        }}
                        className="p-2 hover:bg-gray-200 cursor-pointer">
                        Unread
                      </li> */}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          <span className="absolute right-0 bottom-0 w-10/12 border-b-2 border-slate-100"></span>
        </div>
      )}
    </>
  );
}

export default Contact;
