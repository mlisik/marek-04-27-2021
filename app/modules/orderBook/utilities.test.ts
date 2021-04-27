import { mergeOrders } from './utilities';

describe('mergeOrders', () => {
  it('by default, should remove existing orderbook entry if new size equals 0', () => {
    const state: Order[] = [[54000, 1200]];
    const incoming: Order[] = [[54000, 0]];

    expect(mergeOrders(state, incoming)).toEqual([]);
  });

  it('should update existing orderbook entry with new size', () => {
    const state: Order[] = [
      [55, 10],
      [54, 12],
    ];
    const incoming: Order[] = [[54, 5]];

    expect(mergeOrders(state, incoming)).toEqual([
      [54, 5],
      [55, 10],
    ]);
  });

  it('should keep existing orders if remove flag is false', () => {
    const state: Order[] = [[54000, 1200]];
    const incoming: Order[] = [[54000, 0]];

    expect(mergeOrders(state, incoming, false)).toEqual(incoming);
  });
});
