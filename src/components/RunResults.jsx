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
        <h2>{catchMessage}</h2>
        <h2>Pokeball Count: {pokeBallCount}</h2>
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
        <div className="uiContainer">
          <PokeBallDisplay />
          <EmptyCard />
          <PokeBallDisplay />
        </div>
      </div>
    </>
  );
}
