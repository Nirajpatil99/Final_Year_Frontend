import styles from "../styles/Header.module.css";

const Header = () => {
  return (
    <nav className="container p-4 text-center sm:text-left">
      <span className="text-xl font-semibold tracking-wide">
        <span className="accent-color">Fluid Control</span> Dashboard
      </span>
    </nav>
  );
};

export default Header;
