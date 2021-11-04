import {
  FETCH_SELECTED_REQUEST,
  FETCH_SELECTED_SUCCESS,
  FETCH_SELECTED_FAILURE,
} from "./actionTypes";

import { SelectedActions, SelectedState } from "./types";

const initialState: SelectedState = {
  pending: false,
  pokemonSelected: undefined,
  error: null,
};

const selectedPokemonReducer = (
  state = initialState,
  action: SelectedActions
) => {
  switch (action.type) {
    case FETCH_SELECTED_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case FETCH_SELECTED_SUCCESS:
      return {
        ...state,
        pending: false,
        pokemonSelected: action.payload.pokemonSelected,
        error: null,
      };
    case FETCH_SELECTED_FAILURE:
      return {
        ...state,
        pending: false,
        pokemonSelected: undefined,
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};

export default selectedPokemonReducer;
