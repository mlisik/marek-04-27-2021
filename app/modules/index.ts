import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import orderBook, { actions as orderBookActions } from './orderBook';
import rootSaga from './rootSaga';

export const actions = {
  ...orderBookActions,
};

export const rootReducer = combineReducers({
  orderBook,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, {}, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
