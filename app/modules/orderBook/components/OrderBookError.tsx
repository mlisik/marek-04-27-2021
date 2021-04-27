import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';

export interface OrderBookErrorProps {
  message: string | null;
  onPress: () => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c2a31',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 16,
  },
  text: {
    fontFamily: Platform.select({ ios: 'Courier', android: 'monospace' }),
    textAlign: 'center',
    color: 'white',
  },
  message: {
    color: 'red',
  },
});

function OrderBookError({
  onPress,
  message = 'Unknown Error',
}: OrderBookErrorProps) {
  return (
    <SafeAreaView testID="OrderBookError" style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.contentContainer}>
          <Text style={styles.text}>
            An error occurred. If it is not resolved immediately, tap to retry
          </Text>
          <Text style={[styles.text, styles.message]}>{message}</Text>
          <ActivityIndicator color="white" />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default OrderBookError;
