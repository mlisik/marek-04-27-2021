import { createReducer } from 'typesafe-actions';

export interface OrderBookState {
  error: string | null;
  data: OrderBookData;
}

export const initialState: OrderBookState = {
  error: null,
  data: {
    bids: [],
    asks: [],
  },
};

/**
 * Given arrays of existing and incoming orders, returns a new array
 * that overrides sizes for existing price points and removes orders with size 0
 */
export const mergeOrders = (state: Order[], incoming: Order[]) => {
  let result: Order[] = incoming;

  state.forEach(([price, size]) => {
    if (incoming.find(el => el[0] === price)) {
      return;
    }

    result.push([price, size]);
  });

  return result.filter(([, size]) => size > 0);
};

/**
 * note: bids are sorted descending, asks ascending
 */
const reducer = createReducer<OrderBookState, RootAction>(initialState)
  .handleType('@orderBook/errorReceived', (state, { payload: error }) => {
    return {
      ...state,
      error,
    };
  })
  .handleType(
    '@orderBook/messageReceived',
    (state, { payload: { bids, asks } }) => {
      return {
        error: null,
        data: {
          bids: mergeOrders(state.data.bids, bids).sort(([a], [b]) => b - a),
          asks: mergeOrders(state.data.asks, asks).sort(([a], [b]) => a - b),
        },
      };
    },
  );

export default reducer;
