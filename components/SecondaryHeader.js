import Link from "next/link";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "./Button";
// import NavDropdown from "react-bootstrap/NavDropdown";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function BasicExample() {
  const { authState, setAuthState } = useContext(AuthContext);

  return (
    <nav className="items-center p-5 bg-white text-center font-bold text-xl text-accent tracking-widest flex flex-row flex-wrap justify-between">
      <span>Fluid Control</span>
      <span>
        {authState.username}
        <Button
          type="link"
          onClick={() => setAuthState({ username: "", authenticated: false })}
        >
          <Link href={"/"}>Logout</Link>
        </Button>
      </span>
    </nav>
  );
}

export default BasicExample;
