import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "./userAuthContext";

export const LogOut = () => {
  const {logOut} = useUserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      navigate("/");
      await logOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  return <button className="border-4 rounded-2xl hover:rounded-xl hover:rotate-3 hover:scale-90 transition-all ease-linear border-white p-3 m-3" onClick={handleLogout}>Logout</button>;
};
