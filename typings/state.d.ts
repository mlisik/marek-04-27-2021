import { ActionType, StateType } from 'typesafe-actions';

import { rootReducer, actions } from '../app/modules';

declare global {
  type Order = [number, number];

  type OrderBookData = {
    bids: Order[];
    asks: Order[];
  };

  // FIXME: rootReducer, actions is not defined
  // eslint-disable-next-line no-undef
  type RootState = StateType<typeof rootReducer>;
  // eslint-disable-next-line no-undef
  type RootAction = ActionType<typeof actions>;
}

export {};
