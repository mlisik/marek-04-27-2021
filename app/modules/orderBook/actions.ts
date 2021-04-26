import { createAction } from 'typesafe-actions';

export const messageReceived = createAction('@orderBook/messageReceived')<{
  bids: Order[];
  asks: Order[];
}>();
