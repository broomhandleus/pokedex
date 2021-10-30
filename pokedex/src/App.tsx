import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { getPokemonList, getPokemon } from "./api/Pokedex";

function App() {
  const pokemonList = getPokemonList();
  const bulba = getPokemon(1);

  return <div className="App">Pokedex!</div>;
}

export default App;
