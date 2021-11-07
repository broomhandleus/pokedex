import {
  EvolutionChain,
  LocationAreaEncounter,
  Pokemon,
  PokemonSpecies,
} from "pokenode-ts";
import {
  FETCH_SELECTED_REQUEST,
  FETCH_SELECTED_SUCCESS,
  FETCH_SELECTED_FAILURE,
} from "./actionTypes";

export interface SelectedState {
  pending: boolean;
  pokemonSelected?: Pokemon;
  location?: LocationAreaEncounter[];
  species?: PokemonSpecies;
  evolution?: EvolutionChain;
  error: string | null;
}

export interface FetchSelectedSuccessPayload {
  pokemonSelected: Pokemon;
  location: LocationAreaEncounter[];
  species: PokemonSpecies;
  evolution: EvolutionChain;
}

export interface FetchSelectedFailurePayload {
  error: string;
}

export interface FetchSelectedRequest {
  type: typeof FETCH_SELECTED_REQUEST;
  name: string;
}

export type FetchSelectedSuccess = {
  type: typeof FETCH_SELECTED_SUCCESS;
  payload: FetchSelectedSuccessPayload;
};

export type FetchSelectedFailure = {
  type: typeof FETCH_SELECTED_FAILURE;
  payload: FetchSelectedFailurePayload;
};

export type SelectedActions =
  | FetchSelectedRequest
  | FetchSelectedSuccess
  | FetchSelectedFailure;
