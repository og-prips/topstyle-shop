import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Hem</Link>
          </li>
          <li>
            <Link to="/signup">Skapa konto</Link>
          </li>
          <li>
            <Link to="/login">Logga in</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
