import { useNavigate } from "react-router-dom";
import pokemonStorageImg from "../assets/pokemonStorage.webp";
import shinyImg from "../assets/stars.png";
import rarityImg from "../assets/threeStar.png";
import ultraBall from "../assets/ultraballFinal.png";
import leaf from "../assets/leaf2.png";
import lgLeaf from "../assets/leaf3.png";
import rLeaf from "../assets/reverseLeaf2.png";
import rLgLeaf from "../assets/reverseLgLeaf.png";
import { useTheme } from "../context/ThemeContext";
function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className="container">
        <div className="welcomeContainer">
          <div className="welcomeLeaf">
            <img src={leaf} width="300" />
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
