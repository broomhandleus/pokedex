import { all, put, takeLatest } from "redux-saga/effects";

import { fetchSelectedFailure, fetchSelectedSuccess } from "./actions";
import { FETCH_SELECTED_REQUEST } from "./actionTypes";
import {
  EvolutionChain,
  LocationArea,
  Pokemon,
  PokemonSpecies,
} from "pokenode-ts";
import { FetchSelectedRequest } from "./types";

function* fetchSelectedPokemonSaga(action: FetchSelectedRequest) {
  try {
    // create urls for all the endpoints we need
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${action.name}/`;
    const locationUrl = `${pokemonUrl}encounters`;
    const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${action.name}/`;

    // call endpoints to get necessary pokemon information
    const pokemonResponse: Pokemon = yield fetch(pokemonUrl)
      .then((pokemonResponse) => {
        return pokemonResponse.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error;
      });
    const locationResponse: LocationArea = yield fetch(locationUrl)
      .then((locationResponse) => {
        return locationResponse.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error;
      });
    const speciesResponse: PokemonSpecies = yield fetch(speciesUrl)
      .then((speciesResponse) => {
        return speciesResponse.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error;
      });

    // use evolution chain url to get next pokemon in the evolution chain
    const evolutionResponse: EvolutionChain = yield fetch(
      speciesResponse.evolution_chain.url
    )
      .then((evolutionResponse) => {
        return evolutionResponse.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error;
      });

    yield put(
      fetchSelectedSuccess({
        pokemonSelected: pokemonResponse,
        species: speciesResponse,
        location: locationResponse,
        evolution: evolutionResponse,
      })
    );
  } catch (e) {
    if (e instanceof Error) {
      yield put(
        fetchSelectedFailure({
          error: e.message,
        })
      );
    }
  }
}

/*
  Starts worker saga on latest dispatched `FETCH_SELECTED_REQUEST` action.
  Allows concurrent increments.
*/
function* selectedSaga() {
  yield all([takeLatest(FETCH_SELECTED_REQUEST, fetchSelectedPokemonSaga)]);
}

export default selectedSaga;
