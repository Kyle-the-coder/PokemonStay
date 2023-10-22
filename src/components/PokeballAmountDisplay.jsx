import { useEffect, useState } from "react";
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
  const [pokeballType, setPokeballType] = useState("Pokeballs");
  const [didBallAmountIncrease, setDidBallAmountIncrease] = useState(false);

  //FUNCTION FOR GETTING MORE POKEBALLS
  function handleGetMorePokeballs() {
    setDidBallAmountIncrease(true);
    if (pokeballType === "Pokeballs") {
      setPokeBallCount(10);
    } else if (pokeballType === "Greatballs") {
      setGreatBallCount(5);
    } else if (pokeballType === "Ultraballs") {
      setUltraBallCount(3);
    }
  }
  useEffect(() => {
    if (didBallAmountIncrease === true) {
      setDidBallAmountIncrease(false);
    }
    localStorage.setItem("pokeballCount", pokeBallCount);
    localStorage.setItem("greatballCount", greatBallCount);
    localStorage.setItem("ultraballCount", ultraBallCount);
  }, [didBallAmountIncrease]);
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
        <img
          src={Imgs.pokeBall}
          width="50"
          className="pokeballPng"
          onClick={() => setPokeballType("Pokeballs")}
        />
        <p>
          Count: <span>{pokeBallCount}</span>
        </p>
      </div>
      <div className="pokeballAndNameAmount">
        <p>Greatball:</p>
        <img
          src={Imgs.greatBall}
          width="50"
          className="pokeballPng"
          onClick={() => setPokeballType("Greatballs")}
        />
        <p>
          Count: <span>{greatBallCount}</span>
        </p>
      </div>
      <div className="pokeballAndNameAmount">
        <p>Ultraball:</p>
        <img
          src={Imgs.ultraBall}
          width="50"
          className="pokeballPng"
          onClick={() => setPokeballType("Ultraballs")}
        />
        <p>
          Count: <span>{ultraBallCount}</span>
        </p>
      </div>

      <button className="tinyBtn" onClick={() => handleGetMorePokeballs()}>
        Get More {pokeballType}
      </button>
    </div>
  );
}
