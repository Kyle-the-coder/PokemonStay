export default function FoundResults({ pokemon }) {
  return (
    <>
      <div className="textWhite">{pokemon.shiny ? <h1>Wow!</h1> : ""}</div>
      <h1 className="textWhite">
        {pokemon.captured.capture === true
          ? `You Caught a wild ${pokemon.shiny ? "Shiny " : ""}
    ${
      pokemon?.pokeInfo.name.charAt(0).toUpperCase() +
      pokemon?.pokeInfo.name.slice(1).toLowerCase()
    }
    ! `
          : `You Found a wild ${pokemon.shiny ? "Shiny " : ""}
    ${
      pokemon?.pokeInfo.name.charAt(0).toUpperCase() +
      pokemon?.pokeInfo.name.slice(1).toLowerCase()
    }
    ! `}
      </h1>
    </>
  );
}
