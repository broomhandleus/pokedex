import { getPokemonList, getSelectedPokemon } from "../api/Pokedex";

// Action for getting a specific pokemon's details
export const selectPokemon = (id: number) => {
  const fetchedPokemon = getSelectedPokemon(id);
  fetchedPokemon.then((value) => {
    return {
      type: "POKEMON_SELECTED",
      payload: value,
    };
  });
};

// Action for getting the entire list of pokemon in Kanto
export const getPokemon = () => {
  const listPromise = getPokemonList();
  listPromise.then((value) => {
    return {
      type: "POKEMON_LIST",
      payload: value,
    };
  });
};
