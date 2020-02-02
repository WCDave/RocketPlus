import { all, fork } from 'redux-saga/effects';
import { apiSagaWatchers } from '~/app/api/sagas';

export function* rootSaga() {
  yield all([...apiSagaWatchers].map(s => fork(s)));
}
