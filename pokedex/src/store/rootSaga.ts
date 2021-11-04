import { all, fork } from "redux-saga/effects";

import listSaga from "./pokemonList/sagas";
import selectedSaga from "./selectedPokemon/sagas";

export function* rootSaga() {
  yield all([fork(listSaga), fork(selectedSaga)]);
}
