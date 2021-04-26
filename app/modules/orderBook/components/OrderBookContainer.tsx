import React from 'react';
import { View } from 'react-native';
import useOrderBook from './useOrderBook';

function OrderBook() {
  useOrderBook();

  return <View />;
}

export default OrderBook;
