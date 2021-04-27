import { put, take } from 'redux-saga/effects';
import { messageReceived, messageReceivedBatched } from '../actions';
import { mergeOrders } from '../utilities';

type MessageReceived = Extract<
  RootAction,
  { type: '@orderBook/messageReceived' }
>;

const BATCH_SIZE = 6;

/**
 * Collects incoming messages to process in a batch to reduce store update / render frequency
 *
 * NOTE: encountered an edge where ws only provides one message and goes silent, no messages or errors,
 * consider passing first message through as is if state is empty
 */
function* messageQueue() {
  while (true) {
    const batched: MessageReceived[] = [];

    while (batched.length < BATCH_SIZE) {
      const action: MessageReceived = yield take(messageReceived);
      batched.push(action);
    }

    const data = batched.reduce(
      ({ bids, asks }, { payload }) => ({
        bids: mergeOrders(bids, payload.bids, false),
        asks: mergeOrders(asks, payload.asks, false),
      }),
      {
        bids: [] as Order[],
        asks: [] as Order[],
      },
    );

    yield put(messageReceivedBatched(data));
  }
}

export default messageQueue;
