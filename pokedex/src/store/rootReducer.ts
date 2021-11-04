import { combineReducers } from "redux";

import pokemonListReducer from "./pokemonList/reducer";
import selectedPokemonReducer from "./selectedPokemon/reducer";

const rootReducer = combineReducers({
  pokemon: pokemonListReducer,
  selected: selectedPokemonReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
