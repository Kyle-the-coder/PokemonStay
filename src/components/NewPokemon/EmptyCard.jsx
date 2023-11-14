import cardBack from "../../assets/pokemonBackCard.jpeg";
import "../../styles/cardBack.css";

export function EmptyCard() {
  return (
    <>
      <div className="emptyCardContainer">
        <img className="cardBackImg" src={cardBack} />
      </div>
    </>
  );
}
