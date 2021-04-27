import { expectSaga } from 'redux-saga-test-plan';
import { messageReceived, messageReceivedBatched } from '../actions';
import messageQueue from './messageQueue';

const emptyData: OrderBookData = { bids: [], asks: [] };

it('should not put out a new batch if too few messages have been received', async () => {
  await expectSaga(messageQueue)
    .dispatch(messageReceived(emptyData))
    .dispatch(messageReceived(emptyData))
    .dispatch(messageReceived(emptyData))
    .dispatch(messageReceived(emptyData))
    .not.put.actionType(String(messageReceivedBatched))
    .silentRun();
});

it('should put out a new batch with correct data when enough messages have been received', async () => {
  const a: OrderBookData = {
    bids: [
      [4, 1],
      [3, 1],
    ],
    asks: [
      [2, 1],
      [1, 1],
    ],
  };

  const b: OrderBookData = {
    bids: [
      [5, 1],
      [3, 0],
    ],
    asks: [[1, 0]],
  };

  const expected: OrderBookData = {
    bids: [
      [5, 1],
      [3, 0],
      [4, 1],
    ],
    asks: [
      [1, 0],
      [2, 1],
    ],
  };

  await expectSaga(messageQueue)
    .dispatch(messageReceived(a))
    .dispatch(messageReceived(emptyData))
    .dispatch(messageReceived(emptyData))
    .dispatch(messageReceived(emptyData))
    .dispatch(messageReceived(emptyData))
    .dispatch(messageReceived(b))
    .silentRun()
    .then(({ effects: { put } }) => {
      const {
        payload: { action },
      } = put[0];

      expect(action.type).toEqual('@orderBook/messageReceivedBatched');
      expect(action.payload).toEqual(expected);
    });
});
