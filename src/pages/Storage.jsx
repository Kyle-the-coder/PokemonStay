import { useState } from "react";
import { useNavigation } from "react-router-dom";
import { PokeList } from "../components/PokeList";
import StorageInfoDisplay from "../components/StorageInfoDisplay";
import StorageLeafDecor from "../components/StorageLeafDecor";
import "../styles/storage.css";
import "../styles/storageLeafDecor.css";

function Storage() {
  const { state } = useNavigation();
  const [isCaptured, setIsCaptured] = useState(false);
  const [isReleased, setIsReleased] = useState(false);
  const [isShiny, setIsShiny] = useState(false);
  const [pokeList, setPokeList] = useState(() => {
    const list = localStorage.getItem("captureList");
    if (list === null) return null;
    return JSON.parse(list);
  });

  return (
    <>
      <div className="container">
        <div className="storageContainer">
          <StorageLeafDecor />
          <div className="storageTitleContainer">
            <h1 className="z3">Storage</h1>
          </div>
          {pokeList === null ? (
            <StorageInfoDisplay />
          ) : (
            <PokeList
              isCaptured={isCaptured}
              setIsCaptured={setIsCaptured}
              state={state}
              isShiny={isShiny}
              isReleased={isReleased}
              setIsReleased={setIsReleased}
            />
          )}
        </div>
      </div>
    </>
  );
}

export const storageRoute = {
  element: <Storage />,
};
