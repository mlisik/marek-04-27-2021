import React, { useEffect, useRef } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
  Animated,
} from 'react-native';

export interface OrderBookItemProps extends OrderBookItemData {
  maxSize: number;
  tint: string;
  testID?: string;
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 32,
  },
  cell: {
    flex: 1,
    marginVertical: 4,
    color: 'white',
    fontFamily: Platform.select({ ios: 'Courier', android: 'monospace' }),
    textAlign: 'right',
  },
  backgroundContainer: StyleSheet.absoluteFillObject,
  flashBackground: { backgroundColor: 'white' },
  background: { height: '100%', opacity: 0.2 },
});

function OrderBookItem({
  price,
  size,
  accumulatedSize,
  maxSize,
  tint = 'red',
  testID = 'OrderBookItem',
}: OrderBookItemProps) {
  const flashAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(flashAnimation, {
        toValue: 0.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(flashAnimation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  }, [price]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <View testID={testID} style={styles.container}>
      <View style={styles.backgroundContainer}>
        <View
          style={[
            styles.background,
            {
              width: (accumulatedSize / maxSize) * width,
              backgroundColor: tint,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.backgroundContainer,
            styles.flashBackground,
            { opacity: flashAnimation },
          ]}
        />
      </View>
      <Text style={[styles.cell, { color: tint }]}>
        {price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </Text>
      <Text style={styles.cell}>{size.toLocaleString()}</Text>
      <Text style={styles.cell}>{accumulatedSize.toLocaleString()}</Text>
    </View>
  );
}

export default OrderBookItem;
