import {
  FETCH_LIST_REQUEST,
  FETCH_LIST_SUCCESS,
  FETCH_LIST_FAILURE,
} from "./actionTypes";

import { ListActions, ListState } from "./types";

const initialState: ListState = {
  pending: false,
  pokemonList: [],
  error: null,
};

const pokemonListReducer = (state = initialState, action: ListActions) => {
  switch (action.type) {
    case FETCH_LIST_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case FETCH_LIST_SUCCESS:
      return {
        ...state,
        pending: false,
        pokemonList: action.payload.pokemonList,
        error: null,
      };
    case FETCH_LIST_FAILURE:
      return {
        ...state,
        pending: false,
        pokemonList: [],
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};

export default pokemonListReducer;
