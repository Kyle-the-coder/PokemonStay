import { getRandomNum } from "../api/getRandomNum";
import { handleRun } from "./handleRun";
import { pokeballHandleCapture } from "./pokeBallHandleCapture";

export function handlePokeballThrow(
  setBallHit,
  setBallSpin,
  setCatchMessage,
  setIsBallThrown,
  setPokeBallCount,
  pokeBallCount,
  pokeInfo,
  pokeballType,
  pokemon
) {
  //MAKE SURE BALLHIT IS NULL AND GATHER INFO
  setBallHit(null);
  const pBallcount = localStorage.getItem("pokeballCount");
  const ballHitRand = getRandomNum();

  //HANDLE POKEBALL THROW IF USER HAS NO POKEBALLS
  if (pBallcount <= 0) {
    setCatchMessage("You ran out of pokeballs");
    setPokeBallCount(0);
    localStorage.setItem("pokeballCount", pokeBallCount);
    handleRun(pokemon);
    //HANDLE POKEBALL THROW IF USER HAS POKEBALLS
  } else if (pBallcount > 0) {
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
          pokeballHandleCapture(pokeInfo, pokeballType);

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
