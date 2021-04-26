import { createReducer } from 'typesafe-actions';

export interface OrderBookState {
  error: any | null;
  data: {
    bids: Order[];
    asks: Order[];
  };
}

export const initialState: OrderBookState = {
  error: null,
  data: {
    bids: [],
    asks: [],
  },
};

// TODO: define State and RootAction types
const reducer = createReducer<OrderBookState, any>(initialState);

export default reducer;
