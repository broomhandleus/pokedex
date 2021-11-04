import { createSelector } from "reselect";

import { AppState } from "../rootReducer";

const getPending = (state: AppState) => state.pokemon.pending;

const getPokemon = (state: AppState) => state.pokemon.pokemonList;

const getError = (state: AppState) => state.pokemon.error;

export const getListSelector = createSelector(
  getPokemon,
  (pokemonList) => pokemonList
);

export const getPendingSelector = createSelector(
  getPending,
  (pending) => pending
);

export const getErrorSelector = createSelector(getError, (error) => error);
