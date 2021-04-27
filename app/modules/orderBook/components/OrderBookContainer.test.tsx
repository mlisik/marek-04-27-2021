import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import WS from 'jest-websocket-mock';
import { act } from 'react-test-renderer';

import { messageReceived } from '../actions';
import OrderBook from './OrderBookContainer';
import { SOCKET_SUBSCRIBE_MESSAGE, SOCKET_URL } from './useOrderBook';

const store = configureMockStore<RootState>()({
  orderBook: {
    error: null,
    data: {
      bids: [],
      asks: [],
    },
  },
});

let server: WS;

const renderComponent = () =>
  render(
    <Provider store={store}>
      <OrderBook />
    </Provider>,
  );

beforeEach(() => {
  server = new WS(SOCKET_URL);
});

afterEach(() => {
  store.clearActions();
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

  expect(store.getActions()[0].type).toBe('@orderBook/errorReceived');
});

it('should dispatch correct action when a message is received', async () => {
  renderComponent();

  await server.connected;
  await server.nextMessage;

  await act(async () => {
    await server.send(JSON.stringify({ bids: [[1, 1]], asks: [[2, 2]] }));
  });

  expect(store.getActions()).toEqual([
    messageReceived({ bids: [[1, 1]], asks: [[2, 2]] }),
  ]);
});
