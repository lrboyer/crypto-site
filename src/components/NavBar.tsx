import { LogOut } from "./LogOut";
import { useNavigate } from "react-router-dom";
import { DashBoard } from "./DashBoard";
import { CgProfile } from "react-icons/cg";
import { VscGraphLine } from "react-icons/vsc";

export const NavBar = () => {
  let navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 h-full w-24 m-0 flex flex-col bg-[url('../public/images/bitcoin-pattern.svg')] bg-cover bg-no-repeat text-white shadow-lg">
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
  );
};

const NavBarIcon = ({ icon, page, text }) => {
  let navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate("/" + page);
      }}
      className="group relative flex items-center justify-center w-16 h-16 my-2 mx-auto shadow-md shadow-white border-2 rounded-xl hover:rounded-3xl transition-all duration-200 ease-linear"
    >
      {icon}
      <span className="group-hover:scale-100 absolute w-auto p-2 m-2 ml-8 min-w-max left-14 rounded-md shadow-md text-white bg-navyblue text-s font-bold transition-all duration-100 scale-0 origin-left">
        {text}
      </span>
    </div>
  );
};
