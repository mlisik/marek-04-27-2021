import { createAction } from 'typesafe-actions';

interface MessageReceivedPayload {
  bids: Order[];
  asks: Order[];
}

export const messageReceived = createAction(
  '@orderBook/messageReceived',
)<MessageReceivedPayload>();

export const messageReceivedBatched = createAction(
  '@orderBook/messageReceivedBatched',
)<MessageReceivedPayload>();

export const errorReceived = createAction('@orderBook/errorReceived')<
  string | undefined
>();
