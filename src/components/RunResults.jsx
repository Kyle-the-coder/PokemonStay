import { EmptyCard } from "./EmptyCard";

export default function RunResults({
  catchMessage,
  pokeBallCount,
  handleGetMorePokeballs,
}) {
  return (
    <>
      <div className="resultsContainer">
        <h1>{catchMessage}</h1>
        <h1>Pokeball Count: {pokeBallCount}</h1>
        {pokeBallCount === 0 ? (
          <>
            <button className="btn" onClick={() => handleGetMorePokeballs()}>
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
