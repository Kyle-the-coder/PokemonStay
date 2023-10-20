import { getRandomNum } from "../api/getRandomNum";
import { handleRun } from "./handleRun";
import { ultraballHandleCapture } from "./ultraballHandleCapture";

export function handleUltraballThrow(
  setBallHit,
  setBallSpin,
  setCatchMessage,
  setIsBallThrown,
  setUltraBallCount,
  ultraBallCount,
  pokeInfo,
  pokeballType,
  pokemon
) {
  //MAKE SURE BALLHIT IS NULL AND GATHER INFO
  setBallHit(null);
  const uBallcount = localStorage.getItem("ultraballCount");
  const ballHitRand = getRandomNum();

  //HANDLE POKEBALL THROW IF USER HAS NO POKEBALLS
  if (uBallcount <= 0) {
    setCatchMessage("You ran out of ultraballs");
    setUltraBallCount(0);
    localStorage.setItem("ultraballCount", ultraBallCount);
    handleRun(pokemon);
    //HANDLE POKEBALL THROW IF USER HAS POKEBALLS
  } else if (uBallcount > 0) {
    //LOWER POKEBALL COUNT BY 1
    setUltraBallCount(ultraBallCount - 1);
    localStorage.setItem("ultraballCount", ultraBallCount);

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
          ultraballHandleCapture(pokeInfo, pokeballType);

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
