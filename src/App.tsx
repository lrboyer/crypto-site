import { Routes, Route } from "react-router-dom";
import { SignIn } from "./components/SignIn";
import { DashBoard } from "./components/DashBoard";
import { UserAuthContextProvider } from "./components/userAuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { Profile } from "./components/Profile";

function App() {
  return (
    <>
      <UserAuthContextProvider>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route
            path="/DashBoard"
            element={
              <ProtectedRoute>
                <DashBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </UserAuthContextProvider>
    </>
  );
}

export default App;
