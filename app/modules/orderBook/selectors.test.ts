import { selectAsks, selectBids } from './selectors';

describe('selectAsks', () => {
  it('should only select 5 asks from head and append accumulated size', () => {
    const state: RecursivePartial<RootState> = {
      orderBook: {
        data: {
          asks: [
            [1, 1],
            [2, 1],
            [3, 1],
            [4, 1],
            [5, 1],
            [6, 1],
          ],
          bids: [[1, 10]],
        },
      },
    };

    expect(selectAsks(state as RootState)).toEqual([
      {
        price: 5,
        size: 1,
        accumulatedSize: 5,
      },
      {
        price: 4,
        size: 1,
        accumulatedSize: 4,
      },
      {
        price: 3,
        size: 1,
        accumulatedSize: 3,
      },
      {
        price: 2,
        size: 1,
        accumulatedSize: 2,
      },
      {
        price: 1,
        size: 1,
        accumulatedSize: 1,
      },
    ]);
  });
});

describe('selectBids', () => {
  it('should only select 5 bids from head  and append accumulated size', () => {
    const state: RecursivePartial<RootState> = {
      orderBook: {
        data: {
          bids: [
            [1, 1],
            [2, 1],
            [3, 1],
            [4, 1],
            [5, 1],
            [6, 1],
          ],
          asks: [[1, 10]],
        },
      },
    };

    expect(selectBids(state as RootState)).toEqual([
      {
        price: 1,
        size: 1,
        accumulatedSize: 1,
      },
      {
        price: 2,
        size: 1,
        accumulatedSize: 2,
      },
      {
        price: 3,
        size: 1,
        accumulatedSize: 3,
      },
      {
        price: 4,
        size: 1,
        accumulatedSize: 4,
      },
      {
        price: 5,
        size: 1,
        accumulatedSize: 5,
      },
    ]);
  });
});
