import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { Imgs } from "../functions/ImgObject";
import "../styles/pokeballAmountDisplay.css";

export default function PokeballAmountDisplay() {
  const { darkMode, toggleDarkMode } = useTheme();
  const [pokeBallCount, setPokeBallCount] = useState(() => {
    const count = localStorage.getItem("pokeballCount");
    if (count === null) return 10;
    return JSON.parse(count);
  });
  const [greatBallCount, setGreatBallCount] = useState(() => {
    const count = localStorage.getItem("greatballCount");
    if (count === null) return 5;
    return JSON.parse(count);
  });
  const [ultraBallCount, setUltraBallCount] = useState(() => {
    const count = localStorage.getItem("ultraballCount");
    if (count === null) return 3;
    return JSON.parse(count);
  });

  //FUNCTION FOR GETTING MORE POKEBALLS
  function handleGetMorePokeballs() {
    setPokeBallCount(10);
  }
  return (
    <div
      className={
        darkMode ? "pokeballDisplayInfoDark" : "pokeballDisplayInfoLight"
      }
    >
      <img src={Imgs.charmander} width="50px" />

      <h3>Choose your pokeball:</h3>

      <div className="pokeballAndNameAmount">
        <p>Pokeball:</p>
        <img src={Imgs.pokeBall} width="50" className="pokeballPng" />
        <p>
          Count: <span>{pokeBallCount}</span>
        </p>
        {pokeBallCount === 0 ? (
          <>
            <button
              className="smallBtn"
              onClick={() => handleGetMorePokeballs()}
            >
              Get More Pokeballs
            </button>
          </>
        ) : (
          ""
        )}
      </div>
      <div className="pokeballAndNameAmount">
        <p>Greatball:</p>
        <img src={Imgs.greatBall} width="50" className="pokeballPng" />
        <p>
          Count: <span>{greatBallCount}</span>
        </p>
        {greatBallCount === 0 ? (
          <>
            <button
              className="smallBtn"
              onClick={() => handleGetMorePokeballs()}
            >
              Get More Greatballs
            </button>
          </>
        ) : (
          ""
        )}
      </div>
      <div className="pokeballAndNameAmount">
        <p>Ultraball:</p>
        <img src={Imgs.ultraBall} width="50" className="pokeballPng" />
        <p>
          Count: <span>{ultraBallCount}</span>
        </p>
      </div>
      <div>
        {ultraBallCount === 0 ? (
          <>
            <button
              className="tinyBtn"
              onClick={() => handleGetMorePokeballs()}
            >
              Get More Ultraballs
            </button>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
