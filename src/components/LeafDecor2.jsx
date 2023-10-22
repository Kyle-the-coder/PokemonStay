import leaf from "../assets/leaf2.png";
import lgLeaf from "../assets/leaf3.png";
import rLeaf from "../assets/reverseLeaf2.png";
import rLgLeaf from "../assets/reverseLgLeaf.png";

export default function LeafDecor2() {
  return (
    <>
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
    </>
  );
}
