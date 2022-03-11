import { LogOut } from "./LogOut";
import { useNavigate } from "react-router-dom";
import { DashBoard } from "./DashBoard";
import { CgProfile } from "react-icons/cg";
import { VscGraphLine } from "react-icons/vsc";

export const NavBar = () => {
  let navigate = useNavigate();

  return (
    <div className="z-50 sticky top-0 w-full flex flex-row h-20 justify-between items-center align-middle
     bg-[url('../public/images/bitcoin-pattern.svg')] bg-cover bg-no-repeat text-white shadow-lg">
      <div className="flex flex-row items-center h-20 md:w-72 w-48">
        <NavBarIcon
          icon={<CgProfile size="35" />}
          page={"Profile"}
          text="Profile"
        />
        <NavBarIcon
          icon={<VscGraphLine size="35" />}
          page={"DashBoard"}
          text="Market"
        />
        <LogOut />
      </div>
      <span onClick={() => {
        navigate("/DashBoard");
      }} className="text-bold text-2xl md:text-5xl absolute right-8 align-middle cursor-pointer">CRYPTO PLAYGROUND</span>
    </div>
  );
};

const NavBarIcon = ({ icon, page, text }) => {
  let navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate("/" + page);
      }}
      className="group relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 my-2 mx-auto shadow-md shadow-white border-2 rounded-3xl hover:rounded-xl transition-all duration-200 ease-linear cursor-pointer"
    >
      {icon}
      <span className="group-hover:scale-100 absolute w-auto p-2 m-2 mt-8 min-w-max top-14 rounded-md text-white bg-navyblue border-2 text-s font-bold transition-all duration-100 scale-0 origin-left">
        {text}
      </span>
    </div>
  );
};
