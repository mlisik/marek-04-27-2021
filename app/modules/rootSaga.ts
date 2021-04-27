import { all, spawn, call } from 'redux-saga/effects';
import { messageQueue } from './orderBook/sagas';

export default function* rootSaga() {
  const sagas = [messageQueue];
  yield all(
    sagas.map(saga =>
      spawn(function* safeSaga() {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (err) {
            // silent catch, TODO: report
          }
        }
      }),
    ),
  );
}
