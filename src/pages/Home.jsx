import { useNavigate } from "react-router-dom";
import { Imgs } from "../functions/ImgObject";
import pokemonStorageImg from "../assets/pokemonStorage.webp";
import HomeLeafDecor from "../components/Home/HomeLeafDecor";
import "../styles/homeLeafDecor.css";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className="container">
        <div className="welcomeContainer">
          <HomeLeafDecor />
          <div className="welcomeTitle">
            <h1 className="z3">Welcome to Pokemon Stay!</h1>
          </div>
          <div className="welcomeInfoContainer">
            <img src={pokemonStorageImg} className="homeImg" />
            <div className="welcomeInfo">
              A digital card collector game where you have to actually catch the
              cards in the wild!
            </div>
          </div>

          <div className="welcomeDisplayInfoContainer">
            <div className="welcomeDisplay">
              <img className="welcomeDisplayImg" src={Imgs.shinyImg} />
              <h1>SHINYS</h1>
            </div>
            <div className="welcomeDisplayGrey">
              <img className="welcomeDisplayImg" src={Imgs.rarityImg} />
              <h1>RARITY</h1>
            </div>
            <div className="welcomeDisplay">
              <img className="welcomeDisplayImg" src={Imgs.ultraBall} />
              <h1>POKEBALLS</h1>
            </div>
          </div>
          <button onClick={() => navigate("/newpokemon")} className="btn mb2">
            Get Started
          </button>
        </div>
      </div>
    </>
  );
}

function loader() {}

export const homeRoute = {
  element: <Home />,
};
