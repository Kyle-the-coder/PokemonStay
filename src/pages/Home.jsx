import { useNavigate } from "react-router-dom";
import pokemonStorageImg from "../assets/pokemonStorage.webp";
import shinyImg from "../assets/stars.png";
import rarityImg from "../assets/threeStar.png";
import ultraBall from "../assets/ultraballFinal.png";
import LeafDecor2 from "../components/LeafDecor2";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className="container">
        <div className="welcomeContainer">
          <LeafDecor2 />
          <div className="welcomeTitle">
            <h1>Welcome to Pokemon Stay!</h1>
          </div>
          <div className="welcomeInfoContainer">
            <img src={pokemonStorageImg} width="55%" />
            <div className="welcomeInfo">
              A digital card collector game where you have to actually catch the
              cards in the wild!
            </div>
          </div>

          <div className="welcomeDisplayInfoContainer">
            <div className="welcomeDisplay">
              <img src={shinyImg} width="70%" />
              <h1>SHINYS</h1>
            </div>
            <div className="welcomeDisplayGrey">
              <img src={rarityImg} width="70%" />
              <h1>RARITY</h1>
            </div>
            <div className="welcomeDisplay">
              <img src={ultraBall} width="70%" />
              <h1>POKEBALLS</h1>
            </div>
          </div>
          <button onClick={() => navigate("/newpokemon")} className="btn">
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
