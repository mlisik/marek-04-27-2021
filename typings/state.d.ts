import { StateType } from 'typesafe-actions';

import { rootReducer } from '../app/modules';

declare global {
  type Order = [number, number];

  // FIXME: rootReducer is not defined
  // eslint-disable-next-line no-undef
  type RootState = StateType<typeof rootReducer>;
}

export {};
