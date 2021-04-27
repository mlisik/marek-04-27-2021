import React from 'react';
import { useSelector } from 'react-redux';

import { selectBids, selectAsks, selectMaxSize } from '../selectors';
import useOrderBook from './useOrderBook';
import OrderBook from './OrderBook';

function OrderBookContainer() {
  useOrderBook();

  const bids = useSelector(selectBids);
  const asks = useSelector(selectAsks);
  const maxSize = useSelector(selectMaxSize);

  return <OrderBook bids={bids} asks={asks} maxSize={maxSize} />;
}

export default OrderBookContainer;
