import { getRandomNum } from "../api/getRandomNum";
import { v4 as uuidv4 } from "uuid";

export function pokeballHandleCapture(pokemon, pokeballType) {
  const randomUUID = uuidv4();
  //FALSEY INPUT
  if (!pokemon.captured) {
    const rand = getRandomNum();
    const runRand = getRandomNum();

    //POKEMON DOESN'T RUN
    if (runRand >= 2) {
      //SUCCESSFUL CAPTURE
      if (rand >= 6) {
        //HANDLE SINGLE POKEMON UPDATE
        const pokemon = JSON.parse(localStorage.getItem("pokemon"));
        pokemon.captured.capture = true;
        localStorage.setItem("pokemon", JSON.stringify(pokemon));
        //HANDLE POKE LIST UPDATE
        const existingPokeList = localStorage.getItem("captureList") || [];

        if (existingPokeList.length === 0) {
          const newPokeList = [
            {
              pokeInfo: pokemon.pokeInfo,
              key: pokemon.key,
              captured: { capture: true, release: false },
              shiny: pokemon.shiny,
              starRating: pokemon.starRating,
              pokeballType: pokeballType,
            },
          ];
          localStorage.setItem("captureList", JSON.stringify(newPokeList));
        } else if (existingPokeList.length !== 0) {
          const newPokeList = JSON.parse(existingPokeList);
          newPokeList.push({
            pokeInfo: pokemon.pokeInfo,
            key: pokemon.key,
            captured: { capture: true, release: false },
            shiny: pokemon.shiny,
            starRating: pokemon.starRating,
            pokeballType: pokeballType,
          });
          localStorage.setItem("captureList", JSON.stringify(newPokeList));
        }
        //UNSUCCESSFUL CAPTURE
      } else if (rand < 6) {
        return;
      }
      //POKEMON DOES RUN
    } else if (runRand < 2) {
      return handleRun();
    }

    //TRUTHY INPUT
    else if (pokemon.captured) {
      //HANDLE SINGLE POKEMON UPDATE
      const pokemon = JSON.parse(localStorage.getItem("pokemon"));
      pokemon.captured.capture = false;
      localStorage.setItem("pokemon", JSON.stringify(pokemon));
      //HANDLE POKELIST UPDATE
      const existingPokeList = localStorage.getItem("captureList") || [];
      const newPokeList = JSON.parse(existingPokeList);
      const changeCapture = newPokeList.map((poke) => {
        if (poke.pokeInfo.id === pokeInfo.id) {
          return { ...poke, captured: { capture: false, release: true } };
        } else {
          return { ...poke };
        }
      });
      localStorage.setItem("captureList", JSON.stringify(changeCapture));
    }
  }
}
