import React from "react";
import { connect, ConnectedProps, RootStateOrAny } from "react-redux";
import logo from "./logo.svg";
import "./App.css";
import { getPokemon, selectPokemon } from "../actions";

const mapStateToProps = (state: RootStateOrAny) => {
  return {
    pokemon: state.pokemon,
    selectedPokemon: state.selectedPokemon,
  };
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const App = (props: PropsFromRedux) => {
  console.log("Props in App: " + JSON.stringify(props));
  const pokemonList = getPokemon();
  const bulba = selectPokemon(1);

  return <div className="App">Pokedex!</div>;
};

export default connector(App);
