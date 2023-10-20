import { getRandomNum } from "../api/getRandomNum";
import { greatballHandleCapture } from "./greatballHandleCapture";
import { handleRun } from "./handleRun";

export function handleGreatballThrow(
  setBallHit,
  setBallSpin,
  setCatchMessage,
  setIsBallThrown,
  setGreatBallCount,
  greatBallCount,
  pokeInfo,
  pokeballType,
  pokemon
) {
  //MAKE SURE BALLHIT IS NULL AND GATHER INFO
  setBallHit(null);
  const gBallcount = localStorage.getItem("greatballCount");
  const ballHitRand = getRandomNum();

  //HANDLE POKEBALL THROW IF USER HAS NO POKEBALLS
  if (gBallcount <= 0) {
    setCatchMessage("You ran out of greatballs");
    setGreatBallCount(0);
    localStorage.setItem("greatballCount", greatBallCount);
    handleRun(pokemon);
    //HANDLE POKEBALL THROW IF USER HAS POKEBALLS
  } else if (gBallcount > 0) {
    //LOWER POKEBALL COUNT BY 1
    setGreatBallCount(greatBallCount - 1);
    localStorage.setItem("greatballCount", greatBallCount);

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
          greatballHandleCapture(pokeInfo, pokeballType);

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
