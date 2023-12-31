import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { Imgs } from "../../functions/ImgObject";
import "../../styles/pokeballAmountDisplay.css";

export default function PokeballAmountDisplay({
  pokeBallCount,
  setPokeBallCount,
  greatBallCount,
  setGreatBallCount,
  ultraBallCount,
  setUltraBallCount,
}) {
  const { darkMode, toggleDarkMode } = useTheme();

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

  const pokeBtnDisabled = pokeballType === "Pokeballs" && pokeBallCount >= 10;
  const greatBtnDisabled = pokeballType === "Greatballs" && greatBallCount >= 5;
  const ultraBtnDisabled = pokeballType === "Ultraballs" && ultraBallCount >= 3;
  return (
    <div
      className={
        darkMode
          ? "pokeballAmountDisplayContainerDark"
          : "pokeballAmountDisplayContainerLight"
      }
    >
      <img src={Imgs.charmander} width="50px" />

      <h3>Get More Pokeballs here:</h3>

      <div className="pokeballAndNameAmount">
        <p>Pokeball:</p>
        <img
          src={Imgs.pokeBall}
          width="50"
          className="pokeballPng"
          onClick={() => setPokeballType("Pokeballs")}
        />
        <p className="countContainer">Count: {pokeBallCount}</p>
      </div>
      <div className="pokeballAndNameAmount">
        <p>Greatball:</p>
        <img
          src={Imgs.greatBall}
          width="50"
          className="pokeballPng"
          onClick={() => setPokeballType("Greatballs")}
        />
        <p className="countContainer">Count: {greatBallCount}</p>
      </div>
      <div className="pokeballAndNameAmount">
        <p>Ultraball:</p>
        <img
          src={Imgs.ultraBall}
          width="50"
          className="pokeballPng"
          onClick={() => setPokeballType("Ultraballs")}
        />
        <p className="countContainer">Count: {ultraBallCount}</p>
      </div>

      <button
        disabled={pokeBtnDisabled || greatBtnDisabled || ultraBtnDisabled}
        className={
          pokeBtnDisabled || greatBtnDisabled || ultraBtnDisabled
            ? "disabledBtn"
            : "tinyBtn"
        }
        onClick={() => handleGetMorePokeballs()}
      >
        Get More {pokeballType}
      </button>
    </div>
  );
}
