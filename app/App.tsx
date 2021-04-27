import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from './modules';
import { OrderBook } from './modules/orderBook';

const App = () => (
  <Provider store={store}>
    <StatusBar barStyle="light-content" />
    <OrderBook />
  </Provider>
);

export default App;
