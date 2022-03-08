import { signInWithPopup } from "firebase/auth";
import { auth, gProvider } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import { useUserAuth } from "./userAuthContext";

export const SignIn = () => {
  const navigate = useNavigate();

  const { googleSignIn } = useUserAuth();

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
    <div className="bg-[url('../public/images/downgraph.jpg')] w-screen h-screen bg-cover bg-no-repeat">
      <div className="text-center flex flex-col justify-center">
      <h1 className="font-wendy text-green-600 text-7xl py-8">
        🚀Welcome to Crypto Playground🚀
      </h1>
      <p className="font-wendy text-red-600 text-5xl pb-8">
        Where you can "buy" and "sell" crypto <br />
        without any money in a fake environment.
      </p>
      <span className="m-auto">
        <GoogleButton className="g-btn scale-150" type="dark" onClick={handleSignIn} />
      </span>
      </div>
    </div>
  );
};
