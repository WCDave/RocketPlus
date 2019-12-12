import { all, fork } from "redux-saga/effects";
import { apiSagaWatchers } from "~/app/api/sagas";
// import { authSagaWatchers } from '~/auth/sagas';
// import { pageSagaWatchers } from '~/pages/sagas';

export function* rootSaga() {
  yield all([...apiSagaWatchers].map(s => fork(s)));
}
