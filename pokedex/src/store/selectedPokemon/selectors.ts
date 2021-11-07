import { createSelector } from "reselect";

import { AppState } from "../rootReducer";

const getSelectedPending = (state: AppState) => state.selected.pending;

const getSelectedPokemon = (state: AppState) => state.selected.pokemonSelected;
const getSelectedLocation = (state: AppState) => state.selected.location;
const getSelectedSpecies = (state: AppState) => state.selected.species;
const getSelectedEvolution = (state: AppState) => state.selected.evolution;

const getSelectedError = (state: AppState) => state.selected.error;

export const getSelectedPokemonSelector = createSelector(
  getSelectedPokemon,
  (pokemonSelected) => pokemonSelected
);
export const getSelectedLocationSelector = createSelector(
  getSelectedLocation,
  (location) => location
);
export const getSelectedSpeciesSelector = createSelector(
  getSelectedSpecies,
  (species) => species
);
export const getSelectedEvolutionSelector = createSelector(
  getSelectedEvolution,
  (evo) => evo
);

export const getSelectedPendingSelector = createSelector(
  getSelectedPending,
  (pending) => pending
);

export const getSelectedErrorSelector = createSelector(
  getSelectedError,
  (error) => error
);
