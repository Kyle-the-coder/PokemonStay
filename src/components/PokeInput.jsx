import { Form } from "react-router-dom";

export function PokeInput(setBallHit, { errors, pokemon }) {
  return (
    <div className="title">
      <h1>Search in the wild grass:</h1>
      <Form className="pokeForm" method="post">
        <div className="p">
          <input
            type="text"
            name="name"
            className="pokeInput"
            placeholder="Enter a pokemon's name..."
            defaultValue={pokemon?.name}
          />
          <button className="smallBtn" onClick={() => setBallHit(null)}>
            submit
          </button>
        </div>
        <div className="errorContainer">
          <p className="errorMessage">{errors != null && errors.message}</p>
        </div>
      </Form>
    </div>
  );
}
