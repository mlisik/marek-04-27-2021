import React from 'react';
import { render } from '@testing-library/react-native';
import OrderBook, { OrderBookProps } from './OrderBook';

// silence useNativeDriver warning from Animated
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

const props: OrderBookProps = {
  bids: [],
  asks: [],
  maxSize: 0,
};

const renderComponent = (newProps: Partial<OrderBookProps> = {}) =>
  render(<OrderBook {...props} {...newProps} />);

it('should only render header when empty', () => {
  const { queryByTestId } = renderComponent();

  expect(queryByTestId('OrderBookItem')).toBeNull();
  expect(queryByTestId('Header')).toBeTruthy();
});

it('should render correct number of bids and asks', () => {
  const { queryAllByTestId } = renderComponent({
    bids: [{ price: 2, size: 2, accumulatedSize: 2 }],
    asks: [{ price: 1, size: 1, accumulatedSize: 1 }],
    maxSize: 2,
  });

  const orders = queryAllByTestId('OrderBookItem');

  expect(orders).toHaveLength(2);
});
