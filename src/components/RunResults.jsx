import CaptureDisplay from "./CaptureDisplay";
import { EmptyCard } from "./EmptyCard";
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
        <h2 className="mb2">{catchMessage}</h2>

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
        <div className="uiContainerRun">
          <PokeBallDisplay />
          <EmptyCard />
          <PokeBallDisplay />
        </div>
      </div>
    </>
  );
}
