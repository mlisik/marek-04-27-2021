import { createReducer } from 'typesafe-actions';
import { mergeOrders } from './utilities';

export interface OrderBookState {
  error: string | undefined;
  data: OrderBookData;
}

export const initialState: OrderBookState = {
  error: undefined,
  data: {
    bids: [],
    asks: [],
  },
};

/**
 * note: bids are sorted descending, asks ascending
 */
const reducer = createReducer<OrderBookState, RootAction>(initialState)
  .handleType('@orderBook/errorReceived', (state, { payload: error }) => ({
    ...state,
    error,
  }))
  .handleType(
    '@orderBook/messageReceivedBatched',
    (state, { payload: { bids, asks } }) => ({
      error: undefined,
      data: {
        bids: mergeOrders(state.data.bids, bids).sort(([a], [b]) => b - a),
        asks: mergeOrders(state.data.asks, asks).sort(([a], [b]) => a - b),
      },
    }),
  );

export default reducer;
