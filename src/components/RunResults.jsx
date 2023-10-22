import CaptureDisplay from "./CaptureDisplay";
import { EmptyCard } from "./EmptyCard";
import GameInfoDisplay from "./GameInfoDisplay";
import PokeBallDisplay from "./PokeBallDisplay";

export default function RunResults({
  catchMessage,
  pokeBallCount,
  handleGetMorePokeballs,
  pokeballType,
  setPokeballType,
  ballSpin,
}) {
  return (
    <>
      <div className="resultsContainer">
        <div className="foundResultsContainer">
          <h1 className="textWhite">{catchMessage}</h1>
        </div>

        {/* {pokeBallCount === 0 ? (
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
        )} */}
        <div className="uiContainerRun">
          <GameInfoDisplay />
          <EmptyCard />
          <PokeBallDisplay />
        </div>
      </div>
    </>
  );
}
