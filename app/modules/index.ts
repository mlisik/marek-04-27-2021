import { combineReducers, createStore } from 'redux';
import orderBook, { actions as orderBookActions } from './orderBook';

export const actions = {
  ...orderBookActions,
};

export const rootReducer = combineReducers({
  orderBook,
});

const store = createStore(rootReducer);

export default store;
