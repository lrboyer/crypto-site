import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { auth, gProvider } from "../firebase-config";

const userAuthContext = createContext(undefined);

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  
  function logOut() {
    return signOut(auth);
  }
  
  function googleSignIn() {
    return signInWithPopup(auth, gProvider);
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