import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import Header from './Header';
import OrderBookItem from './OrderBookItem';

export interface OrderBookProps {
  bids: OrderBookItemData[];
  asks: OrderBookItemData[];
  maxSize: number;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1c2a31' },
});

function OrderBook({ bids, asks, maxSize }: OrderBookProps) {
  return (
    <SafeAreaView testID="OrderBook" style={styles.container}>
      <Header />
      {asks.map(ask => (
        <OrderBookItem key={ask.price} {...ask} maxSize={maxSize} tint="red" />
      ))}
      {bids.map(bid => (
        <OrderBookItem
          key={bid.price}
          {...bid}
          maxSize={maxSize}
          tint="green"
        />
      ))}
    </SafeAreaView>
  );
}

export default OrderBook;
