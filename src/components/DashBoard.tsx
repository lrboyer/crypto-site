import { useEffect, useState } from "react";
import { LogOut } from "./LogOut";
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
import { create } from "domain";

export const DashBoard = () => {
  const { user } = useUserAuth();
  let userId = user.uid;
  let disName = user.displayName;
  let mail = user.email;

  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await setDoc(doc(usersCollectionRef, userId), {
      name: disName,
      email: mail,
    }).catch((err) => {
      console.log(err);
    })
  };

  useEffect(() => {}, []);

  return (
    <div>
      <LogOut />
      <button onClick={createUser}>Create Account</button>
      <p>{disName}</p>
      <p>{user.email}</p>
      <img src={user.photoURL} />
    </div>
  );
};
