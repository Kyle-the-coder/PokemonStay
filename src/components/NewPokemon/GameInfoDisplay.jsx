import { useTheme } from "../../context/ThemeContext";
import { Imgs } from "../../functions/ImgObject";
import "../../styles/gameInfoDisplay.css";

export default function GameInfoDisplay() {
  const { darkMode, toggleDarkMode } = useTheme;
  return (
    <div
      className={
        darkMode
          ? "gameInfoDisplayContainerDark"
          : "gameInfoDisplayContainerLight"
      }
    >
      <img src={Imgs.squirtle} width="50px" />
      <div className="gameInfoDisplayInfo">
        <h4>How to catch new Pokemon!</h4>
        <p>
          Here you can search for a pokemon's name at the top bar. You have a
          small chance for a shiny, once a pokemon is found you can pick your
          pokeball type. The higher the pokeball type the better chance you have
          to catch the pokemon. You have a limited amount of pokeballs per catch
          session so choose wisely! If you need more pokeballs you must run from
          your current find, click on the ball you need and get more. Good luck
          and CATCH THEM ALL!
        </p>
      </div>
    </div>
  );
}
