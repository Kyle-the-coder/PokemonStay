import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Imgs } from "../functions/ImgObject";
import { useCardContext } from "../context/CardContext";
import "../styles/toggle.css";
import "../styles/navbar.css";

export function Navbar() {
  const { darkMode, toggleDarkMode } = useTheme();
  const { isCardFlipped, setIsCardFlipped } = useCardContext();

  return (
    <nav className={!darkMode ? "top-nav-dark" : "top-nav-light"}>
      <div className="nav-text-large">
        <Link to="/" className="home-button">
          Pokemon Stay
          <img src={Imgs.pikachu} className="nav-Img" />
        </Link>
      </div>
      <ul className="nav-list">
        <li>
          <Link onClick={() => setIsCardFlipped(false)} to="/storage">
            Your Pokemon
          </Link>
        </li>
        <li>
          <Link to="/newpokemon">New Pokemon</Link>
        </li>
        <li>
          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={toggleDarkMode}
            />
            <span className="slider"></span>
          </label>
        </li>
      </ul>
    </nav>
  );
}
