import { createSelector } from "reselect";

import { AppState } from "../rootReducer";

const getSelectedPending = (state: AppState) => state.selected.pending;

const getSelectedPokemon = (state: AppState) => state.selected.pokemonSelected;

const getSelectedError = (state: AppState) => state.selected.error;

export const getSelectedPokemonSelector = createSelector(
  getSelectedPokemon,
  (pokemonSelected) => pokemonSelected
);

export const getSelectedPendingSelector = createSelector(
  getSelectedPending,
  (pending) => pending
);

export const getSelectedErrorSelector = createSelector(
  getSelectedError,
  (error) => error
);
