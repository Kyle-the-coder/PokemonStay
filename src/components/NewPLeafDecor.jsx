import leaf from "../assets/leaf2.png";
import lgLeaf from "../assets/leaf3.png";
import lgLeaf2 from "../assets/lgLeaf2.png";
import rLeaf from "../assets/reverseLeaf2.png";
import rLgLeaf from "../assets/reverseLgLeaf.png";
import wildGrass from "../assets/wildGrass3.png";
import wildGrass2 from "../assets/wildGrass.png";

export default function NewPLeafDecor() {
  return (
    <>
      <div className="newPLeaf">
        <img src={leaf} width="270" />
      </div>
      <div className="newPLgLeaf2">
        <img src={lgLeaf2} width="300" />
      </div>
      <div className="newPLgLeaf">
        <img src={lgLeaf} width="600" />
      </div>
      <div className="newPReverseLeaf">
        <img src={rLeaf} width="460" />
      </div>

      <div className="newPReverseLgLeaf">
        <img src={rLgLeaf} width="350" />
      </div>

      <div className="wildGrassDark2">
        <img src={wildGrass2} width="388" />
      </div>
      <div className="wildGrass1">
        <img src={wildGrass} width="500" />
      </div>
      <div className="wildGrass2">
        <img src={wildGrass} width="500" />
      </div>
    </>
  );
}
