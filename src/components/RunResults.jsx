import { EmptyCard } from "./EmptyCard";

export default function RunResults({
  catchMessage,
  pokeBallCount,
  handleGetMorePokeballs,
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
        <EmptyCard />
      </div>
    </>
  );
}
