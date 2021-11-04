import { Pokemon } from "pokenode-ts";

export const getPokemonList = async () => {
  const list: Promise<Pokemon[]> = await fetch(
    "https://pokeapi.co/api/v2/pokemon/?limit=151"
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.results;
    })
    .catch((error) => {
      return error;
    });

  return list;
};

// Not being used
// Had trouble figuring out how to pass params int he sagas
// So just put the code within the saga itself which has access to the action
export const getSelectedPokemon = async (url: string) => {
  const pokemon = await fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });

  return pokemon;
};
