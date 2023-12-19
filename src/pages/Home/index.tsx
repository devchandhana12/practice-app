import React from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Header from "../../stories/Header";
import Footer from "../../components/Footer";
const Home = () => {
  const { user } = React.useContext(AuthContext);
  console.log(user);
  return (
    <div>
      <Header />
      <div style={{ height: 500 }}>hello</div>
      <Footer />
    </div>
  );
};
export default Home;
