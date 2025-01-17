import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { asset0, asset1, asset2, asset3, asset4, asset5, asset6, asset7 } from "../images";
import { IoHomeOutline, IoCreateOutline, IoAnalyticsOutline, IoWalletOutline, IoPersonOutline, IoLogOutOutline } from "react-icons/io5";

const Sidebar = () => {
  const userId = localStorage.getItem('user_id') || 1;
  console.log("user id is", userId);
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const navlinks = [
    { name: "dashboard", icon: <img src={asset1} alt="Dashboard" className="w-1/2 h-1/2" />, link: `/myCampaigns/${userId}` },
    { name: "home", icon: <IoHomeOutline size={24} color="#1DC071" />, link: "/home" },
    { name: "create", icon: <IoCreateOutline size={24} color="#1DC071" />, link: `/create_campaign` },
    { name: "analytics", icon: <IoAnalyticsOutline size={24} color="#1DC071" />, link: "/analytics" },
    { name: "payment", icon: <IoWalletOutline size={24} color="#1DC071" />, link: "/payments" },
    { name: "profile", icon: <IoPersonOutline size={24} color="#1DC071" />, link: "/profile" },
    { name: "logout", icon: <IoLogOutOutline size={24} color="#1DC071" />, link: "/" },
  ];

  const Icon = ({ styles, name, isActive, handleClick, icon }) => (
    <div
      className={`w-[48px] h-[48px] rounded-[10px] ${
        isActive && isActive === name && "bg-[#2c2f32]"
      } flex justify-center items-center cursor-pointer ${styles}`}
      onClick={handleClick}
    >
      {icon}
    </div>
  );

  return (
    <div className="flex">
      <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh] w-20">
        <Link to="/">
          <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" icon={<img src={asset0} alt="Logo" className="w-1/2 h-1/2" />} />
        </Link>
        <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
          <div className="flex flex-col justify-center items-center gap-3">
            {navlinks.map((link) => (
              <Icon
                key={link.name}
                name={link.name}
                isActive={isActive}
                handleClick={() => {
                  if (!link.disabled) {
                    setIsActive(link.name);
                    navigate(link.link);
                  }
                }}
                icon={link.icon}
              />
            ))}
          </div>
          <Icon styles="bg-[#1c1c24] shadow-secondary" icon={<img src={asset7} alt="Sun" className="w-1/2 h-1/2" />} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
