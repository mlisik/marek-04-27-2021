import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import WS from 'jest-websocket-mock';
import { act } from 'react-test-renderer';

import { messageReceived } from '../actions';
import OrderBook from './OrderBookContainer';
import { SOCKET_SUBSCRIBE_MESSAGE, SOCKET_URL } from './useOrderBook';

const createStore = configureMockStore<RootState>();

let mockStore = createStore({
  orderBook: { error: undefined, data: { bids: [], asks: [] } },
});
let server: WS;

const renderComponent = (store = mockStore) =>
  render(
    <Provider store={store}>
      <OrderBook />
    </Provider>,
  );

beforeEach(() => {
  server = new WS(SOCKET_URL);
});

afterEach(() => {
  mockStore.clearActions();
  WS.clean();
});

it('should open web socket connection on mount', async () => {
  renderComponent();

  await server.connected;
  await server.nextMessage;

  expect(server.messages[0]).toEqual(SOCKET_SUBSCRIBE_MESSAGE);
});

it('should dispatch correct action when an error occurs', async () => {
  renderComponent();

  await server.connected;
  await server.nextMessage;

  await act(async () => {
    await server.error();
  });

  expect(mockStore.getActions()[0].type).toBe('@orderBook/errorReceived');
});

it('should dispatch correct action when a message is received', async () => {
  renderComponent();

  await server.connected;
  await server.nextMessage;

  await act(async () => {
    await server.send(JSON.stringify({ bids: [[1, 1]], asks: [[2, 2]] }));
  });

  expect(mockStore.getActions()).toEqual([
    messageReceived({ bids: [[1, 1]], asks: [[2, 2]] }),
  ]);
});

it('should render error when error was received', () => {
  mockStore = createStore({
    orderBook: { error: 'Error', data: { bids: [], asks: [] } },
  });

  const { queryByTestId } = renderComponent(mockStore);

  expect(queryByTestId('OrderBookError')).toBeTruthy();
});

it('should render loader before error or first message are received', () => {
  mockStore = createStore({
    orderBook: { error: undefined, data: { bids: [], asks: [] } },
  });

  const { queryByTestId } = renderComponent(mockStore);

  expect(queryByTestId('OrderBookLoading')).toBeTruthy();
});
