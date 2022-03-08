import "./App.css";
import { Routes, Route } from "react-router-dom";
import { SignIn } from "./components/SignIn";
import { DashBoard } from "./components/DashBoard";
import { UserAuthContextProvider } from "./components/userAuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="App">
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
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
