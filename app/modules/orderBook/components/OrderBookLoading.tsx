import React from 'react';
import { ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c2a31',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function OrderBookLoading() {
  return (
    <SafeAreaView testID="OrderBookLoading" style={styles.container}>
      <ActivityIndicator color="white" />
    </SafeAreaView>
  );
}

export default OrderBookLoading;
