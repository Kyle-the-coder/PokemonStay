export default function FoundResults({ pokemon }) {
  return (
    <>
      {pokemon.captured.capture === true ? (
        <h1 className="textWhite">
          You Caught a wild{" "}
          {pokemon.shiny ? <span className="goldText">Shiny </span> : ""}
          {pokemon?.pokeInfo.name.charAt(0).toUpperCase() +
            pokemon?.pokeInfo.name.slice(1).toLowerCase()}
          {pokemon.shiny ? "!" : ""}
        </h1>
      ) : (
        <h1 className="textWhite">
          You Found a wild{" "}
          {pokemon.shiny ? <span className="goldText">Shiny </span> : ""}{" "}
          {pokemon?.pokeInfo.name.charAt(0).toUpperCase() +
            pokemon?.pokeInfo.name.slice(1).toLowerCase()}
          {pokemon.shiny ? "!" : ""}{" "}
        </h1>
      )}
    </>
  );
}
