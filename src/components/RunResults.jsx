import CaptureDisplay from "./CaptureDisplay";
import { EmptyCard } from "./EmptyCard";
import GameInfoDisplay from "./GameInfoDisplay";
import PokeballAmountDisplay from "./PokeballAmountDisplay";
import PokeBallDisplay from "./PokeBallDisplay";

export default function RunResults({ catchMessage }) {
  return (
    <>
      <div className="resultsContainer">
        <div className="foundResultsContainer">
          <h1 className="textWhite">{catchMessage}</h1>
        </div>

        <div className="uiContainerRun">
          <GameInfoDisplay />
          <EmptyCard />
          <PokeballAmountDisplay />
        </div>
      </div>
    </>
  );
}
