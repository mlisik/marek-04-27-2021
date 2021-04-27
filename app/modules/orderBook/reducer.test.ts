import reducer, { initialState, OrderBookState } from './reducer';

it('with empty state, should handle incoming orders', () => {
  const state = initialState;

  const action: RootAction = {
    type: '@orderBook/messageReceivedBatched',
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
    error: undefined,
    data: {
      asks: [[55, 1]],
      bids: [[50, 1]],
    },
  };

  const action: RootAction = {
    type: '@orderBook/messageReceivedBatched',
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
    type: '@orderBook/messageReceivedBatched',
    payload: {
      asks: [],
      bids: [],
    },
  };

  expect(reducer(state, action).error).toBeUndefined();
});
