import reducer, { mergeOrders, initialState, OrderBookState } from './reducer';

describe('mergeOrders', () => {
  it('should remove existing orderbook entry if new size equals 0', () => {
    const state: Order[] = [[54000, 1200]];
    const incoming: Order[] = [[54000, 0]];

    expect(mergeOrders(state, incoming)).toEqual([]);
  });

  it('should update existing orderbook entry with new size', () => {
    const state: Order[] = [
      [55, 10],
      [54, 12],
    ];
    const incoming: Order[] = [[54, 5]];

    expect(mergeOrders(state, incoming)).toEqual([
      [54, 5],
      [55, 10],
    ]);
  });
});

describe('reducer', () => {
  it('with empty state, should handle incoming orders', () => {
    const state = initialState;

    const action: RootAction = {
      type: '@orderBook/messageReceived',
      payload: {
        asks: [
          [53, 1],
          [55, 2],
        ],
        bids: [
          [52, 1],
          [51, 2],
        ],
      },
    };

    expect(reducer(state, action).data).toEqual(action.payload);
  });

  it('with existing state, should handle incoming orders', () => {
    const state: OrderBookState = {
      error: null,
      data: {
        asks: [[55, 1]],
        bids: [[50, 1]],
      },
    };

    const action: RootAction = {
      type: '@orderBook/messageReceived',
      payload: {
        asks: [
          [55, 2],
          [53, 1],
        ],
        bids: [
          [52, 1],
          [51, 2],
        ],
      },
    };

    expect(reducer(state, action).data).toEqual({
      asks: [
        [53, 1],
        [55, 2],
      ],
      bids: [
        [52, 1],
        [51, 2],
        [50, 1],
      ],
    });
  });

  it('should handle incoming errors', () => {
    const error = 'Error';

    const state = initialState;

    const action: RootAction = {
      type: '@orderBook/errorReceived',
      payload: error,
    };

    expect(reducer(state, action).error).toBe(error);
  });

  it('should clear error when a new message is received', () => {
    const state: OrderBookState = {
      ...initialState,
      error: 'Error',
    };

    const action: RootAction = {
      type: '@orderBook/messageReceived',
      payload: {
        asks: [],
        bids: [],
      },
    };

    expect(reducer(state, action).error).toBeNull();
  });
});
