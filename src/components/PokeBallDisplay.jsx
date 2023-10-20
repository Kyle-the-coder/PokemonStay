import pokeBall from "../assets/pokeballFinal.png";
import greatBall from "../assets/greatballFinal.png";
import ultraBall from "../assets/ultraballFinal.png";
import { useTheme } from "../context/ThemeContext";

export default function PokeBallDisplay({
  pokeballType,
  setPokeballType,
  ballSpin,
}) {
  const { darkMode, toggleDarkMode } = useTheme();
  return (
    <div
      className={
        darkMode ? "pokeballDisplayInfoDark" : "pokeballDisplayInfoLight"
      }
    >
      <h3>Choose your pokeball:</h3>

      <div className="pokeballAndName">
        <p>Pokeball:</p>
        <img
          src={pokeBall}
          width="50"
          className="pokeballPng"
          onClick={() => setPokeballType(pokeBall)}
        />
      </div>
      <div className="pokeballAndName">
        <p>Greatball:</p>
        <img
          src={greatBall}
          width="50"
          className="pokeballPng"
          onClick={() => setPokeballType(greatBall)}
        />
      </div>
      <div className="pokeballAndName">
        <p>Ultraball:</p>
        <img
          src={ultraBall}
          width="50"
          className="pokeballPng"
          onClick={() => setPokeballType(ultraBall)}
        />
      </div>
      <div className="currentChoice">
        Current Choice:
        <img
          src={pokeballType}
          width="50"
          className={ballSpin ? "rotatingPokeball" : ""}
        />
      </div>
    </div>
  );
}
