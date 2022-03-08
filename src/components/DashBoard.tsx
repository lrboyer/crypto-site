import { useEffect, useState } from "react";
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

export const DashBoard = () => {
  const { user } = useUserAuth();
  const usersCollectionRef = collection(db, "users");

  console.log(user);

  return (
    <div className="flex justify-center">
      <NavBar />
      
      <h1>Crypto Market</h1>

    </div>
  );
};
