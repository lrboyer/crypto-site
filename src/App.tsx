import { onAuthStateChanged } from "firebase/auth";
import { MouseEventHandler, useEffect, useState } from "react";
import "./App.css";
import { firebase, auth, db } from "./firebase-config";
import { Routes, Route } from "react-router-dom";
import { SignIn } from "./components/SignIn";
import { DashBoard } from "./components/DashBoard";
import { UserAuthContextProvider } from "./components/userAuthContext";

function App() {
  return (
    <div className="App">
      <UserAuthContextProvider>
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/DashBoard" element={<DashBoard />} />
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
