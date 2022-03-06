import { LogOut } from "./LogOut";
import { useUserAuth } from "./userAuthContext";

export const DashBoard = () => {
  const { user } = useUserAuth();
  return (
    <div>
      <LogOut />
      <p>{user.displayName}</p>
      <p>{user.email}</p>
      <img src={user.photoURL}/>
    </div>
  );
};
