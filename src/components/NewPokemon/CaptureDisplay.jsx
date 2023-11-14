import pokeBall from "../../assets/pokeballFinal.png";
import greatBall from "../../assets/greatballFinal.png";
import ultraBall from "../../assets/ultraballFinal.png";
import { useEffect, useState } from "react";
import { Imgs } from "../../functions/ImgObject";
import { useTheme } from "../../context/ThemeContext";
import { useCardContext } from "../../context/CardContext";
export default function CaptureDisplay({
  pokemon,
  ballHit,
  ballSpin,
  pokeBallCount,
  greatBallCount,
  ultraBallCount,
  handleBallThrown,
  handleGetAway,
  isBallThrown,
  isCaptured,
  pokeballType,
}) {
  const { darkMode, toggleDarkMode } = useTheme();
  const [ballType, setBallType] = useState(pokeballType);
  const { isCardFlipped, setIsCardFlipped } = useCardContext();

  useEffect(() => {
    if (typeof pokeballType === "object") {
      setBallType(pokeballType[0]);
    } else {
      setBallType(pokeballType);
    }
  }, [pokeballType]);

  return (
    <div
      className={
        darkMode ? "captureDisplayInfoDark" : "captureDisplayInfoLight"
      }
    >
      <div className="resultDisplay">
        <div className="resultDisplayImg">
          <img src={Imgs.charmander} width="50px" />
        </div>
        <p className={darkMode ? "lightGreyText" : "darkGreyText"}>
          Throw Status:
        </p>
        <h3>
          {isBallThrown ? (
            <span className="lightBlueText">ball is thrown...</span>
          ) : (
            "" ||
            (ballHit === null ? (
              "ball is not thrown..."
            ) : ballHit === true ? (
              <span className="greenText">ball hit!</span>
            ) : (
              <span className="redText">ball missed</span>
            ))
          )}
        </h3>
      </div>
      <div className="resultDisplay">
        <p className={darkMode ? "lightGreyText" : "darkGreyText"}>
          Capture Status:
        </p>
        <h3 className="captureStatus">
          {isCaptured ? (
            <span className="greenText">captured!</span>
          ) : ballHit === true && ballSpin === false ? (
            <span className="redText">Pokemon got out!</span>
          ) : (
            "not captured"
          )}
        </h3>
      </div>
      <div className="resultDisplay">
        <p className={darkMode ? "lightGreyText" : "darkGreyText"}>
          {ballType === pokeBall
            ? "Pokeball"
            : ballType === greatBall
            ? "Greatball"
            : ballType === ultraBall
            ? "Ultraball"
            : "Pokeball"}{" "}
          Count:{" "}
        </p>
        <h3>
          {" "}
          {ballType === pokeBall
            ? pokeBallCount
            : ballType === greatBall
            ? greatBallCount
            : ballType === ultraBall
            ? ultraBallCount
            : pokeBallCount}
        </h3>
      </div>
      <h4>What will you do?</h4>
      <div>
        <button
          onClick={() => {
            handleBallThrown(pokemon.pokeInfo);
          }}
          className={
            pokemon.captured.capture || ballSpin ? "disabledBtn" : "tinyBtn"
          }
          disabled={ballSpin || pokemon.captured.capture}
        >
          Throw Pokeball
        </button>
        <button
          disabled={ballSpin}
          onClick={() => {
            handleGetAway();
            setIsCardFlipped(false);
          }}
          className={ballSpin ? "disabledBtn ml1" : "tinyBtn ml1"}
        >
          Run
        </button>
      </div>
    </div>
  );
}
