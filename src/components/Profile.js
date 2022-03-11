import { useUserAuth } from "./userAuthContext";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { NavBar } from "./NavBar";
import Footer from "./Footer";

export const Profile = () => {
  const { user } = useUserAuth();
  const usersCollectionRef = collection(db, "users");

  return (
    <div className="h-auto bg-navyblue">
      <NavBar />
      <div className="flex flex-col">
        <h1>Profile</h1>

        <p>{user.displayName}</p>
        <p>{user.email}</p>
        <img className="h-20 w-20" src={user.photoURL} />
      </div>
      <Footer/>
    </div>
  );
};
