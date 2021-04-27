/**
 * Picks first 5 orders, adds acucmulated property
 */
const accumulateSize = (orders: Order[]) =>
  orders.slice(0, 5).reduce((acc, [price, size], idx, array) => {
    const accumulatedSize = array
      .slice(0, idx + 1)
      .reduce((sum, next) => sum + next[1], 0);

    return [...acc, { price, size, accumulatedSize }];
  }, [] as OrderBookItemData[]);

/**
 * Max size from the 5 lowest asks vs 5 highest bids
 */
export const selectMaxSize = ({ orderBook: { data } }: RootState) =>
  Math.max(
    data.bids.slice(0, 5).reduce((acc, [, size]) => acc + size, 0),
    data.asks.slice(0, 5).reduce((acc, [, size]) => acc + size, 0),
  );

/**
 * Picks first 5 orders, adds accumulated and max size properties
 */
export const selectBids = (state: RootState) =>
  accumulateSize(state.orderBook.data.bids);

/**
 * Picks first 5 orders, adds accumulated and max size properties, and sorts the result descending
 */
export const selectAsks = (state: RootState) =>
  accumulateSize(state.orderBook.data.asks).sort(
    ({ price: a }, { price: b }) => b - a,
  );

export const selectOrderBookError = (state: RootState) => state.orderBook.error;
