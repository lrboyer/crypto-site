import { LogOut } from "./LogOut";
import { useNavigate } from "react-router-dom";
import { DashBoard } from "./DashBoard";

export const NavBar = () => {
  let navigate = useNavigate();

  const handleProfile = () => {
    navigate("/Profile");
  };

  const handleDashBoard = () => {
    navigate("/DashBoard");
  };

  return (
    <div className="fixed top-0 left-0 h-full w-44 m-0 flex flex-col bg-black text-white shadow-lg">
      <button className="border-4 rounded-2xl hover:rounded-xl hover:rotate-3 hover:scale-90 transition-all ease-linear border-white p-3 m-3"
        onClick={handleProfile}>
        Profile
      </button>
      <button
        className="border-4 rounded-2xl hover:rounded-xl hover:rotate-3 hover:scale-90 transition-all ease-linear border-white p-3 m-3"
        onClick={handleDashBoard}>
        Market
      </button>
      <LogOut />
    </div>
  );
};
