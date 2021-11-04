import { BulkPokemon } from "../../types";
import {
  FETCH_LIST_REQUEST,
  FETCH_LIST_SUCCESS,
  FETCH_LIST_FAILURE,
} from "./actionTypes";

export interface ListState {
  pending: boolean;
  pokemonList: BulkPokemon[];
  error: string | null;
}

export interface FetchListSuccessPayload {
  pokemonList: BulkPokemon[];
}

export interface FetchListFailurePayload {
  error: string;
}

export interface FetchListRequest {
  type: typeof FETCH_LIST_REQUEST;
}

export type FetchListSuccess = {
  type: typeof FETCH_LIST_SUCCESS;
  payload: FetchListSuccessPayload;
};

export type FetchListFailure = {
  type: typeof FETCH_LIST_FAILURE;
  payload: FetchListFailurePayload;
};

export type ListActions =
  | FetchListRequest
  | FetchListSuccess
  | FetchListFailure;
