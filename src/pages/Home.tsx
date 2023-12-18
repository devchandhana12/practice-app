import React from "react";
import { AuthContext } from "../contexts/AuthContext";
const Home = () => {
  const { user } = React.useContext(AuthContext);
  console.log(user);
  return <div>Welcome to our site, please wait while we create stuff</div>;
};
export default Home;
