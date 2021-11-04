import { all, put, takeLatest } from "redux-saga/effects";

import { fetchSelectedFailure, fetchSelectedSuccess } from "./actions";
import { FETCH_SELECTED_REQUEST } from "./actionTypes";
import { Pokemon } from "pokenode-ts";
import { FetchSelectedRequest } from "./types";

function* fetchSelectedPokemonSaga(action: FetchSelectedRequest) {
  try {
    const response: Pokemon = yield fetch(action.url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error;
      });
    yield put(
      fetchSelectedSuccess({
        pokemonSelected: response,
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
