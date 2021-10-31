export const getPokemonList = async () => {
  const list = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => console.log(error));

  return list;
};

export const getSelectedPokemon = async (id: number) => {
  const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => console.log(error));

  return pokemon;
};
