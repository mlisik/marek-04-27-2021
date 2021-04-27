import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

function Header() {
  return (
    <View testID="Header" style={styles.container}>
      <Text style={styles.cell}>Price</Text>
      <Text style={styles.cell}>Size</Text>
      <Text style={styles.cell}>Total</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 32,
  },
  cell: {
    flex: 1,
    color: '#98a6af',
    marginVertical: 4,
    fontFamily: Platform.select({ ios: 'Courier', android: 'monospace' }),
    textAlign: 'right',
  },
});

export default Header;
