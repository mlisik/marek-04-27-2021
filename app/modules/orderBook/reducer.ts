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

const reducer = createReducer<OrderBookState, RootAction>(initialState);

export default reducer;
