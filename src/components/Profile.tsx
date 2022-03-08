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

export const Profile = () => {
  const { user } = useUserAuth();
  const usersCollectionRef = collection(db, "users");

  return (
    <div className="flex justify-center">
      <NavBar />
      <h1>Profile</h1>
      <p>{user.displayName}</p>
      <p>{user.email}</p>
      <img src={user.photoURL} />
    </div>
  );
};
