import { all, call, put, takeLatest } from "redux-saga/effects";

import { fetchListFailure, fetchListSuccess } from "./actions";
import { FETCH_LIST_REQUEST } from "./actionTypes";
import { getPokemonList } from "../../api/Pokedex";
import { BulkPokemon } from "../../types";

function* fetchListSaga() {
  try {
    const response: BulkPokemon[] = yield call(getPokemonList);
    yield put(
      fetchListSuccess({
        pokemonList: response,
      })
    );
  } catch (e) {
    if (e instanceof Error) {
      yield put(
        fetchListFailure({
          error: e.message,
        })
      );
    }
  }
}

/*
  Starts worker saga on latest dispatched `FETCH_LIST_REQUEST` action.
  Allows concurrent increments.
*/
function* listSaga() {
  yield all([takeLatest(FETCH_LIST_REQUEST, fetchListSaga)]);
}

export default listSaga;
