import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { FaSearch } from "react-icons/fa";
import ButtonComp from "./Button";
import { AuthContext } from "../contexts/AuthContext";

type User = {
  user: string;
} | null;

interface HeaderProps {
  value?: any;
  onChange?: () => void;
  user?: User;
}

const Header: React.FC<HeaderProps> = ({ value, onChange, user }) => {
  // const navigate = useNavigate();
  const { logout } = React.useContext(AuthContext);
  return (
    <Navbar
      className="d-flex align-items-center justify-content-around shadow-lg"
      style={{ height: 70, backgroundColor: "#3559E0" }}
    >
      {/* <Container> */}
      <Navbar.Brand
        href="#home"
        className="text-white"
        style={{ fontWeight: "bolder", fontStyle: "italic" }}
      >
        Fakestore
      </Navbar.Brand>
      {/* </Container> */}
      <div>
        <div
          className="d-flex align-items-center m-5 p-2 rounded"
          style={{ backgroundColor: "#3081D0" }}
        >
          <input
            placeholder="Search"
            style={{
              backgroundColor: "transparent",
              border: "none",
              outline: "none",
              color: "white",
              width: 450,
            }}
            value={value}
            onChange={onChange}
          />
          <FaSearch size={22} />
        </div>
      </div>
      <div className="d-flex align-items-center ">
        {user ? (
          <p className="text-white mt-3">Welcome back {user.user}</p>
        ) : (
          <a
            href="/login"
            // className="text-white"
            style={{
              color: "white",
              // textDecoration: "none",
              fontSize: 16,
              fontWeight: "bolder",
              fontStyle: "italic",
            }}
          >
            Login
          </a>
          // <ButtonComp label="Login" onClick={() => navigate("/login")} />
        )}
        <ButtonComp
          label="Logout"
          variant="danger"
          style={{ marginRight: 20, marginLeft: 20 }}
          onClick={() => logout()}
        />
      </div>
    </Navbar>
  );
};
export default Header;
