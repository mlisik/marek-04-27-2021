import { messageReceived, messageReceivedBatched } from './../actions';
import { put, take } from '@redux-saga/core/effects';
import { mergeOrders } from '../utilities';

type MessageReceived = Extract<
  RootAction,
  { type: '@orderBook/messageReceived' }
>;

const BATCH_SIZE = 6;

function* messageQueue() {
  while (true) {
    let batched: MessageReceived[] = [];

    while (batched.length < BATCH_SIZE) {
      const action: MessageReceived = yield take(messageReceived);
      batched.push(action);
    }

    const data = batched.reduce(
      ({ bids, asks }, { payload }) => {
        return {
          bids: mergeOrders(bids, payload.bids, false),
          asks: mergeOrders(asks, payload.asks, false),
        };
      },
      {
        bids: [] as Order[],
        asks: [] as Order[],
      },
    );

    yield put(messageReceivedBatched(data));
  }
}

export default messageQueue;
