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
  

  const usersCollectionRef = collection(db, "users");

  useEffect(() => {}, []);

  return (
    <div>
      <LogOut />
      <p>{user.displayName}</p>
      <p>{user.email}</p>
      <img src={user.photoURL} />
    </div>
  );
};
