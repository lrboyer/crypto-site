import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "./userAuthContext";
import { HiOutlineLogout } from "react-icons/hi";

export const LogOut = () => {
  const { logOut } = useUserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      navigate("/");
      await logOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  const LogOutIcon = ({ icon, text }) => {
    return (
      <div
        onClick={handleLogout}
        className="group relative flex items-center justify-center w-16 h-16 my-2 mx-auto shadow-md shadow-white border-2 rounded-xl hover:rounded-3xl transition-all duration-200 ease-linear"
      >
        {icon}
        <span className="group-hover:scale-100 absolute w-auto p-2 m-2 ml-8 min-w-max left-14 rounded-md shadow-md text-white bg-navyblue text-s font-bold transition-all duration-100 scale-0 origin-left">
          {text}
        </span>
      </div>
    );
  };

  return <LogOutIcon icon={<HiOutlineLogout size="35" />} text="Logout" />;
};
