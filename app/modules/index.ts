import { combineReducers, createStore } from 'redux';
import orderBook from './orderBook';

export const rootReducer = combineReducers({
  orderBook,
});

const store = createStore(rootReducer);

export default store;
