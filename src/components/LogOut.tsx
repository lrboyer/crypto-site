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

  return <button onClick={handleLogout}>Logout</button>;
};
