import { EmptyCard } from "./EmptyCard";
import GameInfoDisplay from "./GameInfoDisplay";
import PokeballAmountDisplay from "./PokeballAmountDisplay";

export default function RunResults({
  catchMessage,
  pokeBallCount,
  setPokeBallCount,
  greatBallCount,
  setGreatBallCount,
  ultraBallCount,
  setUltraBallCount,
}) {
  return (
    <>
      <div className="resultsContainer">
        <div className="foundResultsContainer">
          <h1 className="textWhite">{catchMessage}</h1>
        </div>

        <div className="uiContainerRun">
          <GameInfoDisplay />
          <EmptyCard />
          <PokeballAmountDisplay
            pokeBallCount={pokeBallCount}
            setPokeBallCount={setPokeBallCount}
            greatBallCount={greatBallCount}
            setGreatBallCount={setGreatBallCount}
            ultraBallCount={ultraBallCount}
            setUltraBallCount={setUltraBallCount}
          />
        </div>
      </div>
    </>
  );
}
