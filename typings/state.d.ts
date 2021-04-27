import { ActionType, StateType } from 'typesafe-actions';

import { rootReducer, actions } from '../app/modules';

declare global {
  type Order = [number, number];

  type OrderBookData = {
    bids: Order[];
    asks: Order[];
  };

  type OrderBookItemData = {
    price: number;
    size: number;
    accumulatedSize: number;
  };

  type RootState = StateType<typeof rootReducer>;
  type RootAction = ActionType<typeof actions>;
}

export {};
