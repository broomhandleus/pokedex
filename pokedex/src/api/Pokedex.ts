import { Pokemon } from "pokenode-ts";

// export const getPokemonList: Pokemon[] = () => {
export const getPokemonList = () => {
  fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => console.log(error));
};

export const getPokemon = (id: number) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => console.log(error));
};
