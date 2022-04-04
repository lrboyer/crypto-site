import { signInWithPopup } from "firebase/auth";
import { auth, gProvider } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import { useUserAuth } from "./userAuthContext";

export const SignIn = () => {
  const navigate = useNavigate();

  const { googleSignIn } = useUserAuth();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/DashBoard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[url('../public/images/bitcoin-pattern.svg')] w-screen h-screen bg-cover bg-no-repeat">
      <div className="text-center flex flex-col justify-center h-1/2 w-auto">
      <h1 className="font-wendy text-white text-base sm:text-5xl pt-24 font-black">
        🚀Welcome to Crypto Playground🚀
      </h1>
      <p className="font-wendy text-base sm:text-3xl pt-5 font-semibold text-white underline">
        Where you can "buy" and "sell" crypto <br />
        without any money in a fake environment.
      </p>
      <span className="flex justify-center sm:mt-14 mt-4 ">
        <GoogleButton className="g-btn scale-base sm:scale-150 drop-shadow-lg hover:scale-[1.55] hover:rotate-1" type="dark" onClick={handleSignIn} />
      </span>
      </div>
    </div>
  );
};
