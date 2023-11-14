import leaf from "../../assets/leaf2.png";
import lgLeaf from "../../assets/leaf3.png";
import lgLeaf2 from "../../assets/lgLeaf2.png";
import rLeaf from "../../assets/reverseLeaf2.png";
import rLgLeaf from "../../assets/reverseLgLeaf.png";

export default function StorageLeafDecor() {
  return (
    <>
      <div className="storageLeaf">
        <img src={leaf} width="270" />
      </div>
      <div className="storageLgLeaf2">
        <img src={lgLeaf2} width="300" />
      </div>
      <div className="storageLgLeaf">
        <img src={lgLeaf} width="600" />
      </div>
      <div className="storageReverseLeaf">
        <img src={rLeaf} width="460" />
      </div>
      <div className="storageReverseLgLeaf">
        <img src={rLgLeaf} width="350" />
      </div>
    </>
  );
}
