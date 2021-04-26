import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { selectBids, selectAsks, selectMaxSize } from '../selectors';
import Header from './Header';
import OrderItem from './OrderItem';
import useOrderBook from './useOrderBook';

function OrderBook() {
  useOrderBook();

  const bids = useSelector(selectBids);
  const asks = useSelector(selectAsks);
  const maxSize = useSelector(selectMaxSize);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      {asks.map(ask => (
        <OrderItem key={ask.price} {...ask} maxSize={maxSize} tint="red" />
      ))}
      {bids.map(bid => (
        <OrderItem key={bid.price} {...bid} maxSize={maxSize} tint="green" />
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1c2a31' },
});

export default OrderBook;
