import { useTheme } from "../context/ThemeContext";

export default function CaptureDisplay({
  pokemon,
  ballHit,
  ballSpin,
  pokeBallCount,
  handleBallThrown,
  handleGetAway,
  isBallThrown,
  isCaptured,
}) {
  const { darkMode, toggleDarkMode } = useTheme();
  return (
    <div
      className={
        darkMode ? "captureDisplayInfoDark" : "captureDisplayInfoLight"
      }
    >
      <div className="resultDisplay">
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
          Pokeball Count:{" "}
        </p>
        <h3>{pokeBallCount}</h3>
      </div>
      <h4>What will you do?</h4>
      <div>
        <button
          onClick={() => {
            handleBallThrown(pokemon.pokeInfo);
          }}
          className="captureBtn"
          disabled={pokemon.captured.capture}
        >
          Throw Pokeball
        </button>
        <button
          onClick={() => {
            handleGetAway();
          }}
          className="captureBtn"
        >
          Run
        </button>
      </div>
    </div>
  );
}
