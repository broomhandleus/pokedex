import { AnyAction } from "redux";
import { combineReducers } from "redux";

// Assigning the full list of pokemon
const pokemonListReducer = (previousList = null, action: AnyAction) => {
  if (action.type === "POKEMON_LIST") {
    return action.payload;
  }
  return previousList;
};

// Assigning the newly selected song
const selectedPokemonReducer = (selectedPokemon = null, action: AnyAction) => {
  if (action.type === "POKEMON_SELECTED") {
    return action.payload;
  }
  return selectedPokemon;
};

export default combineReducers({
  pokemon: pokemonListReducer,
  selectedPokemon: selectedPokemonReducer,
});
