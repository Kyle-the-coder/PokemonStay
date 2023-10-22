import { getRandomNum } from "../api/getRandomNum";
import { v4 as uuidv4 } from "uuid";

export function handleRun(pokemon) {
  localStorage.setItem("pokemon", null);
  const newInfo = localStorage.getItem("pokemon");
  const getInfo = JSON.parse(newInfo);
  return (pokemon = getInfo);
}
