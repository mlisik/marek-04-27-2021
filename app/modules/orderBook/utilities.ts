/**
 * Given arrays of existing and incoming orders, returns a new array
 * that overrides sizes for existing price points and removes orders with size 0
 */
export const mergeOrders = (
  state: Order[],
  incoming: Order[],
  removeEmpty = true,
) => {
  let result: Order[] = incoming;

  state.forEach(([price, size]) => {
    if (incoming.find(el => el[0] === price)) {
      return;
    }

    result.push([price, size]);
  });

  return removeEmpty ? result.filter(([, size]) => size > 0) : result;
};
