import { signInWithPopup } from "firebase/auth";
import { auth, gProvider } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import { useUserAuth } from "./userAuthContext";


export const SignIn = () => {
  const navigate = useNavigate();
  
  const {googleSignIn} = useUserAuth();
 
  const handleSignIn = async (e: any) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/DashBoard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GoogleButton
      className="g-btn"
      type="dark"
      onClick={handleSignIn}
    />
  );
};
