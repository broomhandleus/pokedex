const typeColors: { [key: string]: string } = {
  grass: "7AC74C",
  poison: "A33EA1",
  water: "6390F0",
  fire: "EE8130",
  rock: "B6A136",
  ground: "E2BF65",
  dragon: "6F35FC",
  ice: "96D9D6",
  bug: "A6B91A",
  electric: "F7D02C",
  fighting: "C22E28",
  flying: "A98FF3",
  ghost: "735797",
  normal: "A8A77A",
  psychic: "F95587",
  dark: "705746",
  steel: "B7B7CE",
  fairy: "D685AD",
};

export const getTypeColor = (type: string) => {
  return typeColors[type];
};
