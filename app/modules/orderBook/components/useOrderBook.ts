import { useRef, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { messageReceived, errorReceived } from '../actions';

export const SOCKET_URL = 'wss://www.cryptofacilities.com/ws/v1';

export const SOCKET_SUBSCRIBE_MESSAGE = JSON.stringify({
  event: 'subscribe',
  feed: 'book_ui_1',
  product_ids: ['PI_XBTUSD'],
});

function isOrderBookData(data: any): data is OrderBookData {
  return (
    (data as OrderBookData).bids !== undefined &&
    (data as OrderBookData).asks !== undefined
  );
}

// TODO: handle other / multiple product ids
const useOrderBook = () => {
  const socket = useRef(new WebSocket(SOCKET_URL)).current;
  const dispatch = useDispatch();

  const subscribe = useCallback(() => {
    socket.send(SOCKET_SUBSCRIBE_MESSAGE);
  }, [socket]);

  const unsubscribe = useCallback(() => {
    // TODO: send unsubscribe event? - https://support.cryptofacilities.com/hc/en-us/articles/360000538773-Book
    socket.close();
  }, [socket]);

  useEffect(() => {
    socket.onopen = subscribe;

    socket.onerror = event => {
      dispatch(errorReceived(event.message));
    };

    socket.onmessage = (event: WebSocketMessageEvent) => {
      if (typeof event.data !== 'string') {
        throw new Error('Incorrect data. Expected: string');
      }

      try {
        const data = JSON.parse(event.data);

        if (!isOrderBookData(data)) {
          throw new Error('Incorrect data. Expected: OrderBookData');
        }

        dispatch(messageReceived(data));
      } catch (error) {
        // silent catch, TODO: report
      }
    };

    return () => unsubscribe();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return [subscribe, unsubscribe];
};

export default useOrderBook;
