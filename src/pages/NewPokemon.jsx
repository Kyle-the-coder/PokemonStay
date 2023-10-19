import { useEffect, useState } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";
import { EmptyCard } from "../components/EmptyCard";
import { PokemonCard } from "../components/PokemonCard";
import { getPokemon } from "../api/getPokemon";
import { getRandomNum } from "../api/getRandomNum";
import { v4 as uuidv4 } from "uuid";
import { handleCapture, handleRun } from "../functions/handleCapture";
import { useTheme } from "../context/ThemeContext";
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
  const [pokemon, setPokemon] = useState(() => {
    const p = localStorage.getItem("pokemon");
    if (p === null) return null;
    return JSON.parse(p);
  });
  const [pokeballType, setPokeballType] = useState(() => {
    const type = localStorage.getItem("captureList");
    if (type === null) return pokeBall;
    const results = JSON.parse(type).filter((info) => info.key === pokemon.key);
    const ballType = results.map((ball) => ball.pokeballType);
    return ballType;
  });
  const [isPokeballTypeShown, setIsPokeballTypeShown] = useState(false);

  //UPDATE ANY CHANGES FROM STORAGE AND RENDER ON SCREEN
  useEffect(() => {
    const newPokemonInfo = localStorage.getItem("pokemon");
    setPokemon(JSON.parse(newPokemonInfo));
    localStorage.setItem("pokeballCount", pokeBallCount);
    const isCap = localStorage.getItem("pokemon");
    if (isCap !== null) {
      setIsCaptured(JSON.parse(isCap)?.captured.capture);
    }
    setPokeballType(pokeBall);
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
      //LOWER POKEBALL COUNT BY 1
      setPokeBallCount(pokeBallCount - 1);
      localStorage.setItem("pokeballCount", pokeBallCount);
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
            handleCapture(pokeInfo, pokeballType);
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
            <img src={leaf} width="300" />
          </div>
          <div className="welcomeLgLeaf2">
            <img src={lgLeaf2} width="300" />
          </div>
          <div className="welcomeLgLeaf">
            <img src={lgLeaf} width="700" />
          </div>
          <div className="welcomeReverseLeaf">
            <img src={rLeaf} width="700" />
          </div>
          <div className="welcomeReverseLgLeaf">
            <img src={rLgLeaf} width="400" />
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
            </Form>
          </div>
          <div className="errorContainer">
            <p className="errorMessage">{errors != null && errors.message}</p>
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
                  <div
                    className={
                      darkMode
                        ? "pokeballDisplayInfoDark"
                        : "pokeballDisplayInfoLight"
                    }
                  >
                    <h3>Choose your pokeball:</h3>

                    <div className="pokeballAndName">
                      <p>Pokeball:</p>
                      <img
                        src={pokeBall}
                        width="50"
                        className="pokeballPng"
                        onClick={() => setPokeballType(pokeBall)}
                      />
                    </div>
                    <div className="pokeballAndName">
                      <p>Greatball:</p>
                      <img
                        src={greatBall}
                        width="50"
                        className="pokeballPng"
                        onClick={() => setPokeballType(greatBall)}
                      />
                    </div>
                    <div className="pokeballAndName">
                      <p>Ultraball:</p>
                      <img
                        src={ultraBall}
                        width="50"
                        className="pokeballPng"
                        onClick={() => setPokeballType(ultraBall)}
                      />
                    </div>
                    <div className="currentChoice">
                      Current Choice:
                      <img
                        src={pokeballType}
                        width="50"
                        className={ballSpin ? "rotatingPokeball" : ""}
                      />
                    </div>
                  </div>
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
                    isPokeballTypeShown={isPokeballTypeShown}
                    setIsPokeballTypeShown={setIsPokeballTypeShown}
                  />
                  <div
                    className={
                      darkMode
                        ? "captureDisplayInfoDark"
                        : "captureDisplayInfoLight"
                    }
                  >
                    <div className="resultDisplay">
                      <p
                        className={darkMode ? "lightGreyText" : "darkGreyText"}
                      >
                        Throw Status:
                      </p>
                      <h3>
                        {isBallThrown ? (
                          <span className="lightBlueText">
                            ball is thrown...
                          </span>
                        ) : (
                          "" ||
                          (ballHit === null ? (
                            "ball is not thrown..."
                          ) : ballHit === true ? (
                            <span className="greenText">ball hit!</span>
                          ) : (
                            <span className="redText">ball missed</span>
                          ))
                        )}
                      </h3>
                    </div>
                    <div className="resultDisplay">
                      <p
                        className={darkMode ? "lightGreyText" : "darkGreyText"}
                      >
                        Capture Status:
                      </p>
                      <h3 className="captureStatus">
                        {isCaptured ? (
                          <span className="greenText">captured!</span>
                        ) : ballHit === true && ballSpin === false ? (
                          <span className="redText">Pokemon got out!</span>
                        ) : (
                          "not captured"
                        )}
                      </h3>
                    </div>
                    <div className="resultDisplay">
                      <p
                        className={darkMode ? "lightGreyText" : "darkGreyText"}
                      >
                        Pokeball Count:{" "}
                      </p>
                      <h3>{pokeBallCount}</h3>
                    </div>
                    <h4>What will you do?</h4>
                    <div>
                      <button
                        onClick={() => {
                          handleBallThrown(pokemon.pokeInfo);
                        }}
                        className="captureBtn"
                        disabled={pokemon.captured.capture}
                      >
                        Throw Pokeball
                      </button>
                      <button
                        onClick={() => {
                          handleGetAway();
                        }}
                        className="captureBtn"
                      >
                        Run
                      </button>
                    </div>
                  </div>
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
