import { useEffect, useState } from "react";
import { useActionData, useNavigation } from "react-router-dom";
import { PokemonCard } from "../components/PokemonCard";
import { getPokemon } from "../api/getPokemon";
import { getRandomNum } from "../api/getRandomNum";
import { v4 as uuidv4 } from "uuid";
import { handleRun } from "../functions/handleRun";
import { useTheme } from "../context/ThemeContext";
import { handlePokeballThrow } from "../functions/handlePokeballThrow";
import { handleGreatballThrow } from "../functions/handleGreatballThrow";
import { handleUltraballThrow } from "../functions/handleUltraballThrow";
import { PokeInput } from "../components/PokeInput";
import { Imgs } from "../functions/ImgObject";
import PokeBallDisplay from "../components/PokeBallDisplay";
import CaptureDisplay from "../components/CaptureDisplay";
import LeafDecor from "../components/LeafDecor";
import RunResults from "../components/RunResults";
import FoundResults from "../components/FoundResults";
import "../styles/newPokemon.css";
import "../styles/newPokemonLeafDecor.css";

function NewPokemon() {
  const { state } = useNavigation();
  const { darkMode, toggleDarkMode } = useTheme();
  const errors = useActionData() || null;
  //HANDLE POKEMON CAPTURE STATES
  const [isCaptured, setIsCaptured] = useState(false);
  const [isBallThrown, setIsBallThrown] = useState(false);
  const [ballHit, setBallHit] = useState(null);
  const [ballSpin, setBallSpin] = useState(false);
  const [isPokeballShown, setIsPokeballShown] = useState(true);
  const [catchMessage, setCatchMessage] = useState("");
  //LOCAL STORAGE STATES
  const [pokeBallCount, setPokeBallCount] = useState(() => {
    const count = localStorage.getItem("pokeballCount");
    if (count === null) return 10;
    return JSON.parse(count);
  });
  const [greatBallCount, setGreatBallCount] = useState(() => {
    const count = localStorage.getItem("greatballCount");
    if (count === null) return 5;
    return JSON.parse(count);
  });
  const [ultraBallCount, setUltraBallCount] = useState(() => {
    const count = localStorage.getItem("ultraballCount");
    if (count === null) return 3;
    return JSON.parse(count);
  });

  const [pokemon, setPokemon] = useState(() => {
    const p = localStorage.getItem("pokemon");
    if (p === null) return null;
    return JSON.parse(p);
  });
  const [pokeballType, setPokeballType] = useState(() => {
    const type = localStorage.getItem("captureList");
    if (type === null) return Imgs.pokeBall;
    const results = JSON.parse(type).filter(
      (info) => pokemon && info.key === pokemon.key
    );
    const ballType = results.map((ball) => ball.pokeballType);
    return ballType;
  });

  //UPDATE ANY CHANGES FROM STORAGE AND RENDER ON SCREEN
  useEffect(() => {
    const newPokemonInfo = localStorage.getItem("pokemon");
    setPokemon(JSON.parse(newPokemonInfo));
    localStorage.setItem("pokeballCount", pokeBallCount);
    localStorage.setItem("greatballCount", greatBallCount);
    localStorage.setItem("ultraballCount", ultraBallCount);
    const isCap = localStorage.getItem("pokemon");
    if (isCap !== null) {
      setIsCaptured(JSON.parse(isCap)?.captured.capture);
    }
    if (pokeballType.length === 0) {
      setPokeballType(Imgs.pokeBall);
    }
    if (state === "submitting") {
      setCatchMessage("");
    }
  }, [state, ballSpin, catchMessage]);

  //RUN AWAY FUNCTION
  function handleGetAway() {
    setCatchMessage("You Got Away");
    handleRun(pokemon);
  }
  //HANDLE POKEBALL THROW FUNCTION
  function handleBallThrown(pokeInfo) {
    setCatchMessage("");
    if (pokeballType === Imgs.pokeBall) {
      handlePokeballThrow(
        setBallHit,
        setBallSpin,
        setCatchMessage,
        setIsBallThrown,
        setPokeBallCount,
        pokeBallCount,
        pokeInfo,
        pokeballType,
        pokemon
      );
    } else if (pokeballType === Imgs.greatBall) {
      handleGreatballThrow(
        setBallHit,
        setBallSpin,
        setCatchMessage,
        setIsBallThrown,
        setGreatBallCount,
        greatBallCount,
        pokeInfo,
        pokeballType,
        pokemon
      );
    } else if (pokeballType === Imgs.ultraBall) {
      handleUltraballThrow(
        setBallHit,
        setBallSpin,
        setCatchMessage,
        setIsBallThrown,
        setUltraBallCount,
        ultraBallCount,
        pokeInfo,
        pokeballType,
        pokemon
      );
    }
  }
  //FUNCTION FOR GETTING MORE POKEBALLS
  function handleGetMorePokeballs() {
    setPokeBallCount(10);
  }

  return (
    <>
      <div className="container">
        <div className="newPokemonContainer">
          <LeafDecor />

          <PokeInput
            pokemon={pokemon}
            setBallHit={setBallHit}
            errors={errors}
          />

          <div className="resultsContainer">
            {pokemon === null ? (
              <RunResults
                catchMessage={catchMessage}
                pokeBallCount={pokeBallCount}
                handleGetMorePokeballs={handleGetMorePokeballs}
                pokeballType={pokeballType}
                setPokeballType={setPokeballType}
                ballSpin={ballSpin}
              />
            ) : (
              <>
                {pokemon && <FoundResults pokemon={pokemon} />}

                <div className="uiContainerFound">
                  <PokeBallDisplay
                    pokeballType={pokeballType}
                    setPokeballType={setPokeballType}
                    ballSpin={ballSpin}
                  />

                  <PokemonCard
                    pokemon={pokemon.pokeInfo}
                    pokeKey={pokemon.key}
                    state={state}
                    captured={pokemon.captured.capture}
                    setIsCaptured={setIsCaptured}
                    isCaptured={isCaptured}
                    ballSpin={ballSpin}
                    isShiny={pokemon.shiny}
                    starRating={pokemon.starRating}
                    ballHit={ballHit}
                    isPokeballShown={isPokeballShown}
                    pokeballType={pokeballType}
                  />
                  <CaptureDisplay
                    pokemon={pokemon}
                    ballHit={ballHit}
                    ballSpin={ballSpin}
                    pokeBallCount={pokeBallCount}
                    greatBallCount={greatBallCount}
                    ultraBallCount={ultraBallCount}
                    handleBallThrown={handleBallThrown}
                    handleGetAway={handleGetAway}
                    isBallThrown={isBallThrown}
                    isCaptured={isCaptured}
                    pokeballType={pokeballType}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

async function action({ request }) {
  const randomUUID = uuidv4();
  const errors = {};
  const formData = await request.formData();
  const searchName = formData.get("name");
  if (searchName.length <= 0) {
    errors.message = "you must enter a pokemon name";
    return errors;
  }
  const pokeInfoSearch = await getPokemon(searchName.toLowerCase());

  //HANDLE SHINY CHANCE
  let isShiny = null;
  const shinyRand = getRandomNum();
  if (shinyRand >= 8) {
    isShiny = true;
  } else if (shinyRand < 8) {
    isShiny = false;
  }

  //HANDLE STAR RATING
  const starRand = getRandomNum();
  let starNum = 0;
  if (starRand >= 0 && starRand <= 5) {
    starNum = starNum + 1;
  } else if (starRand > 5 && starRand <= 8) {
    starNum = starNum + 2;
    pokeInfoSearch.stats.find((stat) => {
      if (stat.stat.name === "hp") {
        stat.base_stat += 10;
      }
    });
  } else if (starRand > 8 && starRand <= 10) {
    starNum = starNum + 3;
    pokeInfoSearch.stats.find((stat) => {
      if (stat.stat.name === "hp") {
        stat.base_stat += 20;
      }
    });
  }

  //HANDLE BAD REQUEST
  if (pokeInfoSearch === undefined) {
    errors.message = "bad request, try again";
    return errors;
  }

  //HANDLE CURRENT SEARCH
  const pokeInfo = pokeInfoSearch;
  const newList = {
    pokeInfo,
    captured: { capture: false, release: false },
    shiny: isShiny,
    key: randomUUID,
    starRating: starNum,
  };
  localStorage.setItem("pokemon", JSON.stringify(newList));

  return null;
}

export const newPokemonRoute = {
  action,
  element: <NewPokemon />,
};
