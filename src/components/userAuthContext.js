import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, gProvider } from "../firebase-config";
import { collection, doc, setDoc } from "firebase/firestore";

const userAuthContext = createContext(undefined);
const usersCollectionRef = collection(db, "users");

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  
  function logOut() {
    return signOut(auth);
  }
  
  function googleSignIn() {
    return signInWithPopup(auth, gProvider).then((result) => {
      setDoc(doc(usersCollectionRef, result.user.uid), {
        name: result.user.displayName,
        email: result.user.email,
      }).catch((err) => {
        console.log(err);
      })
    })
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user, logOut, googleSignIn }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}