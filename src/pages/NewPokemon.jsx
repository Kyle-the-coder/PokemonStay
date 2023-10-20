import { useEffect, useState } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";
import { EmptyCard } from "../components/EmptyCard";
import { PokemonCard } from "../components/PokemonCard";
import { getPokemon } from "../api/getPokemon";
import { getRandomNum } from "../api/getRandomNum";
import { v4 as uuidv4 } from "uuid";
import { handleRun } from "../functions/handleRun";
import { useTheme } from "../context/ThemeContext";
import { pokeballHandleCapture } from "../functions/pokeBallHandleCapture";
import { greatballHandleCapture } from "../functions/greatballHandleCapture";
import { ultraballHandleCapture } from "../functions/ultraballHandleCapture";
import leaf from "../assets/leaf2.png";
import lgLeaf from "../assets/leaf3.png";
import lgLeaf2 from "../assets/lgLeaf2.png";
import rLeaf from "../assets/reverseLeaf2.png";
import rLgLeaf from "../assets/reverseLgLeaf.png";
import wildGrass from "../assets/wildGrass3.png";
import wildGrass2 from "../assets/wildGrass.png";
import pokeBall from "../assets/pokeballFinal.png";
import greatBall from "../assets/greatballFinal.png";
import ultraBall from "../assets/ultraballFinal.png";
import PokeBallDisplay from "../components/PokeBallDisplay";
import CaptureDisplay from "../components/CaptureDisplay";
import "../styles/newPokemon.css";

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
    if (type === null) return pokeBall;
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
      setPokeballType(pokeBall);
    }
  }, [state, ballSpin, catchMessage]);

  //RUN AWAY FUNCTION
  function handleGetAway() {
    setCatchMessage("You Got Away");
    handleRun(pokemon);
  }
  //HANDLE POKEBALL THROW FUNCTION
  function handleBallThrown(pokeInfo) {
    //MAKE SURE BALLHIT IS NULL AND GATHER INFO
    setBallHit(null);
    const count = localStorage.getItem("pokeballCount");
    const ballHitRand = getRandomNum();

    //HANDLE POKEBALL THROW IF USER HAS NO POKEBALLS
    if (count <= 0) {
      setCatchMessage("You ran out of pokeballs");
      setPokeBallCount(0);
      localStorage.setItem("pokeballCount", pokeBallCount);
      handleRun(pokemon);
      //HANDLE POKEBALL THROW IF USER HAS POKEBALLS
    } else if (count > 0) {
      if (pokeballType === pokeBall) {
        //LOWER POKEBALL COUNT BY 1
        setPokeBallCount(pokeBallCount - 1);
        localStorage.setItem("pokeballCount", pokeBallCount);
      } else if (pokeballType === greatBall) {
        //LOWER GREATBALL COUNT BY 1
        setGreatBallCount(greatBallCount - 1);
        localStorage.setItem("greatballCount", greatBallCount);
      } else if (pokeballType === ultraBall) {
        //LOWER ULTRABALL COUNT BY 1
        setUltraBallCount(ultraBallCount - 1);
        localStorage.setItem("ultraballCount", ultraBallCount);
      }

      //START THE ANIMATION
      setBallSpin(true);
      setIsBallThrown(true);
      //TIMEOUT TO ALLOW TIME TO PASS FOR ANIMATION
      setTimeout(() => {
        //BALL HIT SUCCESSFULLY
        if (ballHitRand >= 0 && ballHitRand <= 7) {
          //LET USER KNOW THE BALL HAS HIT THE POKEMON
          setBallHit(true);
          setIsBallThrown(false);
          //TIMEOUT TO SEE IF POKEMON GETS CAPTURED SUCCESSFULLY
          setTimeout(() => {
            if (pokeballType === pokeBall) {
              pokeballHandleCapture(pokeInfo, pokeballType);
            } else if (pokeballType === greatBall) {
              greatballHandleCapture(pokeInfo, pokeballType);
            } else if (pokeballType === ultraBall) {
              ultraballHandleCapture(pokeInfo, pokeballType);
            }
            // handleCapture(pokeInfo, pokeballType);
            //IF POKEMON GOT AWAY
            setCatchMessage("Pokemon got away");
            setTimeout(() => {
              setBallSpin(false);
            }, [1000]);
          }, [4000]);
          //BALL HIT UNSUCCESSFULLY
        } else if (ballHitRand > 7 && ballHitRand <= 10) {
          //SET EVERYTHING TO FALSE FOR UNSUCCESSFUL THROW
          setIsBallThrown(false);
          setBallHit(false);
          setBallSpin(false);
        }
      }, [1000]);
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
          <div className="welcomeLeaf">
            <img src={leaf} width="270" />
          </div>
          <div className="welcomeLgLeaf2">
            <img src={lgLeaf2} width="300" />
          </div>
          <div className="welcomeLgLeaf">
            <img src={lgLeaf} width="600" />
          </div>
          <div className="welcomeReverseLeaf">
            <img src={rLeaf} width="460" />
          </div>
          <div className="welcomeReverseLgLeaf">
            <img src={rLgLeaf} width="350" />
          </div>

          <div className="wildGrassDark1">
            <img src={wildGrass2} width="400" />
          </div>
          <div className="wildGrassDark2">
            <img src={wildGrass2} width="400" />
          </div>
          <div className="wildGrass1">
            <img src={wildGrass} width="400" />
          </div>
          <div className="wildGrass2">
            <img src={wildGrass} width="400" />
          </div>

          <div className="title">
            <h1>Search in the wild grass:</h1>
            <Form className="pokeForm" method="post">
              <div className="p">
                <input
                  type="text"
                  name="name"
                  className="pokeInput"
                  placeholder="Enter a pokemon's name..."
                  defaultValue={pokemon?.name}
                />
                <button className="smallBtn" onClick={() => setBallHit(null)}>
                  submit
                </button>
              </div>
              <div className="errorContainer">
                <p className="errorMessage">
                  {errors != null && errors.message}
                </p>
              </div>
            </Form>
          </div>

          <div className="resultsContainer">
            {pokemon === null ? (
              <>
                <div className="resultsContainer">
                  <h1>{catchMessage}</h1>
                  <h1>Pokeball Count: {pokeBallCount}</h1>
                  {pokeBallCount === 0 ? (
                    <>
                      <button
                        className="btn"
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
            ) : (
              <>
                {pokemon && (
                  <>
                    <div className="textWhite">
                      {pokemon.shiny ? <h1>Wow!</h1> : ""}
                    </div>
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
                )}
                <div className="uiContainer">
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
  if (shinyRand >= 5) {
    isShiny = true;
  } else if (shinyRand < 5) {
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
