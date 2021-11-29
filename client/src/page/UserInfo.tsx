import { useContext } from "react";
import { UserContext } from "../context/index";

function UserInfo() {
  const [user, setUser] = useContext(UserContext);
  console.log(user.data);
  return <div>user info</div>;
}

export default UserInfo;
