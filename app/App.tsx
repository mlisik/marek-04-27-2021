import React from 'react';
import { Provider } from 'react-redux';
import store from './modules';
import { OrderBook } from './modules/orderBook';

const App = () => {
  return (
    <Provider store={store}>
      <OrderBook />
    </Provider>
  );
};

export default App;
