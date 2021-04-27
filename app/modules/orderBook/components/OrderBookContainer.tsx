import React from 'react';
import { useSelector } from 'react-redux';

import {
  selectBids,
  selectAsks,
  selectMaxSize,
  selectOrderBookError,
} from '../selectors';
import useOrderBook from './useOrderBook';
import OrderBook from './OrderBook';
import OrderBookError from './OrderBookError';
import OrderBookLoading from './OrderBookLoading';

function OrderBookContainer() {
  const [subscribe] = useOrderBook();

  const error = useSelector(selectOrderBookError);
  const bids = useSelector(selectBids);
  const asks = useSelector(selectAsks);
  const maxSize = useSelector(selectMaxSize);

  if (!error && !bids.length && !asks.length) {
    return <OrderBookLoading />;
  }

  if (error) {
    return <OrderBookError onPress={subscribe} message={error} />;
  }

  return <OrderBook bids={bids} asks={asks} maxSize={maxSize} />;
}

export default OrderBookContainer;
